// Khởi tạo dữ liệu mẫu
let blacklistData = [
    { id: 1, target: "192.168.1.105", type: "IP", reason: "Tấn công DDOS", date: "2023-10-24" },
    { id: 2, target: "spammer_99", type: "User", reason: "Spam tin nhắn rác", date: "2023-10-25" },
    { id: 3, target: "malicious-site.com", type: "Domain", reason: "Chứa mã độc / Phishing", date: "2023-10-26" },
    { id: 4, target: "0912345678", type: "Phone", reason: "Lừa đảo chiếm đoạt tài sản", date: "2023-10-27" }
];

// Lấy các DOM Element
const tableBody = document.getElementById("blacklist-table-body");
const totalCountElement = document.getElementById("total-count");
const addForm = document.getElementById("add-blacklist-form");
const searchInput = document.getElementById("search-input");
const filterTypeSelect = document.getElementById("filter-type");

// Hàm hiển thị danh sách
function renderTable(data) {
    tableBody.innerHTML = "";
    
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #888;">Không tìm thấy dữ liệu phù hợp</td></tr>`;
        return;
    }

    data.forEach(item => {
        const row = document.createElement("tr");

        // Tạo badge màu tương ứng theo loại
        let badgeClass = `badge-${item.type.toLowerCase()}`;

        row.innerHTML = `
            <td>#${item.id}</td>
            <td><strong>${item.target}</strong></td>
            <td><span class="badge ${badgeClass}">${item.type}</span></td>
            <td>${item.reason}</td>
            <td>${item.date}</td>
            <td>
                <button class="btn btn-delete" onclick="deleteItem(${item.id})">
                    <i class="fa-solid fa-trash"></i> Xóa
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Cập nhật số lượng
    totalCountElement.innerText = blacklistData.length;
}

// Hàm thêm item mới
addForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const target = document.getElementById("target-name").value.trim();
    const type = document.getElementById("target-type").value;
    const reason = document.getElementById("target-reason").value.trim();
    
    // Ngày hiện tại (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    const newItem = {
        id: Date.now(), // Sử dụng timestamp làm ID duy nhất
        target: target,
        type: type,
        reason: reason,
        date: today
    };

    blacklistData.unshift(newItem); // Thêm vào đầu mảng
    renderTable(blacklistData);
    
    // Reset Form
    addForm.reset();
});

// Hàm xóa item khỏi blacklist
function deleteItem(id) {
    if (confirm("Bạn có chắc chắn muốn bỏ đối tượng này khỏi Danh Sách Đen?")) {
        blacklistData = blacklistData.filter(item => item.id !== id);
        filterAndSearch(); // Cập nhật lại danh sách hiển thị
    }
}

// Hàm Tìm kiếm & Lọc dữ liệu
function filterAndSearch() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const filterType = filterTypeSelect.value;

    const filteredData = blacklistData.filter(item => {
        const matchesSearch = item.target.toLowerCase().includes(searchValue) || 
                              item.reason.toLowerCase().includes(searchValue);
        const matchesType = (filterType === "ALL") || (item.type === filterType);

        return matchesSearch && matchesType;
    });

    renderTable(filteredData);
}

// Lắng nghe sự kiện Tìm kiếm và Lọc
searchInput.addEventListener("input", filterAndSearch);
filterTypeSelect.addEventListener("change", filterAndSearch);

// Khởi chạy khi tải trang
renderTable(blacklistData);
