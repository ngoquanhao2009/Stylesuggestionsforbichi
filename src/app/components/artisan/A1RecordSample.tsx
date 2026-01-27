import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ArrowLeft, Mic, Play, RotateCcw, Check, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface A1RecordSampleProps {
  onBack: () => void;
}

type RecordingState = "idle" | "recording" | "reviewing" | "saved";

export function A1RecordSample({ onBack }: A1RecordSampleProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const [cardName, setCardName] = useState("Nhì Nghèo");
  const [region, setRegion] = useState("Quảng Nam");
  const [melody, setMelody] = useState("Xuân Nữ");

  const startRecording = () => {
    setRecordingState("recording");
    setRecordingTime(0);
    // Mock timer
    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 30) {
          clearInterval(interval);
          setRecordingState("reviewing");
          return 30;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setRecordingState("reviewing");
  };

  const saveRecording = () => {
    setRecordingState("saved");
    setTimeout(() => {
      setRecordingState("idle");
      setRecordingTime(0);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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
              A1 - Thu Âm Giọng Hô Chuẩn
            </h1>
            <p 
              className="opacity-80"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Mỗi bản thu là một phần của di sản sống
            </p>
          </div>
        </motion.div>

        {/* Card Information */}
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
              Thông Tin Quân Bài
            </h2>

            {/* Card Name */}
            <div className="mb-4">
              <label 
                className="block mb-2 text-sm"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Tên Quân Bài (AI gợi ý - có thể sửa)
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
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
                Vùng Miền
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
                <option value="Khác">Khác</option>
              </select>
            </div>

            {/* Melody */}
            <div className="mb-4">
              <label 
                className="block mb-2 text-sm"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Làn Điệu
              </label>
              <input
                type="text"
                value={melody}
                onChange={(e) => setMelody(e.target.value)}
                placeholder="Ví dụ: Xuân Nữ / Cổ Bản / Hát Hội"
                className="w-full p-3 border-2 rounded-lg"
                style={{ 
                  borderColor: 'var(--baichoi-earth)',
                  color: 'var(--baichoi-earth-dark)'
                }}
              />
            </div>
          </Card>
        </motion.div>

        {/* Recording Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card 
            className="p-8 mb-6 border-2 bg-white text-center"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <h2 
              className="text-xl mb-6"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Khu Vực Thu Âm
            </h2>

            {/* Recording Button */}
            {recordingState === "idle" && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={startRecording}
                  className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center cursor-pointer hover:shadow-2xl transition-all"
                  style={{ backgroundColor: 'var(--baichoi-brick)' }}
                >
                  <Mic size={48} className="text-white" />
                </button>
                <p 
                  className="text-lg mb-2"
                  style={{ color: 'var(--baichoi-earth-dark)' }}
                >
                  Bấm để bắt đầu thu âm
                </p>
              </motion.div>
            )}

            {/* Recording State */}
            {recordingState === "recording" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <button
                    onClick={stopRecording}
                    className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center cursor-pointer"
                    style={{ backgroundColor: 'var(--baichoi-brick)' }}
                  >
                    <div className="w-8 h-8 bg-white rounded-sm"></div>
                  </button>
                </motion.div>
                
                {/* Waveform visualization (mock) */}
                <div className="flex justify-center items-center gap-1 mb-4 h-16">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 bg-current rounded-full"
                      style={{ color: 'var(--baichoi-brick)' }}
                      animate={{ 
                        height: [10, Math.random() * 50 + 10, 10]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.5,
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </div>

                <div 
                  className="text-3xl mb-2"
                  style={{ color: 'var(--baichoi-brick)' }}
                >
                  {formatTime(recordingTime)}
                </div>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  Đang thu âm...
                </p>
              </motion.div>
            )}

            {/* Reviewing State */}
            {recordingState === "reviewing" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div 
                  className="text-3xl mb-6"
                  style={{ color: 'var(--baichoi-earth-dark)' }}
                >
                  {formatTime(recordingTime)}
                </div>

                <div className="flex justify-center gap-4 mb-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => {/* Play logic */}}
                      className="flex items-center gap-2"
                      style={{ 
                        backgroundColor: 'var(--baichoi-earth)',
                        color: 'white'
                      }}
                    >
                      <Play size={20} />
                      Nghe Lại
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setRecordingState("idle")}
                      variant="outline"
                      className="flex items-center gap-2"
                      style={{ 
                        borderColor: 'var(--baichoi-earth)',
                        color: 'var(--baichoi-earth)'
                      }}
                    >
                      <RotateCcw size={20} />
                      Thu Lại
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={saveRecording}
                      className="flex items-center gap-2"
                      style={{ 
                        backgroundColor: 'var(--baichoi-brick)',
                        color: 'white'
                      }}
                    >
                      <Check size={20} />
                      Lưu Bản Thu
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Saved State */}
            {recordingState === "saved" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: '#10b981' }}
                >
                  <Check size={64} className="text-white" />
                </motion.div>
                <p 
                  className="text-xl"
                  style={{ color: 'var(--baichoi-earth-dark)' }}
                >
                  Đã lưu thành công!
                </p>
              </motion.div>
            )}

            {/* Technical Tips */}
            {recordingState === "idle" && (
              <div 
                className="mt-6 p-4 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--baichoi-yellow)',
                  border: '1px solid var(--baichoi-earth)'
                }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle 
                    size={20} 
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: 'var(--baichoi-earth)' }}
                  />
                  <div className="text-left">
                    <p 
                      className="text-sm mb-2"
                      style={{ color: 'var(--baichoi-earth-dark)' }}
                    >
                      <strong>Gợi ý kỹ thuật:</strong>
                    </p>
                    <ul 
                      className="text-sm space-y-1 opacity-80"
                      style={{ color: 'var(--baichoi-earth)' }}
                    >
                      <li>• Giữ khoảng cách 20–30cm với micro</li>
                      <li>• Không cần hát to, hát tự nhiên như bình thường</li>
                      <li>• Chọn môi trường yên tĩnh để thu âm</li>
                      <li>• Audio format: WAV / 44.1kHz</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Technical Notes */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card 
            className="p-4 border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <p 
              className="text-sm text-center opacity-70"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              <strong>Ghi chú bảo mật:</strong> Dữ liệu được mã hóa AES-256 trước khi lưu trữ. 
              Metadata bao gồm: Nghệ nhân, vùng miền, quân bài, ngày thu.
            </p>
          </Card>
        </motion.div>

        {/* Ethics Notice */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
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
              ⚠️ <strong>Ghi chú đạo đức AI:</strong> Dữ liệu di sản được bảo vệ và sử dụng vì mục đích giáo dục – bảo tồn. 
              Kết quả AI chỉ mang tính chất gợi ý – Con người là bên quyết định cuối cùng.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
