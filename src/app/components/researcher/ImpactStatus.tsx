import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { ArrowLeft, TrendingUp, Users, Database, Award } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { SDG_METRICS } from "@/app/data/mockData";

interface ImpactStatusProps {
  onBack: () => void;
}

const regionData = [
  { name: "Quảng Nam", value: 45 },
  { name: "Bình Định", value: 32 },
  { name: "Quảng Ngãi", value: 28 },
  { name: "Phú Yên", value: 18 },
];

const monthlyGrowth = [
  { month: "T7", learners: 45, archives: 12 },
  { month: "T8", learners: 78, archives: 18 },
  { month: "T9", learners: 124, archives: 25 },
  { month: "T10", learners: 198, archives: 31 },
  { month: "T11", learners: 267, archives: 38 },
  { month: "T12", learners: 342, archives: 45 },
];

const COLORS = ['var(--baichoi-brick)', 'var(--baichoi-earth)', 'var(--baichoi-earth-light)', 'var(--baichoi-yellow-dark)'];

export function ImpactStatus({ onBack }: ImpactStatusProps) {
  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--baichoi-yellow)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
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
              className="text-2xl"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              B8 - Trạng Thái Tác Động
            </h1>
            <p 
              className="text-sm opacity-80"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Đóng góp cho mục tiêu phát triển bền vững
            </p>
          </div>
        </div>

        {/* SDG Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* SDG 11.4 */}
          <Card 
            className="p-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--baichoi-brick)' }}
              >
                <Database size={32} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-lg mb-1"
                  style={{ color: 'var(--baichoi-earth-dark)' }}
                >
                  SDG 11.4
                </h3>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  Bảo tồn di sản văn hóa
                </p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between mb-2 text-sm">
                <span style={{ color: 'var(--baichoi-earth)' }}>
                  Tiến độ
                </span>
                <span 
                  className="font-medium"
                  style={{ color: 'var(--baichoi-earth-dark)' }}
                >
                  {SDG_METRICS["11.4"].current} / {SDG_METRICS["11.4"].target} {SDG_METRICS["11.4"].unit}
                </span>
              </div>
              <Progress 
                value={(SDG_METRICS["11.4"].current / SDG_METRICS["11.4"].target) * 100} 
                className="h-3"
              />
            </div>

            <div 
              className="p-3 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <p style={{ color: 'var(--baichoi-earth)' }}>
                <strong>Mục tiêu:</strong> Số hóa và bảo tồn 500 tư liệu di sản Bài Chòi trong năm 2026
              </p>
            </div>
          </Card>

          {/* SDG 4 */}
          <Card 
            className="p-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--baichoi-earth)' }}
              >
                <Users size={32} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-lg mb-1"
                  style={{ color: 'var(--baichoi-earth-dark)' }}
                >
                  SDG 4
                </h3>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  Giáo dục chất lượng
                </p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between mb-2 text-sm">
                <span style={{ color: 'var(--baichoi-earth)' }}>
                  Tiến độ
                </span>
                <span 
                  className="font-medium"
                  style={{ color: 'var(--baichoi-earth-dark)' }}
                >
                  {SDG_METRICS["4"].current} / {SDG_METRICS["4"].target} {SDG_METRICS["4"].unit}
                </span>
              </div>
              <Progress 
                value={(SDG_METRICS["4"].current / SDG_METRICS["4"].target) * 100} 
                className="h-3"
              />
            </div>

            <div 
              className="p-3 rounded-lg text-sm"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <p style={{ color: 'var(--baichoi-earth)' }}>
                <strong>Mục tiêu:</strong> Đào tạo 1,000 người học nghệ thuật Bài Chòi truyền thống
              </p>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Regional Distribution */}
          <Card 
            className="p-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <h3 
              className="mb-4"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Phân Bố Tư Liệu Theo Vùng
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Growth Trend */}
          <Card 
            className="p-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <h3 
              className="mb-4"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Xu Hướng Tăng Trưởng (6 tháng)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'var(--baichoi-earth)', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: 'var(--baichoi-earth)', fontSize: 12 }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="learners" fill="var(--baichoi-brick)" name="Người học" />
                <Bar dataKey="archives" fill="var(--baichoi-earth)" name="Tư liệu" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Key Achievements */}
        <Card 
          className="p-6 mb-8 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Award 
              size={20}
              style={{ color: 'var(--baichoi-brick)' }}
            />
            <h3 
              className="text-lg"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Thành Tựu Nổi Bật
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <div 
                className="text-3xl mb-2"
                style={{ color: 'var(--baichoi-brick)' }}
              >
                156
              </div>
              <p 
                className="text-sm opacity-80"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Tư liệu đã bảo tồn
              </p>
            </div>

            <div 
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <div 
                className="text-3xl mb-2"
                style={{ color: 'var(--baichoi-brick)' }}
              >
                342
              </div>
              <p 
                className="text-sm opacity-80"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Người học đã đào tạo
              </p>
            </div>

            <div 
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <div 
                className="text-3xl mb-2"
                style={{ color: 'var(--baichoi-brick)' }}
              >
                12
              </div>
              <p 
                className="text-sm opacity-80"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Câu lạc bộ kết nối
              </p>
            </div>
          </div>
        </Card>

        {/* Message */}
        <Card 
          className="p-8 text-center border-2"
          style={{ 
            borderColor: 'var(--baichoi-earth)',
            backgroundColor: 'var(--baichoi-earth)',
            color: 'white'
          }}
        >
          <TrendingUp size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl mb-3">
            Lan Tỏa Tình Yêu Nghệ Thuật Dân Tộc
          </h2>
          <p className="opacity-90 max-w-2xl mx-auto">
            Bài Chòi Echo AI đang góp phần gìn giữ và truyền bá di sản văn hóa phi vật thể, 
            đảm bảo không để ai bị bỏ lại phía sau trong hành trình bảo tồn di sản.
          </p>
        </Card>
      </div>
    </div>
  );
}
