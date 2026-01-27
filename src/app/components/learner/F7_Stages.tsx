import React, { useState, useEffect } from "react";

/**
 * PHẦN 1: TỔNG QUAN HÀNH TRÌNH (Journey Overview)
 * 
 * Mục tiêu: Trấn an + động lực
 * Animation: Count-up + progress bar fill + icon scale
 */

interface JourneyOverviewProps {
  totalCards: number;
  completedCards: number;
  nextMilestone?: {
    target: number;
    reward: string;
  };
}

const getProgressMessage = (percentage: number) => {
  if (percentage < 30) return "🌱 Bạn mới bắt đầu hành trình. Cứ tiếp tục thôi!";
  if (percentage < 60) return "🌿 Bạn đã đi được 1/3 con đường. Rất tốt!";
  if (percentage < 85) return "🌳 Bạn sắp hoàn thành chặng cơ bản. Một chút nữa thôi!";
  return "🎉 Bạn đã nắm vững phần cơ bản. Sẵn sàng cho những bài cao hơn!";
};

const getProgressColor = (percentage: number): string => {
  if (percentage < 25) return "#90EE90";
  if (percentage < 50) return "#7FD87F";
  if (percentage < 75) return "#6EC26E";
  return "#4CAF50";
};

export function F7Part1_JourneyOverview({
  totalCards,
  completedCards,
  nextMilestone,
}: JourneyOverviewProps) {
  const [displayCount, setDisplayCount] = useState(0);
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const percentage = Math.round((completedCards / totalCards) * 100);

  // Counter animation + percentage count-up (sync 0.8s)
  useEffect(() => {
    let currentCount = 0;
    let currentPct = 0;
    const stepSize = completedCards / 25;  // 25 steps = 0.8s
    const pctStepSize = percentage / 25;
    
    const timer = setInterval(() => {
      currentCount = Math.min(currentCount + stepSize, completedCards);
      currentPct = Math.min(currentPct + pctStepSize, percentage);
      
      setDisplayCount(Math.round(currentCount));
      setDisplayPercentage(Math.round(currentPct));
      
      if (currentCount >= completedCards) clearInterval(timer);
    }, 32);  // ~25 frames = 0.8s
    
    return () => clearInterval(timer);
  }, [completedCards, percentage]);

  return (
    <div
      className="rounded-lg p-8 mb-6 text-center border-2 bg-white"
      style={{
        borderColor: "var(--baichoi-earth)",
        boxShadow: "0 4px 16px rgba(139,113,73,0.15)",
      }}
    >
      {/* Title */}
      <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--baichoi-earth-dark)" }}>
        🎶 Hành trình Bài Chòi của bạn
      </h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full transition-all duration-1000 ease-out"
            style={{
              width: `${percentage}%`,
              backgroundColor: "var(--baichoi-earth)",
            }}
          />
        </div>
        <div className="text-2xl font-bold" style={{ color: "var(--baichoi-earth-dark)" }}>
          {percentage}%
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6">
        <p className="text-4xl font-bold mb-2" style={{ color: "var(--baichoi-earth)" }}>
          {displayCount} / {totalCards}
        </p>
        <p className="text-lg" style={{ color: "#666" }}>
          Quân bài đã hoàn thành
        </p>
      </div>

      {/* Message */}
      <p className="text-base mb-4" style={{ color: "#666", lineHeight: "1.5" }}>
        {percentage < 30 && "🌱 Bạn mới bắt đầu hành trình. Cứ tiếp tục thôi!"}
        {percentage >= 30 && percentage < 60 && "🌿 Bạn đã đi được 1/3 con đường. Rất tốt!"}
        {percentage >= 60 && percentage < 85 && "🌳 Bạn sắp hoàn thành chặng cơ bản. Một chút nữa thôi!"}
        {percentage >= 85 && "🎉 Bạn đã nắm vững phần cơ bản. Sẵn sàng cho những bài cao hơn!"}
      </p>

      {/* Next Milestone */}
      {nextMilestone && (
        <div
          className="p-3 rounded-lg"
          style={{
            backgroundColor: "var(--baichoi-yellow)",
            borderLeft: "4px solid var(--baichoi-brick)",
          }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--baichoi-earth-dark)" }}>
            ◎ Tiêu chí tiếp: {nextMilestone.target} quân bài → {nextMilestone.reward}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * PHẦN 2: BẢN ĐỒ KỸ NĂNG (Skill Map - Radar Chart)
 */

interface SkillItem {
  name: string;
  emoji: string;
  percentage: number;
  description: string;
  tooltip: string;
}

interface SkillMapProps {
  skills: SkillItem[];
}

export function F7Part2_SkillMap({ skills }: SkillMapProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getSkillColor = (pct: number) => {
    if (pct >= 80) return "#4CAF50"; // Green
    if (pct >= 60) return "#FFC107"; // Yellow
    return "#FF9800"; // Orange
  };

  const getSkillLabel = (pct: number) => {
    if (pct >= 80) return "🟢 Tốt";
    if (pct >= 60) return "🟡 Đang luyện";
    return "🟠 Cần tập";
  };

  return (
    <div
      className="rounded-lg p-6 mb-6 bg-white border border-gray-200"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h3 className="font-bold text-lg mb-6" style={{ color: "var(--baichoi-earth-dark)" }}>
        🗺️ Bản đồ kỹ năng của bạn
      </h3>

      {/* Skill Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="p-4 rounded-lg border-2 transition-all duration-200 cursor-help"
            style={{
              borderColor: getSkillColor(skill.percentage),
              backgroundColor: `${getSkillColor(skill.percentage)}11`,
            }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Skill Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-3xl mr-2">{skill.emoji}</span>
                <span className="font-medium" style={{ color: "var(--baichoi-earth-dark)" }}>
                  {skill.name}
                </span>
              </div>
              <span
                className="text-sm font-bold px-2 py-1 rounded"
                style={{ color: getSkillColor(skill.percentage), backgroundColor: "#FFF" }}
              >
                {skill.percentage}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${skill.percentage}%`,
                    backgroundColor: getSkillColor(skill.percentage),
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-xs mb-2" style={{ color: "#666" }}>
              {skill.description}
            </p>

            {/* Status label */}
            <div className="text-xs font-medium">{getSkillLabel(skill.percentage)}</div>

            {/* Tooltip on hover */}
            {hoveredSkill === skill.name && (
              <div
                className="mt-3 p-2 rounded text-xs border-l-3"
                style={{
                  backgroundColor: "#F0F8FF",
                  borderColor: "#1976D2",
                  color: "#1976D2",
                }}
              >
                💡 {skill.tooltip}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * PHẦN 3: TIẾN TRÌNH THEO THỜI GIAN (Growth Timeline)
 */

interface TimelineDataPoint {
  week: number;
  score: number;
}

interface TimelineProps {
  data: TimelineDataPoint[];
  improvement?: number;
}

export function F7Part3_Timeline({ data, improvement }: TimelineProps) {
  const [filter, setFilter] = useState("total");

  const maxScore = Math.max(...data.map((d) => d.score), 100);
  const chartHeight = 200;

  return (
    <div
      className="rounded-lg p-6 mb-6 bg-white border border-gray-200"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg" style={{ color: "var(--baichoi-earth-dark)" }}>
          📈 Tiến trình theo thời gian
        </h3>
      </div>

      {/* Improvement banner */}
      {improvement && (
        <div
          className="mb-4 p-3 rounded text-sm font-medium"
          style={{
            backgroundColor: "#E8F5E9",
            color: "#2E7D32",
            borderLeft: "4px solid #4CAF50",
          }}
        >
          ✅ Bạn đã cải thiện +{improvement}% trong 4 tuần gần nhất
        </div>
      )}

      {/* Simple chart (using bars instead of canvas) */}
      <div className="mb-6 flex items-flex-end gap-3 h-48 border-b-2 border-gray-300 pb-4">
        {data.map((point, idx) => {
          const height = (point.score / maxScore) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="text-xs mb-2 font-bold">{point.score}</div>
              <div
                className="w-full rounded-t transition-all duration-500"
                style={{
                  height: `${height}%`,
                  backgroundColor: "var(--baichoi-earth)",
                  minHeight: "20px",
                }}
              />
              <div className="text-xs mt-2" style={{ color: "#999" }}>
                Tuần {point.week}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap">
        {["total", "pitch", "rhythm", "emotion"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1 text-sm rounded-full transition-all"
            style={{
              backgroundColor: filter === f ? "var(--baichoi-earth)" : "#EEE",
              color: filter === f ? "white" : "#666",
            }}
          >
            {f === "total" && "Tổng thể"}
            {f === "pitch" && "🎵 Cao độ"}
            {f === "rhythm" && "🥁 Nhịp"}
            {f === "emotion" && "🎭 Cảm xúc"}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * PHẦN 4: DANH SÁCH LÀN ĐIỆU ĐÃ HỌC
 */

interface LessonItem {
  id: number;
  name: string;
  status: "mastered" | "learning" | "new";
  score: number;
  lastPlayed: string;
}

interface LessonListProps {
  lessons: LessonItem[];
  onRetry?: (lessonId: number) => void;
}

function LessonCard({ lesson, onRetry }: { lesson: LessonItem; onRetry?: (id: number) => void }) {
  const getStatusColor = (status: string) => {
    if (status === "mastered") return { bg: "#E8F5E9", text: "#2E7D32", label: "🟢 Thành thạo" };
    if (status === "learning") return { bg: "#FFF3E0", text: "#E65100", label: "🟡 Đang luyện" };
    return { bg: "#F3E5F5", text: "#6A1B9A", label: "⚫ Mới" };
  };

  const statusStyle = getStatusColor(lesson.status);

  return (
    <div
      className="p-4 rounded-lg border-2 mb-3 transition-all hover:shadow-md"
      style={{
        borderColor: "var(--baichoi-earth)",
        backgroundColor: "#FFF",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-lg" style={{ color: "var(--baichoi-earth-dark)" }}>
            {lesson.name}
          </h4>
          <p className="text-xs" style={{ color: "#999" }}>
            Lần cuối: {lesson.lastPlayed}
          </p>
        </div>
        <div
          className="text-xs font-medium px-2 py-1 rounded"
          style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
        >
          {statusStyle.label}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: "#666" }}>Điểm tốt nhất</span>
          <span className="font-bold" style={{ color: statusStyle.text }}>
            {lesson.score}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full"
            style={{
              width: `${lesson.score}%`,
              backgroundColor: statusStyle.text,
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onRetry?.(lesson.id)}
          className="flex-1 px-3 py-1 text-sm rounded font-medium transition-all hover:opacity-80"
          style={{
            backgroundColor: "var(--baichoi-earth)",
            color: "white",
          }}
        >
          🔁 Luyện lại
        </button>
        <button
          className="flex-1 px-3 py-1 text-sm rounded font-medium border-2 transition-all hover:opacity-80"
          style={{
            borderColor: "var(--baichoi-earth)",
            color: "var(--baichoi-earth)",
          }}
        >
          🎧 Nghe
        </button>
      </div>
    </div>
  );
}

export function F7Part4_LessonList({ lessons, onRetry }: LessonListProps) {
  const [sortBy, setSortBy] = useState("recent");

  const sortedLessons = [...lessons].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    return 0; // Default: recent
  });

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg" style={{ color: "var(--baichoi-earth-dark)" }}>
          📚 Làn điệu đã học
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm px-2 py-1 rounded border"
          style={{ borderColor: "var(--baichoi-earth)" }}
        >
          <option value="recent">Mới nhất</option>
          <option value="score">Cao điểm nhất</option>
        </select>
      </div>

      <div>
        {sortedLessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} onRetry={onRetry} />
        ))}
      </div>
    </div>
  );
}

/**
 * PHẦN 5: HUY HIỆU & ĐỘNG LỰC (Gamification)
 */

interface BadgeItem {
  id: number;
  name: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface BadgesProps {
  badges: BadgeItem[];
}

export function F7Part5_Badges({ badges }: BadgesProps) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-lg mb-4" style={{ color: "var(--baichoi-earth-dark)" }}>
        🏅 Huy hiệu & thành tựu
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="p-4 rounded-lg text-center transition-all"
            style={{
              backgroundColor: badge.unlocked ? "#FFF8E1" : "#F5F5F5",
              border: badge.unlocked ? "2px solid #FFC107" : "2px solid #DDD",
              opacity: badge.unlocked ? 1 : 0.6,
            }}
          >
            <div className="text-4xl mb-2">{badge.icon}</div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--baichoi-earth-dark)" }}>
              {badge.name}
            </p>

            {badge.unlocked ? (
              <p className="text-xs" style={{ color: "#4CAF50" }}>
                ✅ Mở khóa
              </p>
            ) : (
              <div>
                {badge.progress !== undefined && badge.maxProgress !== undefined && (
                  <>
                    <div className="w-full h-2 bg-gray-300 rounded-full mb-1 overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${(badge.progress / badge.maxProgress) * 100}%`,
                          backgroundColor: "var(--baichoi-earth)",
                        }}
                      />
                    </div>
                    <p className="text-xs" style={{ color: "#999" }}>
                      {badge.progress}/{badge.maxProgress}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * PHẦN 6: GỢI Ý HỌC TIẾP (AI Suggestion)
 */

interface SuggestionProps {
  lessonName: string;
  reason: string;
  onStart?: () => void;
  onRemind?: () => void;
}

export function F7Part6_Suggestion({ lessonName, reason, onStart, onRemind }: SuggestionProps) {
  return (
    <div
      className="rounded-lg p-6 mb-6"
      style={{
        backgroundColor: "#E3F2FD",
        borderLeft: "4px solid #1976D2",
      }}
    >
      <h3 className="font-bold text-lg mb-4" style={{ color: "#1976D2" }}>
        🎯 Bước tiếp theo được AI đề xuất
      </h3>

      <div className="mb-4">
        <p className="text-lg font-bold mb-2" style={{ color: "var(--baichoi-earth-dark)" }}>
          Luyện: {lessonName}
        </p>
        <p className="mb-4" style={{ color: "#666" }}>
          <strong>Lý do:</strong> {reason}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onStart}
          className="flex-1 px-4 py-2 rounded font-medium text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "#1976D2" }}
        >
          ▶ Bắt đầu luyện
        </button>
        <button
          onClick={onRemind}
          className="flex-1 px-4 py-2 rounded font-medium border-2 transition-all hover:opacity-80"
          style={{ borderColor: "#1976D2", color: "#1976D2" }}
        >
          📅 Nhắc mai
        </button>
      </div>
    </div>
  );
}

/**
 * PHẦN 7: AI ETHICS NOTICE
 */
export function F7Part7_EthicsNotice() {
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
      AI chỉ hỗ trợ theo dõi tiến trình. Sự cảm nhận, nỗ lực và hướng dẫn của
      thầy cô vẫn là yếu tố quyết định.
    </div>
  );
}
