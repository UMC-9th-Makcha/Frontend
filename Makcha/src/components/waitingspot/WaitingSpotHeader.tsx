type WaitingSpotHeaderProps = {
  title: string
}
export const WaitingSpotHeader = ({ title }: WaitingSpotHeaderProps) => {
  return (
    <header className="flex flex-col items-center mb-6 py-2">
      <h1 className="text-xl font-bold dark:text-white">{title}</h1>
      <h2>막차를 놓쳐서 첫차까지 대기하시는 분들을 위한 추천 장소를 안내드립니다.</h2>
    </header>
  )
}
