// 1. Hiển thị thời gian gia nhập (Thời gian hiện tại)
function setJoinTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString() + ' - ' + now.toLocaleDateString();
    document.getElementById('time-join').innerText = timeString;
}

// 2. Lấy địa chỉ IP thật của thiết bị người dùng
async function fetchUserIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('user-ip').innerText = data.ip;
    } catch (error) {
        document.getElementById('user-ip').innerText = '192.168.1.1 (Hidden)';
    }
}

// 3. Xử lý đồng hồ đếm ngược 60 phút (3600 giây)
function startCountdown(durationInSeconds) {
    let timer = durationInSeconds;
    const timerElement = document.getElementById('countdown-timer');

    const interval = setInterval(function () {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        // Định dạng hiển thị kiểu 09:05
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

        timerElement.innerText = `${displayMinutes}:${displaySeconds}`;

        // Khi thời gian về 0
        if (--timer < 0) {
            clearInterval(interval);
            timerElement.innerText = "00:00";
            timerElement.style.color = "#ff4757"; // Đổi sang màu đỏ
            alert("Maintenance complete! You can refresh the page.");
        }
    }, 1000);
}

// Khởi chạy các chức năng khi vào trang
window.onload = function () {
    setJoinTime();
    fetchUserIP();
    startCountdown(60 * 60); // 60 phút = 3600 giây
};
