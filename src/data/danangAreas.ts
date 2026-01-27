// Mock data for Da Nang areas with historical data and AI insights

interface HistoricalData {
  year: number;
  status: 'critical' | 'teaching' | 'thriving';
}

interface DaNangArea {
  id: string;
  name: string;
  district: string;
  status: 'critical' | 'teaching' | 'thriving';
  coordinates: { x: number; y: number };
  artisans: number;
  classes: number;
  students: number;
  riskLevel: string;
  description: string;
  historicalData: HistoricalData[];
  aiInsight: string;
}

export const getDaNangAreas = (): DaNangArea[] => [
  {
    id: 'Hoi-An',
    name: 'Hội An',
    district: 'Quảng Nam (gần Đà Nẵng)',
    status: 'thriving',
    coordinates: { x: 200, y: 300 },
    artisans: 5,
    classes: 3,
    students: 25,
    riskLevel: 'Thấp',
    description:
      'Hội An là trung tâm bảo tồn di sản Bài Chòi lâu đời nhất. Với cộng đồng nghệ nhân tích cực và các lớp học được tổ chức thường xuyên, khu vực này đã trở thành gương sáng cho các nơi khác.',
    historicalData: [
      { year: 2015, status: 'critical' },
      { year: 2018, status: 'teaching' },
      { year: 2020, status: 'teaching' },
      { year: 2025, status: 'thriving' },
    ],
    aiInsight:
      'Hội An có nền tảng vững chắc. Khuyến nghị: tiếp tục hỗ trợ ghi âm ghi hình di sản, chuẩn bị đào tạo thế hệ kế tiếp.',
  },
  {
    id: 'My-Khe',
    name: 'Mỹ Khê',
    district: 'Ngũ Hành Sơn',
    status: 'teaching',
    coordinates: { x: 480, y: 280 },
    artisans: 2,
    classes: 1,
    students: 8,
    riskLevel: 'Cao',
    description:
      'Mỹ Khê là khu vực đang tái khởi động di sản Bài Chòi. Mặc dù số lượng học sinh còn ít nhưng có những nghệ nhân trẻ tìm hiểu và đam mê bảo tồn.',
    historicalData: [
      { year: 2015, status: 'critical' },
      { year: 2018, status: 'critical' },
      { year: 2020, status: 'teaching' },
      { year: 2025, status: 'teaching' },
    ],
    aiInsight:
      'Cần can thiệp gấp: mở thêm 1-2 lớp học, kết nối với các nghệ nhân kinh nghiệm để hỗ trợ dạy học. Tiềm năng phát triển cao nếu có hỗ trợ trong 12 tháng tới.',
  },
  {
    id: 'Son-Tha',
    name: 'Sơn Thà',
    district: 'Liên Chiểu',
    status: 'teaching',
    coordinates: { x: 300, y: 450 },
    artisans: 3,
    classes: 2,
    students: 12,
    riskLevel: 'Trung bình',
    description:
      'Sơn Thà có cộng đồng CLB Bài Chòi hoạt động tích cực. Các thành viên là những người yêu thích bảo tồn di sản từ nhiều độ tuổi khác nhau.',
    historicalData: [
      { year: 2015, status: 'teaching' },
      { year: 2018, status: 'teaching' },
      { year: 2020, status: 'teaching' },
      { year: 2025, status: 'teaching' },
    ],
    aiInsight:
      'Sơn Thà ổn định. Khuyến nghị: hỗ trợ tổ chức hội thảo, triển lãm để nâng cao nhận thức cộng đồng. Tiềm năng trở thành tâm điểm giáo dục địa phương.',
  },
  {
    id: 'Hai-Chau',
    name: 'Hải Châu',
    district: 'Hải Châu',
    status: 'critical',
    coordinates: { x: 420, y: 360 },
    artisans: 1,
    classes: 0,
    students: 3,
    riskLevel: 'Rất cao',
    description:
      'Hải Châu là khu vực đáng lo ngại. Chỉ có 1 nghệ nhân lớn tuổi còn lại, chưa có chương trình đào tạo chính thức. Di sản có nguy cơ mai một trong 2-3 năm nếu không can thiệp.',
    historicalData: [
      { year: 2015, status: 'critical' },
      { year: 2018, status: 'critical' },
      { year: 2020, status: 'critical' },
      { year: 2025, status: 'critical' },
    ],
    aiInsight:
      '🚨 CẢNH BÁO CAO: Hải Châu cần can thiệp ngay lập tức. Đề xuất: ghi lại kỹ năng từ nghệ nhân còn lại, kết nối với các tổ chức hỗ trợ, mở lớp học nhân đạo trong 3 tháng.',
  },
  {
    id: 'Cam-Le',
    name: 'Cẩm Lệ',
    district: 'Cẩm Lệ',
    status: 'thriving',
    coordinates: { x: 550, y: 420 },
    artisans: 4,
    classes: 2,
    students: 18,
    riskLevel: 'Thấp',
    description:
      'Cẩm Lệ là một trong những khu vực phát triển tốt nhất ở Đà Nẵng. Có nhóm nghệ nhân trẻ, các lớp học sinh động và sự hỗ trợ từ chính quyền địa phương.',
    historicalData: [
      { year: 2015, status: 'teaching' },
      { year: 2018, status: 'teaching' },
      { year: 2020, status: 'thriving' },
      { year: 2025, status: 'thriving' },
    ],
    aiInsight:
      'Cẩm Lệ là điểm sáng. Khuyến nghị: mở thêm lớp nâng cao cho học sinh giỏi, chuẩn bị công nhân bảo tồn chuyên sâu, chia sẻ kinh nghiệm cho các khu vực khác.',
  },
  {
    id: 'Thanh-Khe',
    name: 'Thanh Khê',
    district: 'Thanh Khê',
    status: 'teaching',
    coordinates: { x: 380, y: 200 },
    artisans: 2,
    classes: 1,
    students: 6,
    riskLevel: 'Cao',
    description:
      'Thanh Khê là khu vực đô thị, di sản Bài Chòi gần như bị quên lãng. Tuy nhiên, có một số người yêu thích truyền thống bắt đầu tập hợp lại.',
    historicalData: [
      { year: 2015, status: 'critical' },
      { year: 2018, status: 'critical' },
      { year: 2020, status: 'critical' },
      { year: 2025, status: 'teaching' },
    ],
    aiInsight:
      'Thanh Khê đang hồi phục. Khuyến nghị: hỗ trợ quảng bá, tổ chức sự kiện giáo dục, kết nối với các tổ chức xã hội để phát triển bền vững.',
  },
];

export default getDaNangAreas;
