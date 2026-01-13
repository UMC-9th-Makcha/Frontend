import type { WaitingSpotHeaderProps } from "../../types/waitingspot"

export const WaitingSpotHeader = ({ title }: WaitingSpotHeaderProps) => {
  return (
    <header className="flex flex-col items-start py-4">
      <h1 className="text-3xl font-medium dark:text-white py-2">{title}</h1>
      <h2 className="text-xl font-normal leading-[1.3] tracking-normal text-[#5F5F5F]
      dark:text-makcha-navy-200">막차를 놓쳐서 첫차까지 대기하시는 분들을 위한 추천 장소를 안내드립니다.</h2>
    </header>
  )
}
