type DirectionStartButtonProps = {
  onClick: () => void;
};

export const DirectionStartButton = ({ onClick }: DirectionStartButtonProps) => {
  return (
    <button
      className="w-full h-10 mt-auto bg-makcha-navy-400 rounded-[20px] font-medium text-[20px] leading-[1.2] text-white"
      onClick={onClick}>
      길 찾기 시작
    </button>
  )
}
