let gotoProfileBtn = document.getElementById("profile");
if (gotoProfileBtn) {
  gotoProfileBtn.addEventListener("click", () => {
    window.location.href = "SignIn.html";
  });
}

let gotoIndexBtn = document.getElementById("returnButton");
if (gotoIndexBtn) {
  gotoIndexBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
