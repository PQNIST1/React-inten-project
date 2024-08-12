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




const showtimesData = {
  '2024-07-25': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
  '2024-07-26': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
  '2024-07-27': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
  '2024-07-28': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],
  '2024-08-20': ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'],


};
const dates = Object.keys(showtimesData);

const seat = [
  [
    'single',
    'single',
    'single',
    null,
    null,
    null,
    null,
    'single',
    'single',
    'single'
  ],
  [
    'single',
    'single',
    'single',
    'single',
    null,
    null,
    'single',
    'single',
    'single',
    'single'
  ],
  [
    'single',
    'single',
    'single',
    null,
    null,
    null,
    null,
    'single',
    'single',
    'single'
  ],
  [
    'double',
   'double',
    null,
    null,
    null,
    null,
    null,
    null,
   'double',
   'double',
  ],
  [
    null,
   'vip',
   'vip',
    null,
    'single',
    null,
    null,
   'double',
   'double',
    null
  ],
  [
    null,
   'vip',
   'vip',
    null,
    'single',
    null,
    null,
   'double',
   'double',
    null
  ],[
    null,
   'vip',
   'vip',
    null,
    'single',
    null,
    null,
   'double',
   'double',
    null
  ],[
    'single',
   'single',
   'single',
    'single',
    'single',
    'single',
    null,
   'single',
   'single',
    null
  ],
]

const payment = [
  {
    id: '1', name: 'VNPAY', img: 'https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png', method: 'VN_PAY'
  },
]

const payment2 = [
  {
    id: '1', name: 'VNPAY', img: 'https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png', method: 'VN_PAY'
  },
  {
    id: '2', name: 'Tiền mặt', img: 'https://i.imgur.com/6pnbwrd.png', method: "CASH"
  },
]


export { dataPreview, dataSlide,  dataCinema, dataSupport, showtimesData, dates, payment, seat, payment2 };
