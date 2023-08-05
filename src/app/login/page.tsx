export default function LoginPage() {
  return (
    <div className="">
      <div className="border">
        {/* <>
            <h2>You are still logged in!</h2>
            <Button
              className="submit-button"
              type="button"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </> */}
        <>
          <h2>Log In</h2>
          <form method="post">
            <label htmlFor="email">Usename</label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="username"
              required
              autoComplete="on"
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="**********"
              autoComplete="on"
              required
            />
            <button className="submit-button" type="submit">
              Log In
            </button>
          </form>
        </>
      </div>
    </div>
  );
}
