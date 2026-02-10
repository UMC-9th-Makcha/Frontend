import type { WaitingSpotHeaderProps } from "../types/waitingspot"

export const WaitingSpotHeader = ({ title, content }: WaitingSpotHeaderProps) => {
  return (
    <header className="flex flex-col items-start">
      <h1 className="text-3xl text-makcha-navy-900 font-medium
      dark:text-white">{title}</h1>
      <p className="text-xl text-gray-500 mt-3 whitespace-pre-line
      dark:text-makcha-navy-200">{content}</p>
    </header>
  )
}
