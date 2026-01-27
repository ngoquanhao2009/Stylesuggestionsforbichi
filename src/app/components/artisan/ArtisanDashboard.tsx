import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Mic, Volume2, FileText, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface ArtisanDashboardProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function ArtisanDashboard({ onBack, onNavigate }: ArtisanDashboardProps) {
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
              Chào mừng, Nghệ Nhân!
            </h1>
            <p 
              className="opacity-80"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Cùng gìn giữ và truyền dạy di sản Bài Chòi
            </p>
          </div>
        </motion.div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* A1 - Record Sample */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className="p-6 cursor-pointer hover:shadow-2xl transition-all border-2 bg-white"
              style={{ borderColor: 'var(--baichoi-earth)' }}
              onClick={() => onNavigate('record')}
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--baichoi-brick)' }}
              >
                <Mic size={32} className="text-white" />
              </motion.div>
              <h2 
                className="text-xl mb-3"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                A1 - Thu Âm Mẫu
              </h2>
              <p 
                className="text-sm opacity-80 mb-4"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Thực hiện tiếng hô chuẩn cho từng quân bài để học viên có thể học tập
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="w-full"
                  style={{ 
                    backgroundColor: 'var(--baichoi-brick)',
                    color: 'white'
                  }}
                >
                  Bắt Đầu Thu Âm
                </Button>
              </motion.div>
            </Card>
          </motion.div>

          {/* A2 - AI Restoration */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className="p-6 cursor-pointer hover:shadow-2xl transition-all border-2 bg-white"
              style={{ borderColor: 'var(--baichoi-earth)' }}
              onClick={() => onNavigate('restoration')}
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--baichoi-earth)' }}
              >
                <Volume2 size={32} className="text-white" />
              </motion.div>
              <h2 
                className="text-xl mb-3"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                A2 - Xác Nhận Phục Dựng
              </h2>
              <p 
                className="text-sm opacity-80 mb-4"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Nghe và xác nhận bản phục dựng AI có giữ đúng "hồn" làn điệu không
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  className="w-full"
                  style={{ 
                    borderColor: 'var(--baichoi-earth)',
                    color: 'var(--baichoi-earth)'
                  }}
                >
                  Xem Danh Sách
                </Button>
              </motion.div>
            </Card>
          </motion.div>

          {/* A3 - Contribute Scripts */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className="p-6 cursor-pointer hover:shadow-2xl transition-all border-2 bg-white"
              style={{ borderColor: 'var(--baichoi-earth)' }}
              onClick={() => onNavigate('contribute')}
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--baichoi-earth-dark)' }}
              >
                <FileText size={32} className="text-white" />
              </motion.div>
              <h2 
                className="text-xl mb-3"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                A3 - Đóng Góp Kịch Bản
              </h2>
              <p 
                className="text-sm opacity-80 mb-4"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Cung cấp dị bản hoặc lời hô thất truyền vào hệ thống
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  className="w-full"
                  style={{ 
                    borderColor: 'var(--baichoi-earth)',
                    color: 'var(--baichoi-earth)'
                  }}
                >
                  Đóng Góp
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-3 gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card 
                className="p-4 text-center border-2 bg-white"
                style={{ borderColor: 'var(--baichoi-earth)' }}
              >
                <div 
                  className="text-3xl mb-1"
                  style={{ color: 'var(--baichoi-brick)' }}
                >
                  12
                </div>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  Bản thu âm
                </p>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card 
                className="p-4 text-center border-2 bg-white"
                style={{ borderColor: 'var(--baichoi-earth)' }}
              >
                <div 
                  className="text-3xl mb-1"
                  style={{ color: 'var(--baichoi-brick)' }}
                >
                  5
                </div>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  Đã xác nhận
                </p>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card 
                className="p-4 text-center border-2 bg-white"
                style={{ borderColor: 'var(--baichoi-earth)' }}
              >
                <div 
                  className="text-3xl mb-1"
                  style={{ color: 'var(--baichoi-brick)' }}
                >
                  3
                </div>
                <p 
                  className="text-sm opacity-70"
                  style={{ color: 'var(--baichoi-earth)' }}
                >
                  Kịch bản mới
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}