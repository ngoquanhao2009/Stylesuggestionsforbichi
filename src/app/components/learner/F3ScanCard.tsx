import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Camera, Scan, ArrowLeft } from "lucide-react";

interface F3ScanCardProps {
  onBack: () => void;
  onCardDetected: (cardId: string) => void;
}

export function F3ScanCard({ onBack, onCardDetected }: F3ScanCardProps) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onCardDetected("nhi-ngheo"); // Mock detected card
            }, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [scanning, onCardDetected]);

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
            Quét Quân Bài
          </h1>
        </div>

        {/* Info Card */}
        <Card 
          className="p-6 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div 
              className="p-2 rounded"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <Scan 
                size={24}
                style={{ color: 'var(--baichoi-brick)' }}
              />
            </div>
            <div>
              <h3 
                className="mb-1"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Công nghệ: YOLO26
              </h3>
              <p 
                className="text-sm opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Sử dụng Computer Vision để nhận diện quân bài trong thời gian thực
              </p>
            </div>
          </div>
        </Card>

        {/* Camera View */}
        <Card 
          className="relative overflow-hidden border-2 bg-gray-900"
          style={{ borderColor: 'var(--baichoi-earth)', aspectRatio: '4/3' }}
        >
          {!scanning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Camera size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-6">Đặt quân bài vào khung hình</p>
                <Button 
                  onClick={() => setScanning(true)}
                  className="px-6 py-3"
                  style={{ 
                    backgroundColor: 'var(--baichoi-brick)',
                    color: 'white'
                  }}
                >
                  Bắt Đầu Quét
                </Button>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0">
              {/* Scanning Animation */}
              <div className="absolute inset-0 bg-black opacity-50"></div>
              
              {/* Detection Frame */}
              <div 
                className="absolute border-4 rounded-lg"
                style={{ 
                  top: '20%',
                  left: '20%',
                  width: '60%',
                  height: '60%',
                  borderColor: 'var(--baichoi-brick)',
                  animation: 'pulse 1s ease-in-out infinite'
                }}
              >
                {/* Corner markers */}
                <div 
                  className="absolute w-6 h-6 border-t-4 border-l-4 -top-1 -left-1"
                  style={{ borderColor: 'var(--baichoi-yellow)' }}
                />
                <div 
                  className="absolute w-6 h-6 border-t-4 border-r-4 -top-1 -right-1"
                  style={{ borderColor: 'var(--baichoi-yellow)' }}
                />
                <div 
                  className="absolute w-6 h-6 border-b-4 border-l-4 -bottom-1 -left-1"
                  style={{ borderColor: 'var(--baichoi-yellow)' }}
                />
                <div 
                  className="absolute w-6 h-6 border-b-4 border-r-4 -bottom-1 -right-1"
                  style={{ borderColor: 'var(--baichoi-yellow)' }}
                />
              </div>

              {/* Progress */}
              <div className="absolute bottom-8 left-8 right-8 text-center">
                <div 
                  className="h-2 rounded-full mb-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: 'var(--baichoi-yellow)'
                    }}
                  />
                </div>
                <p className="text-white text-sm">
                  {progress < 100 ? 'Đang phân tích...' : 'Đã nhận diện!'}
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Tips */}
        <div className="mt-6 text-center">
          <p 
            className="text-sm opacity-70"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            💡 Mẹo: Đặt quân bài trong ánh sáng tốt và giữ camera ổn định
          </p>
        </div>
      </div>
    </div>
  );
}
