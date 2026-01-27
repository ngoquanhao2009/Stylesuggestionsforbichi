/**
 * F7 DESIGN TOKENS & SYSTEM
 * 
 * Dùng cho: Timeline colors, skill overlays, animations, spacing
 * Version: 1.0 (27/01/2025)
 * 
 * 3 tầng:
 * 1. Color System (Week × Skill)
 * 2. Motion System (Animation specs)
 * 3. State Machine (Button logic)
 */

// ============================================
// 1️⃣ COLOR SYSTEM
// ============================================

/** Week-based color palette (Timeline) */
export const WEEK_COLORS = {
  week1: "#5DA9E9", // 🟦 Xanh lam nhạt - Khởi động
  week2: "#6BCF9B", // 🟩 Xanh lá - Ổn định
  week3: "#F5C26B", // 🟨 Vàng cam - Cải thiện
  week4: "#F08A5D", // 🟧 Cam đậm - Thành thạo
} as const;

/** Skill-specific color palette */
export const SKILL_COLORS = {
  pitch: "#4A90E2",    // 🎵 Cao độ - Xanh dương
  rhythm: "#50C878",   // 🥁 Nhịp - Xanh lá
  emotion: "#B76CFD",  // 🎭 Cảm xúc - Tím cam
  breath: "#48C9B0",   // 🌬️ Hơi - Xanh ngọc
} as const;

export type SkillKey = keyof typeof SKILL_COLORS;
export type WeekNumber = 1 | 2 | 3 | 4;

/**
 * Blend skill color with week color
 * Giữ skill tone, thêm tuần tone
 * 
 * @param skillColor - Màu kỹ năng (SKILL_COLORS)
 * @param weekColor - Màu tuần (WEEK_COLORS)
 * @returns Blended hex color
 */
export function blendSkillWeekColor(skillColor: string, weekColor: string): string {
  // Parse hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [0, 0, 0];
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("").toUpperCase();
  };

  const skillRgb = hexToRgb(skillColor);
  const weekRgb = hexToRgb(weekColor);

  // Blend: 70% skill color + 30% week color
  const blended: [number, number, number] = [
    Math.round(skillRgb[0] * 0.7 + weekRgb[0] * 0.3),
    Math.round(skillRgb[1] * 0.7 + weekRgb[1] * 0.3),
    Math.round(skillRgb[2] * 0.7 + weekRgb[2] * 0.3),
  ];

  return rgbToHex(blended[0], blended[1], blended[2]);
}

/**
 * Get color for a week
 * Dùng khi không filter theo skill
 */
export function getWeekColor(week: WeekNumber): string {
  return WEEK_COLORS[`week${week}` as keyof typeof WEEK_COLORS];
}

/**
 * Get all week colors with skill blend
 */
export function getWeekColorsForSkill(skillKey: SkillKey): Record<WeekNumber, string> {
  const skillColor = SKILL_COLORS[skillKey];
  return {
    1: blendSkillWeekColor(skillColor, WEEK_COLORS.week1),
    2: blendSkillWeekColor(skillColor, WEEK_COLORS.week2),
    3: blendSkillWeekColor(skillColor, WEEK_COLORS.week3),
    4: blendSkillWeekColor(skillColor, WEEK_COLORS.week4),
  } as Record<WeekNumber, string>;
}

// ============================================
// 2️⃣ MOTION SYSTEM
// ============================================

export const MOTION = {
  // Durations (ms)
  durations: {
    instant: 0,
    micro: 150,      // Hover effects
    quick: 300,      // Color transitions
    standard: 600,   // Main animations
    deliberate: 800, // Count-up, complex animations
  },

  // Easing functions
  easing: {
    easeOut: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    easeInOut: "cubic-bezier(0.43, 0.13, 0.57, 0.87)",
    linear: "linear",
    smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },

  // Timeline-specific animations
  timeline: {
    lineDrawPerWeek: 150,  // ms delay between weeks
    totalDrawTime: 600,    // 4 weeks × 150ms
    colorTransition: 300,  // Smooth color change when switching skill
    hoverTooltip: 200,     // Tooltip fade-in
  },

  // Button animations
  buttons: {
    tapScale: 0.98,
    tapDuration: 100,
    slideUp: 300,          // Mini player slide-in
    fadeTransition: 300,   // F7 → F5 fade
    countdown: 1000,       // 3-2-1 timing
  },
} as const;

// ============================================
// 3️⃣ STATE MACHINE (Button Logic)
// ============================================

export enum ButtonState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ACTIVE = "ACTIVE",
  SUCCESS = "SUCCESS",
}

export interface ButtonActionConfig {
  id: string;
  label: string;
  icon: string;
  state: ButtonState;
  actionType: "retry" | "listen" | "practice" | "remind";
}

/**
 * Timeline-specific data structure
 */
export interface TimelinePoint {
  week: WeekNumber;
  overallPercentage: number;     // Tổng thể %
  skills: {
    pitch: number;               // Cao độ %
    rhythm: number;              // Nhịp %
    emotion: number;             // Cảm xúc %
  };
  lessonsCompleted?: number;
  timestamp?: string;
}

/**
 * Lesson with multi-skill tracking
 */
export interface LessonWithSkills {
  id: number;
  title: string;
  week: WeekNumber;
  bestScore: number;
  lastScore: number;
  skillBreakdown: {
    pitch: number;
    rhythm: number;
    emotion: number;
  };
  weakPoint?: string;            // "Đoạn kết", "Giữ hơi", etc.
  canRetry: boolean;
  hasAudio: boolean;
  learnerAudioUrl?: string;      // Bản người học (nếu có)
  referenceAudioUrl: string;     // Bản chuẩn
}

// ============================================
// 4️⃣ RESPONSIVE BREAKPOINTS
// ============================================

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
} as const;

export function isMobile(width: number): boolean {
  return width < BREAKPOINTS.tablet;
}

export function isTablet(width: number): boolean {
  return width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
}

export function isDesktop(width: number): boolean {
  return width >= BREAKPOINTS.desktop;
}

// ============================================
// 5️⃣ UTILITY FUNCTIONS
// ============================================

/**
 * Get tooltip text for a timeline point
 */
export function getTimelineTooltip(point: TimelinePoint): string {
  return `
Tuần ${point.week}
Tổng thể: ${point.overallPercentage}%
Cao độ: ${point.skills.pitch}%
Nhịp: ${point.skills.rhythm}%
Cảm xúc: ${point.skills.emotion}%
`.trim();
}

/**
 * Get gradient for chart bar
 */
export function getGradientId(week: WeekNumber, skillKey?: SkillKey): string {
  if (skillKey) {
    return `gradient-${skillKey}-week${week}`;
  }
  return `gradient-week${week}`;
}

/**
 * Get lesson weak point color (error/warning indicator)
 */
export function getWeakPointColor(percentage: number): string {
  if (percentage >= 85) return "#4CAF50";  // 🟢 Tốt
  if (percentage >= 70) return "#F5C26B";  // 🟨 Trung bình
  return "#F08A5D";                        // 🟧 Cần cải thiện
}

/**
 * Animation CSS for timeline line draw
 */
export const TIMELINE_LINE_ANIMATION = `
@keyframes drawLine {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseIcon {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@keyframes microShake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;

// ============================================
// 6️⃣ MOCK DATA GENERATORS
// ============================================

/**
 * Generate sample 4-week timeline
 */
export function generateTimelineData(): TimelinePoint[] {
  return [
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
}

/**
 * Generate sample lessons with skills
 */
export function generateLessonsData(): LessonWithSkills[] {
  return [
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
}
