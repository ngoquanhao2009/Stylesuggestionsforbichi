import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Volume2, BookOpen, AlertCircle, ArrowLeft } from "lucide-react";
import { CARD_DATA } from "@/app/data/mockData";

interface F4AIAnalysisProps {
  cardId: string;
  onBack: () => void;
  onPractice: () => void;
}

export function F4AIAnalysis({ cardId, onBack, onPractice }: F4AIAnalysisProps) {
  const card = CARD_DATA.find(c => c.id === cardId) || CARD_DATA[0];

  const playAudio = () => {
    // Mock audio playback
    alert("Đang phát âm thanh mẫu của nghệ nhân...");
  };

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
            Kết Quả Phân Tích
          </h1>
        </div>

        {/* AI Disclaimer */}
        <Card 
          className="p-4 mb-6 border-2 bg-yellow-50"
          style={{ borderColor: 'var(--baichoi-brick)' }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle 
              size={20}
              style={{ color: 'var(--baichoi-brick)', marginTop: '2px' }}
            />
            <p 
              className="text-sm"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              <strong>Lưu ý:</strong> Kết quả AI chỉ mang tính chất gợi ý tham khảo. Con người là bên quyết định cuối cùng.
            </p>
          </div>
        </Card>

        {/* Card Info */}
        <Card 
          className="p-8 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          {/* Card Visual */}
          <div 
            className="h-48 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: 'var(--baichoi-earth)' }}
          >
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="card-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2" fill="white" />
                  <circle cx="30" cy="30" r="2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#card-pattern)" />
            </svg>
            <div className="relative z-10 text-center text-white">
              <h2 className="text-4xl mb-2">{card.name}</h2>
              <p className="opacity-80">{card.region}</p>
            </div>
          </div>

          {/* Story */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen 
                size={20}
                style={{ color: 'var(--baichoi-brick)' }}
              />
              <h3 
                className="text-lg"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Sự Tích
              </h3>
            </div>
            <p 
              className="opacity-90 leading-relaxed"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              {card.story}
            </p>
          </div>

          {/* Lyrics */}
          <div 
            className="p-4 rounded-lg mb-6"
            style={{ backgroundColor: 'var(--baichoi-yellow)' }}
          >
            <h3 
              className="mb-2"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Lời Hô Truyền Thống
            </h3>
            <p 
              className="italic"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              {card.lyrics}
            </p>
          </div>

          {/* Audio Sample */}
          <Button 
            onClick={playAudio}
            className="w-full mb-4"
            style={{ 
              backgroundColor: 'var(--baichoi-earth)',
              color: 'white'
            }}
          >
            <Volume2 size={20} className="mr-2" />
            Nghe Âm Thanh Mẫu Nghệ Nhân
          </Button>
        </Card>

        {/* Technology Info */}
        <Card 
          className="p-4 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <p 
            className="text-sm opacity-70"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            🤖 <strong>Công nghệ:</strong> NLP (Xử lý ngôn ngữ tự nhiên) + AR (Thực tế tăng cường)
          </p>
        </Card>

        {/* CTA */}
        <Button 
          onClick={onPractice}
          className="w-full py-6 text-lg"
          style={{ 
            backgroundColor: 'var(--baichoi-brick)',
            color: 'white'
          }}
        >
          Bắt Đầu Luyện Tập
        </Button>
      </div>
    </div>
  );
}
