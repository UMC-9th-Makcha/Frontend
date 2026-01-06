import { motion } from 'framer-motion';
import { sidebarSpring } from './constants';

const DashboardFooter = () => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={sidebarSpring}
      className="p-6 text-center flex flex-col items-center justify-center w-full"
    >
      <motion.p 
        layout
        transition={sidebarSpring}
        className="text-[14px] font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-makcha-navy-400 whitespace-nowrap"
      >
        Makcha.
      </motion.p>
      
      <motion.p 
        layout
        transition={sidebarSpring}
        className="mt-2 text-[11px] font-medium leading-tight text-gray-300 dark:text-makcha-navy-600 italic whitespace-nowrap"
      >
        The Last, The Best.
      </motion.p>
    </motion.div>
  );
};

export default DashboardFooter;