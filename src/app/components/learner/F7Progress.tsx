import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  F7Part1_JourneyOverview,
  F7Part2_SkillMap,
  F7Part3_Timeline,
  F7Part4_LessonList,
  F7Part5_Badges,
  F7Part6_Suggestion,
  F7Part7_EthicsNotice,
} from "./F7_Stages_New";
import { SkillKey, LessonWithSkills, TimelinePoint, generateTimelineData, generateLessonsData } from "./F7_DESIGN_TOKENS";

interface F7ProgressProps {
  onBack: () => void;
}

export function F7Progress({ onBack }: F7ProgressProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillKey | null>(null);

  // Mock data
  const totalCards = 20;
  const completedCards = 7;

  // Skill map with skillKey
  const skillsData = [
    {
      name: "Cao độ (Pitch)",
      emoji: "🎵",
      percentage: 78,
      description: "Bạn lên khá chính xác",
      tooltip: "Bạn đã khá chuẩn xác với cao độ. Tập trung vào các bài cao hơn nhé!",
      skillKey: "pitch" as SkillKey,
    },
    {
      name: "Nhịp điệu (Rhythm)",
      emoji: "🥁",
      percentage: 85,
      description: "Nhịp hô khá đều",
      tooltip: "Nhịp của bạn rất đều. Đó là nền tảng tốt!",
      skillKey: "rhythm" as SkillKey,
    },
    {
      name: "Cảm xúc",
      emoji: "🎭",
      percentage: 55,
      description: "Luyến láy còn cứng",
      tooltip: "Luyến láy của bạn còn cứng. Nghe thêm các bà hát để bắt cảm.",
      skillKey: "emotion" as SkillKey,
    },
    {
      name: "Hơi & ngân",
      emoji: "🌬️",
      percentage: 62,
      description: "Cần tập kiểm soát hơi",
      tooltip: "Cần tập kiểm soát hơi tốt hơn. Hãy luyện bài Nhì Nghèo chậm.",
      skillKey: "breath" as SkillKey,
    },
  ];

  // Timeline with proper structure
  const timelineData: TimelinePoint[] = [
    {
      week: 1,
      overallPercentage: 35,
      skills: { pitch: 32, rhythm: 38, emotion: 35 },
      lessonsCompleted: 2,
      timestamp: "2025-01-20",
    },
    {
      week: 2,
      overallPercentage: 55,
      skills: { pitch: 58, rhythm: 52, emotion: 55 },
      lessonsCompleted: 4,
      timestamp: "2025-01-21",
    },
    {
      week: 3,
      overallPercentage: 72,
      skills: { pitch: 78, rhythm: 68, emotion: 70 },
      lessonsCompleted: 6,
      timestamp: "2025-01-22",
    },
    {
      week: 4,
      overallPercentage: 85,
      skills: { pitch: 88, rhythm: 82, emotion: 85 },
      lessonsCompleted: 7,
      timestamp: "2025-01-27",
    },
  ];

  // Lessons with proper structure
  const lessonsData: LessonWithSkills[] = [
    {
      id: 1,
      title: "Bài 1: Khai tiếng",
      week: 1,
      bestScore: 72,
      lastScore: 65,
      skillBreakdown: { pitch: 68, rhythm: 75, emotion: 72 },
      weakPoint: "Khai tiếng chưa rõ",
      canRetry: true,
      hasAudio: true,
      referenceAudioUrl: "https://example.com/audio/lesson1-ref.mp3",
      learnerAudioUrl: "https://example.com/audio/lesson1-learner.mp3",
    },
    {
      id: 2,
      title: "Bài 2: Giữ hơi",
      week: 1,
      bestScore: 65,
      lastScore: 62,
      skillBreakdown: { pitch: 60, rhythm: 68, emotion: 65 },
      weakPoint: "Giữ hơi không đều",
      canRetry: true,
      hasAudio: true,
      referenceAudioUrl: "https://example.com/audio/lesson2-ref.mp3",
    },
    {
      id: 3,
      title: "Bài 3: Kết tiếng",
      week: 2,
      bestScore: 85,
      lastScore: 82,
      skillBreakdown: { pitch: 88, rhythm: 82, emotion: 85 },
      weakPoint: undefined,
      canRetry: true,
      hasAudio: true,
      referenceAudioUrl: "https://example.com/audio/lesson3-ref.mp3",
    },
    {
      id: 4,
      title: "Bài 4: Lế xiên",
      week: 3,
      bestScore: 78,
      lastScore: 76,
      skillBreakdown: { pitch: 80, rhythm: 75, emotion: 78 },
      weakPoint: "Cảm xúc chưa đủ mạnh",
      canRetry: true,
      hasAudio: true,
      referenceAudioUrl: "https://example.com/audio/lesson4-ref.mp3",
    },
  ];

  // Badges
  const badgesData = [
    {
      id: 1,
      title: "Khởi động",
      description: "Hoàn thành 5 bài",
      icon: "🥉",
      unlockedAt: "2025-01-20",
      progress: undefined,
    },
    {
      id: 2,
      title: "Nghe nghệ nhân",
      description: "Nghe 10 lần",
      icon: "🎧",
      unlockedAt: "2025-01-21",
      progress: undefined,
    },
    {
      id: 3,
      title: "Tiến bộ 7 ngày",
      description: "Học 7 ngày liên tiếp",
      icon: "🌱",
      progress: 4,
    },
    {
      id: 4,
      title: "Thành thạo",
      description: "100 lần luyện tập",
      icon: "🔥",
      progress: 47,
    },
  ];

  return (
    <div
      className="min-h-screen p-6"
      style={{ backgroundColor: "var(--baichoi-yellow)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition"
            style={{ color: "var(--baichoi-earth)" }}
          >
            <ArrowLeft size={24} />
          </button>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--baichoi-earth-dark)" }}
          >
            📊 Tiến Trình Học Tập
          </h1>
        </div>

        {/* PART 1: Journey Overview */}
        <F7Part1_JourneyOverview
          totalCards={totalCards}
          completedCards={completedCards}
          nextMilestone={{
            target: 10,
            reward: "🏅 Huy hiệu Tây",
          }}
        />

        {/* PART 2: Skill Map */}
        <F7Part2_SkillMap skills={skillsData} />

        {/* PART 3: Timeline */}
        <F7Part3_Timeline
          data={timelineData}
          selectedSkill={selectedSkill}
          onSkillSelect={setSelectedSkill}
          improvement={42}
        />

        {/* PART 4: Lesson List */}
        <F7Part4_LessonList
          lessons={lessonsData}
          onRetry={(id: number) => {
            console.log("🔄 Retry lesson:", id);
            // TODO: Switch to F5 Practice Mode
          }}
          onListen={(id: number) => {
            console.log("🎧 Listen lesson:", id);
            // TODO: Open mini player
          }}
          onStartPractice={(id: number) => {
            console.log("▶️ Start practice:", id);
            // TODO: Switch to F5 Practice Mode
          }}
          onRemind={(id: number, time: string) => {
            console.log("⏰ Remind at", time, "for lesson:", id);
            // TODO: Save reminder to localStorage
          }}
        />

        {/* PART 5: Badges */}
        <F7Part5_Badges badges={badgesData} />

        {/* PART 6: AI Suggestion */}
        <F7Part6_Suggestion
          message="🎯 Bạn sẵn sàng để học bài Nhì Nghèo – đoạn kết rồi!"
          reason="Bạn đã nắm vững cơ bản (85%). Đây là bước tiếp theo hoàn hảo để cải thiện hơi + cảm xúc."
          cta={{
            label: "Bắt đầu luyện ngay",
            action: () => {
              console.log("Start practice now");
              // TODO: Navigate to F5 Practice
            },
          }}
        />

        {/* PART 7: Ethics Notice */}
        <F7Part7_EthicsNotice />
      </div>
    </div>
  );
}
