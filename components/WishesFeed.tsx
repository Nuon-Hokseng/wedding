"use client";

import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export default function WishesFeed({ wishes }: { wishes: Wish[] }) {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
  });
  const { ref: wishesRef, isVisible: wishesVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  const [displayedWishes, setDisplayedWishes] = useState<Wish[]>([]);

  useEffect(() => {
    // Show newest wishes first without mutating the original array
    const sorted = [...wishes].sort((a, b) => b.timestamp - a.timestamp);
    setDisplayedWishes(sorted);
  }, [wishes]);

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "just now";
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 px-4 md:px-8 bg-linear-to-b from-rose-50 via-white to-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg md:text-2xl lg:text-5xl font-khmer text-center mb-4 text-gray-800">
          សារជូនពររបស់ភ្ងៀវនឹងបង្ហាញនៅទីនេះ
        </h2>
        <p className="text-center text-sm md:text-base lg:text-lg text-gray-600 mb-12 font-khmer">
          សេចក្ដីស្រឡាញ់ និងពរ ពីភ្ញៀវជាទីគោរពរបស់យើង
        </p>

        {/* Wishes Grid */}
        {displayedWishes.length > 0 ? (
          <div
            ref={wishesRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-transition ${
              wishesVisible ? "scroll-animate-fade-up" : "scroll-hidden"
            }`}
          >
            {displayedWishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white rounded-xl p-6 shadow-md border border-rose-100 hover:shadow-lg hover:border-rose-300 transition-all duration-300 animate-in fade-in slide-in-from-bottom"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm md:text-base lg:text-lg">
                      {wish.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      {formatTime(wish.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <p className="text-gray-700 leading-relaxed mb-4 text-xs md:text-sm line-clamp-4">
                  {wish.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">💌</p>
            <p className="text-xl text-gray-600 font-khmer">
              មិនទាន់មានសារជូនពរទេ...
            </p>
            <p className="text-gray-500 mt-2 font-khmer">
              អ្នកអាចជាមនុស្សដំបូងដែលចែករំលែកសារជូនពររបស់អ្នក
              និងបញ្ជាក់ការចូលរួម!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
