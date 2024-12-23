let slider = document.getElementById("images");
let progress = document.getElementById("progress");
let progressContainer = document.getElementsByClassName("progress-container").item(0);

if (slider && progress) {
    let progressLength = progressContainer.clientWidth - progress.clientWidth;

    slider.addEventListener('scroll', function () {

        let move = (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * progressLength;
        move = Math.max(0, Math.min(move, progressLength));
        
        progress.style.left = `${Math.abs(move)}px`;
    });
}