import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ArrowLeft, Filter, FileAudio, FileText, Download } from "lucide-react";
import { HERITAGE_ARCHIVE } from "@/app/data/mockData";

interface HeritageArchiveProps {
  onBack: () => void;
  onViewDetail: (id: string) => void;
}

export function HeritageArchive({ onBack, onViewDetail }: HeritageArchiveProps) {
  const [filter, setFilter] = useState("all");

  const filteredArchive = filter === "all" 
    ? HERITAGE_ARCHIVE 
    : HERITAGE_ARCHIVE.filter(item => item.region === filter);

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--baichoi-yellow)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost"
            onClick={onBack}
            className="mr-4"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 
            className="text-2xl"
            style={{ color: 'var(--baichoi-earth-dark)' }}
          >
            B3 - Kho Lưu Trữ Di Sản
          </h1>
        </div>

        {/* Filters */}
        <Card 
          className="p-4 mb-6 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter 
              size={20}
              style={{ color: 'var(--baichoi-brick)' }}
            />
            <h3 
              className="font-medium"
              style={{ color: 'var(--baichoi-earth-dark)' }}
            >
              Bộ Lọc
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["all", "Quảng Nam", "Bình Định", "Quảng Ngãi", "Phú Yên"].map((region) => (
              <Button 
                key={region}
                size="sm"
                variant={filter === region ? "default" : "outline"}
                onClick={() => setFilter(region)}
                style={filter === region ? {
                  backgroundColor: 'var(--baichoi-brick)',
                  color: 'white'
                } : {
                  borderColor: 'var(--baichoi-earth)',
                  color: 'var(--baichoi-earth)'
                }}
              >
                {region === "all" ? "Tất cả" : region}
              </Button>
            ))}
          </div>
        </Card>

        {/* Archive List */}
        <div className="space-y-4 mb-6">
          {filteredArchive.map((item) => (
            <Card 
              key={item.id}
              className="p-6 border-2 bg-white hover:shadow-md transition-shadow"
              style={{ borderColor: 'var(--baichoi-earth)' }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded flex items-center justify-center"
                  style={{ backgroundColor: 'var(--baichoi-yellow)' }}
                >
                  {item.type === "Audio" ? (
                    <FileAudio 
                      size={24}
                      style={{ color: 'var(--baichoi-brick)' }}
                    />
                  ) : (
                    <FileText 
                      size={24}
                      style={{ color: 'var(--baichoi-brick)' }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 
                    className="mb-2"
                    style={{ color: 'var(--baichoi-earth-dark)' }}
                  >
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm mb-3">
                    <span 
                      className="opacity-80"
                      style={{ color: 'var(--baichoi-earth)' }}
                    >
                      📍 {item.region}
                    </span>
                    <span 
                      className="opacity-80"
                      style={{ color: 'var(--baichoi-earth)' }}
                    >
                      📅 {item.year}
                    </span>
                    <span 
                      className="opacity-80"
                      style={{ color: 'var(--baichoi-earth)' }}
                    >
                      📊 Chất lượng: {item.quality}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span 
                      className={`text-xs px-3 py-1 rounded-full ${
                        item.status === "Hoàn tất" 
                          ? "bg-green-100 text-green-700"
                          : item.status === "Đã số hóa"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button 
                    size="sm"
                    onClick={() => onViewDetail(item.id)}
                    style={{ 
                      backgroundColor: 'var(--baichoi-brick)',
                      color: 'white'
                    }}
                  >
                    Xem Chi Tiết
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    style={{ 
                      borderColor: 'var(--baichoi-earth)',
                      color: 'var(--baichoi-earth)'
                    }}
                  >
                    <Download size={16} className="mr-1" />
                    Tải Về
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Technology Info */}
        <Card 
          className="p-4 border-2 bg-white"
          style={{ borderColor: 'var(--baichoi-earth)' }}
        >
          <p 
            className="text-sm opacity-70"
            style={{ color: 'var(--baichoi-earth)' }}
          >
            🤖 <strong>Công nghệ:</strong> Azure SQL Database + AI Tagging (Azure AI Vision & Speech) - Tự động phân loại tư liệu
          </p>
        </Card>
      </div>
    </div>
  );
}
