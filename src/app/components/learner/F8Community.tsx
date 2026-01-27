import React, { useState, useEffect } from "react";
import { ChevronLeft, MapPin, Users, Music, Phone, Calendar } from "lucide-react";
import {
  F8_COLORS,
  F8_MOTION,
  F8_ANIMATIONS,
  Club,
  MatchResult,
  generateMockClubs,
  getMatchedClubs,
  getLoadingMessages,
} from "./F8_DESIGN_TOKENS";

interface F8CommunityProps {
  onBack: () => void;
  userLat?: number;
  userLng?: number;
  userLevel?: number;
}

type F8Screen = "intro" | "loading" | "result";

export function F8Community({
  onBack,
  userLat = 15.8787,
  userLng = 108.3309,
  userLevel = 50,
}: F8CommunityProps) {
  const [screen, setScreen] = useState<F8Screen>("intro");
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState(true);
  const [showContactSheet, setShowContactSheet] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Loading animation
  useEffect(() => {
    if (screen !== "loading") return;

    const messages = getLoadingMessages();
    let messageIdx = 0;

    const messageInterval = setInterval(() => {
      setLoadingMessageIndex(messageIdx % messages.length);
      messageIdx++;

      if (messageIdx >= messages.length * 3) {
        clearInterval(messageInterval);
        setTimeout(() => {
          const clubs = generateMockClubs();
          const result = getMatchedClubs(clubs, userLat, userLng, userLevel);
          setMatchResult(result);
          setScreen("result");
        }, 500);
      }
    }, F8_MOTION.loading.textTotalPerLine);

    return () => clearInterval(messageInterval);
  }, [screen, userLat, userLng, userLevel]);

  // ============================================
  // INTRO SCREEN
  // ============================================

  if (screen === "intro") {
    return (
      <div
        className="min-h-screen p-6"
        style={{ backgroundColor: "var(--baichoi-yellow)" }}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-200 rounded-lg transition mr-4"
              style={{ color: "var(--baichoi-earth)" }}
            >
              <ChevronLeft size={24} />
            </button>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--baichoi-earth-dark)" }}
            >
              🤝 Kết nối cộng đồng
            </h1>
          </div>

          <div className="text-center">
            <p
              className="text-lg mb-4"
              style={{ color: "var(--baichoi-earth-dark)" }}
            >
              Bạn không học một mình 🌱
            </p>
            <p className="text-gray-600 mb-8">
              Hãy kết nối với những người cùng đam mê Bài Chòi. Tìm câu lạc bộ gần bạn, học tập với
              nghệ nhân, và trở thành phần của cộng đồng.
            </p>

            <button
              onClick={() => setScreen("loading")}
              className="w-full py-3 rounded-lg font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: F8_COLORS.primaryGreen }}
            >
              🔍 Tìm CLB gần bạn
            </button>

            <div className="mt-12 space-y-4">
              <div className="p-4 rounded-lg bg-white border border-gray-200">
                <p className="font-bold mb-2">🎯 Ghép cặp thông minh</p>
                <p className="text-sm text-gray-600">
                  AI phân tích trình độ để tìm câu lạc bộ phù hợp
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-gray-200">
                <p className="font-bold mb-2">📍 Dễ tiếp cận</p>
                <p className="text-sm text-gray-600">
                  Tìm câu lạc bộ gần nhất
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-gray-200">
                <p className="font-bold mb-2">❤️ Cộng đồng sôi động</p>
                <p className="text-sm text-gray-600">
                  Kết bạn, học hỏi và chia sẻ
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{F8_ANIMATIONS}</style>
      </div>
    );
  }

  // ============================================
  // LOADING SCREEN
  // ============================================

  if (screen === "loading") {
    const messages = getLoadingMessages();

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{
          background: `linear-gradient(135deg, ${F8_COLORS.loadingGradientStart} 0%, ${F8_COLORS.loadingGradientEnd} 100%)`,
        }}
      >
        <div className="mb-12 relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke={F8_COLORS.primaryDarkGreen}
              strokeWidth="1"
              opacity="0.3"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke={F8_COLORS.primaryDarkGreen}
              strokeWidth="1"
              opacity="0.2"
            />

            <circle
              cx="100"
              cy="100"
              r="10"
              fill={F8_COLORS.primaryDarkGreen}
              opacity="0.8"
            />
            <circle
              cx="100"
              cy="100"
              r="20"
              fill="none"
              stroke={F8_COLORS.primaryDarkGreen}
              strokeWidth="2"
              style={{
                animation: `radarPulse ${F8_MOTION.loading.radarCycle}ms linear infinite`,
              }}
            />
            <circle
              cx="100"
              cy="100"
              r="20"
              fill="none"
              stroke={F8_COLORS.primaryDarkGreen}
              strokeWidth="2"
              opacity="0.6"
              style={{
                animation: `radarPulse ${F8_MOTION.loading.radarCycle}ms linear infinite`,
                animationDelay: `${F8_MOTION.loading.radarDelay2}ms`,
              }}
            />
            <circle
              cx="100"
              cy="100"
              r="20"
              fill="none"
              stroke={F8_COLORS.primaryDarkGreen}
              strokeWidth="2"
              opacity="0.3"
              style={{
                animation: `radarPulse ${F8_MOTION.loading.radarCycle}ms linear infinite`,
                animationDelay: `${F8_MOTION.loading.radarDelay3}ms`,
              }}
            />
          </svg>
        </div>

        <p
          className="text-lg font-medium text-center mb-4"
          style={{
            color: F8_COLORS.primaryDarkGreen,
            animation: `fadeInOut ${F8_MOTION.loading.textTotalPerLine}ms ease-in-out infinite`,
          }}
        >
          {messages[loadingMessageIndex]}
        </p>

        <button
          onClick={() => {
            const clubs = generateMockClubs();
            const result = getMatchedClubs(clubs, userLat, userLng, userLevel);
            setMatchResult(result);
            setScreen("result");
          }}
          className="mt-8 text-sm underline opacity-60 hover:opacity-100 transition"
          style={{ color: F8_COLORS.primaryDarkGreen }}
        >
          Bỏ qua →
        </button>

        <style>{F8_ANIMATIONS}</style>
      </div>
    );
  }

  // ============================================
  // RESULT SCREEN
  // ============================================

  if (screen === "result" && matchResult) {
    const primary = matchResult.primaryClub;

    return (
      <div
        className="min-h-screen p-6"
        style={{ backgroundColor: "var(--baichoi-yellow)" }}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setScreen("intro")}
              className="p-2 hover:bg-gray-200 rounded-lg transition mr-4"
              style={{ color: "var(--baichoi-earth)" }}
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Success badge */}
          <div
            className="text-center mb-8 p-4 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${F8_COLORS.primaryGreen} 0%, #5AB88B 100%)`,
              color: "#fff",
              animation: `bounce ${F8_MOTION.durations.bounce}ms ${F8_MOTION.easing.bounce}`,
            }}
          >
            <p className="text-2xl mb-2">✨ Ghép cặp thành công!</p>
            <p className="text-sm opacity-90">
              Chúng tôi đã tìm thấy câu lạc bộ phù hợp với bạn
            </p>
          </div>

          {/* Primary club card */}
          <div
            className="p-6 rounded-2xl bg-white border-l-4 mb-6 shadow-lg"
            style={{
              borderLeftColor: F8_COLORS.primaryGreen,
              animation: `slideUp ${F8_MOTION.card.slideUpDuration}ms ${F8_MOTION.easing.easeOut} both`,
            }}
          >
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--baichoi-earth-dark)" }}
            >
              {primary.name}
            </h2>

            <div className="flex items-center gap-2 mb-4 text-gray-600">
              <MapPin size={16} />
              <span className="text-sm">{primary.location.city}</span>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{ color: F8_COLORS.primaryGreen }}
                >
                  {primary.distance} km
                </div>
                <div className="text-xs text-gray-600">Khoảng cách</div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold flex items-center justify-center gap-1"
                  style={{ color: F8_COLORS.primaryGreen }}
                >
                  <Users size={18} />
                  <span
                    style={{
                      animation: `pulse ${F8_MOTION.durations.radioPulse}ms ease-in-out infinite`,
                    }}
                  >
                    {primary.memberCount}
                  </span>
                </div>
                <div className="text-xs text-gray-600">Thành viên</div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold flex items-center justify-center gap-1"
                  style={{ color: F8_COLORS.primaryGreen }}
                >
                  <Music size={18} />
                  <span
                    style={{
                      animation: `pulse ${F8_MOTION.durations.radioPulse}ms ease-in-out infinite`,
                      animationDelay: "0.5s",
                    }}
                  >
                    {primary.artisanCount}
                  </span>
                </div>
                <div className="text-xs text-gray-600">Nghệ nhân</div>
              </div>
            </div>

            {/* AI explainability */}
            <div className="mb-4">
              <button
                onClick={() => setExpandedInfo(!expandedInfo)}
                className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                style={{ color: F8_COLORS.contactBlue }}
              >
                <span className="font-medium">🤖 Vì sao gợi ý?</span>
                <span>{expandedInfo ? "−" : "+"}</span>
              </button>

              {expandedInfo && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm space-y-2">
                  {primary.why.map((reason, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span style={{ color: F8_COLORS.contactBlue }}>✓</span>
                      <span className="text-gray-700">{reason}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowContactSheet(true)}
                className="py-2 px-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                style={{ backgroundColor: F8_COLORS.contactBlue }}
              >
                <Phone size={16} />
                Liên hệ
              </button>
              <button
                onClick={() => setShowCalendarModal(true)}
                className="py-2 px-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                style={{ backgroundColor: F8_COLORS.calendarOrange }}
              >
                <Calendar size={16} />
                Lịch
              </button>
            </div>
          </div>

          {/* Secondary clubs */}
          {matchResult.secondaryClubs.length > 0 && (
            <div>
              <h3 className="font-bold mb-3" style={{ color: "var(--baichoi-earth-dark)" }}>
                Câu lạc bộ khác gần bạn
              </h3>

              <div className="space-y-3">
                {matchResult.secondaryClubs.map((club, idx) => (
                  <div
                    key={club.id}
                    className="p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all cursor-pointer hover:translate-y-[-4px]"
                    style={{
                      animation: `carouselFadeIn 300ms ease-out ${idx * F8_MOTION.card.staggerDelay}ms both`,
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-sm" style={{ color: "var(--baichoi-earth-dark)" }}>
                        {club.name}
                      </p>
                      <span
                        className="text-xs font-medium px-2 py-1 rounded"
                        style={{
                          backgroundColor: F8_COLORS.secondaryGray,
                          color: "#fff",
                        }}
                      >
                        {club.matchScore}%
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        {club.distance} km
                      </div>
                      <div className="flex items-center gap-1">
                        <Music size={12} />
                        {club.artisanCount} nghệ nhân
                      </div>
                    </div>

                    <button className="mt-2 w-full py-1 px-2 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium transition">
                      Xem
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI transparency */}
          <div className="mt-8 p-3 rounded-lg text-xs" style={{ backgroundColor: F8_COLORS.bgLight }}>
            <p style={{ color: F8_COLORS.lightText }}>
              <strong>🤖 Gợi ý được tạo bởi AI</strong>
              <br />
              Dựa trên vị trí, trình độ học tập và nhu cầu luyện trực tiếp
            </p>
          </div>
        </div>

        {/* Contact sheet modal */}
        {showContactSheet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-end">
            <div
              className="w-full bg-white rounded-t-2xl p-6"
              style={{
                animation: `bottomSheetSlideUp ${F8_MOTION.durations.transition}ms ease-out`,
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--baichoi-earth-dark)" }}>
                📞 Liên hệ câu lạc bộ
              </h3>

              <div className="space-y-3 mb-6">
                {primary.contact.phone && (
                  <div
                    className="p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                    onClick={() => window.location.href = `tel:${primary.contact.phone}`}
                  >
                    <div className="font-medium text-sm" style={{ color: F8_COLORS.contactBlue }}>
                      📞 {primary.contact.phone}
                    </div>
                  </div>
                )}
                {primary.contact.zalo && (
                  <div className="p-3 rounded-lg bg-blue-50">
                    <div className="font-medium text-sm" style={{ color: F8_COLORS.contactBlue }}>
                      💬 {primary.contact.zalo} (Zalo)
                    </div>
                  </div>
                )}
                {primary.contact.email && (
                  <div
                    className="p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                    onClick={() => window.location.href = `mailto:${primary.contact.email}`}
                  >
                    <div className="font-medium text-sm" style={{ color: F8_COLORS.contactBlue }}>
                      📧 {primary.contact.email}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowContactSheet(false)}
                className="w-full py-2 rounded-lg font-medium"
                style={{ backgroundColor: F8_COLORS.bgLight, color: F8_COLORS.lightText }}
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* Calendar modal */}
        {showCalendarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-6">
            <div
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              style={{
                animation: `slideUp ${F8_MOTION.durations.transition}ms ease-out`,
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--baichoi-earth-dark)" }}>
                📅 Lịch sinh hoạt
              </h3>

              <div className="space-y-2 mb-6">
                {primary.schedule.map((slot, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-green-50 text-sm">
                    <span style={{ color: F8_COLORS.primaryGreen }}>✓</span>
                    {" " + slot}
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-600 mb-6 p-3 bg-gray-50 rounded-lg">
                💡 Tập luyện mở – Chào đón người mới. Bạn có thể tham gia bất kỳ lúc nào!
              </p>

              <button
                onClick={() => setShowCalendarModal(false)}
                className="w-full py-2 rounded-lg font-medium"
                style={{ backgroundColor: F8_COLORS.primaryGreen, color: "#fff" }}
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        <style>{F8_ANIMATIONS}</style>
      </div>
    );
  }

  return null;
}
