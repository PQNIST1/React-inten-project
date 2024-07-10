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