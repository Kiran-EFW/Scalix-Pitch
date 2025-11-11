import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Circles */}
      <motion.div
        className="absolute rounded-full border-4 border-blue-400"
        style={{ width: 120, height: 120, top: "10%", left: "5%" }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full bg-purple-400 opacity-40"
        style={{ width: 80, height: 80, top: "20%", right: "15%" }}
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Semi-circle / Arch */}
      <motion.div
        className="absolute border-4 border-indigo-500 rounded-t-full"
        style={{
          width: 120,
          height: 60,
          bottom: "10%",
          left: "20%",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Wavy Line */}
      <motion.svg
        className="absolute"
        style={{ top: "40%", left: "10%" }}
        width="100"
        height="20"
        viewBox="0 0 100 20"
      >
        <motion.path
          d="M0 10 Q 25 0, 50 10 T 100 10"
          fill="transparent"
          stroke="blue"
          strokeWidth="2"
          animate={{ pathLength: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Dotted Line */}
      <motion.div
        className="absolute flex space-x-2"
        style={{ top: "70%", left: "5%" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-blue-500 rounded-full" />
        ))}
      </motion.div>

      {/* Diagonal Stripe Rectangle */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          width: 150,
          height: 40,
          top: "15%",
          right: "10%",
          transform: "rotate(20deg)",
        }}
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-400 to-red-400 opacity-40" />
      </motion.div>
    </div>
  );
}
