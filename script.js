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

 const audio = document.getElementById('audio-player');
        const canvas = document.getElementById('visualizer');
        const ctx = canvas.getContext('2d');

        // Tải hình ảnh nền anime
        const backgroundImage = new Image();
        backgroundImage.src = ''; // Thay bằng đường dẫn đến hình ảnh anime của bạn

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

                // Vẽ hình ảnh nền anime
                ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

                // Clear canvas with a semi-transparent background for fading effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // thêm độ trong suốt để tạo hiệu ứng fade
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / bufferLength) * 2.5;
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];

                    // Tạo gradient cho mỗi thanh
                    const gradient = ctx.createLinearGradient(0, canvas.height - barHeight / 2, 0, canvas.height);
                    gradient.addColorStop(0, `rgb(${barHeight + 100}, 50, 150)`);
                    gradient.addColorStop(1, `rgb(${barHeight + 50}, 100, 255)`);

                    ctx.fillStyle = gradient;
                    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

                    x += barWidth + 1;
                }
            }

            draw();
        });


const fileInput = document.getElementById('file-input');
const audioPlayer = document.getElementById('audio-player');

fileInput.addEventListener('change', function () {
    const file = this.files[0];
    
    if (file) {
        const audioURL = URL.createObjectURL(file);
        audioPlayer.src = audioURL;
        audioPlayer.play(); // Tự động phát file khi người dùng chọn
    }
});

