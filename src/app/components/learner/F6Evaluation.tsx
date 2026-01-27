import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import {
  F6Stage1_EmotionalHero,
  F6Stage2_VisualComparison,
  F6Stage3_TechnicalBreakdown,
  F6Stage4_ActionRecommendation,
  F6AIEthicsNotice,
} from "./F6_Stages";

interface F6EvaluationProps {
  score: number;
  onBack: () => void;
  onContinue: () => void;
  onViewProgress?: () => void;
  onRetry?: () => void;
}

export function F6Evaluation({
  score,
  onBack,
  onContinue,
  onViewProgress,
  onRetry,
}: F6EvaluationProps) {
  // 📊 Stage 1: Emotional Feedback
  const getEmotionalMessage = (score: number): string => {
    if (score >= 85) {
      return "Xuất sắc! Giọng hô của bạn đã giữ đúng nhịp điệu cơ bản, cao độ chuẩn xác. Chỉ cần giữ vững phong độ này thôi! 🌟";
    }
    if (score >= 70) {
      return "Tốt rồi! Giọng hô của bạn đã giữ đúng nhịp điệu cơ bản. Chỉ cần điều chỉnh cao độ ở đoạn cuối là hoàn hảo!";
    }
    if (score >= 50) {
      return "Cố lên nào! Bạn đã bắt được nhịp cơ bản. Bây giờ chúng ta sẽ luyện tập để cải thiện cao độ và độ ngân nhé.";
    }
    return "Bắt đầu từ đây nào! Đó là lần đầu tiên bạn hát, rất tự nhiên. Chúng ta sẽ luyện từng phần một, từ từ mà làm.";
  };

  // 📊 Stage 3: Technical Analysis
  const analyses = [
    {
      title: "Cao độ (Pitch)",
      emoji: "🎵",
      percentage: 72,
      explanation:
        "Bạn lên hơi thấp ở đoạn kết, đặc biệt ở tiếng '...'. Phần đầu rất chuẩn.",
      hypothesis: "Có thể do hơi hết lúc kết thúc hoặc chưa căng dây thanh âm đủ.",
    },
    {
      title: "Nhịp điệu (Rhythm)",
      emoji: "⏱️",
      percentage: 85,
      explanation:
        "Nhịp hô khá đều! Chỉ bị nhanh một chút ở đoạn mở đầu (0-3 giây).",
      hypothesis:
        "Có thể do hồi hộp hay chưa quen. Lần tiếp theo hãy thở sâu trước khi bắt đầu.",
    },
    {
      title: "Độ ngân & Cảm xúc",
      emoji: "💨",
      percentage: 65,
      explanation:
        "Chưa giữ được độ ngân dài như nghệ nhân. Tiếng cuối bị cắt nhanh.",
      hypothesis:
        "Có thể do thiếu hơi lúc hát tiếng cuối hoặc chưa có kỹ thuật giữ hơi.",
    },
  ];  // 📊 Stage 4: Action Recommendations
  const actionItems = [
    {
      id: "1",
      text: "Luyện riêng đoạn kết",
      duration: "3-5 lần",
    },
    {
      id: "2",
      text: "Phát hành hơi từ từ ở tiếng cuối",
      duration: "Cẩn thận",
    },
    {
      id: "3",
      text: "Nghe lại bản mẫu 2 lần trước khi thu",
      duration: "Chuẩn bị",
    },
  ];

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--baichoi-yellow)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4"
            style={{ color: "var(--baichoi-earth)" }}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--baichoi-earth-dark)" }}
          >
            Kết Quả Đánh Giá
          </h1>
        </div>

        {/* 🟢 STAGE 1: Emotional Hero */}
        <F6Stage1_EmotionalHero
          score={score}
          feedback={getEmotionalMessage(score)}
        />

        {/* 🟡 STAGE 2: Visual Comparison */}
        <F6Stage2_VisualComparison
          originalWaveform="▁▂▃▂▁▂▅▄▃▂▁▂▃▄▂▁"
          userWaveform="▁▂▂▁▂▁▃▂▂▁▂▂▃▂▂"
          onPlayBoth={() => console.log("Play both")}
          onReplay={() => console.log("Replay")}
        />

        {/* 🔵 STAGE 3: Technical Breakdown */}
        <F6Stage3_TechnicalBreakdown analyses={analyses} />

        {/* 🟣 STAGE 4: Action Recommendation */}
        <F6Stage4_ActionRecommendation
          actions={actionItems}
          onRetry={onRetry || onBack}
          onListenSample={() => console.log("Listen sample")}
          onSaveProgress={onViewProgress}
          onContinue={onContinue}
        />

        {/* ⚠️ AI Ethics Notice */}
        <F6AIEthicsNotice />
      </div>
    </div>
  );
}
