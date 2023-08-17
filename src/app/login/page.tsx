"use client";

import tryLogin from "@/features/tryLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PathsT } from "@/paths";
import { setAccessToken } from "@/redux/features/accessToken-slice";
import Button from "@/components/Button";
import { setIsLoggedIn } from "@/redux/features/isLoggedIn-slice";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoggedIn } = useAppSelector((state) => state.isLoggedIn.value);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const time = new Date();

  const handleLogIn = async (event: React.FormEvent) => {
    event.preventDefault();

    if (username !== "" && password !== "") {
      const response = await tryLogin({ username, password });

      if (response.status === 200) {
        const accessTokenTimeStep = time.getTime();
        const blogLogin = {
          accessToken: response.data.access_token,
          accessTokenTime: accessTokenTimeStep,
        };
        const blogLoginJSON = JSON.stringify(blogLogin);

        dispatch(setAccessToken({ accessToken: response.data.access_token }));
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        await sessionStorage.setItem("blogLoginJSON", blogLoginJSON);
        router.push(PathsT.MyArticlesPathT);
      }
    }
  };

  const handleLogOut = () => {
    dispatch(setIsLoggedIn({ isLoggedIn: false }));
    sessionStorage.removeItem("blogLoginJSON");
    router.push(PathsT.HomePathT);
  };

  return (
    <div className="h-full w-2/3 mx-auto flex align-middle border border-dashed border-gray-700">
      <div className="p-6 w-full">
        {isLoggedIn ? (
          <>
            <h2>You are still logged in!</h2>
            <Button type="button" onClick={handleLogOut}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">Log In</h2>
            <form onSubmit={handleLogIn} method="post" className="pl-4">
              <label className="block mb-2" htmlFor="email">
                Usename
              </label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="border border-dashed border-gray-700 outline-none focus:border-2 autofill:bg-gray-900"
                id="email"
                type="text"
                name="email"
                placeholder="username"
                required
                autoComplete="on"
              />

              <label className="block mt-4 mb-2" htmlFor="password">
                Password
              </label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="block border border-dashed border-gray-700 outline-none focus:border-2"
                id="password"
                type="password"
                name="password"
                placeholder="**********"
                autoComplete="on"
                required
              />
              <Button
                className="mt-4 border border-gray-600 border-solid py-2 px-4 rounded-2xl bg-gray-900 hover:bg-gray-800"
                type="submit"
              >
                Log In
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
