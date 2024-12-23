let currentAnimation = null;

function changeImage(newUrl, image) {
	let currentUrl = image.src.trim().replace(/.*assets\/|[)]+/g, "");
	if (currentUrl === newUrl) return;

	if (currentAnimation) {
		currentAnimation.cancel();
	}

	let bannerText = document.getElementsByClassName("banner-text")[0];
	if (bannerText) bannerText.style.display = "none";

	let currentInimation = (image.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1, content: `url(./assets/${newUrl})` }], {
		duration: 300,
		easing: "ease-in-out",
		fill: "forwards",
	}).onfinish = () => {
		image.src = `./assets/${newUrl}`;
		if (newUrl === "banner.png") {
			bannerText.style.display = "flex";
		}
		currentAnimation = null;
	});
}

let isMouseOverSubimage = false;

document.querySelectorAll("[data-subimage]").forEach(function (element) {
	let banner = document.getElementById("banner-image");

	element.addEventListener("mouseenter", function (event) {
		isMouseOverSubimage = true;
		let target = event.target;

		if (!target || !target.dataset.subimage) return;

		changeImage(target.dataset.subimage, banner);
	});

	element.addEventListener("mouseleave", function (event) {
		isMouseOverSubimage = false;
		setTimeout(() => {
			if (!isMouseOverSubimage) {
				changeImage("banner.png", banner);
			}
		}, 150);
	});
});
