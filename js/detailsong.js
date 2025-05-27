// Audio Player JavaScript
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');

let isPlaying = false;
let isDragging = false;

// Format time helper function
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}


// Demo mode variables
let demoTime = 106; // 1:46 in seconds
let demoInterval;
let demoDuration = 220; // 3:40 in seconds

function startDemoMode() {
    isPlaying = true;
    updatePlayButton();
    
    demoInterval = setInterval(() => {
        demoTime++;
        if (demoTime >= demoDuration) {
            demoTime = 0;
            isPlaying = false;
            updatePlayButton();
            clearInterval(demoInterval);
            return;
        }
        currentTimeEl.textContent = formatTime(demoTime);
        progressFill.style.width = `${(demoTime / demoDuration) * 100}%`;
    }, 1000);
}

function stopDemoMode() {
    isPlaying = false;
    updatePlayButton();
    if (demoInterval) {
        clearInterval(demoInterval);
    }
}

// Play/Pause functionality
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        if (audio.duration) {
            audio.pause();
        } else {
            stopDemoMode();
        }
    } else {
        if (audio.readyState >= 2) { // Audio is loaded
            audio.play().catch(e => {
                console.log('Audio play failed, using demo mode:', e);
                startDemoMode();
            });
        } else {
            // Audio not loaded, use demo mode
            startDemoMode();
        }
    }
});

// Audio event listeners
audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
    // Reset to actual audio values when loaded
    currentTimeEl.textContent = formatTime(audio.currentTime);
    progressFill.style.width = '0%';
});

audio.addEventListener('play', () => {
    isPlaying = true;
    updatePlayButton();
    // Stop demo mode if audio actually plays
    if (demoInterval) {
        clearInterval(demoInterval);
    }
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayButton();
});

audio.addEventListener('timeupdate', () => {
    if (!isDragging && audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${progress}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayButton();
    if (!repeatBtn.classList.contains('active')) {
        progressFill.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    }
});

// Update play button icon
function updatePlayButton() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// Progress bar interaction
progressBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateProgress(e);
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        updateProgress(e);
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

function updateProgress(e) {
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    
    if (audio.duration) {
        audio.currentTime = percent * audio.duration;
    } else {
        // Demo mode
        demoTime = percent * demoDuration;
        currentTimeEl.textContent = formatTime(demoTime);
    }
    
    progressFill.style.width = `${percent * 100}%`;
}

// Control buttons
prevBtn.addEventListener('click', () => {
    if (audio.duration) {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    } else {
        demoTime = Math.max(0, demoTime - 10);
        currentTimeEl.textContent = formatTime(demoTime);
        progressFill.style.width = `${(demoTime / demoDuration) * 100}%`;
    }
});

nextBtn.addEventListener('click', () => {
    if (audio.duration) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    } else {
        demoTime = Math.min(demoDuration, demoTime + 10);
        currentTimeEl.textContent = formatTime(demoTime);
        progressFill.style.width = `${(demoTime / demoDuration) * 100}%`;
    }
});

//repeat button states
let isRepeated = false;
repeatBtn.addEventListener('click', () => {
    isRepeated = !isRepeated;
    repeatBtn.classList.toggle('active', isRepeated);
    if (audio.duration) {
        audio.loop = isRepeated;
    }
});

// Touch support for mobile
progressBar.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    updateProgress(touch);
    e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const touch = e.touches[0];
        updateProgress(touch);
        e.preventDefault();
    }
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            playBtn.click();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            prevBtn.click();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextBtn.click();
            break;
    }
});