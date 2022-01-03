console.log("Loading Login JS file !!");
var data = {
  items: [
    {
      title: "Login",
    },
  ],
};

var source = document.getElementById("card-template").innerHTML;
var template = Handlebars.compile(source);
var html = template(data);

document.getElementById("content").innerHTML = html;
console.log(html);

//jquery method
$("#content .card-footer .btn").on("click", function (event) {
  console.log("jquery");

  var index = $(".card").index(event.currentTarget);
  console.log("index = " + index);
  console.log(event.target.dataset.target);
});

$("#content .modal-body .btn").on("click", function (event) {
  console.log("Clicked the login button inside the modal ");

  var passwordData = $("#content .modal-body #password-input")[0].value;
  console.log(passwordData);
  var emailData = $("#content .modal-body #email")[0].value;
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
