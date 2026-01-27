import { ReactNode } from "react";

interface Stage1Props {
  score: number;
  feedback: string;
}

export function F6Stage1_EmotionalHero({ score, feedback }: Stage1Props) {
  const getStatus = (score: number) => {
    if (score >= 80) return { icon: "🟢", label: "Xuất sắc", color: "#4CAF50" };
    if (score >= 60) return { icon: "🟡", label: "Tốt lắm", color: "#FFC107" };
    return { icon: "🔴", label: "Cố lên", color: "#F44336" };
  };

  const status = getStatus(score);

  return (
    <div
      className="rounded-lg p-8 mb-6 text-center border-2 bg-white"
      style={{
        borderColor: status.color,
        boxShadow: `0 4px 12px ${status.color}22`,
      }}
    >
      {/* Status Icon - Large */}
      <div className="text-6xl mb-4">{status.icon}</div>

      {/* Main Feedback */}
      <p
        className="text-lg leading-relaxed mb-4 font-medium"
        style={{ color: "#333" }}
      >
        {feedback}
      </p>

      {/* Score Display */}
      <div
        className="inline-block px-6 py-2 rounded-full text-white font-bold"
        style={{ backgroundColor: status.color }}
      >
        Tổng điểm: {score} / 100
      </div>
    </div>
  );
}

/**
 * TẦNG 2: Visual Comparison
 * Mục tiêu: Người học tự nhìn thấy khác biệt
 */

interface Stage2Props {
  originalWaveform: string; // Base64 or SVG path
  userWaveform: string;
  onPlayBoth: () => void;
  onReplay: () => void;
}

export function F6Stage2_VisualComparison({
  originalWaveform,
  userWaveform,
  onPlayBoth,
  onReplay,
}: Stage2Props) {
  return (
    <div
      className="rounded-lg p-6 mb-6 bg-white border border-gray-200"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h3 className="font-bold text-lg mb-4" style={{ color: "#333" }}>
        So sánh trực quan
      </h3>

      {/* Original */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="text-xl mr-2">🎤</span>
          <span className="font-medium" style={{ color: "#666" }}>
            Bản gốc (Nghệ nhân)
          </span>
        </div>
        <div
          className="p-4 rounded bg-gray-50 border border-gray-300"
          style={{
            fontFamily: "monospace",
            fontSize: "2rem",
            color: "#4CAF50",
            lineHeight: "1",
          }}
        >
          {originalWaveform}
        </div>
      </div>

      {/* User */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="text-xl mr-2">👤</span>
          <span className="font-medium" style={{ color: "#666" }}>
            Bản của bạn
          </span>
        </div>
        <div
          className="p-4 rounded bg-gray-50 border"
          style={{
            fontFamily: "monospace",
            fontSize: "2rem",
            color: "#FFC107",
            lineHeight: "1",
            borderColor: "#FFC107",
          }}
        >
          {userWaveform}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={onPlayBoth}
          className="px-4 py-2 rounded font-medium flex items-center gap-2"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          ▶ Nghe cùng lúc
        </button>
        <button
          onClick={onReplay}
          className="px-4 py-2 rounded font-medium flex items-center gap-2 border"
          style={{
            borderColor: "#FFC107",
            color: "#FFC107",
          }}
        >
          🔄 Nghe lại
        </button>
      </div>

      {/* Hint */}
      <p className="text-center text-sm mt-4" style={{ color: "#999" }}>
        💡 So sánh phần xanh (trùng) vs phần vàng (lệch)
      </p>
    </div>
  );
}

/**
 * TẦNG 3: Technical Breakdown
 * 3 thẻ phân tích (Cao độ, Nhịp điệu, Cảm xúc)
 */

interface AnalysisItem {
  title: string;
  emoji: string;
  percentage: number;
  explanation: string;
  hypothesis: string; // "Có thể do..."
}

interface Stage3Props {
  analyses: AnalysisItem[];
}

function AnalysisCard({ item }: { item: AnalysisItem }) {
  const getBarColor = (pct: number) => {
    if (pct >= 80) return "#4CAF50"; // Green
    if (pct >= 60) return "#FFC107"; // Yellow
    return "#F8BFBF"; // Light red
  };

  const barColor = getBarColor(item.percentage);

  return (
    <div
      className="rounded-lg p-4 bg-white border border-gray-200"
      style={{
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      }}
    >
      {/* Title */}
      <div className="flex items-center mb-3">
        <span className="text-2xl mr-2">{item.emoji}</span>
        <span className="font-bold" style={{ color: "#333" }}>
          {item.title}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div
          className="w-full h-3 bg-gray-200 rounded-full overflow-hidden"
          style={{}}
        >
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${item.percentage}%`,
              backgroundColor: barColor,
            }}
          />
        </div>
        <div className="text-right text-sm font-medium mt-1" style={{ color: barColor }}>
          {item.percentage}%
        </div>
      </div>

      {/* Explanation */}
      <p className="text-sm mb-2" style={{ color: "#666", lineHeight: "1.4" }}>
        {item.explanation}
      </p>

      {/* Hypothesis */}
      <p
        className="text-xs italic p-2 rounded bg-blue-50"
        style={{ color: "#1976D2", borderLeft: "3px solid #1976D2" }}
      >
        💡 {item.hypothesis}
      </p>
    </div>
  );
}

export function F6Stage3_TechnicalBreakdown({ analyses }: Stage3Props) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-4" style={{ color: "#333" }}>
        Phân tích chi tiết
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analyses.map((item, idx) => (
          <AnalysisCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

/**
 * TẦNG 4: Action Recommendation
 * Checklist + CTA buttons
 */

interface RecommendationAction {
  id: string;
  text: string;
  duration?: string;
}

interface Stage4Props {
  actions: RecommendationAction[];
  onRetry: () => void;
  onListenSample: () => void;
  onSaveProgress: () => void;
  onContinue: () => void;
}

export function F6Stage4_ActionRecommendation({
  actions,
  onRetry,
  onListenSample,
  onSaveProgress,
  onContinue,
}: Stage4Props) {
  return (
    <div
      className="rounded-lg p-6 bg-white border-2 mb-6"
      style={{
        borderColor: "#1976D2",
        backgroundColor: "#F0F8FF",
      }}
    >
      {/* Title */}
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">🎯</span>
        <span className="font-bold text-lg" style={{ color: "#333" }}>
          Luyện tập lần tiếp theo
        </span>
      </div>

      {/* Checklist */}
      <div className="mb-6 space-y-2">
        {actions.map((action) => (
          <div key={action.id} className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1"
              style={{
                accentColor: "#4CAF50",
                width: "20px",
                height: "20px",
              }}
            />
            <label className="text-sm flex-1" style={{ color: "#333" }}>
              {action.text}
              {action.duration && (
                <span style={{ color: "#999" }}> ({action.duration})</span>
              )}
            </label>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={onRetry}
          className="px-3 py-2 rounded font-medium text-sm flex items-center justify-center gap-1"
          style={{
            backgroundColor: "#FF9800",
            color: "white",
          }}
        >
          🔁 Luyện lại
        </button>
        <button
          onClick={onListenSample}
          className="px-3 py-2 rounded font-medium text-sm flex items-center justify-center gap-1"
          style={{
            backgroundColor: "#2196F3",
            color: "white",
          }}
        >
          🎧 Nghe mẫu
        </button>
        <button
          onClick={onSaveProgress}
          className="px-3 py-2 rounded font-medium text-sm flex items-center justify-center gap-1 border"
          style={{
            borderColor: "#4CAF50",
            color: "#4CAF50",
          }}
        >
          📈 Lưu tiến độ
        </button>
        <button
          onClick={onContinue}
          className="px-3 py-2 rounded font-medium text-sm flex items-center justify-center gap-1"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          ✓ Tiếp tục
        </button>
      </div>
    </div>
  );
}

/**
 * Optional: AI Ethics Notice
 */
export function F6AIEthicsNotice() {
  return (
    <div
      className="rounded-lg p-3 text-xs text-center border"
      style={{
        backgroundColor: "#F5F5F5",
        borderColor: "#DDD",
        color: "#666",
      }}
    >
      <span style={{ marginRight: "6px" }}>ℹ️</span>
      Kết quả AI chỉ mang tính gợi ý. Cảm nhận của bạn và lời nhận xét của thầy
      cô là quan trọng nhất.
    </div>
  );
}
