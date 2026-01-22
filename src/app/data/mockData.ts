// Mock data for Bài Chòi Echo AI

export const CARD_DATA = [
  {
    id: "nhi-ngheo",
    name: "Nhì Nghèo",
    story: "Quân bài Nhì Nghèo tượng trưng cho người nghèo khổ nhưng giữ được lòng trung thực. Trong tích truyện, Nhì Nghèo là người nông dân nghèo nhưng có tâm hồn cao thượng.",
    lyrics: "Nhì nghèo nhà rách, áo không còn / Nhưng lòng ngay thẳng, chẳng màng đời",
    region: "Quảng Nam"
  },
  {
    id: "sau-ghe",
    name: "Sáu Ghẹ",
    region: "Bình Định",
    story: "Sáu Ghẹ là quân bài tượng trưng cho sự kiên cường và bền bỉ như loài ghẹ biển. Theo truyền thuyết, Sáu Ghẹ là một ngư dân dũng cảm vượt sóng gió.",
    lyrics: "Sáu ghẹ vùng vẫy giữa biển khơi / Sóng to gió lớn chẳng lay lòng"
  },
  {
    id: "tam-cong",
    name: "Tam Công",
    region: "Quảng Ngãi",
    story: "Tam Công đại diện cho người quan thanh liêm, làm việc vì dân. Tích truyện kể về vị quan công bằng, không tham nhũng.",
    lyrics: "Tam công ngay thẳng, việc công bằng / Dân nghèo được giúp, lòng vui tươi"
  },
  {
    id: "bon-van",
    name: "Bốn Văn",
    region: "Phú Yên",
    story: "Bốn Văn tượng trưng cho người học trò hiếu học. Câu chuyện kể về chàng trai nghèo học hành chăm chỉ dưới ánh trăng.",
    lyrics: "Bốn văn đèn sách đêm không ngủ / Học hành chăm chỉ, ngày mai sang"
  }
];

export const PROGRESS_DATA = [
  {
    category: "Làn điệu đã học",
    items: ["Nhì Nghèo", "Sáu Ghẹ", "Tam Công"],
    completion: 3,
    total: 12
  },
  {
    category: "Huy hiệu đạt được",
    items: ["Người mới bắt đầu", "Học viên chăm chỉ"],
    completion: 2,
    total: 8
  }
];

export const HERITAGE_ARCHIVE = [
  {
    id: "1",
    title: "Làn điệu Bài Chòi cổ Quảng Nam",
    region: "Quảng Nam",
    year: "1970",
    quality: "Trung bình",
    type: "Audio",
    status: "Cần phục dựng"
  },
  {
    id: "2",
    title: "Kịch bản Bài Chòi Bình Định",
    region: "Bình Định",
    year: "1965",
    quality: "Kém",
    type: "Manuscript",
    status: "Đã số hóa"
  },
  {
    id: "3",
    title: "Ghi âm nghệ nhân Nguyễn Văn A",
    region: "Quảng Ngãi",
    year: "1982",
    quality: "Tốt",
    type: "Audio",
    status: "Hoàn tất"
  }
];

export const SDG_METRICS = {
  "11.4": {
    name: "Bảo tồn di sản văn hóa",
    current: 156,
    target: 500,
    unit: "tư liệu"
  },
  "4": {
    name: "Giáo dục chất lượng",
    current: 342,
    target: 1000,
    unit: "người học"
  }
};

export const ARTISAN_CLUBS = [
  {
    id: "1",
    name: "CLB Bài Chòi Hội An",
    location: "Hội An, Quảng Nam",
    distance: 2.5,
    members: 15,
    artisans: 3
  },
  {
    id: "2",
    name: "CLB Di sản Bình Định",
    location: "Quy Nhơn, Bình Định",
    distance: 45,
    members: 22,
    artisans: 5
  },
  {
    id: "3",
    name: "Nhóm Bài Chòi Phú Yên",
    location: "Tuy Hòa, Phú Yên",
    distance: 78,
    members: 12,
    artisans: 2
  }
];
