import React from 'react';
import { motion } from 'motion/react';
import { X, TrendingDown, AlertCircle, Zap } from 'lucide-react';

interface Area {
  id: string;
  name: string;
  district: string;
  status: 'critical' | 'teaching' | 'thriving';
  coordinates: { x: number; y: number };
  artisans: number;
  classes: number;
  students: number;
  riskLevel: string;
  description: string;
  historicalData: { year: number; status: 'critical' | 'teaching' | 'thriving' }[];
  aiInsight: string;
}

interface InfoPanelProps {
  area: Area;
  currentYear: number;
  onClose: () => void;
}

const B6_InfoPanel: React.FC<InfoPanelProps> = ({ area, currentYear, onClose }) => {
  const statusBadgeColor = {
    critical: 'bg-red-500/20 text-red-600 border-red-300',
    teaching: 'bg-yellow-500/20 text-yellow-600 border-yellow-300',
    thriving: 'bg-green-500/20 text-green-600 border-green-300',
  };

  const statusLabel = {
    critical: '🔴 Ưu tiên bảo tồn',
    teaching: '🟡 Đang truyền dạy',
    thriving: '🟢 Phát triển tốt',
  };

  const riskColors = {
    'Rất cao': 'text-red-600',
    'Cao': 'text-orange-600',
    'Trung bình': 'text-yellow-600',
    'Thấp': 'text-green-600',
  };

  return (
    <motion.div
      className="w-96 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden flex flex-col"
      initial={{ opacity: 0, x: 400, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 400, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Header */}
      <motion.div
        className="relative bg-gradient-to-r from-blue-600 via-emerald-500 to-yellow-400 p-6 text-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-bold mb-1">{area.name}</h3>
        <p className="text-sm text-white/90">{area.district}, Đà Nẵng</p>

        {/* Status Badge */}
        <motion.div
          className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold border ${
            statusBadgeColor[area.status]
          }`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {statusLabel[area.status]}
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-sm text-gray-700 leading-relaxed">{area.description}</p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Artisans */}
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-purple-600">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {area.artisans}
              </motion.span>
            </div>
            <p className="text-xs text-purple-700 font-medium mt-1">👥 Nghệ nhân</p>
          </motion.div>

          {/* Classes */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-blue-600">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                {area.classes}
              </motion.span>
            </div>
            <p className="text-xs text-blue-700 font-medium mt-1">🎓 Lớp học</p>
          </motion.div>

          {/* Students */}
          <motion.div
            className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-green-600">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {area.students}
              </motion.span>
            </div>
            <p className="text-xs text-green-700 font-medium mt-1">👶 Học sinh</p>
          </motion.div>
        </motion.div>

        {/* Risk Level */}
        <motion.div
          className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-yellow-600" />
            <span className="font-semibold text-gray-800">Nguy cơ mai một</span>
          </div>
          <div className={`text-lg font-bold ${riskColors[area.riskLevel as keyof typeof riskColors]}`}>
            {area.riskLevel}
          </div>
          <motion.div
            className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden"
            animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className={`h-full rounded-full ${
                area.riskLevel === 'Rất cao'
                  ? 'bg-red-500 w-4/5'
                  : area.riskLevel === 'Cao'
                  ? 'bg-orange-500 w-3/5'
                  : area.riskLevel === 'Trung bình'
                  ? 'bg-yellow-500 w-2/5'
                  : 'bg-green-500 w-1/5'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* AI Insight */}
        <motion.div
          className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.span
              animate={{ opacity: [0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-xl"
            >
              🤖
            </motion.span>
            <span className="font-semibold text-gray-800">Phân tích AI</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{area.aiInsight}</p>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="bg-gray-50 border-t p-4 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <motion.button
          className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          📚 Xem chương trình truyền dạy
        </motion.button>

        <motion.button
          className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          🤝 Kết nối nghệ nhân / CLB
        </motion.button>

        <motion.button
          className="w-full py-2 rounded-lg font-semibold bg-gray-600 text-white hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ➕ Đề xuất hỗ trợ
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default B6_InfoPanel;
