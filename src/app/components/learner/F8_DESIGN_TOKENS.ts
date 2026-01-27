/**
 * F8 DESIGN TOKENS - Community Match
 * 
 * Animation specs, colors, timing functions
 * Version: 1.0 (27/01/2025)
 */

// ============================================
// COLOR PALETTE
// ============================================

export const F8_COLORS = {
  // Primary
  primaryGreen: "#6BCF9B",
  primaryDarkGreen: "#2E7D32",
  
  // Secondary
  contactBlue: "#1565C0",
  calendarOrange: "#F08A5D",
  secondaryGray: "#B0BEC5",
  
  // Background
  loadingGradientStart: "#6BCF9B",
  loadingGradientEnd: "#FFF9E6",
  
  // Text & UI
  darkText: "#333",
  lightText: "#666",
  borderLight: "#e0e0e0",
  bgLight: "#f5f5f5",
} as const;

// ============================================
// MOTION SPECS
// ============================================

export const F8_MOTION = {
  // Durations
  durations: {
    ripple: 100,
    iconHover: 100,
    loadingText: 800,
    transition: 300,
    cardSlideUp: 400,
    bounce: 500,
    countUp: 800,
    radioPulse: 1500,
  },

  // Easing functions
  easing: {
    easeOut: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    easeInOut: "cubic-bezier(0.43, 0.13, 0.57, 0.87)",
    ease: "ease",
    linear: "linear",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  // Specific animations
  loading: {
    radarCycle: 1500,
    radarDelay1: 0,
    radarDelay2: 400,
    radarDelay3: 800,
    textFadeIn: 200,
    textShow: 400,
    textFadeOut: 200,
    textTotalPerLine: 800,
  },

  button: {
    tapScale: 0.98,
    tapDuration: 100,
    hoverScale: 1.02,
    hoverDuration: 100,
  },

  card: {
    slideUpDelay: 0,
    slideUpDuration: 400,
    staggerDelay: 100,
  },

  icon: {
    pulseDuration: 1500,
    pulseScale: 1.15,
  },
} as const;

// ============================================
// ANIMATION KEYFRAMES
// ============================================

export const F8_ANIMATIONS = `
@keyframes radarPulse {
  0% {
    r: 0;
    opacity: 1;
  }
  100% {
    r: 100;
    opacity: 0;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes countUp {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.7;
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes bottomSheetSlideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes carouselFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;

// ============================================
// DATA STRUCTURES
// ============================================

export interface ClubLocation {
  lat: number;
  lng: number;
  address: string;
  city: string;
}

export interface Club {
  id: string;
  name: string;
  location: ClubLocation;
  distance: number; // km
  memberCount: number;
  artisanCount: number;
  schedule: string[]; // e.g., "Thứ 7, 14:00"
  contact: {
    phone: string;
    zalo?: string;
    email?: string;
  };
  why: string[]; // Lý do gợi ý
  matchScore: number; // 0-100
  imageUrl?: string;
  description?: string;
}

export interface MatchResult {
  primaryClub: Club;
  secondaryClubs: Club[];
  algorithm: "rule-based" | "ai-blend";
  timestamp: string;
}

// ============================================
// MOCK DATA
// ============================================

export function generateMockClubs(): Club[] {
  return [
    {
      id: "clb-hoi-an-01",
      name: "CLB Bài Chòi Hội An",
      location: {
        lat: 15.8787,
        lng: 108.3309,
        address: "28 Nguyễn Huệ, Hội An",
        city: "Hội An, Quảng Nam",
      },
      distance: 2.5,
      memberCount: 15,
      artisanCount: 3,
      schedule: ["Thứ 7 14:00", "Chủ nhật 09:00"],
      contact: {
        phone: "0901 234 567",
        zalo: "0901 234 567",
        email: "hoian@baichoi.vn",
      },
      why: [
        "Gần vị trí của bạn",
        "Có nghệ nhân phù hợp với trình độ hiện tại",
        "CLB có lịch sinh hoạt đều",
      ],
      matchScore: 95,
      imageUrl: "https://example.com/club-hoi-an.jpg",
      description:
        "Câu lạc bộ Bài Chòi Hội An là nơi giao lưu của những người yêu thích Bài Chòi cổ truyền. Chúng tôi tổ chức tập luyện mở hàng tuần, chào đón người mới.",
    },
    {
      id: "clb-di-san-bd-01",
      name: "CLB Di sản Bình Định",
      location: {
        lat: 13.7843,
        lng: 109.2245,
        address: "45 Lê Lợi, Quy Nhơn",
        city: "Quy Nhơn, Bình Định",
      },
      distance: 45,
      memberCount: 22,
      artisanCount: 5,
      schedule: ["Thứ 6 19:00", "Chủ nhật 10:00"],
      contact: {
        phone: "0912 345 678",
        email: "binhdinhclub@baichoi.vn",
      },
      why: ["Có nhiều nghệ nhân", "Hoạt động thường xuyên"],
      matchScore: 82,
      description:
        "Câu lạc bộ Di sản Bình Định hoạt động mạnh vào mùa lễ hội. Có các bài Chòi cổ điển + sáng tạo.",
    },
    {
      id: "clb-heritage-pq",
      name: "CLB Kế Thừa Phú Quốc",
      location: {
        lat: 10.2856,
        lng: 103.9851,
        address: "99 Trần Hưng Đạo, Phú Quốc",
        city: "Phú Quốc, Kiên Giang",
      },
      distance: 180,
      memberCount: 18,
      artisanCount: 4,
      schedule: ["Thứ 3 18:00", "Thứ 7 15:00"],
      contact: {
        phone: "0923 456 789",
        zalo: "0923 456 789",
      },
      why: ["CLB có uy tín cao"],
      matchScore: 76,
    },
    {
      id: "clb-hanoi-01",
      name: "CLB Bài Chòi Hà Nội",
      location: {
        lat: 21.0285,
        lng: 105.8542,
        address: "123 Cầu Giấy, Hà Nội",
        city: "Hà Nội",
      },
      distance: 420,
      memberCount: 35,
      artisanCount: 8,
      schedule: ["Thứ 4 19:00", "Chủ nhật 09:00"],
      contact: {
        phone: "0934 567 890",
        email: "hanoi@baichoi.vn",
      },
      why: ["Có nhiều học viên cùng trình độ"],
      matchScore: 68,
    },
  ];
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
}

// ============================================
// AI RECOMMENDATION LOGIC
// ============================================

/**
 * Simple rule-based scoring
 * Can be enhanced with ML model
 */
export function calculateMatchScore(
  club: Club,
  userLat: number,
  userLng: number,
  userLevel: number // 0-100
): number {
  // Distance score (closer is better)
  const maxDistance = 200; // km
  const distanceScore =
    Math.max(0, (maxDistance - club.distance) / maxDistance) * 0.4;

  // Skill match (level compatibility)
  // Assume artisans represent club's skill level
  const skillMatch = Math.abs(100 - userLevel) < 30 ? 1 : 0.6;
  const skillScore = skillMatch * 0.4;

  // Activity frequency (regular activity is good)
  const frequencyScore = Math.min(club.schedule.length / 7, 1) * 0.2;

  return Math.round((distanceScore + skillScore + frequencyScore) * 100);
}

/**
 * Get top matching clubs
 */
export function getMatchedClubs(
  clubs: Club[],
  userLat: number,
  userLng: number,
  userLevel: number
): MatchResult {
  // Recalculate distances
  const clubsWithDistance = clubs.map((club) => ({
    ...club,
    distance: calculateDistance(
      userLat,
      userLng,
      club.location.lat,
      club.location.lng
    ),
    matchScore: calculateMatchScore(
      club,
      userLat,
      userLng,
      userLevel
    ),
  }));

  // Sort by match score
  clubsWithDistance.sort((a, b) => b.matchScore - a.matchScore);

  return {
    primaryClub: clubsWithDistance[0],
    secondaryClubs: clubsWithDistance.slice(1, 5),
    algorithm: "rule-based",
    timestamp: new Date().toISOString(),
  };
}

// ============================================
// UTILITIES
// ============================================

export function getLoadingMessages(): string[] {
  return [
    "🤖 Đang phân tích vị trí…",
    "🎶 Đang đối chiếu trình độ học tập…",
    "🌱 Đang tìm cộng đồng phù hợp…",
  ];
}

export function formatDistance(km: number): string {
  if (km < 1) return "< 1 km";
  if (km < 50) return `${km} km`;
  return `${Math.round(km)} km`;
}

export function getEstimatedTime(km: number): string {
  const averageSpeed = 40; // km/h
  const hours = km / averageSpeed;
  if (hours < 1) {
    return `${Math.round(hours * 60)} phút`;
  }
  return `${Math.round(hours)} giờ`;
}
