
    let currentImageIndex = 0;

const imageUrls = [
    'https://www.dropbox.com/scl/fi/j89tea51wvz78t7yacpoj/2048_NoBorder-009.jpg?rlkey=u7ygx561v8gvx5lfiaclr5gaq&st=fo3zms3t&raw=1',
    'https://www.dropbox.com/scl/fi/dvfl4jh7cej1ei7bnwe2n/2048_NoBorder-008.jpg?rlkey=9965scgcjc82n28epodfnbmlb&st=fm480tvn&raw=1',
    'https://www.dropbox.com/scl/fi/qwpp3thz2wdhs52s1b7x0/2048_NoBorder-005.jpg?rlkey=2q4e0q5sxzms7qbrkg28d0y42&st=o03ygzlo&raw=1',
    'https://www.dropbox.com/scl/fi/rnpm0fb0c3qkqlfajref5/2048_NoBorder-31.jpg?rlkey=2vdsz2kjp9si9yyqaqlq2mfz0&st=4b43pa27&raw=1',
    'https://www.dropbox.com/scl/fi/oqujhrffvdloxps5r4jr4/6972042267-R1-031-14-1.jpg?rlkey=mdt595xq6773ib14cgwl6mowl&st=kofe3da6&raw=1',
    'https://www.dropbox.com/scl/fi/xd0w9ljf4r9l0s2oi5ohd/000011830004.jpg?rlkey=v875c328grgmwvzo8e902vbt6&st=k6a7lmyr&raw=1'
];

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Image load error'));
    });
}

async function createImageElements() {
    const imageGrid = document.getElementById('image-grid');
    imageGrid.innerHTML = '';

    try {
        const images = await Promise.all(imageUrls.map(url => loadImage(url)));
        images.forEach((img, index) => {
            const div = document.createElement('div');
            div.className = 'image-item';
            div.onclick = () => openurbanDecayModal(imageUrls[index]);

            img.alt = `Image ${index + 1}`;
            div.appendChild(img);
            imageGrid.appendChild(div);
        });
    } catch (error) {
        console.error('Failed to load one or more images:', error);
    }
}

function openurbanDecayModal(imageUrl) {
    const urbanDecaymodal = document.getElementById('myurbanDecayModal');
    const urbanDecaymodalImg = document.getElementById('urbanDecaymodalImg');

    urbanDecaymodalImg.src = imageUrl;
    urbanDecaymodalImg.onload = () => adjustImageSize(urbanDecaymodalImg);

    urbanDecaymodal.style.display = 'block';
    currentImageIndex = imageUrls.indexOf(imageUrl);
    document.addEventListener('keydown', handleKeyPress);
    updateurbanDecayDots();
}

function closeurbanDecayModal() {
    const urbanDecaymodal = document.getElementById('myurbanDecayModal');
    urbanDecaymodal.style.display = 'none';
    document.removeEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    if (event.key === 'Escape') {
        closeurbanDecayModal();
    } else if (event.key === 'ArrowLeft') {
        navigateImage(-1);
    } else if (event.key === 'ArrowRight') {
        navigateImage(1);
    }
}

function navigateImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = imageUrls.length - 1;
    } else if (currentImageIndex >= imageUrls.length) {
        currentImageIndex = 0;
    }
    const urbanDecaymodalImg = document.getElementById('urbanDecaymodalImg');
    urbanDecaymodalImg.src = imageUrls[currentImageIndex];
    urbanDecaymodalImg.onload = () => adjustImageSize(urbanDecaymodalImg);
    updateurbanDecayDots();
}

function updateurbanDecayDots() {
    const urbanDecaydotsContainer = document.getElementById('urbanDecaydots-container');
    urbanDecaydotsContainer.innerHTML = '';

    for (let i = 0; i < imageUrls.length; i++) {
        const urbanDecaydot = document.createElement('span');
        urbanDecaydot.className = 'urbanDecaydot';
        if (i === currentImageIndex) {
            urbanDecaydot.classList.add('active');
        }
        urbanDecaydot.onclick = function () {
            currentImageIndex = i;
            const urbanDecaymodalImg = document.getElementById('urbanDecaymodalImg');
            urbanDecaymodalImg.src = imageUrls[currentImageIndex];
            urbanDecaymodalImg.onload = () => adjustImageSize(urbanDecaymodalImg);
            updateurbanDecayDots();
        };
        urbanDecaydotsContainer.appendChild(urbanDecaydot);
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
}

createImageElements();
