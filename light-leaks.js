window.lightLeaks = (function() {
    let currentImageIndex = 0;

    function initialize() {

const imageUrls = [
            'https://www.dropbox.com/scl/fi/0in1j30ybtid0bsr9655t/0002422_0002422-R1-012-4A.jpg?rlkey=51u4wgy11wi1w25vvnc47osg7&st=wkv48zyo&raw=1',
'https://www.dropbox.com/scl/fi/4f5sqve1afscme1aesfhk/Edited_noBorder2-002.jpg?rlkey=911qfhdpni9lqhogf9nrs58zd&st=4u4gwxpz&raw=1'
];

async function checkImageOrientation(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const isHorizontal = img.naturalWidth >= img.naturalHeight;
            resolve(isHorizontal);
        };
        img.onerror = reject;
    });
}

async function createImageElements() {
    const imageGrid = document.getElementById('light-leaks-image-grid');
    imageGrid.innerHTML = '';

    try {
        const images = await Promise.all(imageUrls.map(url => loadImage(url)));
        images.forEach((img, index) => {
            const div = document.createElement('div');
            div.className = 'image-item';
            div.onclick = () => openlightLeaksModal(imageUrls[index]);

            img.alt = `Image ${index + 1}`;
            div.appendChild(img);
            imageGrid.appendChild(div);
        });
    } catch (error) {
        console.error('Failed to load one or more images:', error);
    }
}

/* async function createImageElements() {
    const horizontalImageGrid = document.getElementById('light-leaks-horizontal-image-grid');
    const verticalImageGrid = document.getElementById('light-leaks-vertical-image-grid');
    horizontalImageGrid.innerHTML = '';
    verticalImageGrid.innerHTML = '';

    const fragmentHorizontal = document.createDocumentFragment();
    const fragmentVertical = document.createDocumentFragment();

    // Check image orientations
    const orientationChecks = imageUrls.map(url => checkImageOrientation(url));
    const orientations = await Promise.all(orientationChecks);

    // Create image elements
    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const isHorizontal = orientations[i];

        const div = document.createElement('div');
        div.className = 'image-item';
        div.onclick = () => openlightLeaksModal(url);

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Image ${i + 1}`;

        div.appendChild(img);

        if (isHorizontal) {
            div.className += ' horizontal-image-item';
            fragmentHorizontal.appendChild(div);
        } else {
            div.className += ' vertical-image-item';
            fragmentVertical.appendChild(div);
        }
    }

    horizontalImageGrid.appendChild(fragmentHorizontal);
    verticalImageGrid.appendChild(fragmentVertical);
} */
/* function openlightLeaksModal(imageUrl) {
    const lightLeaksmodalImg = document.getElementById('lightLeaksmodalImg');
    lightLeaksmodalImg.src = imageUrl;
    lightLeaksmodalImg.onload = () => {
        adjustImageSize(lightLeaksmodalImg);
    };
    document.getElementById('mylightLeaksModal').style.display = 'block';
    currentImageIndex = imageUrls.indexOf(imageUrl);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClickOutside);
    updateDots();
}

function closelightLeaksModal() {
    document.getElementById('mylightLeaksModal').style.display = 'none';
    document.removeEventListener('keydown', handleKeyPress);
    document.removeEventListener('click', handleClickOutside);
}

function handleKeyPress(event) {
    if (event.key === 'Escape') {
        closelightLeaksModal();
    } else if (event.key === 'ArrowLeft') {
        navigateImage(-1);
    } else if (event.key === 'ArrowRight') {
        navigateImage(1);
    }
}

function handleClickOutside(event) {
    const lightLeaksmodal = document.getElementById('mylightLeaksModal');
    if (event.target === lightLeaksmodal) {
        closelightLeaksModal();
    }
}

function navigateImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = imageUrls.length - 1;
    } else if (currentImageIndex >= imageUrls.length) {
        currentImageIndex = 0;
    }
    const lightLeaksmodalImg = document.getElementById('lightLeaksmodalImg');
    lightLeaksmodalImg.src = imageUrls[currentImageIndex];
    lightLeaksmodalImg.onload = () => {
        adjustImageSize(lightLeaksmodalImg);
    };
    updateDots();
}

function updateDots() {
    const dotsContainer = document.getElementById('dots-container');
    dotsContainer.innerHTML = '';

    for (let i = 0; i < imageUrls.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === currentImageIndex) {
            dot.classList.add('active');
        }
        dot.onclick = function () {
            currentImageIndex = i;
            const lightLeaksmodalImg = document.getElementById('lightLeaksmodalImg');
            lightLeaksmodalImg.src = imageUrls[currentImageIndex];
            lightLeaksmodalImg.onload = () => {
                adjustImageSize(lightLeaksmodalImg);
            };
            updateDots();
        };
        dotsContainer.appendChild(dot);
    }
}

function adjustImageSize(img) {
    const maxWidth = window.innerWidth * 0.85;
    const maxHeight = window.innerHeight * 0.85;
    const widthRatio = maxWidth / img.naturalWidth;
    const heightRatio = maxHeight / img.naturalHeight;
    const scale = Math.min(widthRatio, heightRatio);

    img.style.width = img.naturalWidth * scale + 'px';
    img.style.height = img.naturalHeight * scale + 'px';
} */

// Call the function to create the image elements when the script loads
createImageElements();
}


document.addEventListener('DOMContentLoaded', () => {
lightLeaks.initialize();
});

return { initialize };
})();

