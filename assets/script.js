document.addEventListener('DOMContentLoaded', () => {
    const checkButton = document.getElementById('check-speed');
    const speedValue = document.getElementById('speed-value');
    const latencyValue = document.getElementById('latency-value');
    const pingValue = document.getElementById('ping-value');
    const strengthValue = document.getElementById('strength-value');
    const canvas = document.getElementById('speedMeter');
    const ctx = canvas.getContext('2d');

    checkButton.addEventListener('click', () => {
        fetchSpeedTestData().then(data => {
            const speedMbps = (data.results.downloadspeed / 1024).toFixed(2);
            const latency = data.results.ping;
            const ping = data.results.ping;

            speedValue.textContent = `${speedMbps} Mbps`;
            latencyValue.textContent = `${latency}`;
            pingValue.textContent = `${ping}`;

            let strength = 'Unknown';
            if (speedMbps >= 50) {
                strength = 'Great';
                drawMeter(ctx, speedMbps, 'green');
            } else if (speedMbps >= 10) {
                strength = 'Good';
                drawMeter(ctx, speedMbps, 'yellow');
            } else {
                strength = 'Bad';
                drawMeter(ctx, speedMbps, 'red');
            }

            strengthValue.textContent = strength;
        }).catch(error => {
            console.error('Error fetching speed test data:', error);
        });
    });

    function fetchSpeedTestData() {
        return fetch('https://api.speedtest.net/api/js/speedtest?callback=onResult')
            .then(response => response.json());
    }

    function drawMeter(ctx, value, color) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = color;
        ctx.fillRect(0, canvas.height - value, canvas.width, value);

        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`${value} Mbps`, 10, 30);
    }
});
