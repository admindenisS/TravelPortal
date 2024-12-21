function openMenu(device) {
    let menuElement = null;

    console.log(device);
    
    if (device == "mobile") {
        menuElement = document.getElementById('menu-mob');
    } else if (device == "pc") {
        menuElement = document.getElementById('menu-pc');
    }

    if (menuElement === null) return;
    let status = menuElement.getAttribute("data-active");
    
    console.log(status);
    console.log(menuElement);
    
    if (status == 1) {
        document.body.style.overflowY = "unset";
        menuElement.style.display = "none";
        menuElement.setAttribute("data-active", 0);
        if (device == "mobile") {
            document.querySelector("#menu-mob details").removeAttribute("open");
        }
    } else {
        document.body.style.overflowY = "hidden";
        menuElement.removeAttribute("hidden");
        menuElement.style.display = "flex";
        menuElement.setAttribute("data-active", 1);
    }
    console.log(menuElement);
}