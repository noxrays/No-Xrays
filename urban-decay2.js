let UrbanDecaycurrentImageIndex = 0;

const UrbanDecayimageUrls = [
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
    const imageGrid = document.getElementById('UrbanDecay-image-grid');
    imageGrid.innerHTML = '';

    try {
        const images = await Promise.all(UrbanDecayimageUrls.map(url => loadImage(url)));
        images.forEach((img, index) => {
            const div = document.createElement('div');
            div.className = 'UrbanDecay-image-item';
            img.alt = `Image ${index + 1}`;

            // Removed the onclick assignment to avoid conflict with modal.js
            // img.onclick = () => openModal(UrbanDecayimageUrls[index]);

            div.appendChild(img);
            imageGrid.appendChild(div);
        });
        // After images are created, call gatherImages
        if (window.gatherImages) {
            window.gatherImages();
        }
    } catch (error) {
        console.error('Failed to load one or more images:', error);
    }
}

createImageElements();
