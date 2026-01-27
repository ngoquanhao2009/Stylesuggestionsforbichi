import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Headphones, Clock, AlertCircle } from "lucide-react";
import {
  WEEK_COLORS,
  SKILL_COLORS,
  getWeekColor,
  blendSkillWeekColor,
  MOTION,
  TimelinePoint,
  LessonWithSkills,
  SkillKey,
  TIMELINE_LINE_ANIMATION,
  getTimelineTooltip,
  getWeakPointColor,
  generateTimelineData,
  generateLessonsData,
} from "./F7_DESIGN_TOKENS";

/**
 * F7 PROGRESS - COMPLETE SYSTEM WITH WEEK COLORS + SKILL OVERLAYS + BUTTON LOGIC
 *
 * Design by: Bạn (27/01/2025)
 * 3 layers: Intent → UI/Animation → Logic
 *
 * NEW in this version:
 * ✅ Week-based color system (4 tuần, 4 màu)
 * ✅ Skill-based color blending (Pitch/Rhythm/Emotion)
 * ✅ Timeline with color gradients
 * ✅ Lesson cards with 4 CTA buttons (luyện lại, nghe, bắt đầu, nhắc mai)
 * ✅ Button state machine + animations
 */

// ============================================
// KHỐI 1: TỔNG QUAN HÀNH TRÌNH (Hero Progress)
// ============================================

interface JourneyOverviewProps {
  totalCards: number;
  completedCards: number;
  nextMilestone?: { target: number; reward: string };
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

  // Count-up animation (0.8s, sync)
  useEffect(() => {
    let currentCount = 0;
    let currentPct = 0;
    const stepSize = completedCards / 25;
    const pctStepSize = percentage / 25;

    const timer = setInterval(() => {
      currentCount = Math.min(currentCount + stepSize, completedCards);
      currentPct = Math.min(currentPct + pctStepSize, percentage);
      setDisplayCount(Math.round(currentCount));
      setDisplayPercentage(Math.round(currentPct));
      if (currentCount >= completedCards) clearInterval(timer);
    }, 32);

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
      <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--baichoi-earth-dark)" }}>
        🎶 Hành trình Bài Chòi của bạn
      </h2>

      {/* Progress Bar - Fill animation (ease-out, 0.8s) */}
      <div className="mb-6">
        <div
          className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-3"
          style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }}
        >
          <div
            className="h-full"
            style={{
              width: `${displayPercentage}%`,
              backgroundColor: getProgressColor(displayPercentage),
              transition: "width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </div>
      </div>

      {/* Percentage & Counter */}
      <div className="text-4xl font-bold mb-2" style={{ color: getProgressColor(displayPercentage) }}>
        {displayPercentage}%
      </div>
      <div className="mb-6">
        <p className="text-3xl font-bold mb-1" style={{ color: "var(--baichoi-earth)" }}>
          {displayCount} / {totalCards}
        </p>
        <p className="text-sm" style={{ color: "#999", fontWeight: "500" }}>
          Quân bài đã hoàn thành
        </p>
      </div>

      {/* Message */}
      <p className="text-lg" style={{ color: "var(--baichoi-earth-dark)" }}>
        {getProgressMessage(displayPercentage)}
      </p>

      {/* Next milestone (optional) */}
      {nextMilestone && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm" style={{ color: "#999" }}>
            Tiếp theo: {nextMilestone.target}% - {nextMilestone.reward}
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================
// KHỐI 2: BẢN ĐỒ KỸ NĂNG (Skills with colors)
// ============================================

interface SkillItem {
  name: string;
  emoji: string;
  percentage: number;
  description: string;
  tooltip: string;
  skillKey: SkillKey;
}

const getSkillStatus = (pct: number): { emoji: string; color: string } => {
  if (pct >= 85) return { emoji: "🟢", color: "#4CAF50" };
  if (pct >= 70) return { emoji: "🟡", color: "#F5C26B" };
  return { emoji: "🟠", color: "#F08A5D" };
};

export function F7Part2_SkillMap({ skills }: { skills: SkillItem[] }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="rounded-lg p-6 mb-6 bg-white border-2" style={{ borderColor: "var(--baichoi-earth)" }}>
      <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--baichoi-earth-dark)" }}>
        🎯 Bản đồ kỹ năng
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => {
          const status = getSkillStatus(skill.percentage);
          const skillColor = SKILL_COLORS[skill.skillKey];

          return (
            <div
              key={skill.skillKey}
              className="p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer"
              style={{
                borderColor: hoveredSkill === skill.skillKey ? skillColor : "#e0e0e0",
                backgroundColor: hoveredSkill === skill.skillKey ? `${skillColor}15` : "#fff",
              }}
              onMouseEnter={() => setHoveredSkill(skill.skillKey)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-2xl mr-2">{skill.emoji}</span>
                  <span className="font-bold" style={{ color: "var(--baichoi-earth-dark)" }}>
                    {skill.name}
                  </span>
                </div>
                <span className="text-2xl">{status.emoji}</span>
              </div>

              {/* Progress bar with skill color */}
              <div className="mb-2">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-600"
                    style={{
                      width: `${skill.percentage}%`,
                      backgroundColor: skillColor,
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{skill.description}</p>
                <span className="font-bold" style={{ color: skillColor }}>
                  {skill.percentage}%
                </span>
              </div>

              {/* Tooltip on hover */}
              {hoveredSkill === skill.skillKey && (
                <div className="mt-3 pt-3 border-t border-gray-200 text-sm" style={{ color: "#666" }}>
                  💡 {skill.tooltip}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// KHỐI 3: TIẾN TRÌNH THEO THỜI GIAN (Timeline with Week Colors)
// ============================================

interface TimelineProps {
  data: TimelinePoint[];
  selectedSkill?: SkillKey | null;
  onSkillSelect?: (skill: SkillKey | null) => void;
  improvement?: number;
}

export function F7Part3_Timeline({
  data,
  selectedSkill,
  onSkillSelect,
  improvement = 42,
}: TimelineProps) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  return (
    <div className="rounded-lg p-6 mb-6 bg-white border-2" style={{ borderColor: "var(--baichoi-earth)" }}>
      <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--baichoi-earth-dark)" }}>
        📈 Tiến trình theo thời gian (4 tuần)
      </h3>

      {/* Skill filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => onSkillSelect?.(null)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            !selectedSkill ? "ring-2 ring-offset-2" : ""
          }`}
          style={{
            backgroundColor: !selectedSkill ? "var(--baichoi-earth)" : "#f0f0f0",
            color: !selectedSkill ? "#fff" : "#333",
          }}
        >
          Tổng thể
        </button>

        {(["pitch", "rhythm", "emotion"] as const).map((skillKey) => (
          <button
            key={skillKey}
            onClick={() => onSkillSelect?.(skillKey as SkillKey)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedSkill === skillKey ? "ring-2 ring-offset-2" : ""
            }`}
            style={{
              backgroundColor: selectedSkill === skillKey ? SKILL_COLORS[skillKey] : "#f0f0f0",
              color: selectedSkill === skillKey ? "#fff" : "#333",
            }}
          >
            {skillKey === "pitch" && "🎵 Cao độ"}
            {skillKey === "rhythm" && "🥁 Nhịp"}
            {skillKey === "emotion" && "🎭 Cảm xúc"}
          </button>
        ))}
      </div>

      {/* Timeline chart */}
      <div className="mb-4">
        <div className="flex gap-4">
          {data.map((point, idx) => {
            const isLast = idx === data.length - 1;
            const weekColor = selectedSkill
              ? blendSkillWeekColor(SKILL_COLORS[selectedSkill], getWeekColor(point.week))
              : getWeekColor(point.week);

            const chartColor = selectedSkill
              ? blendSkillWeekColor(SKILL_COLORS[selectedSkill], getWeekColor(point.week))
              : getWeekColor(point.week);

            const displayPercentage = selectedSkill
              ? point.skills[selectedSkill as keyof typeof point.skills]
              : point.overallPercentage;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center">
                {/* Bar chart */}
                <div className="w-full flex flex-col items-center gap-2 mb-2">
                  <div className="w-full bg-gray-200 rounded h-32 flex items-end justify-center pb-2">
                    <div
                      className="rounded transition-all duration-600"
                      style={{
                        width: "60%",
                        height: `${displayPercentage}%`,
                        backgroundColor: chartColor,
                        animation: `scaleUp 0.6s ease-out ${idx * 0.1}s both`,
                      }}
                    />
                  </div>
                  <span className="font-bold text-sm" style={{ color: chartColor }}>
                    {displayPercentage}%
                  </span>
                </div>

                {/* Timeline point with tooltip */}
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredWeek(point.week)}
                  onMouseLeave={() => setHoveredWeek(null)}
                >
                  <div
                    className="w-4 h-4 rounded-full cursor-pointer transition-transform duration-200"
                    style={{
                      backgroundColor: weekColor,
                      transform: hoveredWeek === point.week ? "scale(1.5)" : "scale(1)",
                      boxShadow: hoveredWeek === point.week ? `0 0 12px ${weekColor}` : "none",
                    }}
                  />

                  {/* Tooltip */}
                  {hoveredWeek === point.week && (
                    <div
                      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10"
                      style={{ animation: "slideUpFade 0.2s ease-out" }}
                    >
                      Tuần {point.week}: {point.overallPercentage}%
                    </div>
                  )}
                </div>

                {/* Week label */}
                <p className="text-xs font-bold mt-2 text-gray-600">T{point.week}</p>

                {/* Connector line (optional) */}
                {!isLast && (
                  <div
                    className="absolute w-4 h-0.5 ml-2 top-1/3"
                    style={{
                      backgroundColor: `linear-gradient(90deg, ${weekColor}, ${
                        data[idx + 1].week
                          ? blendSkillWeekColor(
                              SKILL_COLORS[selectedSkill || "pitch"],
                              getWeekColor((data[idx + 1].week as unknown) as 1 | 2 | 3 | 4)
                            )
                          : weekColor
                      })`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Improvement banner */}
      {improvement > 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
          ✅ Bạn cải thiện <strong>{improvement}%</strong> so với tuần trước!
        </div>
      )}

      {/* CSS Animations */}
      <style>{TIMELINE_LINE_ANIMATION}</style>
    </div>
  );
}

// ============================================
// KHỐI 4: DANH SÁCH LÀN ĐIỆU (Lessons with CTA Buttons)
// ============================================

interface LessonListProps {
  lessons: LessonWithSkills[];
  onRetry?: (lessonId: number) => void;
  onListen?: (lessonId: number) => void;
  onStartPractice?: (lessonId: number) => void;
  onRemind?: (lessonId: number, time: string) => void;
}

export function F7Part4_LessonList({
  lessons,
  onRetry,
  onListen,
  onStartPractice,
  onRemind,
}: LessonListProps) {
  const [activeButtons, setActiveButtons] = useState<Record<number, string>>({});
  const [showRemindModal, setShowRemindModal] = useState<number | null>(null);
  const [remindTime, setRemindTime] = useState("19:00");

  const handleButtonTap = (lessonId: number, action: string) => {
    setActiveButtons((prev) => ({ ...prev, [lessonId]: action }));
    setTimeout(() => setActiveButtons((prev) => ({ ...prev, [lessonId]: "" })), 100);
  };

  return (
    <div className="rounded-lg p-6 mb-6 bg-white border-2" style={{ borderColor: "var(--baichoi-earth)" }}>
      <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--baichoi-earth-dark)" }}>
        🎵 Danh sách làn điệu
      </h3>

      <div className="space-y-4">
        {lessons.map((lesson) => {
          const weakPointColor = getWeakPointColor(lesson.bestScore);
          const isPressed = !!activeButtons[lesson.id];

          return (
            <div
              key={lesson.id}
              className="p-4 rounded-lg border-2 transition-all duration-150 bg-white"
              style={{
                borderColor: "var(--baichoi-earth-light)",
                transform: isPressed ? "scale(0.98)" : "scale(1)",
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-lg" style={{ color: "var(--baichoi-earth-dark)" }}>
                    {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500">Tuần {lesson.week}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color: weakPointColor }}>
                    {lesson.bestScore}%
                  </p>
                  <p className="text-xs text-gray-500">Điểm tốt nhất</p>
                </div>
              </div>

              {/* Skill breakdown bars */}
              <div className="mb-3 grid grid-cols-3 gap-2">
                <div>
                  <div className="w-full bg-gray-200 rounded h-2 mb-1">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${lesson.skillBreakdown.pitch}%`,
                        backgroundColor: SKILL_COLORS.pitch,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">🎵 Cao độ</p>
                </div>
                <div>
                  <div className="w-full bg-gray-200 rounded h-2 mb-1">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${lesson.skillBreakdown.rhythm}%`,
                        backgroundColor: SKILL_COLORS.rhythm,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">🥁 Nhịp</p>
                </div>
                <div>
                  <div className="w-full bg-gray-200 rounded h-2 mb-1">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${lesson.skillBreakdown.emotion}%`,
                        backgroundColor: SKILL_COLORS.emotion,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">🎭 Cảm xúc</p>
                </div>
              </div>

              {/* Weak point indicator */}
              {lesson.weakPoint && (
                <div
                  className="mb-4 p-2 rounded flex items-start gap-2 text-xs"
                  style={{ backgroundColor: `${weakPointColor}15`, borderLeft: `3px solid ${weakPointColor}` }}
                >
                  <AlertCircle size={16} style={{ color: weakPointColor, marginTop: "2px", flexShrink: 0 }} />
                  <span style={{ color: weakPointColor }}>
                    <strong>Cần cải thiện:</strong> {lesson.weakPoint}
                  </span>
                </div>
              )}

              {/* CTA Buttons - 4 nút chính */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {/* Nút 1: Luyện lại */}
                <button
                  onClick={() => {
                    handleButtonTap(lesson.id, "retry");
                    onRetry?.(lesson.id);
                  }}
                  className="p-2 rounded font-medium text-sm transition-all duration-200 flex items-center justify-center gap-1"
                  style={{
                    backgroundColor: lesson.canRetry
                      ? activeButtons[lesson.id] === "retry"
                        ? "#FFE0B2"
                        : "#FFF3E0"
                      : "#eee",
                    color: lesson.canRetry ? "#E65100" : "#999",
                    opacity: lesson.canRetry ? 1 : 0.5,
                    cursor: lesson.canRetry ? "pointer" : "not-allowed",
                  }}
                  disabled={!lesson.canRetry}
                  title="Luyện lại bài này"
                >
                  <RotateCcw size={14} />
                  Luyện lại
                </button>

                {/* Nút 2: Nghe */}
                <button
                  onClick={() => {
                    handleButtonTap(lesson.id, "listen");
                    onListen?.(lesson.id);
                  }}
                  className="p-2 rounded font-medium text-sm transition-all duration-200 flex items-center justify-center gap-1"
                  style={{
                    backgroundColor:
                      activeButtons[lesson.id] === "listen" ? "#C8E6C9" : lesson.hasAudio ? "#E8F5E9" : "#eee",
                    color: lesson.hasAudio ? "#2E7D32" : "#999",
                    opacity: lesson.hasAudio ? 1 : 0.5,
                    cursor: lesson.hasAudio ? "pointer" : "not-allowed",
                  }}
                  disabled={!lesson.hasAudio}
                  title="Nghe bản chuẩn và bản của bạn"
                >
                  <Headphones size={14} />
                  Nghe
                </button>

                {/* Nút 3: Bắt đầu luyện */}
                <button
                  onClick={() => {
                    handleButtonTap(lesson.id, "practice");
                    onStartPractice?.(lesson.id);
                  }}
                  className="p-2 rounded font-medium text-sm transition-all duration-200 flex items-center justify-center gap-1 md:col-span-1"
                  style={{
                    backgroundColor: activeButtons[lesson.id] === "practice" ? "#C5CAE9" : "#F3E5F5",
                    color: "#512DA8",
                    cursor: "pointer",
                  }}
                  title="Mở Practice Mode với bài này"
                >
                  <Play size={14} />
                  Luyện
                </button>

                {/* Nút 4: Nhắc mai */}
                <button
                  onClick={() => {
                    if (showRemindModal === lesson.id) {
                      setShowRemindModal(null);
                    } else {
                      setShowRemindModal(lesson.id);
                    }
                  }}
                  className="p-2 rounded font-medium text-sm transition-all duration-200 flex items-center justify-center gap-1"
                  style={{
                    backgroundColor: showRemindModal === lesson.id ? "#BBDEFB" : "#E3F2FD",
                    color: "#1565C0",
                    cursor: "pointer",
                  }}
                  title="Nhắc bạn luyện bài này lúc mấy giờ"
                >
                  <Clock size={14} />
                  Nhắc
                </button>
              </div>

              {/* Remind Modal - chỉ hiện khi click nút Nhắc */}
              {showRemindModal === lesson.id && (
                <div
                  className="mt-3 p-3 bg-blue-50 rounded border border-blue-200"
                  style={{ animation: "slideUpFade 0.3s ease-out" }}
                >
                  <p className="text-sm font-medium mb-2" style={{ color: "#1565C0" }}>
                    ⏰ Nhắc bạn luyện lúc:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={remindTime}
                      onChange={(e) => setRemindTime(e.target.value)}
                      className="flex-1 px-2 py-1 border rounded text-sm"
                    />
                    <button
                      onClick={() => {
                        onRemind?.(lesson.id, remindTime);
                        setShowRemindModal(null);
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 transition"
                    >
                      ✓
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Animations */}
      <style>{TIMELINE_LINE_ANIMATION}</style>
    </div>
  );
}

// ============================================
// KHỐI 5: HUY HIỆU & GAMIFICATION
// ============================================

interface BadgeItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number; // 0-100, if not yet unlocked
  condition?: string;
}

export function F7Part5_Badges({ badges }: { badges: BadgeItem[] }) {
  return (
    <div className="rounded-lg p-6 mb-6 bg-white border-2" style={{ borderColor: "var(--baichoi-earth)" }}>
      <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--baichoi-earth-dark)" }}>
        🏆 Huy hiệu & Thành tích
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, idx) => {
          const isUnlocked = !!badge.unlockedAt;

          return (
            <div
              key={badge.id}
              className="flex flex-col items-center p-4 rounded-lg border-2 text-center transition-all duration-300"
              style={{
                borderColor: isUnlocked ? "var(--baichoi-earth)" : "#e0e0e0",
                backgroundColor: isUnlocked ? "var(--baichoi-gold)15" : "#f9f9f9",
                animation: isUnlocked ? `popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s both` : "none",
              }}
            >
              {/* Badge icon with pulse effect */}
              <div
                className="text-4xl mb-2"
                style={{
                  animation: isUnlocked ? "pulse 1.5s ease-in-out infinite" : "none",
                }}
              >
                {badge.icon}
              </div>

              {/* Badge title */}
              <p className="font-bold text-sm mb-1" style={{ color: "var(--baichoi-earth-dark)" }}>
                {badge.title}
              </p>

              {/* Badge description */}
              <p className="text-xs text-gray-600 mb-2">{badge.description}</p>

              {/* Status */}
              {isUnlocked && badge.unlockedAt ? (
                <p className="text-xs font-medium text-green-600">
                  ✓ {new Date(badge.unlockedAt).toLocaleDateString("vi-VN")}
                </p>
              ) : (
                <div className="w-full">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div
                      className="h-full rounded-full transition-all duration-600"
                      style={{
                        width: `${badge.progress || 0}%`,
                        backgroundColor: "var(--baichoi-earth)",
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{badge.progress || 0}%</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// KHỐI 6: BỚI TIẾP THEO (AI Suggestion)
// ============================================

interface SuggestionProps {
  message: string;
  reason: string;
  cta?: {
    label: string;
    action: () => void;
  };
}

export function F7Part6_Suggestion({ message, reason, cta }: SuggestionProps) {
  return (
    <div
      className="rounded-lg p-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2"
      style={{
        borderColor: "var(--baichoi-earth-light)",
      }}
    >
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: "var(--baichoi-earth-dark)" }}>
        🤖 Bước tiếp theo
      </h3>

      {/* AI message */}
      <p className="text-lg mb-4" style={{ color: "#333" }}>
        {message}
      </p>

      {/* Reason (always shown) */}
      <div
        className="p-3 rounded bg-white border-l-4 mb-4"
        style={{
          borderColor: "var(--baichoi-earth)",
        }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: "var(--baichoi-earth)" }}>
          💡 Lý do:
        </p>
        <p className="text-sm text-gray-700">{reason}</p>
      </div>

      {/* CTA with pulse effect */}
      {cta && (
        <button
          onClick={cta.action}
          className="w-full px-4 py-2 rounded font-medium transition-all duration-300 relative"
          style={{
            backgroundColor: "var(--baichoi-earth)",
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {cta.label}
          {/* Subtle pulse background effect */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              backgroundColor: "var(--baichoi-earth)",
              opacity: 0,
              animation: "pulseBg 1.5s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        </button>
      )}

      {/* CSS animations */}
      <style>{`
        @keyframes pulseBg {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

// ============================================
// KHỐI 7: ETHICS NOTICE
// ============================================

export function F7Part7_EthicsNotice() {
  return (
    <div
      className="rounded-lg p-4 mb-6 bg-yellow-50 border-l-4"
      style={{
        borderColor: "#F5C26B",
      }}
    >
      <p className="text-sm text-gray-700">
        <strong style={{ color: "var(--baichoi-earth-dark)" }}>📋 Lưu ý AI:</strong> Hệ thống này dùng trí tuệ nhân tạo
        để phân tích bạn. Kết quả chỉ là gợi ý, không phải đánh giá chính thức. Hãy nhờ giáo viên kiểm tra kỹ lưỡng.
      </p>
    </div>
  );
}

// ============================================
// CSS ANIMATIONS (Global)
// ============================================

const GLOBAL_ANIMATIONS = `
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scaleUp {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
`;

// Inject animations
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = GLOBAL_ANIMATIONS;
  document.head.appendChild(style);
}
