import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-16 h-16">
        <motion.svg
          viewBox="0 0 50 50"
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2, 
            ease: "linear",
          }}
        >
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
            className="text-makcha-yellow-500"
            initial={{ strokeDasharray: "1, 150", strokeDashoffset: 0 }}
            animate={{
              // 선의 길이 변화
              strokeDasharray: ["1, 150", "90, 150", "1, 150"],
              strokeDashoffset: [0, -30, -124], 
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              // 70%까지는 늘어나고, 나머지 30% 동안 수축
              times: [0, 0.7, 1],
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default LoadingSpinner;