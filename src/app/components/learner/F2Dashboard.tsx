import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Camera, Book, Trophy, Users } from "lucide-react";

interface F2DashboardProps {
  onNavigate: (screen: string) => void;
}

export function F2Dashboard({ onNavigate }: F2DashboardProps) {
  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--baichoi-yellow)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 
            className="text-3xl mb-2"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Xin chào, Người học!
          </h1>
          <p 
            className="opacity-80"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            Hãy bắt đầu hành trình khám phá Bài Chòi của bạn
          </p>
        </div>

        {/* Main Action */}
        <Card 
          className="p-8 mb-6 text-center border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <Camera 
            size={64} 
            className="mx-auto mb-4"
            style={{ color: 'var(--baichoi-brick)' }}
          />
          <h2 
            className="text-2xl mb-3"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Quét Quân Bài
          </h2>
          <p 
            className="mb-6 opacity-80"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            Sử dụng camera để nhận diện quân bài và học lời hô truyền thống
          </p>
          <Button 
            onClick={() => onNavigate('scan')}
            className="px-8 py-6 text-lg"
            style={{ 
              backgroundColor: 'var(--baichoi-brick)',
              color: 'white'
            }}
          >
            Bắt Đầu Quét
          </Button>
        </Card>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
            onClick={() => onNavigate('progress')}
          >
            <Book 
              size={32} 
              className="mb-3"
              style={{ color: 'var(--baichoi-earth)' }}
            />
            <h3 
              className="mb-2"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Tiến Trình
            </h3>
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Xem các làn điệu đã học
            </p>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
            onClick={() => onNavigate('progress')}
          >
            <Trophy 
              size={32} 
              className="mb-3"
              style={{ color: 'var(--baichoi-brick)' }}
            />
            <h3 
              className="mb-2"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Huy Hiệu
            </h3>
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Thành tích của bạn
            </p>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
            onClick={() => onNavigate('community')}
          >
            <Users 
              size={32} 
              className="mb-3"
              style={{ color: 'var(--baichoi-earth)' }}
            />
            <h3 
              className="mb-2"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Cộng Đồng
            </h3>
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Kết nối nghệ nhân
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
