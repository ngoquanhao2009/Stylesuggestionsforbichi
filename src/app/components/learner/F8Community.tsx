import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ArrowLeft, MapPin, Users, User, CheckCircle2 } from "lucide-react";
import { ARTISAN_CLUBS } from "@/app/data/mockData";

interface F8CommunityProps {
  onBack: () => void;
}

export function F8Community({ onBack }: F8CommunityProps) {
  const matchedClub = ARTISAN_CLUBS[0];

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--baichoi-yellow)' }}
    >
      <div className="max-w-2xl mx-auto">
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
          <h1 
            className="text-2xl"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Kết Nối Cộng Đồng
          </h1>
        </div>

        {/* Success Message */}
        <Card 
          className="p-6 mb-6 border-2 text-center"
          style={{ 
            borderColor: 'var(--baichoi-earth)',
            backgroundColor: 'var(--baichoi-earth)',
            color: 'white'
          }}
        >
          <CheckCircle2 size={48} className="mx-auto mb-3" />
          <h2 className="text-2xl mb-2">
            Ghép Cặp Thành Công!
          </h2>
          <p className="opacity-90">
            Chúng tôi đã tìm thấy câu lạc bộ phù hợp với bạn
          </p>
        </Card>

        {/* Matched Club */}
        <Card 
          className="p-6 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div 
              className="p-4 rounded-full"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <Users 
                size={32}
                style={{ color: 'var(--baichoi-brick)' }}
              />
            </div>
            <div className="flex-1">
              <h3 
                className="text-xl mb-2"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                {matchedClub.name}
              </h3>
              <div className="flex items-center gap-2 mb-1">
                <MapPin 
                  size={16}
                  style={{ color: 'var(--baichoi-earth)' }}
                />
                <p 
                  className="text-sm"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  {matchedClub.location}
                </p>
              </div>
              <p 
                className="text-sm opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Khoảng cách: {matchedClub.distance} km
              </p>
            </div>
          </div>

          <div 
            className="grid grid-cols-2 gap-4 p-4 rounded-lg mb-4"
            style={{ backgroundColor: 'var(--baichoi-yellow)' }}
          >
            <div className="text-center">
              <div 
                className="text-2xl mb-1"
                style={{ color: 'var(--baichoi-brick)' }}
              >
                {matchedClub.members}
              </div>
              <p 
                className="text-sm opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Thành viên
              </p>
            </div>
            <div className="text-center">
              <div 
                className="text-2xl mb-1"
                style={{ color: 'var(--baichoi-brick)' }}
              >
                {matchedClub.artisans}
              </div>
              <p 
                className="text-sm opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Nghệ nhân
              </p>
            </div>
          </div>

          <Button 
            className="w-full mb-3"
            style={{ 
              backgroundColor: 'var(--baichoi-brick)',
              color: 'white'
            }}
          >
            Liên Hệ Câu Lạc Bộ
          </Button>

          <Button 
            variant="outline"
            className="w-full"
            style={{ 
              borderColor: 'var(--baichoi-earth)',
              color: 'var(--baichoi-earth)'
            }}
          >
            Xem Lịch Sinh Hoạt
          </Button>
        </Card>

        {/* Other Clubs */}
        <h2 
          className="text-lg mb-4"
          style={{ color: 'var(--baichoi-earth-dark)' }}
        >
          Câu Lạc Bộ Khác Gần Bạn
        </h2>

        <div className="space-y-4 mb-6">
          {ARTISAN_CLUBS.slice(1).map((club) => (
            <Card 
              key={club.id}
              className="p-4 border-2 bg-white cursor-pointer hover:shadow-md transition-shadow"
              style={{ borderColor: 'var(--baichoi-earth)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 
                    className="mb-2"
                    style={{ color: 'var(--baichoi-earth-dark)' }}
                  >
                    {club.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin 
                      size={14}
                      style={{ color: 'var(--baichoi-earth)' }}
                    />
                    <p 
                      className="text-sm opacity-70"
                      style={{ color: 'var(--baichoi-earth)' }}
                    >
                      {club.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm opacity-70">
                    <span style={{ color: 'var(--baichoi-earth)' }}>
                      {club.distance} km
                    </span>
                    <span style={{ color: 'var(--baichoi-earth)' }}>
                      <User size={14} className="inline mr-1" />
                      {club.artisans} nghệ nhân
                    </span>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  style={{ 
                    borderColor: 'var(--baichoi-earth)',
                    color: 'var(--baichoi-earth)'
                  }}
                >
                  Xem
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Info */}
        <Card 
          className="p-4 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <p 
            className="text-sm opacity-70"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            🤖 <strong>Công nghệ:</strong> AI Recommendation System (Rule-based + AI) - Gợi ý dựa trên vị trí và mức độ học tập
          </p>
        </Card>
      </div>
    </div>
  );
}
