// Lightbox functionality
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Audio Visualizer
const audio = document.getElementById('audio-player');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

audio.addEventListener('play', function () {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = '#f1f1f1';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
    }

    draw();
});

// Floating Hearts
const heartContainer = document.getElementById('heart-container');
const heartButton = document.getElementById('heart-button');

heartButton.addEventListener('click', createHeart);

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000); // Remove heart after 5 seconds
}

// Personalized Greeting
function personalizedGreeting() {
    const greetingText = document.getElementById('greeting');
    const hours = new Date().getHours();
    
    let greeting = '';
    if (hours < 12) {
        greeting = 'Chào buổi sáng! Chúc bạn một ngày tuyệt vời!';
    } else if (hours < 18) {
        greeting = 'Chào buổi chiều! Hy vọng bạn đang có một buổi chiều vui vẻ!';
    } else {
        greeting = 'Chào buổi tối! Bạn đã nhớ ai chưa?';
    }
    
    greetingText.textContent = greeting;
}

window.onload = personalizedGreeting;
