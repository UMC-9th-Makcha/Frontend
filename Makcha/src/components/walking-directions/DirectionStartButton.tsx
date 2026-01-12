type DirectionStartButtonProps = {
  onClick: () => void;
};

export const DirectionStartButton = ({ onClick }: DirectionStartButtonProps) => {
  return (
    <button
      className="w-full h-12 rounded-full bg-makcha-navy-400 text-white text-[20px] border hover:bg-makcha-navy-600 transition 
      dark:text-makcha-navy-200 dark:bg-makcha-navy-800 dark:border-makcha-navy-600"
      onClick={onClick}>
      길 찾기 시작
    </button>
  )
}
