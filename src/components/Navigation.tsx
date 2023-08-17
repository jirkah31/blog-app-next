"use client";

import React, { useEffect, useState } from "react";
import { navLinks } from "@/links";
import Link from "next/link";
import { PathsT } from "@/paths";
import { useAppSelector } from "@/redux/store";

const Navigation = () => {
  const { isLoggedIn } = useAppSelector((state) => state.isLoggedIn.value);
  const [loggedInState, setLoggedInState] = useState<boolean>(false);

  useEffect(() => {
    setLoggedInState(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <nav className="h-16 w-full border-gray-700 border-b border-b-solid flex">
      <ul className="flex flex-row items-center justify-around w-2/3 mx-auto list-none">
        {navLinks.map((link) => {
          return (
            <li
              className="inline-block text-gray-500 hover:text-gray-100 mx-5"
              key={link.id}
            >
              <Link href={link.path}>{link.content}</Link>
            </li>
          );
        })}
        {loggedInState && (
          <li className="inline-block text-gray-500 hover:text-gray-100">
            <Link href={PathsT.MyArticlesPathT}>My articles</Link>
          </li>
        )}
        <li className="inline-block text-gray-500 hover:text-gray-100">
          <Link href={PathsT.LoginPathT}>
            {loggedInState ? "Log Out" : "Log In"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
