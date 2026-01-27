import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

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

interface MapCanvasProps {
  areas: Area[];
  selectedArea: Area | null;
  onSelectArea: (area: Area) => void;
  currentYear: number;
  mapZoom: number;
  mapPan: { x: number; y: number };
  storyMode: boolean;
}

const B6_MapCanvas: React.FC<MapCanvasProps> = ({
  areas,
  selectedArea,
  onSelectArea,
  currentYear,
  mapZoom,
  mapPan,
  storyMode,
}) => {
  const statusColors = {
    critical: { bg: 'bg-red-500', border: 'border-red-600', pulse: 'animate-pulse-slow' },
    teaching: { bg: 'bg-yellow-500', border: 'border-yellow-600', pulse: 'animate-wave' },
    thriving: { bg: 'bg-green-500', border: 'border-green-600', pulse: 'animate-breathe' },
  };

  const statusIcons = {
    critical: '⚠️',
    teaching: '🎶',
    thriving: '🌱',
  };

  // Get current status based on year
  const getAreaStatusByYear = (area: Area): 'critical' | 'teaching' | 'thriving' => {
    const yearData = area.historicalData.find(d => d.year === currentYear);
    return yearData?.status || area.status;
  };

  // Map dimensions
  const mapWidth = 800;
  const mapHeight = 600;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${mapWidth} ${mapHeight}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Background map styling */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse" opacity="0.05">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>

        {/* Gradient definitions */}
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cffafe" />
          <stop offset="50%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>

        {/* Glow filter for markers */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Map background */}
      <rect width={mapWidth} height={mapHeight} fill="url(#mapGradient)" />
      <rect width={mapWidth} height={mapHeight} fill="url(#grid)" />

      {/* Stylized Vietnam coastline (simplified Da Nang area) */}
      <g opacity="0.1" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M 100 200 Q 150 180 200 190 Q 250 200 300 180 Q 350 170 400 190" />
        <path d="M 400 190 Q 450 210 500 200 Q 550 190 600 210 L 650 250" />
      </g>

      {/* Decorative city zones */}
      <g opacity="0.08" fill="currentColor">
        <circle cx="250" cy="300" r="60" />
        <circle cx="550" cy="350" r="50" />
        <circle cx="200" cy="500" r="45" />
      </g>

      {/* Markers container */}
      <g>
        {areas.map((area, index) => {
          const currentStatus = getAreaStatusByYear(area);
          const colors = statusColors[currentStatus];
          const icon = statusIcons[currentStatus];
          const isSelected = selectedArea?.id === area.id;
          const x = area.coordinates.x;
          const y = area.coordinates.y;

          return (
            <motion.g
              key={area.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isSelected ? 1.3 : 1,
                opacity: 1,
              }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => onSelectArea(area)}
              className="cursor-pointer"
            >
              {/* Pulse/Wave effect background */}
              <motion.circle
                cx={x}
                cy={y}
                r={isSelected ? 35 : 20}
                className={`${colors.bg} opacity-30`}
                animate={
                  currentStatus === 'critical'
                    ? { r: [20, 28, 20] }
                    : currentStatus === 'teaching'
                    ? { r: [20, 25, 20] }
                    : { r: [20, 23, 20] }
                }
                transition={{
                  duration: currentStatus === 'critical' ? 2.5 : 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Main marker circle */}
              <motion.circle
                cx={x}
                cy={y}
                r={isSelected ? 22 : 16}
                className={`${colors.bg} ${colors.border} border-2 drop-shadow-lg transition-all`}
                filter="url(#glow)"
                whileHover={{ r: 20 }}
                animate={
                  isSelected
                    ? { scale: [1, 1.1, 1], opacity: 1 }
                    : { opacity: 0.85 }
                }
                transition={{ duration: 0.6, repeat: isSelected ? Infinity : 0 }}
              />

              {/* Icon text */}
              <motion.text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-lg font-bold pointer-events-none select-none"
                animate={
                  isSelected
                    ? { scale: 1.2, rotate: [0, 5, -5, 0] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.4 }}
              >
                {icon}
              </motion.text>

              {/* Hover tooltip */}
              <motion.g
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: -30 }}
                transition={{ duration: 0.2 }}
                pointerEvents="none"
              >
                <rect
                  x={x - 50}
                  y={y - 55}
                  width="100"
                  height="30"
                  rx="6"
                  className="fill-white shadow-lg"
                  filter="url(#glow)"
                />
                <text
                  x={x}
                  y={y - 40}
                  textAnchor="middle"
                  className="text-xs font-bold fill-gray-800"
                >
                  {area.name}
                </text>
                <text
                  x={x}
                  y={y - 28}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {area.district}
                </text>
              </motion.g>

              {/* Selected indicator line */}
              {isSelected && (
                <motion.line
                  x1={x}
                  y1={y + 35}
                  x2={x}
                  y2={y + 60}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white opacity-40"
                  animate={{ y2: [y + 60, y + 70, y + 60] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.g>
          );
        })}
      </g>

      {/* Story mode text overlay */}
      {storyMode && selectedArea && (
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <rect
            x="20"
            y="20"
            width="280"
            height="100"
            rx="12"
            className="fill-white opacity-95 shadow-lg"
          />
          <text
            x="30"
            y="45"
            className="text-sm font-bold fill-blue-900"
          >
            📖 Năm {currentYear}
          </text>
          <text
            x="30"
            y="70"
            className="text-xs fill-gray-700"
            style={{ wordWrap: 'break-word' }}
          >
            {getStoryText(selectedArea, currentYear)}
          </text>
        </motion.g>
      )}
    </svg>
  );
};

// Story text generation based on year and area
const getStoryText = (area: any, year: number): string => {
  const stories: Record<string, Record<number, string>> = {
    'Hoi-An': {
      2015: 'Chỉ còn 1 nghệ nhân Bài Chòi hoạt động...',
      2018: '2 lớp học mới được mở, 8 học sinh tham gia',
      2020: 'Khu vực phục hồi, 3 nghệ nhân làm việc',
      2025: '15 học sinh, cộng đồng nhận thức rõ',
    },
    'My-Khe': {
      2015: 'Di sản gần như mai một, không có lớp học',
      2018: 'Một nghệ nhân quyết tâm giáo dạy',
      2020: '5 học sinh bắt đầu học tập',
      2025: 'Phát triển tốt, sẽ mở thêm lớp',
    },
    'Son-Tha': {
      2015: 'Cộng đồng bảo tồn tích cực',
      2018: 'Thành lập club Bài Chòi',
      2020: '12 thành viên hoạt động đều đặn',
      2025: 'Trở thành trung tâm bảo tồn địa phương',
    },
    'Hai-Chau': {
      2015: 'Bắt đầu ghi nhận lại di sản',
      2018: '1 lớp truyền dạy thôi thử',
      2020: '3 lớp học, 20 người tham gia',
      2025: 'Là địa điểm giáo dục hàng đầu',
    },
  };

  return stories[area.id]?.[year] || 'Dữ liệu chưa cập nhật cho năm này';
};

export default B6_MapCanvas;
