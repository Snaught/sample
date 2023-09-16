document.addEventListener('DOMContentLoaded', function() {
    var signout = document.getElementById('sign-out');
    var login = document.getElementById('login');
    var tools = document.getElementById('tools');
    var update = document.getElementById('updateDB');
    var prodId = document.getElementById('prodId');
    var prodget = document.getElementById('prodget');
    var pinfo = document.getElementById('prod-info');
    var customButton = document.getElementById('customButton');
    var preview = document.getElementById('ImagePreview');
    var body = document.getElementById('admin')
    var feature = document.getElementById('feature')
    var upresults = document.getElementById('update-results')
    var productImage = document.getElementById('productImage')

    let product;

// ~~~~~~~~~~~~~~~~~FireBase config (connect to Google Cloud and add project to Firebase):
//const firebaseConfig = {
//  apiKey: "",
//  authDomain: "PROJECT.firebaseapp.com",
//  projectId: "",
//  storageBucket: "PROJECT.appspot.com",
//  messagingSenderId: "",
//  appId: ""
//};
//
//firebase.initializeApp(firebaseConfig);
//
//var uiConfig = {
//    signInFlow: 'popup',
//    signInSuccessUrl: '/admin',
//    signInOptions: [
//        {
//          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//          requireDisplayName: false
//        },
//    ],
//    tosUrl: '<your-tos-url>',
////    privacyPolicyUrl: '/privacy'
//};
//
//if (typeof firebase === 'undefined') {
//  const msg = "Please provide your Firebase configuration details. See instructions in templates/index.html.";
//  console.log(msg);
//  alert(msg);
//}
//
// ~~~~~~~~Check if user logged in (Firebase):
//firebase.auth().onAuthStateChanged(function (user) {
//    if (user) {
//        console.log('Logged in!')
//        signout.style.display = 'inline-block';
//        body.style.backgroundImage = 'none';
//        login.hidden = true;
//        tools.hidden = false;
//    } else {
//        console.log('Logged out!')
//      signout.style.display = 'none';
//      body.style.backgroundImage = 'url(/static/images/slide1.jpg), linear-gradient(white, #84acd7, blue)'
//      login.hidden = false;
//      tools.hidden = true;
//      // User is signed out.
//      // Initialize the FirebaseUI Widget using Firebase.
//      var ui = new firebaseui.auth.AuthUI(firebase.auth());
//      // Show the Firebase login button.
//      ui.start('#firebaseui-auth-container', uiConfig);
//    }
//}, function (error) {
//    console.log(error);
//    alert('Unable to log in: ' + error)
//    window.location.href = '/';
//});

// Faux Login/Logout (no credentials) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var signin = document.getElementById('sign-in');

    signin.onclick = function () {
        console.log('Logged in!')
            signout.style.display = 'inline-block';
            body.style.backgroundImage = 'none';
            signin.hidden = true;
            tools.hidden = false;
    }
    signout.onclick = function () {
        signout.style.display = 'none';
        body.style.backgroundImage = 'url(/static/images/4.jpg)'
        signin.hidden = false;
        tools.hidden = true;
    }
})