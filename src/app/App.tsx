import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { User, Palette, Database, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Learner Components
import { F1Welcome } from "@/app/components/learner/F1Welcome";
import { F2Dashboard } from "@/app/components/learner/F2Dashboard";
import { F3ScanCard } from "@/app/components/learner/F3ScanCard";
import { F4AIAnalysis } from "@/app/components/learner/F4AIAnalysis";
import { F5Practice } from "@/app/components/learner/F5Practice";
import { F6Evaluation } from "@/app/components/learner/F6Evaluation";
import { F7Progress } from "@/app/components/learner/F7Progress";
import { F8Community } from "@/app/components/learner/F8Community";
import B6_MapDistribution from "@/app/components/learner/B6_MapDistribution";

// Artisan Components
import { ArtisanDashboard } from "@/app/components/artisan/ArtisanDashboard";
import { A1RecordSample } from "@/app/components/artisan/A1RecordSample";
import { A2AIRestoration } from "@/app/components/artisan/A2AIRestoration";
import { A3ContributeScript } from "@/app/components/artisan/A3ContributeScript";

// Researcher Components
import { ResearcherDashboard } from "@/app/components/researcher/ResearcherDashboard";
import { HeritageArchive } from "@/app/components/researcher/HeritageArchive";
import { RestorationDetail } from "@/app/components/researcher/RestorationDetail";
import { ImpactStatus } from "@/app/components/researcher/ImpactStatus";

// Style Guide
import { BaiChoiStyleGuide } from "@/app/components/BaiChoiStyleGuide";

import GlobalRipple from "@/app/components/GlobalRipple";

type Role = null | "learner" | "artisan" | "researcher" | "styleguide";
type Screen = string;

// Animation variants cho page transitions
const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

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

  let content: React.ReactNode = null;

  // Role Selection Screen
  if (role === null) {
    content = (
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
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
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
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
          </motion.div>

          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl mb-3"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Bài Chòi Echo AI
          </motion.h1>

          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-8 opacity-90"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            Chọn vai trò của bạn để bắt đầu
          </motion.p>

          {/* Role Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="p-8 cursor-pointer hover:shadow-2xl transition-all border-2 bg-white"
                style={{ borderColor: 'var(--baichoi-earth)' }}
                onClick={() => setRole("learner")}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--baichoi-brick)' }}
                >
                  <User size={32} className="text-white" />
                </motion.div>
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
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="p-8 cursor-pointer hover:shadow-2xl transition-all border-2 bg-white"
                style={{ borderColor: 'var(--baichoi-earth)' }}
                onClick={() => setRole("artisan")}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--baichoi-earth)' }}
                >
                  <User size={32} className="text-white" />
                </motion.div>
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
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="p-8 cursor-pointer hover:shadow-2xl transition-all border-2 bg-white"
                style={{ borderColor: 'var(--baichoi-earth)' }}
                onClick={() => setRole("researcher")}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'var(--baichoi-earth-dark)' }}
                >
                  <Database size={32} className="text-white" />
                </motion.div>
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
            </motion.div>
          </div>

          {/* Style Guide Link */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              onClick={() => setRole("styleguide")}
              variant="outline"
              className="mb-4 hover:scale-105 transition-transform"
              style={{ 
                borderColor: 'var(--baichoi-earth)',
                color: 'var(--baichoi-earth)'
              }}
            >
              <Palette size={18} className="mr-2" />
              Xem Style Guide
            </Button>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <p 
              className="text-sm opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Di sản văn hóa phi vật thể đại diện của nhân loại
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Style Guide
  else if (role === "styleguide") {
    content = (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={resetToRoleSelection}
            variant="outline"
            className="hover:scale-105 transition-transform"
            style={{ 
              borderColor: 'var(--baichoi-earth)',
              color: 'var(--baichoi-earth)',
              backgroundColor: 'white'
            }}
          >
            <ArrowLeft size={18} className="mr-2" />
            Quay lại
          </Button>
        </div>
        <BaiChoiStyleGuide />
      </motion.div>
    );
  }

  // Learner Flow (F1-F8)
  else if (role === "learner") {
    content = (
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          {screen === "welcome" && <F1Welcome onStart={() => setScreen("dashboard")} />}
          {screen === "dashboard" && <F2Dashboard onNavigate={setScreen} />}
          {screen === "scan" && (
            <F3ScanCard 
              onBack={() => setScreen("dashboard")}
              onCardDetected={(cardId) => {
                setDetectedCard(cardId);
                setScreen("analysis");
              }}
            />
          )}
          {screen === "analysis" && (
            <F4AIAnalysis 
              cardId={detectedCard}
              onBack={() => setScreen("scan")}
              onPractice={() => setScreen("practice")}
            />
          )}
          {screen === "practice" && (
            <F5Practice 
              onBack={() => setScreen("analysis")}
              onComplete={(score) => {
                setPracticeScore(score);
                setScreen("evaluation");
              }}
            />
          )}
          {screen === "evaluation" && (
            <F6Evaluation 
              score={practiceScore}
              onBack={() => setScreen("practice")}
              onContinue={() => setScreen("dashboard")}
              onViewProgress={() => setScreen("progress")}
            />
          )}
          {screen === "progress" && <F7Progress onBack={() => setScreen("dashboard")} />}
          {screen === "community" && <F8Community onBack={() => setScreen("dashboard")} />}
          {screen === "distribution" && <B6_MapDistribution onBack={() => setScreen("dashboard")} />}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Artisan Flow (A1-A3)
  else if (role === "artisan") {
    content = (
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          {screen === "welcome" && <ArtisanDashboard onBack={resetToRoleSelection} onNavigate={setScreen} />}
          {screen === "record" && <A1RecordSample onBack={() => setScreen("welcome")} />}
          {screen === "restoration" && <A2AIRestoration onBack={() => setScreen("welcome")} />}
          {screen === "contribute" && <A3ContributeScript onBack={() => setScreen("welcome")} />}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Researcher Flow (B1-B8)
  else if (role === "researcher") {
    content = (
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          {screen === "welcome" && <ResearcherDashboard onBack={resetToRoleSelection} onNavigate={setScreen} />}
          {screen === "archive" && (
            <HeritageArchive 
              onBack={() => setScreen("welcome")}
              onViewDetail={(id) => setScreen("restoration")}
            />
          )}
          {screen === "restoration" && (
            <RestorationDetail 
              onBack={() => setScreen("archive")}
              onConfirm={() => setScreen("welcome")}
            />
          )}
          {screen === "impact" && <ImpactStatus onBack={() => setScreen("welcome")} />}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <GlobalRipple />
      {content}
    </>
  );
}