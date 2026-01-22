import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

// Subtle folk pattern component
const FolkPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="folk-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="2" fill="currentColor" />
        <circle cx="45" cy="15" r="2" fill="currentColor" />
        <circle cx="15" cy="45" r="2" fill="currentColor" />
        <circle cx="45" cy="45" r="2" fill="currentColor" />
        <path d="M30 20 L35 30 L30 40 L25 30 Z" fill="currentColor" opacity="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#folk-pattern)" />
  </svg>
);

export function BaiChoiStyleGuide() {
  const colors = [
    { 
      name: "Nâu Đất", 
      var: "--baichoi-earth", 
      hex: "#8B6F47",
      description: "Màu chủ đạo, gợi nhớ đến đất và tre nứa"
    },
    { 
      name: "Vàng Nhạt", 
      var: "--baichoi-yellow", 
      hex: "#F4E8C1",
      description: "Màu nền nhẹ nhàng, ấm áp"
    },
    { 
      name: "Đỏ Gạch", 
      var: "--baichoi-brick", 
      hex: "#C44536",
      description: "Điểm nhấn, tượng trưng cho lễ hội"
    },
  ];

  const complementaryColors = [
    { name: "Nâu Đất Nhạt", var: "--baichoi-earth-light", hex: "#A68967" },
    { name: "Nâu Đất Đậm", var: "--baichoi-earth-dark", hex: "#6B5737" },
    { name: "Vàng Đậm", var: "--baichoi-yellow-dark", hex: "#D4C8A1" },
    { name: "Đỏ Gạch Nhạt", var: "--baichoi-brick-light", hex: "#D96556" },
  ];

  return (
    <div className="min-h-screen p-8 md:p-12" style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: 'var(--baichoi-yellow)' }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 relative">
        <FolkPattern />
        <div className="relative z-10 text-center py-12">
          <h1 className="text-5xl mb-4" style={{ color: 'var(--baichoi-earth-dark)' }}>
            Style Guide: Bài Chòi
          </h1>
          <p className="text-xl opacity-80" style={{ color: 'var(--baichoi-earth)' }}>
            Hệ thống thiết kế lấy cảm hứng từ nghệ thuật dân gian truyền thống
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Color Palette */}
        <section>
          <h2 className="text-3xl mb-6" style={{ color: 'var(--baichoi-earth-dark)' }}>
            Bảng Màu Chính
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {colors.map((color) => (
              <Card key={color.name} className="overflow-hidden border-2" style={{ borderColor: 'var(--baichoi-earth)' }}>
                <div 
                  className="h-48 relative"
                  style={{ backgroundColor: `var(${color.var})` }}
                >
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded">
                      <p className="font-semibold">{color.name}</p>
                      <p className="text-sm opacity-70">{color.hex}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-sm" style={{ color: 'var(--baichoi-earth)' }}>
                    {color.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Complementary Colors */}
        <section>
          <h2 className="text-3xl mb-6" style={{ color: 'var(--baichoi-earth-dark)' }}>
            Màu Bổ Trợ
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {complementaryColors.map((color) => (
              <div key={color.name} className="text-center">
                <div 
                  className="h-24 rounded-lg mb-2 border-2"
                  style={{ 
                    backgroundColor: `var(${color.var})`,
                    borderColor: 'var(--baichoi-earth)'
                  }}
                />
                <p className="font-medium text-sm">{color.name}</p>
                <p className="text-xs opacity-70">{color.hex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-3xl mb-6" style={{ color: 'var(--baichoi-earth-dark)' }}>
            Typography
          </h2>
          <Card className="p-8 bg-white border-2" style={{ borderColor: 'var(--baichoi-earth)' }}>
            <div className="space-y-6">
              <div>
                <p className="text-sm opacity-60 mb-2">Font Family</p>
                <p className="text-2xl" style={{ color: 'var(--baichoi-earth-dark)' }}>
                  Inter (Sans-serif)
                </p>
                <p className="text-sm mt-1 opacity-70">
                  Đơn giản, dễ đọc, hiện đại nhưng vẫn ấm áp
                </p>
              </div>

              <div className="border-t-2 pt-6" style={{ borderColor: 'var(--baichoi-yellow-dark)' }}>
                <h1 className="mb-2" style={{ color: 'var(--baichoi-earth-dark)' }}>
                  Heading 1 - Tiêu Đề Lớn
                </h1>
                <h2 className="mb-2" style={{ color: 'var(--baichoi-earth-dark)' }}>
                  Heading 2 - Tiêu Đề Vừa
                </h2>
                <h3 className="mb-2" style={{ color: 'var(--baichoi-earth)' }}>
                  Heading 3 - Tiêu Đề Nhỏ
                </h3>
                <p className="mb-2" style={{ color: 'var(--baichoi-earth)' }}>
                  Body Text - Nội dung chính của trang. Phông chữ đơn giản giúp người đọc dễ dàng tiếp cận thông tin.
                </p>
                <p className="text-sm opacity-70">
                  Small Text - Chú thích hoặc thông tin phụ
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Components */}
        <section>
          <h2 className="text-3xl mb-6" style={{ color: 'var(--baichoi-earth-dark)' }}>
            Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons */}
            <Card className="p-8 bg-white border-2" style={{ borderColor: 'var(--baichoi-earth)' }}>
              <h3 className="mb-4" style={{ color: 'var(--baichoi-earth-dark)' }}>
                Buttons
              </h3>
              <div className="space-y-3">
                <Button 
                  className="w-full"
                  style={{ 
                    backgroundColor: 'var(--baichoi-earth)',
                    color: 'white'
                  }}
                >
                  Primary Button
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  style={{ 
                    borderColor: 'var(--baichoi-earth)',
                    color: 'var(--baichoi-earth)'
                  }}
                >
                  Secondary Button
                </Button>
                <Button 
                  className="w-full"
                  style={{ 
                    backgroundColor: 'var(--baichoi-brick)',
                    color: 'white'
                  }}
                >
                  Accent Button
                </Button>
              </div>
            </Card>

            {/* Cards */}
            <Card className="p-8 bg-white border-2" style={{ borderColor: 'var(--baichoi-earth)' }}>
              <h3 className="mb-4" style={{ color: 'var(--baichoi-earth-dark)' }}>
                Cards
              </h3>
              <div 
                className="p-6 rounded-lg relative overflow-hidden"
                style={{ backgroundColor: 'var(--baichoi-yellow)' }}
              >
                <FolkPattern />
                <div className="relative z-10">
                  <h4 className="mb-2" style={{ color: 'var(--baichoi-earth-dark)' }}>
                    Card với Pattern
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--baichoi-earth)' }}>
                    Sử dụng hoa văn dân gian rất nhẹ để tạo điểm nhấn tinh tế
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Design Principles */}
        <section>
          <h2 className="text-3xl mb-6" style={{ color: 'var(--baichoi-earth-dark)' }}>
            Nguyên Tắc Thiết Kế
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border-2 relative overflow-hidden" style={{ borderColor: 'var(--baichoi-earth)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10" style={{ backgroundColor: 'var(--baichoi-brick)' }} />
              <div className="relative z-10">
                <h3 className="mb-3" style={{ color: 'var(--baichoi-brick)' }}>
                  Truyền Thống
                </h3>
                <p className="text-sm" style={{ color: 'var(--baichoi-earth)' }}>
                  Lấy cảm hứng từ nghệ thuật dân gian Bài Chòi, sử dụng màu sắc và họa tiết gần gũi với văn hóa truyền thống
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white border-2 relative overflow-hidden" style={{ borderColor: 'var(--baichoi-earth)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10" style={{ backgroundColor: 'var(--baichoi-earth)' }} />
              <div className="relative z-10">
                <h3 className="mb-3" style={{ color: 'var(--baichoi-earth-dark)' }}>
                  Đơn Giản
                </h3>
                <p className="text-sm" style={{ color: 'var(--baichoi-earth)' }}>
                  Typography và layout đơn giản, rõ ràng. Tránh sử dụng quá nhiều họa tiết phức tạp
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white border-2 relative overflow-hidden" style={{ borderColor: 'var(--baichoi-earth)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10" style={{ backgroundColor: 'var(--baichoi-yellow-dark)' }} />
              <div className="relative z-10">
                <h3 className="mb-3" style={{ color: 'var(--baichoi-earth-dark)' }}>
                  Ấm Áp
                </h3>
                <p className="text-sm" style={{ color: 'var(--baichoi-earth)' }}>
                  Bảng màu tạo cảm giác gần gũi, thân thiện và ấm áp như không khí của lễ hội dân gian
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Usage Examples */}
        <section>
          <h2 className="text-3xl mb-6" style={{ color: 'var(--baichoi-earth-dark)' }}>
            Ví Dụ Ứng Dụng
          </h2>
          <Card className="p-0 overflow-hidden bg-white border-2" style={{ borderColor: 'var(--baichoi-earth)' }}>
            {/* Header Example */}
            <div className="p-8 relative" style={{ backgroundColor: 'var(--baichoi-earth)' }}>
              <FolkPattern />
              <div className="relative z-10">
                <h2 className="text-white mb-2">
                  Bài Chòi Truyền Thống
                </h2>
                <p className="text-white/80">
                  Di sản văn hóa phi vật thể đại diện của nhân loại
                </p>
              </div>
            </div>

            {/* Content Example */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="mb-3" style={{ color: 'var(--baichoi-earth-dark)' }}>
                  Giới Thiệu
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--baichoi-earth)' }}>
                  Bài Chòi là một hình thức nghệ thuật dân gian độc đáo của miền Trung Việt Nam, kết hợp giữa ca hát, nhạc cụ và trò chơi dân gian.
                </p>
                <Button 
                  size="sm"
                  style={{ 
                    backgroundColor: 'var(--baichoi-brick)',
                    color: 'white'
                  }}
                >
                  Tìm Hiểu Thêm
                </Button>
              </div>

              <div 
                className="p-6 rounded-lg relative"
                style={{ backgroundColor: 'var(--baichoi-yellow)' }}
              >
                <FolkPattern />
                <div className="relative z-10">
                  <h4 className="mb-2" style={{ color: 'var(--baichoi-earth-dark)' }}>
                    Đặc Điểm
                  </h4>
                  <ul className="space-y-2 text-sm" style={{ color: 'var(--baichoi-earth)' }}>
                    <li>• Sử dụng thẻ bài và tre nứa</li>
                    <li>• Ca từ dân gian trữ tình</li>
                    <li>• Tính cộng đồng cao</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Footer Note */}
        <div className="text-center py-8 border-t-2" style={{ borderColor: 'var(--baichoi-earth)' }}>
          <p className="text-sm" style={{ color: 'var(--baichoi-earth)' }}>
            Style Guide này có thể được áp dụng cho website, ứng dụng, hoặc tài liệu liên quan đến Bài Chòi
          </p>
        </div>
      </div>
    </div>
  );
}
