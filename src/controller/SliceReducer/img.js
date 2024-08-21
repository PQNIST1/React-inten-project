export const ImgController = (imgData) => {
    const binaryString = atob(imgData);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
}

export const ImgFileController = (imgData) => {
    const binaryString = atob(imgData);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    return file;
}


export const splitDateTime = (dateTimeString) => {
    const [date, timeWithSeconds] = dateTimeString.split('T');
    const time = timeWithSeconds.split('.')[0].slice(0, 5); // Lấy giờ và phút
    return `${date} ${time}`;
}


export const formatDate = (inputDateStr) => {
    // Tạo đối tượng Date từ chuỗi ngày tháng ban đầu
    const inputDate = new Date(inputDateStr);

    // Trích xuất ngày, tháng và năm từ đối tượng Date
    const day = inputDate.getDate().toString().padStart(2, '0'); // Lấy ngày và format thành 2 chữ số
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (phải cộng thêm 1 vì index bắt đầu từ 0)
    const year = inputDate.getFullYear();

    // Tạo chuỗi định dạng mới
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
};

export const transformData = (data) => {
    const result = {};

    // Chuyển đổi dữ liệu thành định dạng mong muốn
    data.forEach(item => {
        const startDate = new Date(item.object.startTime);
        const dateStr = startDate.toISOString().split('T')[0];
        const timeStr = startDate.toTimeString().split(' ')[0].slice(0, 5); // Lấy giờ và phút

        // Khởi tạo mảng nếu chưa tồn tại cho ngày hiện tại
        if (!result[dateStr]) {
            result[dateStr] = [];
        }

        // Thêm thời gian chiếu và phòng vào mảng của ngày tương ứng
        result[dateStr].push({ time: timeStr, room: item.object.room.id, name: item.object.room.name, id: item.object.id });
    });

    // Sắp xếp thời gian trong mỗi ngày
    for (const date in result) {
        result[date].sort((a, b) => {
            const [aHour, aMinute] = a.time.split(':').map(Number);
            const [bHour, bMinute] = b.time.split(':').map(Number);
            return aHour - bHour || aMinute - bMinute;
        });
    }

    // Trả về đối tượng theo định dạng mong muốn
    return result;
};

export const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
};

export const url = 'http://localhost:8080/api/v1/';
export const imageUrl = 'http://localhost:8080';