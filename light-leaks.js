const LightLeaksimageUrls = [
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
    const singleGrid = document.getElementById('light-leaks-single-grid');
    singleGrid.innerHTML = '';

    const fragment = document.createDocumentFragment();

    // Check image orientations
    const orientationChecks = LightLeaksimageUrls.map(url => checkImageOrientation(url));
    const orientations = await Promise.all(orientationChecks);

    // Create image elements
    for (let i = 0; i < LightLeaksimageUrls.length; i++) {
        const url = LightLeaksimageUrls[i];
        const isHorizontal = orientations[i];

        const div = document.createElement('div');
        div.className = 'light-leaks-image-item'; // Ensure class name matches CSS

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Image ${i + 1}`;

        div.appendChild(img);
        fragment.appendChild(div);
    }

    singleGrid.appendChild(fragment);

    if (window.gatherImages) {
        window.gatherImages();
    }
}

// Call the function to create the image elements when the script loads
createImageElements();
