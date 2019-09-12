$(document).ready(function() {
    // Getting references to our form and input
    // var signUpForm = $("form.signup");
    var signUpForm = $("form.signup");
    // var nameInput = $("input#name-input");
    // var signInput = $("#signs").val();
    // var emailInput = $("input#email-input");
    // var passwordInput = $("input#password-input");
    // var password2Input = $("input#password2-input");

    // console.log(signInput);
    // console.log(typeof(signInput));

    console.log("sign up form");
    // console.log(signUpForm);
    // When the signup button is clicked, we validate the email and password are not blank. and the passwords match
    signUpForm.on("submit", function(event) {
        event.preventDefault();

        console.log("sign up form submitted");

        // console.log(SELECT * FROM Users);
        var userData = {
            name: $("input#name-input").val(),
            sign: $("#signs").val(),
            email: $("input#email-input").val().trim(),
            password: $("input#password-input").val().trim(),
            password2: $("input#password2-input").val().trim()
        };
        console.log(userData.sign)
        console.log(typeof(userData.sign))

        if (!userData.name || !userData.sign || !userData.email || !userData.password || !userData.password2) {
            alert("Please fill empty fields");
            return;
        }
        if (userData.password != userData.password2) {
            alert("Passwords do not match")
            return;
        }

        if (userData.password.length < 6) {
            alert("Passwords must be 6 or more characters")
            return;
        }

        // If we have an email and password, the passwords match, and are more than 6 chars, run the signUpUser function
        signUpUser(userData.name, userData.sign, userData.email, userData.password);
        // userData.name.val("");
        // userData.sign.val("Blank");
        // userData.email.val("");
        // userData.password.val("");
        // userData.password2.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(name, sign, email, password) {
        console.log("executing signUpUser function")
        $.post("/api/signup", {
                name: name,
                sign: sign,
                email: email,
                password: password
            }).then(() => {
                console.log("hi")
                window.location.replace("/login");
                console.log(userData);
            }).catch(err => console.log(err))
            // .then(function(data) {
            //     window.location.replace("/login");
            //     // If there's an error, handle it by throwing up a bootstrap alert
            // })
            // .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert.msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});