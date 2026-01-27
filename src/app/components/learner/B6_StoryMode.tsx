import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StoryModeProps {
  isActive: boolean;
  onComplete: () => void;
}

const B6_StoryMode: React.FC<StoryModeProps> = ({ isActive, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  const storySequence = [
    {
      title: '2015: Những năm khó khăn',
      text: 'Bài Chòi đang chìm vào quên lãng. Chỉ một số ít người cao tuổi còn nhớ và giữ gìn di sản này. Chưa có chương trình giáo dục chính thức nào.',
      icon: '😢',
    },
    {
      title: '2018: Bắt đầu phục hồi',
      text: 'Các cộng đồng giáo dục bắt đầu mở lớp học. Mặc dù số lượng học sinh còn ít, nhưng đó là dấu hiệu lạc quan của sự khỏi sức.',
      icon: '💪',
    },
    {
      title: '2020: Tăng trưởng ổn định',
      text: 'Ngày càng nhiều bạn trẻ quan tâm đến Bài Chòi. Các lớp học mở rộng, cộng đồng lớn mạnh hơn.',
      icon: '📈',
    },
    {
      title: '2025: Hôm nay - Nguy cơ và Cơ hội',
      text: 'Một số khu vực phát triển rực rỡ, nhưng những khu vực khác vẫn trong tình trạng nguy cấp. Mỗi lựa chọn của chúng ta hôm nay quyết định tương lai của di sản.',
      icon: '🌟',
    },
  ];

  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      setTextIndex(0);
      return;
    }

    let timeout: NodeJS.Timeout;

    if (textIndex < storySequence.length) {
      const currentStory = storySequence[textIndex];
      const fullText = currentStory.text;

      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 50); // Typewriter speed
      } else {
        timeout = setTimeout(() => {
          setTextIndex(textIndex + 1);
          setDisplayedText('');
        }, 3000); // Wait before next slide
      }
    } else {
      onComplete();
    }

    return () => clearTimeout(timeout);
  }, [isActive, textIndex, displayedText, storySequence, onComplete]);

  if (!isActive || textIndex >= storySequence.length) {
    return null;
  }

  const currentStory = storySequence[textIndex];

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      pointerEvents="none"
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        pointerEvents="auto"
      >
        <div className="p-8 space-y-6">
          {/* Progress indicator */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {storySequence.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx < textIndex ? 'bg-green-500 w-8' : idx === textIndex ? 'bg-blue-500 w-8' : 'bg-gray-300 w-2'
                  }`}
                  animate={idx === textIndex ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-600">
              {textIndex + 1} / {storySequence.length}
            </span>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Icon */}
            <motion.div
              className="text-5xl text-center"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentStory.icon}
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-3xl font-bold text-center text-blue-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentStory.title}
            </motion.h2>

            {/* Typewriter text */}
            <div className="text-lg text-gray-700 leading-relaxed min-h-20">
              <motion.p
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {displayedText}
                <motion.span
                  className="inline-block w-2 h-6 ml-1 bg-blue-500 rounded-sm"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              </motion.p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 justify-center pt-4 border-t">
            <motion.button
              onClick={() => {
                if (textIndex > 0) {
                  setTextIndex(textIndex - 1);
                  setDisplayedText('');
                }
              }}
              className="px-6 py-2 rounded-lg font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
              disabled={textIndex === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Trước
            </motion.button>

            <motion.button
              onClick={() => onComplete()}
              className="px-6 py-2 rounded-lg font-semibold bg-gray-200 text-gray-800 hover:bg-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Thoát
            </motion.button>

            <motion.button
              onClick={() => {
                setTextIndex(textIndex + 1);
                setDisplayedText('');
              }}
              className="px-6 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tiếp theo →
            </motion.button>
          </div>

          {/* Tips */}
          <motion.p
            className="text-center text-sm text-gray-500"
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💡 Bấm nút hoặc chờ kết chuyện tự động
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default B6_StoryMode;
