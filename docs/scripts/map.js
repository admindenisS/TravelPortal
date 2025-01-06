const mapContainer = document.querySelector('.map-container');
const map = document.querySelector('.map');
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;
let scale = 1;
const scaleStep = 0.1;
const minScale = 1;
const maxScale = 3;

function initializeScroll() {
    const imgWidth = map.offsetWidth;
    const imgHeight = map.offsetHeight;
    const offsetX = imgWidth * 0.2;
    const offsetY = imgHeight * 0.2;
    mapContainer.scrollLeft = imgWidth - mapContainer.clientWidth + offsetX;
    mapContainer.scrollTop = imgHeight - mapContainer.clientHeight + offsetY;
}

function startDragging(e) {
    isDragging = true;
    startX = e.touches ? e.touches[0].pageX - map.offsetLeft : e.pageX - map.offsetLeft;
    startY = e.touches ? e.touches[0].pageY - map.offsetTop : e.pageY - map.offsetTop;
    scrollLeft = mapContainer.scrollLeft;
    scrollTop = mapContainer.scrollTop;
    mapContainer.style.cursor = 'grabbing';
}

function stopDragging() {
    isDragging = false;
    mapContainer.style.cursor = 'grab';
}

function dragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches ? e.touches[0].pageX - map.offsetLeft : e.pageX - map.offsetLeft;
    const y = e.touches ? e.touches[0].pageY - map.offsetTop : e.pageY - map.offsetTop;
    const walkX = (x - startX) * 1;
    const walkY = (y - startY) * 1;
    mapContainer.scrollLeft = scrollLeft - walkX;
    mapContainer.scrollTop = scrollTop - walkY;
}

mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = map.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const newScale = e.deltaY < 0 ? Math.min(scale + scaleStep, maxScale) : Math.max(scale - scaleStep, minScale);
    
    const scaleChange = newScale / scale;

    scale = newScale;
    map.style.transform = `scale(${scale})`;

    mapContainer.scrollLeft += (offsetX * (scaleChange - 1));
    mapContainer.scrollTop += (offsetY * (scaleChange - 1));
});

mapContainer.addEventListener('mousedown', startDragging);
mapContainer.addEventListener('mouseleave', stopDragging);
mapContainer.addEventListener('mouseup', stopDragging);
mapContainer.addEventListener('mousemove', dragMove);

mapContainer.addEventListener('touchstart', startDragging);
mapContainer.addEventListener('touchend', stopDragging);
mapContainer.addEventListener('touchmove', dragMove);

window.onload = initializeScroll;