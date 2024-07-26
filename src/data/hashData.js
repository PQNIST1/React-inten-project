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
    id: '1', name: 'HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCODE', img: 'https://cdn.galaxycine.vn/media/2020/10/20/hsbc-icon_1603203578522.png'
  },
  {
    id: '2', name: 'Ví ShopeePay', img: 'https://cdn.galaxycine.vn/media/2022/4/29/shopee-pay_1651229746140.png'
  },
  {
    id: '3', name: 'Ví Điện Tử MoMo', img: 'https://cdn.galaxycine.vn/media/2020/10/20/momo-icon_1603203874499.png'
  },
  {
    id: '4', name: 'ZaloPay', img: 'https://cdn.galaxycine.vn/media/2022/12/2/icon-96x96_1669977824597.png'
  },
  {
    id: '5', name: 'VNPAY', img: 'https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png'
  },
]



export { dataPreview, dataSlide,  dataCinema, dataSupport, showtimesData, dates, payment, seat };
