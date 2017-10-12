firebase
  .initializeApp({
    apiKey: "AIzaSyDpylyxPjNsvaiew-BBriIe9s_4x-xYx-0",
    authDomain: "goal-helper-login.firebaseapp.com",
    databaseURL: "https://goal-helper-login.firebaseio.com",
    projectId: "goal-helper-login",
    storageBucket: "goal-helper-login.appspot.com",
    messagingSenderId: "1060412861093"
  })
  .auth()
  .setPersistence("local");

var auth = firebase.auth();

function authReady(func) {
  var unsubscribe = auth.onAuthStateChanged(function() {
    unsubscribe();
    func();
  });
};

function deleteCookie() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function setCookie(cname, cvalue) {
  var d = new Date();
  var domain = window.location.host;
  d.setTime(d.getTime() + 60 * 1000 * 55);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires;
}

function setToken(user) {
  if (!user) {
    deleteCookie();
  } else {
    user.getIdToken().then(function(token) {
      setCookie("token", token);
    });
  }
}

auth.onAuthStateChanged(setToken);