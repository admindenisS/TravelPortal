window.onload = () => {

    let droneElement = document.getElementsByClassName("drone")[0];

    if (!droneElement) {
        console.error("Drone element not found");
        return;
    }

    let videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.playsInline = true;
    videoElement.muted = true;
    videoElement.setAttribute("muted", "");
    videoElement.setAttribute("playsinline", "");
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

    videoElement.onloadeddata = () => {
        console.log("Drone video loading was started!");
    }

    videoElement.onerror = (event) => {
        console.error("Ошибка при загрузке видео:", event.target.error);
    };
}