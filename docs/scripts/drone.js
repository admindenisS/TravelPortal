(() => {

    let droneElement = document.getElementsByClassName("drone")[0];

    if (!droneElement) {
        console.error("Drone element not found");
        return;
    }

    let videoElement = document.createElement("video");
    videoElement.setAttribute("autoplay", true);
    videoElement.setAttribute("loop", "");
    videoElement.setAttribute("playsinline", true);
    videoElement.id = "drone";

    let sourceWebm = document.createElement("source");
    sourceWebm.setAttribute("src", "/assets/drone.webm");
    sourceWebm.setAttribute("type", "video/webm");

    let sourceMP4 = document.createElement("source");
    sourceMP4.setAttribute("src", "/assets/drone.mp4");
    sourceMP4.setAttribute("type", "video/mp4");

    videoElement.appendChild(sourceWebm);
    videoElement.appendChild(sourceMP4);
    droneElement.append(videoElement);

    videoElement.load();
    videoElement.onloadeddata = () => {
        console.log("Drone video loading was started!")
    }

    videoElement.onerror = () => {
        console.error("Ошибка при загрузке видео");
    };
})()