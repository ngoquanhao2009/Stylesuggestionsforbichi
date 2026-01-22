import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { CheckCircle2, AlertCircle, Lightbulb, ArrowLeft } from "lucide-react";

interface F6EvaluationProps {
  score: number;
  onBack: () => void;
  onContinue: () => void;
}

export function F6Evaluation({ score, onBack, onContinue }: F6EvaluationProps) {
  const passed = score >= 70;
  
  const feedback = [
    {
      aspect: "Cao độ (Pitch)",
      score: 88,
      status: "good",
      tip: "Rất tốt! Giọng hát của bạn đã chính xác"
    },
    {
      aspect: "Nhịp điệu (Rhythm)",
      score: 82,
      status: "good",
      tip: "Tốt! Giữ được nhịp ổn định"
    },
    {
      aspect: "Ngân nga (Vibrato)",
      score: 68,
      status: "improve",
      tip: "Cần luyện thêm kỹ thuật luyến láy đặc trưng miền Trung"
    }
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
            Kết Quả Đánh Giá
          </h1>
        </div>

        {/* Overall Score */}
        <Card 
          className="p-8 mb-6 text-center border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <div 
            className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-4"
            style={{ 
              backgroundColor: passed ? 'var(--baichoi-earth)' : 'var(--baichoi-brick)',
              opacity: 0.1
            }}
          >
            <div 
              className="flex items-center justify-center w-28 h-28 rounded-full"
              style={{ 
                backgroundColor: passed ? 'var(--baichoi-earth)' : 'var(--baichoi-brick)'
              }}
            >
              <span className="text-4xl text-white">{score}</span>
            </div>
          </div>
          
          <h2 
            className="text-2xl mb-2"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            {passed ? "Xuất Sắc!" : "Cố Gắng Thêm!"}
          </h2>
          <p 
            className="opacity-80"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            {passed 
              ? "Bạn đã thực hiện rất tốt làn điệu Nhì Nghèo" 
              : "Hãy luyện tập thêm để cải thiện kỹ năng"}
          </p>
        </Card>

        {/* Detailed Feedback */}
        <div className="space-y-4 mb-6">
          {feedback.map((item, index) => (
            <Card 
              key={index}
              className="p-4 border-2 bg-white"
              style={{ borderColor: 'var(--baichoi-earth)' }}
            >
              <div className="flex items-start gap-3 mb-3">
                {item.status === 'good' ? (
                  <CheckCircle2 
                    size={20}
                    style={{ color: 'var(--baichoi-earth)', marginTop: '2px' }}
                  />
                ) : (
                  <AlertCircle 
                    size={20}
                    style={{ color: 'var(--baichoi-brick)', marginTop: '2px' }}
                  />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 
                      className="font-medium"
                      style={{ color: 'var(--baichoi-earth-dark)' }}
                    >
                      {item.aspect}
                    </h3>
                    <span 
                      className="text-sm"
                      style={{ color: 'var(--baichoi-earth)' }}
                    >
                      {item.score}/100
                    </span>
                  </div>
                  <Progress 
                    value={item.score} 
                    className="mb-2 h-2"
                  />
                  <p 
                    className="text-sm opacity-70"
                    style={{ color: 'var(--baichoi-earth)' }}
                  >
                    {item.tip}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Suggestions */}
        <Card 
          className="p-6 mb-6 border-2"
          style={{ 
            borderColor: 'var(--baichoi-brick)',
            backgroundColor: 'var(--baichoi-yellow-dark)'
          }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb 
              size={24}
              style={{ color: 'var(--baichoi-brick)' }}
            />
            <div>
              <h3 
                className="mb-2"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Gợi Ý Cải Thiện
              </h3>
              <ul 
                className="text-sm space-y-1 opacity-90"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                <li>• Luyện thở từ bụng để kiểm soát hơi tốt hơn</li>
                <li>• Nghe lại âm thanh mẫu nghệ nhân nhiều lần</li>
                <li>• Tập trung vào kỹ thuật luyến láy cuối câu</li>
              </ul>
            </div>
          </div>
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
            🤖 <strong>Công nghệ:</strong> Audio AI + Speech Processing - So sánh với nghệ nhân mẫu bằng Transfer Learning
          </p>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            onClick={onBack}
            variant="outline"
            className="flex-1 py-6"
            style={{ 
              borderColor: 'var(--baichoi-earth)',
              color: 'var(--baichoi-earth)'
            }}
          >
            Luyện Lại
          </Button>
          <Button 
            onClick={onContinue}
            className="flex-1 py-6"
            style={{ 
              backgroundColor: 'var(--baichoi-brick)',
              color: 'white'
            }}
          >
            Tiếp Tục
          </Button>
        </div>
      </div>
    </div>
  );
}
