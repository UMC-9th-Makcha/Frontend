import type { WaitingSpotHeaderProps } from "../../../types/waitingspot"

export const WaitingSpotHeader = ({ title, content }: WaitingSpotHeaderProps) => {
  return (
    <header className="flex flex-col items-start">
      <h1 className="text-3xl font-medium dark:text-white">{title}</h1>
      <h2 className="font-pretendard font-normal text-[20px] leading-[1.3] text-[#5F5F5F] mt-2 whitespace-pre-line
      dark:text-makcha-navy-200">{content}</h2>
    </header>
  )
}
