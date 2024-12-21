//image changer
function changeImage(newUrl, image) {
	let url = image.src.trim().replace(/.*assets\/|[)]+/g, "");
	if (url == newUrl) return;

	let bannerText = document.getElementsByClassName("banner-text")[0];
	if (bannerText) bannerText.style.display = "none";

    image.st

	image.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1, content: `url(./assets/${newUrl})` }], {
		duration: 300,
		easing: "ease-in-out",
		fill: "forwards",
	}).onfinish = () => {
		image.src = `./assets/${newUrl})`;
        if (bannerText && newUrl == "banner.png") bannerText.style.display = "flex";
	};
}

document.querySelectorAll("[data-changeble='1']").forEach(function (element) {
	let text = document.querySelector(".banner-text");
	let banner = document.getElementById("banner-image");

	element.addEventListener("mouseover", function (event) {
		let target = event.target.id
			? event.target.id
			: event.target.parentNode.id
			? event.target.parentNode.id
			: event.target.parentNode.parentNode.id;

		switch (target) {
			case "tourists":
				changeImage("tourists.png", banner);
				break;
			case "about":
				changeImage("about.png", banner);
				break;
			case "selfie":
				changeImage("selfie.png", banner);
				break;
			case "afisha":
				changeImage("afisha.png", banner);
				break;
		}
	});

	element.addEventListener("mouseout", function () {
		element.parentNode.addEventListener("mouseout", function (event) {
			let target = event.target.id
				? event.target.id
				: event.target.parentNode.id
				? event.target.parentNode.id
				: event.target.parentNode.parentNode.id;

			if (["tourists", "about", "selfie", "afisha"].includes(target)) return;
			changeImage("banner.png", banner);
		});
	});
});
// TODO: вставить в data-image ссылку на изображение и хватать её через js, уменьшая количество кода и улучшая его качество