console.log("Loading Login JS file !!");
var data = {
  items: [
    {
      title: "Login",
    },
  ],
};

var source = document.getElementById("login-template").innerHTML;
var template = Handlebars.compile(source);
var html = template(data);

document.getElementById("login-content").innerHTML = html;
console.log(html);

//jquery method
$("#content .card-footer .btn").on("click", function (event) {
  console.log("jquery");

  var index = $(".login-btn").index(event.currentTarget);
  console.log("index = " + index);
  console.log(event.target.dataset.target);
});

$("#submit-login").on("click", function (event) {
  console.log("Clicked the login button inside the modal ");

  var passwordData = $("#password-input")[0].value;
  console.log(passwordData);
  var emailData = $("#email")[0].value;
  console.log(emailData);

  //fetch request for POSTing data to DB
  const response = fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: emailData,
      password: passwordData,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("after post", response);
  if (response) {
    document.location.replace("/");
  } else {
    alert("Failed to login");
  }
});
