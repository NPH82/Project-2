
function handleFormSubmit(event) {
  var userNameInput = $("#userName");
  var passwordInput = $("#password");
  if (!userNameInput.val().trim || !passwordInput.val().trim()) {
    return false;
  }
  var newUser = {
    userName: userNameInput.val().trim(),
    password: passwordInput.val().trim()
  };
  return newUser;
}

$(document).ready(function () {
  authReady(function() {
    if (auth.currentUser) {
      console.log(auth.currentUser);
      $("#modalInit").hide();
      $("#logout").show();
      $("#title-span").html("Welcome back, " + auth.currentUser.email + "!!");
    } else {
      $("#title-span").html("Welcome ^_^");
    }

    $("#login").on("click", function(event) {
      event.preventDefault();
      if (!handleFormSubmit())
        {
          $("#login-message").html("One or more of the fields below is blank");
      } else {
        auth
          .signInWithEmailAndPassword(handleFormSubmit().userName, handleFormSubmit().password)
          .then(function() {
            $("#login-modal").modal("hide");
            $("#modalInit").hide();
            $("#logout").show();
            $("#title-span").html("Welcome back, " + auth.currentUser.email + "!!");
          })
          .catch(function(err) {
            $("#login-message").html(err.message);
          });
      }
    });

    $("#logout").on("click", function (event) {
      event.preventDefault();
      auth
        .signOut()
        .then(function () {
          $("#logout").hide();
          $("#modalInit").show();
          $("#title-span").html("Welcome ^_^");
        })
    });

    $("#register").on("click", function (event) {
      event.preventDefault();
      if (!handleFormSubmit())
        {
          $("#login-message").html("One or more of the fields below is blank");
      } else {
        auth
          .createUserWithEmailAndPassword(handleFormSubmit().userName, handleFormSubmit().password)
          .then(function() {
            $.post("api/users", {name: auth.currentUser.email, firebaseId: auth.currentUser.uid}).then(function(data) {
              console.log(data)
              $("#login-modal").modal("hide");
              $("#modalInit").hide();
              $("#logout").show();
              $("#title-span").html("Welcome to the site, " + data.name + "!!");
            })
          })
          .catch(function(err) {
            $("#login-message").html(err.message);
          })
      }
    });

    $("#goalGrab").on("click", function(event) {
      event.preventDefault();
      if (!auth.currentUser) {
        $("#login-message").html("Please log in or register first!");
        $("#login-modal").modal("show");
      } else {
        $.post("api/goals", {
          text: $("#goal").val().trim(),
          weight: $("#difficulty").val().trim(),
          firebaseId: auth.currentUser.uid
        }).then(function(data) {
          console.log(data);
        });
      }
    });

    
  });
})