function validateForm() {
  // userid
  let userId = document.forms["myForm"]["user-id"].value;
  let userIdLength = userId.length;
  // password
  let passwordId = document.forms["myForm"]["password"].value;
  let passwordLength = passwordId.length;
  //name
  let nameId = document.forms["myForm"]["name"].value;
  var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  //country
  let countryId = document.getElementById("country").value;
  //zip
  let zipId = document.forms["myForm"]["zip-code"].value;
  var numbers = /^[0-9]+$/;
  // email
  let emailId = document.forms["myForm"]["email"].value;
  var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // sex
  let fCheBox = document.getElementById("male").checked;
  let sCheBox = document.getElementById("female").checked;
  // language
  let flCheBox = document.getElementById("english").checked;
  let slCheBox = document.getElementById("non-english").checked;

  // userid
  if (userId == "" || userIdLength < 5 || userIdLength > 12) {
    document.getElementById("user-id-alert").innerHTML =
      "[ Required and must be of length 5 to 12. ]";
    return false;
  }
  // password
  if (passwordId == "" || passwordLength < 7 || passwordLength > 12) {
    document.getElementById("password-alert").innerHTML =
      "[ Required and must be of length 7 to 12. ]";
    return false;
  }
  //name
  if (!regName.test(nameId) || nameId == "") {
    document.getElementById("name-alert").innerHTML =
      "[ Required and alphabates only. ]";
    return false;
  }
  //country
  if (countryId == "Select") {
    document.getElementById("country-alert").innerHTML =
      "[ Required. Must select a country. ]";
    return false;
  }
  //zip
  if (!zipId.match(numbers) || zipId == "") {
    document.getElementById("zip-alert").innerHTML =
      "[ Required. Must be numeric only. ]";
    return false;
  }
  // email
  if (!emailId.match(validEmail) || emailId == "") {
    document.getElementById("email-alert").innerHTML =
      "[ Required. Must be a valid email. ]";
    return false;
  }
  // sex
  if (
    (fCheBox == false && sCheBox == false) ||
    (fCheBox == true && sCheBox == true)
  ) {
    document.getElementById("sex-alert").innerHTML = "[ Required. ]";
    return false;
  }
  // language
  if (flCheBox == false && slCheBox == false) {
    document.getElementById("language-alert").innerHTML = "[ Required. ]";
    return false;
  }

  return true;
}

