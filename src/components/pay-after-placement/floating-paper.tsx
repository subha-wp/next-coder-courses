/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export function FloatingPaper({ count = 5 }) {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    // Generate initial positions on the client side only
    const width = window.innerWidth;
    const height = window.innerHeight;

    const newPapers = Array.from({ length: count }).map(() => ({
      initialX: Math.random() * width,
      initialY: Math.random() * height,
      positions: [
        [Math.random() * width, Math.random() * height],
        [Math.random() * width, Math.random() * height],
        [Math.random() * width, Math.random() * height],
      ],
    }));

    setPapers(newPapers);
  }, [count]);

  return (
    <div className="relative w-full h-full">
      {papers.map((paper, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: paper.initialX,
            y: paper.initialY,
          }}
          animate={{
            x: paper.positions.map((p) => p[0]),
            y: paper.positions.map((p) => p[1]),
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="relative w-16 h-20 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center transform hover:scale-110 transition-transform">
            <FileText className="w-8 h-8 text-purple-400/50" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
