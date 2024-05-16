document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const caption = document.querySelector('.caption');
    const closeButton = document.querySelector('.close');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            currentIndex = index;
            openLightbox(thumbnail.src, thumbnail.alt);
        });
    });

    function openLightbox(imageSrc, imageAlt) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        caption.textContent = `${currentIndex + 1} of ${thumbnails.length}`;
        lightbox.style.display = 'flex';
    }

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        const prevImageSrc = thumbnails[currentIndex].src;
        const prevImageAlt = thumbnails[currentIndex].alt;
        openLightbox(prevImageSrc, prevImageAlt);
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        const nextImageSrc = thumbnails[currentIndex].src;
        const nextImageAlt = thumbnails[currentIndex].alt;
        openLightbox(nextImageSrc, nextImageAlt);
    }

    // Close lightbox when clicking outside of the image
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(event) {
        if (lightbox.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            } else if (event.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});
