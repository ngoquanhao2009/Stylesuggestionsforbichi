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
      {/* Folk Pattern Background */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="welcome-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="2" fill="var(--baichoi-earth)" />
            <circle cx="45" cy="15" r="2" fill="var(--baichoi-earth)" />
            <circle cx="15" cy="45" r="2" fill="var(--baichoi-earth)" />
            <circle cx="45" cy="45" r="2" fill="var(--baichoi-earth)" />
            <path d="M30 20 L35 30 L30 40 L25 30 Z" fill="var(--baichoi-brick)" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#welcome-pattern)" />
      </svg>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo */}
        <div 
          className="inline-block p-8 rounded-full mb-6"
          style={{ backgroundColor: 'var(--baichoi-earth)' }}
        >
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 80 80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="35" stroke="var(--baichoi-yellow)" strokeWidth="3" />
            <path 
              d="M25 40 L35 50 L55 30" 
              stroke="var(--baichoi-yellow)" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="40" cy="40" r="8" fill="var(--baichoi-brick)" />
          </svg>
        </div>

        {/* Title */}
        <h1 
          className="text-5xl mb-4"
          style={{ color: 'var(--baichoi-earth-dark)' }}
        >
          Bài Chòi Echo AI
        </h1>

        {/* Tagline */}
        <p 
          className="text-xl mb-8 opacity-90"
          style={{ color: 'var(--baichoi-earth)' }}
        >
          Gìn giữ di sản - Kết nối thế hệ<br />
          <span className="text-base">Bảo tồn nghệ thuật dân gian Bài Chòi với công nghệ AI</span>
        </p>

        {/* CTA Button */}
        <Button 
          onClick={onStart}
          className="px-8 py-6 text-lg"
          style={{ 
            backgroundColor: 'var(--baichoi-brick)',
            color: 'white'
          }}
        >
          Bắt Đầu Hành Trình
        </Button>

        {/* UNESCO Badge */}
        <div className="mt-12">
          <p 
            className="text-sm opacity-70"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            Di sản văn hóa phi vật thể đại diện của nhân loại
          </p>
        </div>
      </div>
    </div>
  );
}
