let webpSupport = false;

(() => {
	// Проверка через реальный WebP-ресурс
	var img = new Image();

	img.onload = function () {
		webpSupport = img.width > 0 && img.height > 0;
	};

	img.onerror = function () {
		webpSupport = false;
	};

	img.src = "/scripts/pixel.webp";
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

let isMouseOverSubimage = {};

function setEvents(element, targetElement) {
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

	element.addEventListener("pointerenter", () => {
		isMouseOverSubimage[targetElement.dataset.source] = true;
		let target = event.target;

		if (!target || !target.dataset.subimage) return;

		changeImage(target.dataset.subimage, targetElement);
	});

	element.addEventListener("pointerleave", () => {
		isMouseOverSubimage[targetElement.dataset.source] = false;
		setTimeout(() => {
			if (!isMouseOverSubimage[targetElement.dataset.source]) {
				changeImage(element.dataset.source, targetElement, element.dataset.source);
			}
		}, 150);
	});

	console.log(`${element.dataset.source} теперь прослушивается`);
}

let preloaded = [];

function preloadImage(url) {
	return new Promise((resolve, reject) => {
		if (!url) {
			throw new Error("URL is required to preload an image.");
		}

		if (preloaded.includes(url)) {
			resolve(true);
		}

		let img = new Image();
		img.src = `/assets/${url}.${webpSupport ? "webp" : "png"}`;

		img.onload = () => {
			console.log(`Image preloaded: ${img.src}`);
			preloaded.push(url);
			resolve(true);
		};

		img.onerror = () => {
			reject(false);
		};
	});
}

document.querySelectorAll("[data-subimage]").forEach(function (element) {
	if (!element.dataset.target) return;
	let targetElement = element.dataset.target == "this" ? element : document.querySelector(element.dataset.target);

	if (element.dataset.subimage)
		preloadImage(element.dataset.subimage).then(() => {
			setEvents(element, targetElement);
		}).catch((err) => {
			console.error(`Failed to preload image: ${img.src}`);
		})
});
