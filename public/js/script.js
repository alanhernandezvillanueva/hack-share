console.log("inside script.js");

$("#content .card-footer .btn").on("click", function (event) {
  console.log("jquery");

  var index = $(".signup-btn").index(event.currentTarget);
  console.log("index = " + index);
  console.log(event.target.dataset.target);
});

$("#content .card-footer .btn").on("click", function (event) {
  console.log("jquery");

  var index = $(".login-btn").index(event.currentTarget);
  console.log("index = " + index);
  console.log(event.target.dataset.target);
});
