"use client";

import { motion } from "framer-motion";

import { FloatingPaper } from "./floating-paper";
import { RoboAnimation } from "./robo-animation";
import JoinNowButton from "./JoinNowButton";

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              আপনার ট্রেডিং কৌশলকে
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {" "}
                AI{" "}
              </span>
              শক্তির সাথে রূপান্তর করুন।
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto leading-7"
          >
            আপনার ট্রেডিং পোর্টফোলিওকে প্রমাণিত এবং{" "}
            <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              নিশ্চিত কৌশল{" "}
            </span>
            দিয়ে রূপান্তর করুন{" "}
            <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              আমাদের 7 দিনের AI প্রশিক্ষণ প্রোগ্রামে যোগ দিন।
            </span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <JoinNowButton amount={199} />
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  );
}
