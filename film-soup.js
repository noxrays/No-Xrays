window.filmSoup = (function() {
    let currentImageIndex = 0;

    function initialize() {
        const imageUrls = [
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
            const horizontalImageGrid = document.getElementById('horizontal-image-grid');
            const verticalImageGrid = document.getElementById('vertical-image-grid');
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
                div.onclick = () => openfilmSoupmodal(url);
    
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
        }
/*         function openfilmSoupmodal(imageUrl) {
            const filmSoupmodalImg = document.getElementById('filmSoupmodalImg');
            filmSoupmodalImg.src = imageUrl;
            filmSoupmodalImg.onload = () => {
                adjustImageSize(filmSoupmodalImg);
            };
            document.getElementById('myfilmSoupmodal').style.display = 'block';
            currentImageIndex = imageUrls.indexOf(imageUrl);
            document.addEventListener('keydown', handleKeyPress);
            document.addEventListener('click', handleClickOutside);
            updatefilmSoupDots();
        }

        function closefilmSoupmodal() {
            document.getElementById('myfilmSoupmodal').style.display = 'none';
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('click', handleClickOutside);
        }

        function handleKeyPress(event) {
            if (event.key === 'Escape') {
                closefilmSoupmodal();
            } else if (event.key === 'ArrowLeft') {
                navigateImage(-1);
            } else if (event.key === 'ArrowRight') {
                navigateImage(1);
            }
        }

        function handleClickOutside(event) {
            const filmSoupmodal = document.getElementById('myfilmSoupmodal');
            if (event.target === filmSoupmodal) {
                closefilmSoupmodal();
            }
        }

        function navigateImage(direction) {
            currentImageIndex += direction;
            if (currentImageIndex < 0) {
                currentImageIndex = imageUrls.length - 1;
            } else if (currentImageIndex >= imageUrls.length) {
                currentImageIndex = 0;
            }
            const filmSoupmodalImg = document.getElementById('filmSoupmodalImg');
            filmSoupmodalImg.src = imageUrls[currentImageIndex];
            filmSoupmodalImg.onload = () => {
                adjustImageSize(filmSoupmodalImg);
            };
            updatefilmSoupDots();
        }

        function updatefilmSoupDots() {
            const filmSoupdotsContainer = document.getElementById('filmSoupdots-container');
            filmSoupdotsContainer.innerHTML = '';

            for (let i = 0; i < imageUrls.length; i++) {
                const filmSoupdot = document.createElement('span');
                filmSoupdot.className = 'filmSoupdot';
                if (i === currentImageIndex) {
                    filmSoupdot.classList.add('active');
                }
                filmSoupdot.onclick = function () {
                    currentImageIndex = i;
                    const filmSoupmodalImg = document.getElementById('filmSoupmodalImg');
                    filmSoupmodalImg.src = imageUrls[currentImageIndex];
                    filmSoupmodalImg.onload = () => {
                        adjustImageSize(filmSoupmodalImg);
                    };
                    updatefilmSoupDots();
                };
                filmSoupdotsContainer.appendChild(filmSoupdot);
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
    filmSoup.initialize();
});

return { initialize };
})();

