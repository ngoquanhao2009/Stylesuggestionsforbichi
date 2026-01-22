import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Database, FileAudio, Map, TrendingUp, ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ResearcherDashboardProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const chartData = [
  { region: "Quảng Nam", count: 45 },
  { region: "Bình Định", count: 32 },
  { region: "Quảng Ngãi", count: 28 },
  { region: "Phú Yên", count: 18 },
];

export function ResearcherDashboard({ onBack, onNavigate }: ResearcherDashboardProps) {
  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--baichoi-yellow)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost"
            onClick={onBack}
            className="mr-4"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            <ArrowLeft size={24} />
          </Button>
          <div>
            <h1 
              className="text-3xl mb-2"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Bảng Điều Khiển Di Sản
            </h1>
            <p 
              className="opacity-80"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Số hóa và bảo tồn di sản Bài Chòi
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card 
            className="p-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <Database 
                size={24}
                style={{ color: 'var(--baichoi-brick)' }}
              />
              <span 
                className="text-3xl"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                156
              </span>
            </div>
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Tư liệu đã số hóa
            </p>
          </Card>

          <Card 
            className="p-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <FileAudio 
                size={24}
                style={{ color: 'var(--baichoi-brick)' }}
              />
              <span 
                className="text-3xl"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                89
              </span>
            </div>
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Làn điệu đã lưu
            </p>
          </Card>

          <Card 
            className="p-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <Map 
                size={24}
                style={{ color: 'var(--baichoi-brick)' }}
              />
              <span 
                className="text-3xl"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                12
              </span>
            </div>
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Điểm hội chòi
            </p>
          </Card>

          <Card 
            className="p-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp 
                size={24}
                style={{ color: 'var(--baichoi-brick)' }}
              />
              <span 
                className="text-3xl"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                342
              </span>
            </div>
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Người học
            </p>
          </Card>
        </div>

        {/* Chart */}
        <Card 
          className="p-6 mb-8 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <h2 
            className="text-lg mb-4"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Tư Liệu Theo Vùng Miền
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="region" 
                tick={{ fill: 'var(--baichoi-earth)', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: 'var(--baichoi-earth)', fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="count" fill="var(--baichoi-brick)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
            onClick={() => onNavigate('archive')}
          >
            <h2 
              className="text-xl mb-3"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              B3 - Kho Lưu Trữ Di Sản
            </h2>
            <p 
              className="text-sm opacity-80 mb-4"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Truy cập và quản lý tư liệu cổ theo vùng miền
            </p>
            <Button 
              className="w-full"
              style={{ 
                backgroundColor: 'var(--baichoi-brick)',
                color: 'white'
              }}
            >
              Xem Kho Lưu Trữ
            </Button>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
            onClick={() => onNavigate('restoration')}
          >
            <h2 
              className="text-xl mb-3"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              B4 - Phục Dựng Tư Liệu
            </h2>
            <p 
              className="text-sm opacity-80 mb-4"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Sử dụng AI để khử nhiễu và phục dựng băng cũ
            </p>
            <Button 
              variant="outline"
              className="w-full"
              style={{ 
                borderColor: 'var(--baichoi-earth)',
                color: 'var(--baichoi-earth)'
              }}
            >
              Bắt Đầu Phục Dựng
            </Button>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
            onClick={() => onNavigate('distribution')}
          >
            <h2 
              className="text-xl mb-3"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              B6 - Phân Phối & Giáo Dục
            </h2>
            <p 
              className="text-sm opacity-80 mb-4"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Bản đồ các khu vực cần bảo tồn và truyền dạy
            </p>
            <Button 
              variant="outline"
              className="w-full"
              style={{ 
                borderColor: 'var(--baichoi-earth)',
                color: 'var(--baichoi-earth)'
              }}
            >
              Xem Bản Đồ
            </Button>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
            onClick={() => onNavigate('impact')}
          >
            <h2 
              className="text-xl mb-3"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              B8 - Trạng Thái Tác Động
            </h2>
            <p 
              className="text-sm opacity-80 mb-4"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Đóng góp cho SDG 11.4 & SDG 4
            </p>
            <Button 
              variant="outline"
              className="w-full"
              style={{ 
                borderColor: 'var(--baichoi-earth)',
                color: 'var(--baichoi-earth)'
              }}
            >
              Xem Tác Động
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
