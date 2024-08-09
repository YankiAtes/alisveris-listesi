//Redirect to login page on page load
if (localStorage.getItem("isUserSignedIn") === 0) {
  const meta = document.createElement("meta");
  meta.setAttribute("http-equiv", "refresh");
  meta.setAttribute("content", '0; URL="SignIn.html"');
  document.head.appendChild(meta);
}
