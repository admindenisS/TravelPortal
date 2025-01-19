//opens menus

function openMenu(device) {
	let menuElement = null;

	console.log(device);

	if (device == "mobile") {
		menuElement = document.getElementById("menu-mob");
	} else if (device == "pc") {
		menuElement = document.getElementById("menu-pc");
	}

	if (menuElement === null) return;
	let status = menuElement.getAttribute("data-active");

	if (status == 1) {
		document.body.style.overflowY = "unset";
		menuElement.style.display = "none";
		menuElement.setAttribute("data-active", 0);

		//auto close after exit from menu
		if (device == "mobile") {
			document.querySelector("#menu-mob details summary img").style.rotate = "0deg";
			document.querySelector("#menu-mob details").removeAttribute("open");
		}
	} else {
		document.body.style.overflowY = "hidden";
		menuElement.removeAttribute("hidden");
		menuElement.style.display = "flex";
		menuElement.setAttribute("data-active", 1);
	}
}

//close tourists on main page

let tourists = document.getElementById("tourists");

if (tourists) {
	tourists.addEventListener("mouseleave", (event) => {
		if (tourists.attributes.open) {
			tourists.removeAttribute("open");
		}
	});
}