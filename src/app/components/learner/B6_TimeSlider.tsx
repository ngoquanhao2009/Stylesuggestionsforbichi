import React from 'react';
import { motion } from 'motion/react';

interface TimeSliderProps {
  currentYear: number;
  onYearChange: (year: number) => void;
  disabled: boolean;
  compact?: boolean;
}

const B6_TimeSlider: React.FC<TimeSliderProps> = ({ currentYear, onYearChange, disabled, compact }) => {
  const years = [2015, 2018, 2020, 2025];
  const minYear = 2015;
  const maxYear = 2025;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onYearChange(parseInt(e.target.value));
  };

  const progressPercentage = ((currentYear - minYear) / (maxYear - minYear)) * 100;

  return (
    <div className={compact ? 'space-y-2' : 'space-y-4'}>
      {/* Header */}
      {!compact && (
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="text-white font-bold text-lg">⏳ Khám phá theo thời gian</h3>
            <p className="text-gray-300 text-sm">Kéo thanh để xem sự thay đổi của di sản qua các năm</p>
          </div>
          <motion.div
            className="text-4xl font-black text-yellow-300 drop-shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {currentYear}
          </motion.div>
        </motion.div>
      )}

      {/* Slider Container */}
      <div className={compact ? 'relative pt-2 pb-2' : 'relative pt-8 pb-4'}>
        {/* Track background */}
        <div className={compact ? 'absolute top-6 left-0 right-0 h-2 bg-white/30 rounded-full' : 'absolute top-12 left-0 right-0 h-1 bg-white/20 rounded-full'} />

        {/* Progress track */}
        <motion.div
          className={compact ? 'absolute top-6 left-0 h-2 bg-gradient-to-r from-yellow-400 via-emerald-400 to-blue-400 rounded-full' : 'absolute top-12 left-0 h-1 bg-gradient-to-r from-yellow-400 via-emerald-400 to-blue-400 rounded-full'}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />

        {/* Year markers */}
        <div className={compact ? 'relative h-8 flex items-center justify-between px-2' : 'relative h-12 flex items-center justify-between px-2'}>
          {years.map((year, index) => {
            const isActive = year === currentYear;
            const yearPosition = ((year - minYear) / (maxYear - minYear)) * 100;

            return (
              <motion.div
                key={year}
                className="absolute"
                style={{ left: `${yearPosition}%`, transform: 'translateX(-50%)' }}
              >
                {/* Marker */}
                <motion.button
                  onClick={() => !disabled && onYearChange(year)}
                  className={`transition-all rounded-full border-2 ${compact ? 'w-7 h-7' : 'w-8 h-8'} ${
                    isActive
                      ? 'bg-yellow-400 border-white scale-125 shadow-lg shadow-yellow-400/50'
                      : 'bg-white/40 border-white hover:bg-white/60'
                  } disabled:opacity-50`}
                  disabled={disabled}
                  whileHover={!disabled ? { scale: 1.2 } : {}}
                  whileTap={!disabled ? { scale: 0.9 } : {}}
                  animate={isActive ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                />

                {/* Label */}
                <motion.div
                  className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap font-bold ${
                    isActive ? 'text-yellow-400' : 'text-gray-700'
                  } ${compact ? 'text-base' : 'text-lg'}`}
                  animate={isActive ? { scale: 1.1, opacity: 1 } : { scale: 0.9, opacity: 0.6 }}
                  transition={{ duration: 0.3 }}
                >
                  {year}
                </motion.div>

                {/* Tooltip description */}
                {!compact && (
                  <motion.div
                    className={`absolute top-16 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap transition-opacity ${
                      isActive
                        ? 'opacity-100 text-white bg-blue-600 px-2 py-1 rounded'
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    {getYearDescription(year)}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Slider input (hidden, used for touch/keyboard) */}
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={currentYear}
          onChange={handleSliderChange}
          disabled={disabled}
          className={compact ? 'absolute top-6 left-0 right-0 w-full h-2 opacity-0 cursor-pointer appearance-none' : 'absolute top-12 left-0 right-0 w-full h-1 opacity-0 cursor-pointer appearance-none'}
          style={{ pointerEvents: disabled ? 'none' : 'auto' }}
        />
      </div>

      {/* Timeline info */}
      {!compact && (
        <motion.div
          className="grid grid-cols-4 gap-2 mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {years.map((year) => (
            <motion.div
              key={year}
              className={`text-center py-3 rounded-lg transition-all ${
                currentYear === year
                  ? 'bg-white/20 border-2 border-yellow-300'
                  : 'bg-white/10 border-2 border-transparent hover:border-white/30'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="font-bold text-white">{year}</div>
              <div className="text-xs text-gray-300 mt-1">{getTimelineEvent(year)}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Helper text */}
      {disabled && (
        <motion.div
          className="mt-4 p-3 bg-yellow-400/20 border border-yellow-400 rounded-lg text-yellow-200 text-sm text-center"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ⏸️ Chế độ kết chuyện đang chạy - hãy tắt để điều khiển thời gian
        </motion.div>
      )}
    </div>
  );
};

const getYearDescription = (year: number): string => {
  const descriptions: Record<number, string> = {
    2015: 'Nền tảng',
    2018: 'Phục hồi',
    2020: 'Tăng trưởng',
    2025: 'Phát triển',
  };
  return descriptions[year] || '';
};

const getTimelineEvent = (year: number): string => {
  const events: Record<number, string> = {
    2015: 'Điểm khởi đầu',
    2018: 'Mở lớp học',
    2020: 'Có tiến triển',
    2025: 'Hôm nay',
  };
  return events[year] || '';
};

export default B6_TimeSlider;
