export const checkIfLoggedIn = () => {
  const loginDataJSON = typeof window !== "undefined" ? sessionStorage.getItem("blogLoginJSON") : false
  const time = new Date();
  const timeNow = time.getTime();

  if (!!loginDataJSON) {
    const loginData = JSON.parse(loginDataJSON);
    const timeLimit = timeNow - loginData.accessTokenTime;

    if (timeLimit < 3600000) {
      return { isLoggedIn: true, accessToken: loginData.accessToken }
    }
    else {
      sessionStorage.removeItem("blogLoginJSON");
      return { isLoggedIn: false, accessToken: "" }
    }
  }
  else if (typeof window !== "undefined") {

    sessionStorage.removeItem("blogLoginJSON");
    return { isLoggedIn: false, accessToken: "" }

  }
  else { return { isLoggedIn: false, accessToken: "" } }
}
