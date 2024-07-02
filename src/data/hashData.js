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
  // '2024-07-02': ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
  '2024-07-05': ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'],
  '2024-07-06': ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
  '2024-07-07': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM', '10:00 PM'],
  '2024-07-08': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
  '2024-07-09': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM',],
  '2024-07-10': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],

};
const dates = Object.keys(showtimesData);


const foods  = [
  {
    id:"1", name:'iCombo 1 Big STD', detail:"01 Ly nước ngọt size L + 01 Hộp bắp", price:'70.000'
  },
  {
    id:"2", name:'iCombo 1 Big Extra STD', detail:"1 Ly nước ngọt size L + 01 Hộp bắp + 1 Snack", price:'70.000'
  },
  {
    id:"3", name:'iCombo 2 Big Extra STD', detail:"02 Ly nước ngọt size L + 01 Hộp bắp + 1 Snack", price:'70.000'
  },
  {
    id:"4", name:'iCombo 2 Big STD', detail:"02 Ly nước ngọt size L + 01 Hộp bắp", price:'70.000'
  },
];
const payment = [
  {
    id:'1', name:'HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCODE', img:'https://cdn.galaxycine.vn/media/2020/10/20/hsbc-icon_1603203578522.png'
  },
  {
    id:'2', name:'Ví ShopeePay', img:'https://cdn.galaxycine.vn/media/2022/4/29/shopee-pay_1651229746140.png'
  },
  {
    id:'3', name:'Ví Điện Tử MoMo', img:'https://cdn.galaxycine.vn/media/2020/10/20/momo-icon_1603203874499.png'
  },
  {
    id:'4', name:'ZaloPay', img:'https://cdn.galaxycine.vn/media/2022/12/2/icon-96x96_1669977824597.png'
  },
  {
    id:'5', name:'VNPAY', img:'https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png'
  },
]



export { dataPreview, dataSlide, dataShowing, dataComming, dataCinema, dataSupport, dataGender, dataActor, dataDirector, showtimesData, dates, foods, payment };
