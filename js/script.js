const header = document.getElementById("header")

window.addEventListener("scroll", function(event) {
	header.classList.add("active");
	if (window.pageYOffset == 0) {
		header.classList.remove("active");
	}
});