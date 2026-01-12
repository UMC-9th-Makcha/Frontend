import blueblur from '../../assets/blue-blur.svg'
import yellowblur from '../../assets/yellow-blur.svg'
import type { DirectionSummaryProps } from '../../types/walking-direction'

export const DirectionSummary = ({origin, destination} : DirectionSummaryProps) => {
  return (
    <section className='mt-4 mb-4'>
      <dl className="rounded-[20px] bg-white shadow-[0_0_4px_0_#88888840] text-[14px] text-[#5F5F5F] font-light
      dark:bg-makcha-navy-900 dark:text-makcha-navy-200">
        <div className="flex items-center px-4 py-3 gap-2">
          <dt className="sr-only">출발지</dt>
          <img src={blueblur} alt="" aria-hidden className="w-4 h-4" />
          <dd>현위치 : {origin}</dd>
        </div>
        <hr className="text-[#DCDCDC] dark:text-makcha-navy-800" />
        <div className="flex items-center px-4 py-3 gap-2">
          <dt className="sr-only">도착지</dt>
          <img src={yellowblur} alt="" aria-hidden className="w-4 h-4" />
          <dd>{destination}</dd>
        </div>
      </dl>
    </section>

  )
}
