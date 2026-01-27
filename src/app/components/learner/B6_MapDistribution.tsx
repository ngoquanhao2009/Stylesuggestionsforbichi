import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Play, Pause, Volume2, AlertCircle, Zap, Sprout } from 'lucide-react';
import B6_MapHeader from './B6_MapHeader';
import B6_MapCanvas from './B6_MapCanvas';
import B6_InfoPanel from './B6_InfoPanel';
import B6_TimeSlider from './B6_TimeSlider';
import B6_StoryMode from './B6_StoryMode';
import { getDaNangAreas } from '@/data/danangAreas';
import '../../../styles/B6_Animations.css';

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

interface B6_MapDistributionProps {
  onBack?: () => void;
}

const B6_MapDistribution: React.FC<B6_MapDistributionProps> = ({ onBack }) => {
  const [showMap, setShowMap] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [currentYear, setCurrentYear] = useState(2025);
  const [storyMode, setStoryMode] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const areas = getDaNangAreas();

  // Map transition animation
  const handleViewMap = () => {
    setShowMap(true);
  };

  // Drag/Pan handler
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      isDragging.current = true;
      dragStart.current = { x: e.clientX - mapPan.x, y: e.clientY - mapPan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && mapContainerRef.current) {
      setMapPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setMapZoom(prev => Math.max(0.8, Math.min(3, prev * delta)));
  };

  // Story mode auto-play
  useEffect(() => {
    if (storyMode && selectedArea) {
      const interval = setInterval(() => {
        setCurrentYear(prev => (prev < 2025 ? prev + 1 : 2015));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [storyMode, selectedArea]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      <AnimatePresence mode="wait">
        {!showMap ? (
          /* ENTRY UI */
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex flex-col items-center justify-center gap-12 p-8"
          >
            {/* Section Header */}
            <motion.div
              className="text-center space-y-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-yellow-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg">
                🧭 Phân Phối & Giáo Dục
              </h1>
              <motion.p
                className="text-2xl text-gray-200 font-light"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.8 }}
              >
                Nơi Bài Chòi đang sống – và nơi cần được truyền lại
              </motion.p>
            </motion.div>

            {/* Main CTA Button */}
            <motion.button
              onClick={handleViewMap}
              className="group relative px-8 py-4 rounded-full font-bold text-white text-xl overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34, 197, 94, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-yellow-400 group-hover:from-emerald-400 group-hover:to-yellow-300 transition-all duration-300" />
              
              {/* Ripple effect on click */}
              <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity">
                <div className="absolute inset-0 animate-ripple bg-white/20 rounded-full" />
              </div>

              {/* Content */}
              <div className="relative flex items-center gap-3">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🗺️
                </motion.span>
                <span>Xem Bản Đồ</span>
              </div>

              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-400 opacity-0"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-10">
              <motion.div
                className="absolute bottom-10 left-1/4 text-6xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🎨
              </motion.div>
              <motion.div
                className="absolute bottom-20 right-1/4 text-6xl"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                🎭
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* MAP VIEW */
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full flex flex-col"
          >
            <B6_MapHeader 
              onBack={onBack || (() => setShowMap(false))} 
              onStoryMode={() => setStoryMode(!storyMode)}
              storyMode={storyMode}
            />

            <div className="flex-1 flex gap-4 p-4 overflow-hidden">
              {/* Map Container */}
              <motion.div
                ref={mapContainerRef}
                className="flex-1 relative rounded-lg overflow-hidden bg-gradient-to-br from-cyan-100 via-blue-50 to-emerald-100 cursor-grab active:cursor-grabbing shadow-2xl"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <B6_MapCanvas
                  areas={areas}
                  selectedArea={selectedArea}
                  onSelectArea={setSelectedArea}
                  currentYear={currentYear}
                  mapZoom={mapZoom}
                  mapPan={mapPan}
                  storyMode={storyMode}
                />

                {/* Legend */}
                <motion.div
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="font-bold text-sm mb-3 text-gray-800">Chú thích</h3>
                  <div className="space-y-2">
                    <LegendItem color="bg-red-500" label="Cần bảo tồn gấp" icon="⚠️" />
                    <LegendItem color="bg-yellow-500" label="Đang truyền dạy" icon="🎶" />
                    <LegendItem color="bg-green-500" label="Phát triển tốt" icon="🌱" />
                  </div>
                </motion.div>

                {/* Zoom controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    onClick={() => setMapZoom(prev => Math.min(3, prev + 0.2))}
                    className="w-10 h-10 bg-white/90 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +
                  </motion.button>
                  <motion.button
                    onClick={() => setMapZoom(prev => Math.max(0.8, prev - 0.2))}
                    className="w-10 h-10 bg-white/90 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    −
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setMapZoom(1);
                      setMapPan({ x: 0, y: 0 });
                    }}
                    className="px-3 h-10 bg-white/90 rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-100 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Reset
                  </motion.button>
                </div>
              </motion.div>

              {/* Info Panel */}
              <AnimatePresence>
                {selectedArea && (
                  <B6_InfoPanel
                    area={selectedArea}
                    currentYear={currentYear}
                    onClose={() => setSelectedArea(null)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Time Slider */}
            <motion.div
              className="px-6 py-4 bg-gradient-to-r from-blue-900/80 to-emerald-900/80 backdrop-blur-sm border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <B6_TimeSlider 
                currentYear={currentYear} 
                onYearChange={setCurrentYear}
                disabled={storyMode}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LegendItem: React.FC<{ color: string; label: string; icon: string }> = ({
  color,
  label,
  icon,
}) => (
  <motion.div
    className="flex items-center gap-2"
    whileHover={{ x: 4 }}
  >
    <span className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-xs text-gray-700">
      {icon} {label}
    </span>
  </motion.div>
);

export default B6_MapDistribution;
