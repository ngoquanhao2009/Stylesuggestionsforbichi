import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Pause, MapPin } from 'lucide-react';

interface MapHeaderProps {
  onBack: () => void;
  onStoryMode: () => void;
  storyMode: boolean;
}

const B6_MapHeader: React.FC<MapHeaderProps> = ({ onBack, onStoryMode, storyMode }) => {
  return (
    <motion.div
      className="relative h-20 bg-gradient-to-r from-blue-900/90 via-blue-800/90 to-emerald-900/90 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between shadow-lg"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left side - Back button */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={24} />
        <span className="font-semibold">Quay lại</span>
      </motion.button>

      {/* Center - Title */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.span
          className="text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🗺️
        </motion.span>
        <h2 className="text-2xl font-bold text-white">
          Bản Đồ <span className="text-yellow-300">Đà Nẵng</span>
        </h2>
      </motion.div>

      {/* Right side - Story mode button */}
      <motion.button
        onClick={onStoryMode}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
          storyMode
            ? 'bg-yellow-400 text-blue-900 shadow-lg shadow-yellow-400/50'
            : 'bg-white/20 text-white hover:bg-white/30'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {storyMode ? (
          <>
            <Pause size={20} />
            <span>Dừng kết chuyện</span>
          </>
        ) : (
          <>
            <Play size={20} />
            <span>▶ Chế độ kết chuyện</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default B6_MapHeader;
