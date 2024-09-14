// modal.js

const Modal = (function() {
    let currentImageIndex = 0;
    let imageUrls = [];
    let modalImgElement = null;
    let dotsContainer = null;

    function init(imgUrls, modalImgId, dotsContainerId) {
        imageUrls = imgUrls;
        modalImgElement = document.getElementById(modalImgId);
        dotsContainer = document.getElementById(dotsContainerId);

        document.addEventListener('keydown', handleKeyPress);
    }

    function openModal(index) {
        currentImageIndex = index;
        const modal = document.querySelector('.modal');
        modalImgElement.src = imageUrls[currentImageIndex];
        modal.style.display = 'block';
        updateDots();
    }

    function closeModal() {
        const modal = document.querySelector('.modal');
        modal.style.display = 'none';
    }

    function navigateImage(direction) {
        currentImageIndex = (currentImageIndex + direction + imageUrls.length) % imageUrls.length;
        modalImgElement.src = imageUrls[currentImageIndex];
        updateDots();
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

    function updateDots() {
        dotsContainer.innerHTML = '';
        imageUrls.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (index === currentImageIndex ? ' active' : '');
            dot.onclick = () => openModal(index);
            dotsContainer.appendChild(dot);
        });
    }

    return {
        init,
        openModal,
        closeModal,
        navigateImage,
    };
})();
