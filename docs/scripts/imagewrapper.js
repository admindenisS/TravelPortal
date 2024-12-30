let webpSupport = false;

(() => {
	var img = new Image();
	img.onload = function () {
		var result = img.width > 0 && img.height > 0;
		webpSupport = true;
	};
	img.onerror = function () {
		webpSupport = false;
	};
	img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
})();

let currentAnimation = null;

function changeImage(newUrl, target, source) {
	let currentUrl = target.src.trim().replace(/.*assets\/|[)]+/g, "");
	if (currentUrl === newUrl) return;

	if (currentAnimation) {
		currentAnimation.cancel();
	}

	let bannerText = document.getElementsByClassName("banner-text")[0];
	if (bannerText) bannerText.style.display = "none";

	let currentInimation = (target.animate(
		[{ opacity: 1 }, { opacity: 0 }, { opacity: 1, content: `url(./assets/${newUrl}.${webpSupport ? "webp" : "png"})` }],
		{
			duration: 300,
			easing: "ease-in-out",
			fill: "forwards",
		}
	).onfinish = () => {
		target.src = `/assets/${newUrl}.${webpSupport ? "webp" : "png"}`;
		if (newUrl === source) {
			bannerText.style.display = "flex";
		}
		currentAnimation = null;
	});
}

let isMouseOverSubimage = false;

document.querySelectorAll("[data-subimage]").forEach(function (element) {
	if (!element.dataset.target) return;
	let targetElement = element.dataset.target == "this" ? element : document.querySelector(element.dataset.target);

	element.addEventListener("mouseenter", function (event) {
		isMouseOverSubimage = true;
		let target = event.target;

		if (!target || !target.dataset.subimage) return;

		changeImage(target.dataset.subimage, targetElement);
	});

	element.addEventListener("mouseleave", function (event) {
		isMouseOverSubimage = false;
		setTimeout(() => {
			if (!isMouseOverSubimage) {
				changeImage(element.dataset.source, targetElement, element.dataset.source);
			}
		}, 150);
	});
});
