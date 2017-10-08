$(document).ready(function() {
  var userNameInput = $("#userName");
  var passwordInput =$("#password");

  $("#login").on("click", function handleFormSubmit(event) {
    event.preventDefault();
    if(!userNameInput.val().trim || !passwordInput.val().trim()) {
      return;
    }
    var newUser = {
      userName: userNameInput.val().trim(),
      password: passwordInput.val().trim()
    };
    console.log(newUser);
    console.log(userNameInput.val());
    console.log(passwordInput.val());
  });
});