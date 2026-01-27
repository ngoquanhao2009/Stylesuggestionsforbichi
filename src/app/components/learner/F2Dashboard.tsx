import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Camera, Book, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";

interface F2DashboardProps {
  onNavigate: (screen: string) => void;
}

export function F2Dashboard({ onNavigate }: F2DashboardProps) {
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
          className="mb-8"
        >
          <h1 
            className="text-3xl mb-2"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            Xin chào, Người học!
          </h1>
          <p 
            className="opacity-80"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            Hãy bắt đầu hành trình khám phá Bài Chòi của bạn
          </p>
        </motion.div>

        {/* Main Action */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            className="p-8 mb-6 text-center border-2 bg-white"
            style={{ borderColor: 'var(--baichoi-earth)' }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Camera 
                size={64} 
                className="mx-auto mb-4"
                style={{ color: 'var(--baichoi-brick)' }}
              />
            </motion.div>
            <h2 
              className="text-2xl mb-3"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Quét Quân Bài
            </h2>
            <p 
              className="mb-6 opacity-80"
              style={{ color: 'var(--baichoi-earth)' }}
            >
              Sử dụng camera để nhận diện quân bài và học lời hô truyền thống
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => onNavigate('scan')}
                className="px-8 py-6 text-lg"
                style={{ 
                  backgroundColor: 'var(--baichoi-brick)',
                  color: 'white'
                }}
              >
                Bắt Đầu Quét
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className="p-6 cursor-pointer hover:shadow-2xl transition-all border-2 bg-white"
              style={{ borderColor: 'var(--baichoi-earth)' }}
              onClick={() => onNavigate('progress')}
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Book 
                  size={32} 
                  className="mb-3"
                  style={{ color: 'var(--baichoi-earth)' }}
                />
              </motion.div>
              <h3 
                className="mb-2"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Tiến Trình
              </h3>
              <p 
                className="text-sm opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Xem các làn điệu đã học
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className="p-6 cursor-pointer hover:shadow-2xl transition-all border-2 bg-white"
              style={{ borderColor: 'var(--baichoi-earth)' }}
              onClick={() => onNavigate('progress')}
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Trophy 
                  size={32} 
                  className="mb-3"
                  style={{ color: 'var(--baichoi-brick)' }}
                />
              </motion.div>
              <h3 
                className="mb-2"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Huy Hiệu
              </h3>
              <p 
                className="text-sm opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Thành tích của bạn
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className="p-6 cursor-pointer hover:shadow-2xl transition-all border-2 bg-white"
              style={{ borderColor: 'var(--baichoi-earth)' }}
              onClick={() => onNavigate('community')}
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Users 
                  size={32} 
                  className="mb-3"
                  style={{ color: 'var(--baichoi-earth)' }}
                />
              </motion.div>
              <h3 
                className="mb-2"
                style={{ color: 'var(--baichoi-earth-dark)' }}
              >
                Cộng Đồng
              </h3>
              <p 
                className="text-sm opacity-70"
                style={{ color: 'var(--baichoi-earth)' }}
              >
                Kết nối nghệ nhân
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}