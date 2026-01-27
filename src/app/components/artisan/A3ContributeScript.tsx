import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ArrowLeft, FileText, Mic, Save, Send, Sparkles, Info, Check } from "lucide-react";
import { motion } from "motion/react";

interface A3ContributeScriptProps {
  onBack: () => void;
}

export function A3ContributeScript({ onBack }: A3ContributeScriptProps) {
  const [cardName, setCardName] = useState("");
  const [region, setRegion] = useState("Quảng Nam");
  const [contentType, setContentType] = useState<string[]>([]);
  const [scriptContent, setScriptContent] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showNLPAnalysis, setShowNLPAnalysis] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleContentType = (type: string) => {
    setContentType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleVoiceToText = () => {
    setIsListening(!isListening);
    // Mock voice input
    if (!isListening) {
      setTimeout(() => {
        setScriptContent(prev => prev + " [Nội dung từ giọng nói...]");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleSaveDraft = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSubmit = () => {
    if (cardName && scriptContent) {
      alert("Đã gửi đóng góp thành công! Cảm ơn nghệ nhân đã chia sẻ.");
      // Reset form
      setCardName("");
      setScriptContent("");
      setContentType([]);
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  // Mock NLP Analysis
  const nlpAnalysis = {
    rhymeScheme: "Lục bát (6-8)",
    tonalPattern: "Bằng-Trắc-Bằng-Bằng-Trắc-Bằng",
    similarity: 72,
    similarRegion: "Bình Định",
    suggestedTags: ["Quân bài", "Tích truyện", "Vùng miền Trung"]
  };

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--baichoi-yellow)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center mb-8"
        >
          <Button 
            variant="ghost"
            onClick={onBack}
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
              A3 - Đóng Góp Kịch Bản / Dị Bản
            </h1>
            <p 
              className="opacity-80"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Khôi phục lời hô thất truyền – dị bản vùng miền
            </p>
          </div>
        </motion.div>

        {/* Form Input */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            className="p-6 mb-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <h2 
              className="text-xl mb-4"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Form Nhập Liệu
            </h2>

            {/* Card Name */}
            <div className="mb-4">
              <label 
                className="block mb-2 text-sm"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Tên Quân Bài *
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Ví dụ: Nhì Nghèo, Ba Giầu..."
                className="w-full p-3 border-2 rounded-lg"
                style={{ 
                  borderColor: 'var(--baichoi-earth)',
                  color: 'var(--baichoi-earth-dark)'
                }}
              />
            </div>

            {/* Region */}
            <div className="mb-4">
              <label 
                className="block mb-2 text-sm"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Vùng Miền *
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-3 border-2 rounded-lg"
                style={{ 
                  borderColor: 'var(--baichoi-earth)',
                  color: 'var(--baichoi-earth-dark)'
                }}
              >
                <option value="Quảng Nam">Quảng Nam</option>
                <option value="Bình Định">Bình Định</option>
                <option value="Phú Yên">Phú Yên</option>
                <option value="Quảng Ngãi">Quảng Ngãi</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Content Type */}
            <div className="mb-4">
              <label 
                className="block mb-2 text-sm"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Dạng Nội Dung * (chọn nhiều)
              </label>
              <div className="flex flex-wrap gap-3">
                {["Lời hô", "Câu thai", "Tích truyện"].map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleContentType(type)}
                    className="px-4 py-2 rounded-lg border-2 transition-all"
                    style={{
                      borderColor: 'var(--baichoi-earth)',
                      backgroundColor: contentType.includes(type) 
                        ? 'var(--baichoi-brick)' 
                        : 'white',
                      color: contentType.includes(type) 
                        ? 'white' 
                        : 'var(--baichoi-earth-dark)'
                    }}
                  >
                    {contentType.includes(type) && "☑ "}
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Script Content */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label 
                  className="text-sm"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  Nội Dung Kịch Bản *
                </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVoiceToText}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm"
                  style={{
                    backgroundColor: isListening ? 'var(--baichoi-brick)' : 'var(--baichoi-earth)',
                    color: 'white'
                  }}
                >
                  <Mic size={16} />
                  {isListening ? "Đang nghe..." : "Giọng nói → Text"}
                </motion.button>
              </div>
              <textarea
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                placeholder={`Ví dụ:\n\n"Nhì Nghèo hô rằng:\nNgười nghèo có chí\nGiầu sang gì đâu\nCó công mài sắt\nCó ngày nên kim..."`}
                rows={8}
                className="w-full p-3 border-2 rounded-lg font-mono"
                style={{ 
                  borderColor: 'var(--baichoi-earth)',
                  color: 'var(--baichoi-earth-dark)'
                }}
              />
              <p 
                className="text-xs mt-2 opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Hỗ trợ nhập bằng giọng nói hoặc gõ trực tiếp
              </p>
            </div>
          </Card>
        </motion.div>

        {/* NLP AI Analysis */}
        {scriptContent.length > 50 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card 
              className="p-6 mb-6 border-2 bg-purple-50"
              style={{ borderColor: '#9333ea' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles size={24} style={{ color: '#9333ea' }} />
                  <h3 
                    className="text-lg"
                    style={{ color: '#581c87' }}
                  >
                    Gợi Ý AI (NLP Analysis)
                  </h3>
                </div>
                <button
                  onClick={() => setShowNLPAnalysis(!showNLPAnalysis)}
                  className="text-sm underline"
                  style={{ color: '#7c3aed' }}
                >
                  {showNLPAnalysis ? "Ẩn" : "Xem chi tiết"}
                </button>
              </div>

              {showNLPAnalysis && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="space-y-4"
                >
                  {/* Rhyme Scheme */}
                  <div>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: '#581c87' }}
                    >
                      <strong>📝 Vần Điệu:</strong>
                    </p>
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: '#faf5ff' }}
                    >
                      <span 
                        className="text-sm"
                        style={{ color: '#7c3aed' }}
                      >
                        {nlpAnalysis.rhymeScheme}
                      </span>
                    </div>
                  </div>

                  {/* Tonal Pattern */}
                  <div>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: '#581c87' }}
                    >
                      <strong>🎵 Nhịp Bằng/Trắc:</strong>
                    </p>
                    <div 
                      className="p-3 rounded-lg font-mono text-sm"
                      style={{ 
                        backgroundColor: '#faf5ff',
                        color: '#7c3aed'
                      }}
                    >
                      {nlpAnalysis.tonalPattern}
                    </div>
                  </div>

                  {/* Similarity */}
                  <div>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: '#581c87' }}
                    >
                      <strong>🔍 Độ Tương Đồng:</strong>
                    </p>
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: '#faf5ff' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${nlpAnalysis.similarity}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-3 rounded-full"
                            style={{ backgroundColor: '#9333ea' }}
                          />
                        </div>
                        <span 
                          className="text-sm font-bold"
                          style={{ color: '#7c3aed' }}
                        >
                          {nlpAnalysis.similarity}%
                        </span>
                      </div>
                      <p 
                        className="text-sm mt-2"
                        style={{ color: '#7c3aed' }}
                      >
                        "Nội dung này tương đồng {nlpAnalysis.similarity}% với dị bản {nlpAnalysis.similarRegion}"
                      </p>
                    </div>
                  </div>

                  {/* Suggested Tags */}
                  <div>
                    <p 
                      className="text-sm mb-2"
                      style={{ color: '#581c87' }}
                    >
                      <strong>🏷️ Tagging Tự Động:</strong>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {nlpAnalysis.suggestedTags.map((tag, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: '#e9d5ff',
                            color: '#581c87'
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* AI Info */}
                  <div 
                    className="p-3 rounded-lg flex items-start gap-2"
                    style={{ 
                      backgroundColor: '#ddd6fe',
                      border: '1px solid #9333ea'
                    }}
                  >
                    <Info size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#581c87' }} />
                    <p 
                      className="text-xs"
                      style={{ color: '#581c87' }}
                    >
                      AI phân tích cấu trúc văn học dựa trên 300+ bản kịch bản truyền thống. 
                      Độ chính xác: 89% (đã được 15 nghệ nhân xác nhận).
                    </p>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card 
            className="p-6 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <h3 
              className="text-lg mb-4"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Nút Hành Động
            </h3>

            <div className="flex gap-4">
              {/* Save Draft */}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button
                  onClick={handleSaveDraft}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 text-lg py-6"
                  style={{ 
                    borderColor: 'var(--baichoi-earth)',
                    color: isSaved ? '#10b981' : 'var(--baichoi-earth)',
                    backgroundColor: isSaved ? '#d1fae5' : 'white'
                  }}
                >
                  {isSaved ? (
                    <>
                      <Check size={24} />
                      Đã Lưu
                    </>
                  ) : (
                    <>
                      <Save size={24} />
                      💾 Lưu Nháp
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Submit */}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 text-lg py-6"
                  style={{ 
                    backgroundColor: 'var(--baichoi-brick)',
                    color: 'white'
                  }}
                >
                  <Send size={24} />
                  📤 Gửi Đóng Góp
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Technical Notes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Card 
            className="p-4 border-2 bg-blue-50"
            style={{ borderColor: '#3b82f6' }}
          >
            <div className="flex items-start gap-3">
              <Info size={20} className="flex-shrink-0 mt-0.5" style={{ color: '#1e40af' }} />
              <div>
                <p 
                  className="text-sm mb-2"
                  style={{ color: '#1e3a8a' }}
                >
                  <strong>Ghi Chú Kỹ Thuật:</strong>
                </p>
                <ul 
                  className="text-sm space-y-1 opacity-90"
                  style={{ color: '#1e40af' }}
                >
                  <li>• NLP Engine: BERT-based model + Custom Vietnamese tokenizer</li>
                  <li>• Tự động phát hiện: Lục bát, Song thất lục bát, Bằng/Trắc</li>
                  <li>• Metadata gắn kèm: Quân bài, Chủ đề, Vùng miền, Nguồn</li>
                  <li>• Dữ liệu được lưu trữ an toàn với AES-256 encryption</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

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
              ⚠️ <strong>Đạo Đức & Bản Quyền:</strong> Tất cả đóng góp sẽ được ghi nhận tên nghệ nhân. 
              Dữ liệu chỉ được sử dụng cho mục đích giáo dục và bảo tồn di sản. 
              Kết quả AI chỉ mang tính chất gợi ý – Con người là bên quyết định cuối cùng.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}