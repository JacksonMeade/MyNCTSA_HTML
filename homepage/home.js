const logout = document.querySelector('#logout');
var userSignedIn = false;

function loadInfo(doc) {
	$("#first_name").html(doc.data().first_name);
	$("#last_name").html(doc.data().last_name);
	$("#email").html(doc.data().email);
	$("#role").html(doc.data().role);
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
		if (!userSignedIn) {
			var email = user.email;

			db.collection('Users').where("email", "==", "" + email).get().then(snapshot => {
				snapshot.docs.forEach(doc => {
					loadInfo(doc);
				});
			});

			userSignedIn = true;
		}
  } else {
	  console.log("No user logged in");
  }
});

logout.addEventListener('click', (e) => {
	e.preventDefault();

	auth.signOut().then(function() {
		console.log('User Logged Out!');
		window.location.replace("../login_signup/login.html");
	}).catch(function(error) {
		console.log(error);
	});
});
