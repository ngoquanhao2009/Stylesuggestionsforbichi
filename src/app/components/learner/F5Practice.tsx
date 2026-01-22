import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Mic, Square, ArrowLeft } from "lucide-react";

interface F5PracticeProps {
  onBack: () => void;
  onComplete: (score: number) => void;
}

export function F5Practice({ onBack, onComplete }: F5PracticeProps) {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [waveform, setWaveform] = useState<number[]>([]);

  useEffect(() => {
    if (recording) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
        // Generate random waveform for visualization
        setWaveform(prev => [...prev.slice(-20), Math.random() * 100]);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [recording]);

  const stopRecording = () => {
    setRecording(false);
    setTimer(0);
    // Simulate processing and move to evaluation
    setTimeout(() => {
      onComplete(85); // Mock score
    }, 1000);
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
            Chế Độ Luyện Tập
          </h1>
        </div>

        {/* Instructions */}
        <Card 
          className="p-6 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <h3 
            className="mb-3"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Hướng Dẫn
          </h3>
          <ul 
            className="space-y-2 text-sm opacity-90"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            <li>1. Nhấn nút thu âm để bắt đầu</li>
            <li>2. Hát theo lời hô đã học</li>
            <li>3. AI sẽ phân tích cao độ và nhịp điệu của bạn</li>
            <li>4. Nhận kết quả đánh giá và gợi ý cải thiện</li>
          </ul>
        </Card>

        {/* Lyrics Reference */}
        <Card 
          className="p-6 mb-6 border-2"
          style={{ 
            borderColor: 'var(--baichoi-earth)',
            backgroundColor: 'var(--baichoi-yellow-dark)'
          }}
        >
          <h3 
            className="mb-3 text-center"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Lời Hô: Nhì Nghèo
          </h3>
          <p 
            className="text-center italic text-lg"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            Nhì nghèo nhà rách, áo không còn<br />
            Nhưng lòng ngay thẳng, chẳng màng đời
          </p>
        </Card>

        {/* Recording Interface */}
        <Card 
          className="p-8 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          {/* Waveform Visualization */}
          <div className="h-32 mb-6 flex items-end justify-center gap-1">
            {recording ? (
              waveform.map((height, i) => (
                <div 
                  key={i}
                  className="w-2 rounded-full transition-all duration-100"
                  style={{ 
                    height: `${height}%`,
                    backgroundColor: 'var(--baichoi-brick)',
                    opacity: 0.7
                  }}
                />
              ))
            ) : (
              <div className="text-center opacity-50">
                <Mic 
                  size={48}
                  style={{ color: 'var(--baichoi-earth)' }}
                />
              </div>
            )}
          </div>

          {/* Timer */}
          {recording && (
            <div className="text-center mb-4">
              <p 
                className="text-2xl font-mono"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                {Math.floor(timer / 10)}:{(timer % 10).toString().padStart(2, '0')}
              </p>
            </div>
          )}

          {/* Recording Controls */}
          <div className="text-center">
            {!recording ? (
              <Button 
                onClick={() => setRecording(true)}
                className="px-8 py-6 text-lg rounded-full"
                style={{ 
                  backgroundColor: 'var(--baichoi-brick)',
                  color: 'white'
                }}
              >
                <Mic size={24} className="mr-2" />
                Bắt Đầu Thu Âm
              </Button>
            ) : (
              <Button 
                onClick={stopRecording}
                className="px-8 py-6 text-lg rounded-full"
                style={{ 
                  backgroundColor: 'var(--baichoi-earth-dark)',
                  color: 'white'
                }}
              >
                <Square size={24} className="mr-2" />
                Dừng Thu Âm
              </Button>
            )}
          </div>
        </Card>

        {/* Technology Info */}
        <Card 
          className="p-4 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <p 
            className="text-sm opacity-70"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            🤖 <strong>Công nghệ:</strong> Audio AI - Phân tích cao độ và nhịp điệu bằng Transfer Learning (MobileNet)
          </p>
        </Card>
      </div>
    </div>
  );
}
