// modal.js

let currentImageIndex = 0;
let imageUrls = []; // This will be populated dynamically

function openModal(imageUrl) {
    const modalImg = document.getElementById('modalImg');
    modalImg.src = imageUrl;
    modalImg.onload = () => {
        adjustImageSize(modalImg);
    };
    document.getElementById('myModal').style.display = 'block';
    currentImageIndex = imageUrls.indexOf(imageUrl);
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClickOutside);
    updateDots();
}

function closeModal() {
    console.log('Closing modal');
    document.getElementById('myModal').style.display = 'none';
    document.removeEventListener('keydown', handleKeyPress);
    document.removeEventListener('click', handleClickOutside);
}

function handleKeyPress(event) {
    if (event.key === 'Escape') {
        closeModal();
    } else if (event.key === 'ArrowLeft') {
        navigateImage(-1);
    } else if (event.key === 'ArrowRight') {
        navigateImage(1);
    }
}

function handleClickOutside(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}

function navigateImage(direction) {
    if (imageUrls.length === 0) {
        console.error("No images available to navigate.");
        return;
    }
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = imageUrls.length - 1;
    } else if (currentImageIndex >= imageUrls.length) {
        currentImageIndex = 0;
    }
    const modalImg = document.getElementById('modalImg');
    modalImg.src = imageUrls[currentImageIndex];
    modalImg.onload = () => {
        adjustImageSize(modalImg);
    };
    updateDots();
}

// Update navigation dots in the modal
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
            const modalImg = document.getElementById('modalImg');
            modalImg.src = imageUrls[currentImageIndex];
            modalImg.onload = () => {
                adjustImageSize(modalImg);
            };
            updateDots();
        };
        dotsContainer.appendChild(dot);
    }
}

// Adjust image size to fit in the modal
function adjustImageSize(img) {
    const maxWidth = window.innerWidth * 0.85;
    const maxHeight = window.innerHeight * 0.85;
    const widthRatio = maxWidth / img.naturalWidth;
    const heightRatio = maxHeight / img.naturalHeight;
    const scale = Math.min(widthRatio, heightRatio);

    img.style.width = img.naturalWidth * scale + 'px';
    img.style.height = img.naturalHeight * scale + 'px';
}

// Expose gatherImages globally
window.gatherImages = function() {
    const images = document.querySelectorAll('img');
    // Filter only Dropbox URLs
    imageUrls = Array.from(images)
        .map(img => img.src)
        .filter(src => src.includes("dropbox.com")); // Ensure only Dropbox URLs are gathered

    console.log('Gathered image URLs:', imageUrls);
    images.forEach(img => {
        // Add click handler only for Dropbox images
        if (img.src.includes("dropbox.com")) {
            img.onclick = () => openModal(img.src);
        }
    });
}
