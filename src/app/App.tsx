import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { User, Palette, Database } from "lucide-react";

// Learner Components
import { F1Welcome } from "@/app/components/learner/F1Welcome";
import { F2Dashboard } from "@/app/components/learner/F2Dashboard";
import { F3ScanCard } from "@/app/components/learner/F3ScanCard";
import { F4AIAnalysis } from "@/app/components/learner/F4AIAnalysis";
import { F5Practice } from "@/app/components/learner/F5Practice";
import { F6Evaluation } from "@/app/components/learner/F6Evaluation";
import { F7Progress } from "@/app/components/learner/F7Progress";
import { F8Community } from "@/app/components/learner/F8Community";

// Artisan Components
import { ArtisanDashboard } from "@/app/components/artisan/ArtisanDashboard";

// Researcher Components
import { ResearcherDashboard } from "@/app/components/researcher/ResearcherDashboard";
import { HeritageArchive } from "@/app/components/researcher/HeritageArchive";
import { RestorationDetail } from "@/app/components/researcher/RestorationDetail";
import { ImpactStatus } from "@/app/components/researcher/ImpactStatus";

// Style Guide
import { BaiChoiStyleGuide } from "@/app/components/BaiChoiStyleGuide";

type Role = null | "learner" | "artisan" | "researcher" | "styleguide";
type Screen = string;

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [screen, setScreen] = useState<Screen>("welcome");
  const [detectedCard, setDetectedCard] = useState<string>("");
  const [practiceScore, setPracticeScore] = useState<number>(0);

  // Reset to role selection
  const resetToRoleSelection = () => {
    setRole(null);
    setScreen("welcome");
  };

  // Role Selection Screen
  if (role === null) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-8"
        style={{ backgroundColor: 'var(--baichoi-yellow)' }}
      >
        {/* Folk Pattern Background */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="role-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="2" fill="var(--baichoi-earth)" />
              <circle cx="45" cy="15" r="2" fill="var(--baichoi-earth)" />
              <circle cx="15" cy="45" r="2" fill="var(--baichoi-earth)" />
              <circle cx="45" cy="45" r="2" fill="var(--baichoi-earth)" />
              <path d="M30 20 L35 30 L30 40 L25 30 Z" fill="var(--baichoi-brick)" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#role-pattern)" />
        </svg>

        <div className="relative z-10 text-center max-w-4xl w-full">
          {/* Logo */}
          <div 
            className="inline-block p-6 rounded-full mb-6"
            style={{ backgroundColor: 'var(--baichoi-earth)' }}
          >
            <svg 
              width="60" 
              height="60" 
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

          <h1 
            className="text-4xl md:text-5xl mb-3"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Bài Chòi Echo AI
          </h1>

          <p 
            className="text-lg mb-8 opacity-90"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            Chọn vai trò của bạn để bắt đầu
          </p>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card 
              className="p-8 cursor-pointer hover:shadow-xl transition-all border-2 bg-white hover:scale-105"
              style={{ borderColor: 'var(--baichoi-earth)' }}
              onClick={() => setRole("learner")}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--baichoi-brick)' }}
              >
                <User size={32} className="text-white" />
              </div>
              <h2 
                className="text-xl mb-3"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Người Học
              </h2>
              <p 
                className="text-sm opacity-80"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Học diễn xướng Bài Chòi với sự hỗ trợ của AI
              </p>
            </Card>

            <Card 
              className="p-8 cursor-pointer hover:shadow-xl transition-all border-2 bg-white hover:scale-105"
              style={{ borderColor: 'var(--baichoi-earth)' }}
              onClick={() => setRole("artisan")}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--baichoi-earth)' }}
              >
                <User size={32} className="text-white" />
              </div>
              <h2 
                className="text-xl mb-3"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Nghệ Nhân
              </h2>
              <p 
                className="text-sm opacity-80"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Thu âm mẫu và xác nhận phục dựng AI
              </p>
            </Card>

            <Card 
              className="p-8 cursor-pointer hover:shadow-xl transition-all border-2 bg-white hover:scale-105"
              style={{ borderColor: 'var(--baichoi-earth)' }}
              onClick={() => setRole("researcher")}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--baichoi-earth-dark)' }}
              >
                <Database size={32} className="text-white" />
              </div>
              <h2 
                className="text-xl mb-3"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Nhà Nghiên Cứu
              </h2>
              <p 
                className="text-sm opacity-80"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Số hóa và bảo tồn di sản văn hóa
              </p>
            </Card>
          </div>

          {/* Style Guide Link */}
          <Button 
            onClick={() => setRole("styleguide")}
            variant="outline"
            className="mb-4"
            style={{ 
              borderColor: 'var(--baichoi-earth)',
              color: 'var(--baichoi-earth)'
            }}
          >
            <Palette size={18} className="mr-2" />
            Xem Style Guide
          </Button>

          <div className="mt-8">
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

  // Style Guide
  if (role === "styleguide") {
    return <BaiChoiStyleGuide />;
  }

  // Learner Flow (F1-F8)
  if (role === "learner") {
    if (screen === "welcome") {
      return <F1Welcome onStart={() => setScreen("dashboard")} />;
    }
    if (screen === "dashboard") {
      return <F2Dashboard onNavigate={setScreen} />;
    }
    if (screen === "scan") {
      return (
        <F3ScanCard 
          onBack={() => setScreen("dashboard")}
          onCardDetected={(cardId) => {
            setDetectedCard(cardId);
            setScreen("analysis");
          }}
        />
      );
    }
    if (screen === "analysis") {
      return (
        <F4AIAnalysis 
          cardId={detectedCard}
          onBack={() => setScreen("scan")}
          onPractice={() => setScreen("practice")}
        />
      );
    }
    if (screen === "practice") {
      return (
        <F5Practice 
          onBack={() => setScreen("analysis")}
          onComplete={(score) => {
            setPracticeScore(score);
            setScreen("evaluation");
          }}
        />
      );
    }
    if (screen === "evaluation") {
      return (
        <F6Evaluation 
          score={practiceScore}
          onBack={() => setScreen("practice")}
          onContinue={() => setScreen("dashboard")}
        />
      );
    }
    if (screen === "progress") {
      return <F7Progress onBack={() => setScreen("dashboard")} />;
    }
    if (screen === "community") {
      return <F8Community onBack={() => setScreen("dashboard")} />;
    }
  }

  // Artisan Flow (A1-A3)
  if (role === "artisan") {
    return <ArtisanDashboard onBack={resetToRoleSelection} onNavigate={setScreen} />;
  }

  // Researcher Flow (B1-B8)
  if (role === "researcher") {
    if (screen === "welcome") {
      return <ResearcherDashboard onBack={resetToRoleSelection} onNavigate={setScreen} />;
    }
    if (screen === "archive") {
      return (
        <HeritageArchive 
          onBack={() => setScreen("welcome")}
          onViewDetail={(id) => setScreen("restoration")}
        />
      );
    }
    if (screen === "restoration") {
      return (
        <RestorationDetail 
          onBack={() => setScreen("archive")}
          onConfirm={() => setScreen("welcome")}
        />
      );
    }
    if (screen === "impact") {
      return <ImpactStatus onBack={() => setScreen("welcome")} />;
    }
  }

  return null;
}
