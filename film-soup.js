let FilmSoupimageUrls = [
    'https://www.dropbox.com/scl/fi/xq0pzoxkoq8tkrthxedgv/2048_NoBorder-009-2.jpg?rlkey=jgm6f3ca3mmc645755abnwkjx&st=40xx79we&raw=1',
    'https://www.dropbox.com/scl/fi/ip03u64ieoui5dubb00uu/Edited_noBorder2-014.jpg?rlkey=rrdvz48lbncyng1b8ml6h0sqf&st=8v9q6l4c&raw=1',
    'https://www.dropbox.com/scl/fi/ws62p8hnl001wvl4p13ey/2048_NoBorder-019.jpg?rlkey=bad2vxnk1ji6xvjvhos53vgka&st=tzj5iqz4&raw=1',
    'https://www.dropbox.com/scl/fi/tza4zm2hdmq7w5r0ed1k0/2048_NoBorder-010.jpg?rlkey=enl8w8of3qa3q09po72qyb7ni&st=agrkl0nx&raw=1',
    'https://www.dropbox.com/scl/fi/fhtfcqsa0etypl84soxty/2048_NoBorder-008-2.jpg?rlkey=qv6k6hqzdyhzpsj2idnvqzizn&st=r9c1u54v&raw=1',
    'https://www.dropbox.com/scl/fi/2418bo4ku4qdmi6kysfu2/2048_NoBorder-005-3.jpg?rlkey=mt710d8bol6tzkr3av3r62mj9&st=m2u31axi&raw=1',
    'https://www.dropbox.com/scl/fi/bcqrgdbnuac7686k7970d/2048_NoBorder-011.jpg?rlkey=59e6ftlpsvdc9vbhgpwdzs96u&st=tj2zjh3y&raw=1',
    'https://www.dropbox.com/scl/fi/bjx2t7ktnyx02qvcnjt68/2048_NoBorder-001.jpg?rlkey=hn89ynz6exxfshcxfhb9rte2h&st=aza72diz&raw=1',
    'https://www.dropbox.com/scl/fi/200yd4ny9ozxudgx1my26/Edited_noBorder2-016.jpg?rlkey=9g7np1lqi7d2edovryhvvdsdz&st=9rxw8vd3&raw=1',
    'https://www.dropbox.com/scl/fi/a3dg2w7cnkvnthbvvfinn/Edited_noBorder2-007.jpg?rlkey=8nkyccexkpq8kti0y32fcsdv9&st=h1t83k2i&raw=1'
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
    const horizontalImageGrid = document.getElementById('horizontal-filmSoup-image-grid');
    const verticalImageGrid = document.getElementById('vertical-filmSoup-image-grid');

    if (!horizontalImageGrid || !verticalImageGrid) {
        console.error("Grid containers not found. Check the IDs in HTML.");
        return;
    }

    // Clear grids before adding new images
    horizontalImageGrid.innerHTML = '';
    verticalImageGrid.innerHTML = '';

    const fragmentHorizontal = document.createDocumentFragment();
    const fragmentVertical = document.createDocumentFragment();

    // Check image orientations
    const orientationChecks = FilmSoupimageUrls.map(url => checkImageOrientation(url));
    const orientations = await Promise.all(orientationChecks);

    // Create image elements
    for (let i = 0; i < FilmSoupimageUrls.length; i++) {
        const url = FilmSoupimageUrls[i];
        const isHorizontal = orientations[i];

        const div = document.createElement('div');
        div.className = 'filmSoup-image-item';
        div.onclick = () => openfilmSoupmodal(url);

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Image ${i + 1}`;

        div.appendChild(img);

        if (isHorizontal) {
            div.classList.add('horizontal-filmSoup-image-item');
            fragmentHorizontal.appendChild(div);
        } else {
            div.classList.add('vertical-filmSoup-image-item');
            fragmentVertical.appendChild(div);
        }
    }

    // Append image items to their respective grids
    horizontalImageGrid.appendChild(fragmentHorizontal);
    verticalImageGrid.appendChild(fragmentVertical);

    if (window.gatherImages) {
        window.gatherImages();
    }
}

createImageElements();
