/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";

const images = [
  "/brand/1.png",
  "/brand/2.png",
  "/brand/3.png",
  "/brand/4.png",
  "/brand/5.png",
  "/brand/6.png",
  "/brand/7.png",
  "/brand/8.png",
  "/brand/9.png",
  "/brand/10.png",
];

export default function ImageMarquee() {
  return (
    <div className="relative overflow-hidden w-full bg-primary py-2">
      <p className="text-secondary font-bold text-2xl text-center mb-3">
        Get Hired By Top Companies
      </p>
      <motion.div
        className="flex space-x-2 w-max"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt="marquee-img"
            className="h-12 w-44 object-contain"
          />
        ))}
      </motion.div>
    </div>
  );
}
