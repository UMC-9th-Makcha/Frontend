import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter">
          404
        </h1>

        <div className="mt-4 mb-10">
          <p className="text-xl md:text-2xl font-bold">페이지를 찾을 수 없습니다.</p>
          <p className="opacity-50 mt-1 text-sm md:text-base">
            입력하신 주소가 잘못되었거나 사라진 페이지입니다.
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-10 py-3 border border-current rounded-full font-medium transition-all hover:bg-current/[0.05] active:scale-95"
        >
          이전으로 돌아가기
        </button>
      </motion.div>
    </main>
  );
};

export default ErrorPage;