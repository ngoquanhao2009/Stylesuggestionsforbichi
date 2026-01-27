import { Button } from "@/app/components/ui/button";

interface F1WelcomeProps {
  onStart: () => void;
}

export function F1Welcome({ onStart }: F1WelcomeProps) {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: 'var(--baichoi-yellow)' }}
    >
      <div className="relative z-10 text-center max-w-2xl">
        {/* Title */}
        <h1 className="text-6xl font-black mb-6" style={{ color: 'var(--baichoi-brick)' }}>
          🎭 Bài Chòi
        </h1>
        
        {/* Subtitle */}
        <p className="text-2xl mb-12" style={{ color: 'var(--baichoi-earth)' }}>
          Hành trình học tập di sản văn hóa truyền thống
        </p>

        {/* Description */}
        <p className="text-lg mb-12 opacity-80" style={{ color: 'var(--baichoi-earth)' }}>
          Khám phá, học tập và giải cứu một trong những tuyệt tác văn hóa phi vật thể của Đà Nẵng
        </p>

        {/* Start Button */}
        <Button
          onClick={onStart}
          className="px-12 py-6 text-xl font-bold"
          style={{ 
            backgroundColor: 'var(--baichoi-brick)',
            color: 'white'
          }}
        >
          Bắt Đầu 🚀
        </Button>
      </div>
    </div>
  );
}
