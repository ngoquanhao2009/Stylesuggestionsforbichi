import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { ArrowLeft, Play, AlertCircle, Sparkles } from "lucide-react";

interface RestorationDetailProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function RestorationDetail({ onBack, onConfirm }: RestorationDetailProps) {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const startRestoration = () => {
    setProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setCompleted(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--baichoi-yellow)' }}
    >
      <div className="max-w-3xl mx-auto">
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
            B4 - Chi Tiết Phục Dựng
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

        {/* File Info */}
        <Card 
          className="p-6 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <h2 
            className="text-xl mb-4"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Làn điệu Bài Chòi cổ Quảng Nam
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p 
                className="opacity-70 mb-1"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Vùng miền
              </p>
              <p 
                className="font-medium"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Quảng Nam
              </p>
            </div>
            <div>
              <p 
                className="opacity-70 mb-1"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Năm ghi âm
              </p>
              <p 
                className="font-medium"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                1970
              </p>
            </div>
            <div>
              <p 
                className="opacity-70 mb-1"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Chất lượng hiện tại
              </p>
              <p 
                className="font-medium"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Trung bình (Nhiều nhiễu)
              </p>
            </div>
            <div>
              <p 
                className="opacity-70 mb-1"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Kích thước
              </p>
              <p 
                className="font-medium"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                2.4 MB
              </p>
            </div>
          </div>

          {/* Original Audio */}
          <div 
            className="p-4 rounded-lg mb-4"
            style={{ backgroundColor: 'var(--baichoi-yellow)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <p 
                className="font-medium"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Bản ghi âm gốc
              </p>
              <Button 
                size="sm"
                variant="outline"
                style={{ 
                  borderColor: 'var(--baichoi-earth)',
                  color: 'var(--baichoi-earth)'
                }}
              >
                <Play size={16} className="mr-1" />
                Phát
              </Button>
            </div>
            <div 
              className="h-16 rounded flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            >
              <div className="flex gap-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div 
                    key={i}
                    className="w-1 rounded-full bg-gray-400"
                    style={{ height: `${Math.random() * 40 + 10}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* AI Restoration Process */}
        <Card 
          className="p-6 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles 
              size={20}
              style={{ color: 'var(--baichoi-brick)' }}
            />
            <h3 
              className="text-lg"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Quy Trình Phục Dựng AI
            </h3>
          </div>

          <div className="space-y-4 mb-6">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <p 
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                1. Tiền xử lý
              </p>
              <p 
                className="text-xs opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Chuyển âm thanh cổ thành Spectrogram
              </p>
            </div>

            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <p 
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                2. Khử nhiễu
              </p>
              <p 
                className="text-xs opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Dùng mô hình U-Net để lọc nhiễu nền
              </p>
            </div>

            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <p 
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                3. Làm rõ (Enhancement)
              </p>
              <p 
                className="text-xs opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Dùng GANs để khôi phục tần số âm thanh bị mất
              </p>
            </div>

            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: 'var(--baichoi-yellow)' }}
            >
              <p 
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                4. Hậu xử lý
              </p>
              <p 
                className="text-xs opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Chuyển đổi ngược lại thành định dạng âm thanh chuẩn
              </p>
            </div>
          </div>

          {!processing && !completed && (
            <Button 
              onClick={startRestoration}
              className="w-full py-6"
              style={{ 
                backgroundColor: 'var(--baichoi-brick)',
                color: 'white'
              }}
            >
              <Sparkles size={20} className="mr-2" />
              Bắt Đầu Phục Dựng AI
            </Button>
          )}

          {processing && (
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span style={{ color: 'var(--baichoi-earth)' }}>
                  Đang xử lý...
                </span>
                <span style={{ color: 'var(--baichoi-earth)' }}>
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          )}

          {completed && (
            <div>
              <div 
                className="p-4 rounded-lg mb-4"
                style={{ backgroundColor: 'var(--baichoi-yellow-dark)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p 
                    className="font-medium"
                    style={{ color: 'var(--baichoi-earth-dark)' }}
                  >
                    Bản phục dựng AI
                  </p>
                  <Button 
                    size="sm"
                    style={{ 
                      backgroundColor: 'var(--baichoi-brick)',
                      color: 'white'
                    }}
                  >
                    <Play size={16} className="mr-1" />
                    Phát
                  </Button>
                </div>
                <div 
                  className="h-16 rounded flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                >
                  <div className="flex gap-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div 
                        key={i}
                        className="w-1 rounded-full"
                        style={{ 
                          height: `${Math.random() * 50 + 20}px`,
                          backgroundColor: 'var(--baichoi-brick)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  className="flex-1"
                  style={{ 
                    borderColor: 'var(--baichoi-earth)',
                    color: 'var(--baichoi-earth)'
                  }}
                >
                  Từ Chối
                </Button>
                <Button 
                  onClick={onConfirm}
                  className="flex-1"
                  style={{ 
                    backgroundColor: 'var(--baichoi-earth)',
                    color: 'white'
                  }}
                >
                  Xác Nhận Phục Dựng
                </Button>
              </div>
            </div>
          )}
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
            🤖 <strong>Công nghệ:</strong> Deep Learning (U-Net + GANs) - Khử nhiễu và phục dựng băng ghi âm cổ
          </p>
        </Card>
      </div>
    </div>
  );
}
