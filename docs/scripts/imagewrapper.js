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

let currentAnimation = [];

function changeImage(newUrl, target, source) {
	let currentUrl = target.src.trim().replace(/.*assets\/|[)]+/g, "");
	if (currentUrl === newUrl) return;

	if (currentAnimation[newUrl]) {
		currentAnimation[newUrl].cancel();
	}

	let bannerText = document.getElementsByClassName("banner-text")[0];
	if (bannerText) bannerText.style.display = "none";

	currentAnimation[newUrl] = target.animate(
		[{ opacity: 1 }, { opacity: 0 }, { opacity: 1, content: `url(/assets/${newUrl}.${webpSupport ? "webp" : "png"})` }],
		{
			duration: 300,
			easing: "ease-in-out",
			fill: "forwards",
		}
	);

	currentAnimation[newUrl].onfinish = () => {
		target.src = `/assets/${newUrl}.${webpSupport ? "webp" : "png"}`;
		if (bannerText && newUrl === source) {
			bannerText.style.display = "flex";
		}
		currentAnimation[newUrl] = null;
	};
}

function preloadImage(url) {
	if (!url) {
		console.error("URL is required to preload an image.");
		return;
	}

	let img = new Image();
	img.src = `/assets/${url}.${webpSupport ? "webp" : "png"}`;

	img.onload = () => {
		console.log(`Image preloaded: ${img.src}`);
	};

	img.onerror = () => {
		console.error(`Failed to preload image: ${img.src}`);
	};
}

let isMouseOverSubimage = {};

document.querySelectorAll("[data-subimage]").forEach(function (element) {
	if (!element.dataset.target) return;
	let targetElement = element.dataset.target == "this" ? element : document.querySelector(element.dataset.target);

	if (element.dataset.subimage) preloadImage(element.dataset.subimage);

	element.addEventListener("mouseenter", function (event) {
		isMouseOverSubimage[targetElement.dataset.source] = true;
		let target = event.target;

		if (!target || !target.dataset.subimage) return;

		changeImage(target.dataset.subimage, targetElement);
	});

	element.addEventListener("mouseleave", function (event) {
		isMouseOverSubimage[targetElement.dataset.source] = false;
		setTimeout(() => {
			if (!isMouseOverSubimage[targetElement.dataset.source]) {
				changeImage(element.dataset.source, targetElement, element.dataset.source);
			}
		}, 150);
	});
});
