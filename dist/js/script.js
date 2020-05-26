const header = document.getElementById("header");
const burger = document.getElementById("burger");
const navigation = document.getElementById("navigation");

window.addEventListener("scroll", function (event) {
	header.classList.add("active");
	if (window.pageYOffset == 0) {
		header.classList.remove("active");
	}
});

burger.addEventListener("click", function (event) {
	burger.classList.toggle("active");
	navigation.classList.toggle("active");
})