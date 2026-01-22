import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { ArrowLeft, Trophy, Star, Award, BookOpen } from "lucide-react";
import { PROGRESS_DATA } from "@/app/data/mockData";

interface F7ProgressProps {
  onBack: () => void;
}

export function F7Progress({ onBack }: F7ProgressProps) {
  const badges = [
    { name: "Người mới bắt đầu", icon: Star, earned: true, color: "var(--baichoi-earth)" },
    { name: "Học viên chăm chỉ", icon: Award, earned: true, color: "var(--baichoi-brick)" },
    { name: "Bậc thầy làn điệu", icon: Trophy, earned: false, color: "var(--baichoi-earth)" },
  ];

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
            Tiến Trình Học Tập
          </h1>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card 
            className="p-6 text-center border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <div 
              className="text-4xl mb-2"
              style={{ color: 'var(--baichoi-brick)' }}
            >
              3
            </div>
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Làn điệu đã học
            </p>
          </Card>

          <Card 
            className="p-6 text-center border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <div 
              className="text-4xl mb-2"
              style={{ color: 'var(--baichoi-brick)' }}
            >
              2
            </div>
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Huy hiệu đạt được
            </p>
          </Card>
        </div>

        {/* Learned Songs */}
        <Card 
          className="p-6 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen 
              size={20}
              style={{ color: 'var(--baichoi-brick)' }}
            />
            <h2 
              className="text-lg"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Làn Điệu Đã Học
            </h2>
          </div>

          <div className="space-y-3">
            {PROGRESS_DATA[0].items.map((item, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--baichoi-yellow)' }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span 
                    className="font-medium"
                    style={{ color: 'var(--baichoi-earth-dark)' }}
                  >
                    {item}
                  </span>
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--baichoi-earth)' }}
                  >
                    100%
                  </span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            ))}

            {/* Locked items */}
            <div 
              className="p-4 rounded-lg opacity-50"
              style={{ backgroundColor: 'var(--baichoi-yellow-dark)' }}
            >
              <div className="flex justify-between items-center mb-2">
                <span 
                  className="font-medium"
                  style={{ color: 'var(--baichoi-earth-dark)' }}
                >
                  Bốn Văn 🔒
                </span>
                <span 
                  className="text-sm"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  0%
                </span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>

          <div className="mt-4 text-center">
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Hoàn thành {PROGRESS_DATA[0].completion}/{PROGRESS_DATA[0].total} làn điệu
            </p>
          </div>
        </Card>

        {/* Badges */}
        <Card 
          className="p-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy 
              size={20}
              style={{ color: 'var(--baichoi-brick)' }}
            />
            <h2 
              className="text-lg"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Huy Hiệu
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={index}
                  className={`p-4 text-center rounded-lg ${!badge.earned && 'opacity-40'}`}
                  style={{ backgroundColor: 'var(--baichoi-yellow)' }}
                >
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-2"
                    style={{ 
                      backgroundColor: badge.earned ? badge.color : 'var(--baichoi-earth)',
                      opacity: badge.earned ? 1 : 0.3
                    }}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                  <p 
                    className="text-xs font-medium"
                    style={{ color: 'var(--baichoi-earth-dark)' }}
                  >
                    {badge.name}
                  </p>
                  {!badge.earned && (
                    <p className="text-xs opacity-50 mt-1">🔒</p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Motivation */}
        <div className="mt-6 text-center">
          <p 
            className="text-sm opacity-80"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            💪 Tiếp tục học tập để mở khóa thêm huy hiệu!
          </p>
        </div>
      </div>
    </div>
  );
}
