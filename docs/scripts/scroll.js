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

if (window.matchMedia("(pointer: fine)").matches) {
    const container = document.querySelector('#images');

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return; 
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
}