// Auto-changing album images
const albumImages = [
    '/asset/banner5.jpg',
    '/asset/banner2.jpeg',
    '/asset/banner3.jpg',
];

let currentAlbumIndex = 0;
const albumImage = document.getElementById('albumImage');

function changeAlbumImage() {
    albumImage.style.opacity = '0';
    
    setTimeout(() => {
        currentAlbumIndex = (currentAlbumIndex + 1) % albumImages.length;
        albumImage.src = albumImages[currentAlbumIndex];
        albumImage.style.opacity = '1';
    }, 250);
}

// Auto-change album every 3 seconds
setInterval(changeAlbumImage, 3000);

// Carousel functionality with 3 cards max
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Data untuk carousel
const carouselData = [
    {
        title: 'Trending Hits',
        image: '/asset/kpop1.jpg'
    },
    {
        title: 'Chill Vibes',
        image: '/asset/rnb1.jpg'
    },
    {
        title: 'Rock Classics',
        image: '/asset/rnb5.jpeg'
    },
    {
        title: 'Jazz Collection',
        image: '/asset/pop1.jpeg'
    },
    {
        title: 'Electronic Beats',
        image: '/asset/kpop2.png'
    }
];

let currentStartIndex = 0;
const maxVisibleCards = 3;
let isTransitioning = false;

function calculateCardWidth() {
    const containerWidth = document.querySelector('.carousel-wrapper').offsetWidth;
    const gap = 16;
    const totalGaps = (maxVisibleCards - 1) * gap;
    const cardWidth = (containerWidth - totalGaps) / maxVisibleCards;
    return Math.max(cardWidth, 200);
}

function createCarousel() {
    carouselTrack.innerHTML = '';
    
    const visibleItems = [];
    for (let i = 0; i < maxVisibleCards; i++) {
        const index = (currentStartIndex + i) % carouselData.length;
        visibleItems.push(carouselData[index]);
    }
    
    const cardWidth = calculateCardWidth();
    
    visibleItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.style.width = `${cardWidth}px`;
        card.style.backgroundImage = `url(${item.image})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.innerHTML = `
            <div class="card-overlay">
                <span class="card-text">${item.title}</span>
            </div>
        `;
        carouselTrack.appendChild(card);
    });
    
    carouselTrack.style.transform = 'translateX(0px)';
}

function rotateCarousel(direction) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    const cardWidth = calculateCardWidth() + 16;
    
    if (direction === 'next') {
        carouselTrack.style.transition = 'transform 0.3s ease';
        carouselTrack.style.transform = `translateX(-${cardWidth}px)`;
        
        setTimeout(() => {
            currentStartIndex = (currentStartIndex + 1) % carouselData.length;
            carouselTrack.style.transition = 'none';
            createCarousel();
            isTransitioning = false;
        }, 300);
        
    } else {
        currentStartIndex = (currentStartIndex - 1 + carouselData.length) % carouselData.length;
        carouselTrack.style.transition = 'none';
        createCarousel();
        carouselTrack.style.transform = `translateX(-${cardWidth}px)`;
        
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.3s ease';
            carouselTrack.style.transform = 'translateX(0px)';
            
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }, 10);
    }
}

// Event listeners
prevBtn.addEventListener('click', () => rotateCarousel('prev'));
nextBtn.addEventListener('click', () => rotateCarousel('next'));

createCarousel();

// Responsive handling
function handleResize() {
    createCarousel();
}

window.addEventListener('resize', handleResize);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        rotateCarousel('prev');
    } else if (e.key === 'ArrowRight') {
        rotateCarousel('next');
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    handleResize();
});