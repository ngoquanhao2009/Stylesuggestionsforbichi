import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ArrowLeft, Play, Pause, Volume2, CheckCircle, XCircle, MessageSquare, Info } from "lucide-react";
import { motion } from "motion/react";

interface A2AIRestorationProps {
  onBack: () => void;
}

interface RestorationItem {
  id: string;
  cardName: string;
  source: string;
  noiseLevel: "Cao" | "Trung bình" | "Thấp";
  status: "pending" | "approved" | "rejected";
}

export function A2AIRestoration({ onBack }: A2AIRestorationProps) {
  const [selectedItem, setSelectedItem] = useState<RestorationItem | null>(null);
  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
  const [isPlayingRestored, setIsPlayingRestored] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showAIInfo, setShowAIInfo] = useState(false);

  const [items] = useState<RestorationItem[]>([
    {
      id: "1",
      cardName: "Nhì Nghèo",
      source: "Băng cassette",
      noiseLevel: "Cao",
      status: "pending"
    },
    {
      id: "2",
      cardName: "Ba Giầu",
      source: "Đĩa than",
      noiseLevel: "Trung bình",
      status: "pending"
    },
    {
      id: "3",
      cardName: "Tư Phủ",
      source: "File cũ",
      noiseLevel: "Thấp",
      status: "approved"
    }
  ]);

  const handleApprove = () => {
    if (selectedItem) {
      // Logic to approve
      alert("Đã chấp nhận bản phục dựng!");
      setSelectedItem(null);
    }
  };

  const handleReject = () => {
    if (selectedItem && feedback.trim()) {
      // Logic to reject with feedback
      alert("Đã từ chối và gửi góp ý!");
      setSelectedItem(null);
      setFeedback("");
    } else {
      alert("Vui lòng nhập góp ý trước khi từ chối!");
    }
  };

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--baichoi-yellow)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center mb-8"
        >
          <Button 
            variant="ghost"
            onClick={() => {
              if (selectedItem) {
                setSelectedItem(null);
              } else {
                onBack();
              }
            }}
            className="mr-4 hover:scale-110 transition-transform"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            <ArrowLeft size={24} />
          </Button>
          <div>
            <h1 
              className="text-3xl mb-2"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              A2 - Xác Nhận Phục Dựng AI
            </h1>
            <p 
              className="opacity-80"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Đảm bảo AI không làm "mất hồn" làn điệu cổ
            </p>
          </div>
        </motion.div>

        {/* List View */}
        {!selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card 
              className="p-6 mb-6 border-2 bg-white"
              style={{ borderColor: 'var(--baichoi-earth)' }}
            >
              <h2 
                className="text-xl mb-4"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Danh Sách Bản Ghi Chờ Xác Nhận
              </h2>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => item.status === "pending" && setSelectedItem(item)}
                    className={`p-4 rounded-lg border-2 ${item.status === "pending" ? "cursor-pointer" : "opacity-50"}`}
                    style={{ 
                      borderColor: 'var(--baichoi-earth)',
                      backgroundColor: item.status === "approved" ? '#d1fae5' : 'white'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 
                          className="text-lg mb-1"
                          style={{ color: 'var(--baichoi-earth-dark)' }}
                        >
                          {item.cardName}
                        </h3>
                        <div className="flex gap-4 text-sm opacity-70">
                          <span style={{ color: 'var(--baichoi-earth)' }}>
                            Nguồn: {item.source}
                          </span>
                          <span 
                            style={{ 
                              color: item.noiseLevel === "Cao" ? '#dc2626' : 
                                     item.noiseLevel === "Trung bình" ? '#f59e0b' : '#10b981'
                            }}
                          >
                            Nhiễu: {item.noiseLevel}
                          </span>
                        </div>
                      </div>
                      <div>
                        {item.status === "pending" && (
                          <span 
                            className="px-3 py-1 rounded-full text-sm"
                            style={{ 
                              backgroundColor: 'var(--baichoi-yellow)',
                              color: 'var(--baichoi-earth-dark)'
                            }}
                          >
                            Chờ duyệt
                          </span>
                        )}
                        {item.status === "approved" && (
                          <span 
                            className="px-3 py-1 rounded-full text-sm bg-green-100"
                            style={{ color: '#065f46' }}
                          >
                            ✓ Đã duyệt
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* A/B Comparison View */}
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* AI Info Panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6"
            >
              <Card 
                className="p-4 border-2 bg-blue-50"
                style={{ borderColor: '#3b82f6' }}
              >
                <div className="flex items-start gap-3">
                  <Info 
                    size={20} 
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: '#1e40af' }}
                  />
                  <div>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: '#1e3a8a' }}
                    >
                      <strong>AI Transparency Panel - Cách AI hoạt động:</strong>
                    </p>
                    <button
                      onClick={() => setShowAIInfo(!showAIInfo)}
                      className="text-sm underline"
                      style={{ color: '#2563eb' }}
                    >
                      {showAIInfo ? "Ẩn chi tiết" : "Xem chi tiết"}
                    </button>
                    
                    {showAIInfo && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="mt-3 text-sm space-y-2"
                        style={{ color: '#1e40af' }}
                      >
                        <p>• <strong>Mô hình sử dụng:</strong> U-Net (Denoising) + HiFi-GAN</p>
                        <p>• <strong>Dữ liệu huấn luyện:</strong> 500+ bản ghi chất lượng cao từ nghệ nhân</p>
                        <p>• <strong>Mức độ tin cậy:</strong> 87% (dựa trên đánh giá của 12 nghệ nhân)</p>
                        <p>• <strong>Quy trình:</strong> Loại nhiễu → Khôi phục tần số → Cân bằng âm thanh</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Card Info */}
            <Card 
              className="p-4 mb-6 border-2 bg-white"
              style={{ borderColor: 'var(--baichoi-earth)' }}
            >
              <h2 
                className="text-xl mb-2"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                {selectedItem.cardName}
              </h2>
              <div className="flex gap-4 text-sm">
                <span style={{ color: 'var(--baichoi-earth)' }}>
                  Nguồn: {selectedItem.source}
                </span>
                <span style={{ color: 'var(--baichoi-earth)' }}>
                  Độ nhiễu: {selectedItem.noiseLevel}
                </span>
              </div>
            </Card>

            {/* A/B Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Original Audio */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card 
                  className="p-6 border-2 bg-white"
                  style={{ borderColor: 'var(--baichoi-earth)' }}
                >
                  <h3 
                    className="text-lg mb-4"
                    style={{ color: 'var(--baichoi-earth-dark)' }}
                  >
                    Âm Thanh Gốc
                  </h3>

                  {/* Waveform */}
                  <div className="h-24 mb-4 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--baichoi-yellow)' }}
                  >
                    <div className="flex items-center gap-1 h-16">
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full"
                          style={{ 
                            height: `${Math.random() * 60 + 10}px`,
                            backgroundColor: 'var(--baichoi-earth)'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Play Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setIsPlayingOriginal(!isPlayingOriginal)}
                      className="w-full flex items-center justify-center gap-2"
                      style={{ 
                        backgroundColor: 'var(--baichoi-earth)',
                        color: 'white'
                      }}
                    >
                      {isPlayingOriginal ? <Pause size={20} /> : <Play size={20} />}
                      {isPlayingOriginal ? "Dừng" : "Phát"}
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>

              {/* Restored Audio */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card 
                  className="p-6 border-2 bg-white relative"
                  style={{ borderColor: 'var(--baichoi-brick)' }}
                >
                  {/* AI Badge */}
                  <div 
                    className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs"
                    style={{ 
                      backgroundColor: '#dbeafe',
                      color: '#1e40af'
                    }}
                  >
                    🤖 AI
                  </div>

                  <h3 
                    className="text-lg mb-4"
                    style={{ color: 'var(--baichoi-earth-dark)' }}
                  >
                    Âm Thanh AI Phục Dựng
                  </h3>

                  {/* Waveform */}
                  <div className="h-24 mb-4 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#fef3c7' }}
                  >
                    <div className="flex items-center gap-1 h-16">
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full"
                          style={{ 
                            height: `${Math.random() * 60 + 10}px`,
                            backgroundColor: 'var(--baichoi-brick)'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Play Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setIsPlayingRestored(!isPlayingRestored)}
                      className="w-full flex items-center justify-center gap-2"
                      style={{ 
                        backgroundColor: 'var(--baichoi-brick)',
                        color: 'white'
                      }}
                    >
                      {isPlayingRestored ? <Pause size={20} /> : <Play size={20} />}
                      {isPlayingRestored ? "Dừng" : "Phát"}
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            </div>

            {/* Playback Controls */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card 
                className="p-4 mb-6 border-2 bg-white"
                style={{ borderColor: 'var(--baichoi-earth)' }}
              >
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      setIsPlayingOriginal(true);
                      setIsPlayingRestored(true);
                    }}
                    className="flex-1"
                    style={{ 
                      backgroundColor: 'var(--baichoi-earth)',
                      color: 'white'
                    }}
                  >
                    ▶️ Phát Đồng Thời
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    style={{ 
                      borderColor: 'var(--baichoi-earth)',
                      color: 'var(--baichoi-earth)'
                    }}
                  >
                    🔄 Phát Luân Phiên
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Review Question */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card 
                className="p-6 mb-6 border-2 bg-white"
                style={{ borderColor: 'var(--baichoi-earth)' }}
              >
                <h3 
                  className="text-lg mb-4"
                  style={{ color: 'var(--baichoi-earth-dark)' }}
                >
                  Câu Hỏi Xác Nhận
                </h3>

                <p 
                  className="mb-6 text-lg"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  "Bản phục dựng này có giữ đúng hồn cốt và làn điệu truyền thống không?"
                </p>

                {/* Feedback Textarea */}
                <div className="mb-6">
                  <label 
                    className="block mb-2 text-sm"
                    style={{ color: 'var(--baichoi-earth)' }}
                  >
                    💬 Góp Ý (bắt buộc khi từ chối)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Ví dụ: Âm sắc hơi mỏng, cần tăng độ ấm ở giọng ca..."
                    rows={4}
                    className="w-full p-3 border-2 rounded-lg"
                    style={{ 
                      borderColor: 'var(--baichoi-earth)',
                      color: 'var(--baichoi-earth-dark)'
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={handleApprove}
                      className="w-full flex items-center justify-center gap-2 text-lg py-6"
                      style={{ 
                        backgroundColor: '#10b981',
                        color: 'white'
                      }}
                    >
                      <CheckCircle size={24} />
                      ✅ Chấp Nhận
                    </Button>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={handleReject}
                      className="w-full flex items-center justify-center gap-2 text-lg py-6"
                      style={{ 
                        backgroundColor: '#dc2626',
                        color: 'white'
                      }}
                    >
                      <XCircle size={24} />
                      ❌ Từ Chối
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>

            {/* Human-in-the-loop Badge Info */}
            <Card 
              className="p-4 border-2 bg-green-50"
              style={{ borderColor: '#10b981' }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#10b981' }}
                >
                  <span className="text-white text-lg">👤</span>
                </div>
                <div>
                  <p 
                    className="text-sm mb-1"
                    style={{ color: '#065f46' }}
                  >
                    <strong>Human-in-the-loop Verification</strong>
                  </p>
                  <p 
                    className="text-sm opacity-80"
                    style={{ color: '#047857' }}
                  >
                    Chỉ khi nghệ nhân chấp nhận, bản phục dựng mới được gắn nhãn "Đã được nghệ nhân xác nhận" 
                    và sử dụng cho giáo dục.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Ethics Notice */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <div 
            className="p-4 rounded-lg text-center"
            style={{ 
              backgroundColor: '#fef3c7',
              border: '2px solid #f59e0b'
            }}
          >
            <p 
              className="text-sm"
              style={{ color: '#92400e' }}
            >
              ⚠️ <strong>Kết quả AI chỉ mang tính chất gợi ý – Con người là bên quyết định cuối cùng.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
