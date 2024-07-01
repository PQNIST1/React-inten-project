const dataPreview = {
  title: 'giới thiệu',
  items: [
    { title: 'về chúng tôi', content: 'Content for child 1' },
    { title: 'Thoả Thuận Sử Dụng', content: 'Content for child 2' },
    { title: 'Quy Chế Hoạt Động', content: 'Content for child 3' },
    { title: 'Chính Sách Bảo Mật', content: 'Content for child 4' },
  ],
};

const dataCinema = {
  title: 'góc điện ảnh',
  items: [
    { title: 'Thể Loại Phim', content: 'Content for child 1' },
    { title: 'Bình Luận Phim', content: 'Content for child 2' },
    { title: 'Blog Điện Ảnh', content: 'Content for child 3' },
    { title: 'Phim Hay Tháng', content: 'Content for child 4' },
  ],
};

const dataSupport = {
  title: 'hỗ trợ',
  items: [
    { title: 'Góp Ý', content: 'Content for child 1' },
    { title: 'Sale & Services', content: 'Content for child 2' },
    { title: 'Rạp / Giá Vé', content: 'Content for child 3' },
    { title: 'Tuyển Dụng', content: 'Content for child 4' },
    { title: 'FAQ', content: 'Content for child 4' },
  ],
};

const dataSlide = [
  {
    id: 1, image: "https://i.imgur.com/YbaibkW.jpeg"
  },
  {
    id: 2, image: "https://i.imgur.com/XuFBXkO.jpeg"
  },
  {
    id: 3, image: "https://i.imgur.com/KYTi79U.jpeg"
  },
  {
    id: 4, image: "https://i.imgur.com/tjmvV18.jpeg"
  },
];

const dataShowing = [
  {
    id: 1, image: "https://i.imgur.com/YbaibkW.jpeg", name: "Những mảnh ghép cảm xúc",
  },
  {
    id: 2, image: "https://i.imgur.com/lwcVJQi.jpeg", name: "Kẻ trộm mặt trăng 4"
  },
  {
    id: 3, image: "https://i.imgur.com/KYTi79U.jpeg", name: "Vùng Đất Câm Lặng: Ngày Một"
  },
  {
    id: 4, image: "https://i.imgur.com/tjmvV18.jpeg", name: "Cửu Long Thành Trại: Vây Thành"
  },
  {
    id: 5, image: "https://i.imgur.com/YbaibkW.jpeg", name: "Hai Khoảng Trời Song Song"
  },
  {
    id: 6, image: "https://i.imgur.com/XuFBXkO.jpeg", name: "Gia Tài Của Ngoại"
  },
  {
    id: 7, image: "https://i.imgur.com/KYTi79U.jpeg", name: "Mùa hè đẹp nhất"
  },
  {
    id: 8, image: "https://i.imgur.com/tjmvV18.jpeg", name: "Chờ nơi pháo hoa rực rỡ"
  },
];
const dataComming = [
  {
    id: 1, image: "https://i.imgur.com/YbaibkW.jpeg"
  },
  {
    id: 2, image: "https://i.imgur.com/lwcVJQi.jpeg"
  },
  {
    id: 3, image: "https://i.imgur.com/KYTi79U.jpeg"
  },
  {
    id: 4, image: "https://i.imgur.com/tjmvV18.jpeg"
  },
  {
    id: 5, image: "https://i.imgur.com/YbaibkW.jpeg"
  },
  {
    id: 6, image: "https://i.imgur.com/XuFBXkO.jpeg"
  },
];
const dataGender = [
  {
    id: 1, gender: "Gia đình"
  },
];
const dataActor = [
  {
    id: 1, gender: "Putthipong Assaratanakul"
  },
  {
    id: 2, gender: "Usha Seamkhum"
  },
  {
    id: 3, gender: "Tontawan Tantivejakul"
  },
];

const dataDirector = [
  {
    id: 1, gender: "Pat Boonnitipat"
  },
];
const showtimesData = {
  '2024-06-26': ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'],
  '2024-06-25': ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'],
  '2024-06-27': ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
  '2024-06-28': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
  '2024-06-29': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
  '2024-06-30': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
  '2024-07-01': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],

};
const dates = Object.keys(showtimesData);

export { dataPreview, dataSlide, dataShowing, dataComming, dataCinema, dataSupport, dataGender, dataActor, dataDirector, showtimesData, dates };
