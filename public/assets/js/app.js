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
	var unsubscribe = auth.onAuthStateChanged(function () {
		unsubscribe;
	})
	func();
}

authReady(function () {
	console.log(auth.currentUser);

	if (auth.currentUser) {
		$("#title-span").innerText = auth.currentUser;
	} else {
		$("#title-span").innerText = "No User";
	}

	function getLoginData () {
		return {
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		}
	}

	function handleUserLogin(event) {
		event.preventDefault();

		auth
			.signInWithEmailAndPassword(getLoginData().email, getLoginData().password)
			.then(function() {

			})
	}
})