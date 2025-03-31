interface CardInfoProps {
    title: string
    value: number | undefined | string
    measure: string
    percentage?: number | null
  }
  
  export default function CardInfoDash({
    title,
    value,
    measure,
    percentage,
  }: CardInfoProps) {
    return (
      <div className="p-[20px_20px_10px_20px] bg-white m-[0_20px] rounded-[10px] md:p-[10px_0px_0px_0px]">
        <div className="flex justify-between">
          <p className="text-[#9e9fa7] font-semibold text-[18px] mb-[3px]">
            {title}
          </p>
          {percentage !== null && percentage !== undefined ? (
            <p className="text-[#9e9fa7] font-semibold text-[18px] mb-[3px] ml-[1.5rem]">
              {Math.floor(percentage * 100)}%
            </p>
          ) : (
            ''
          )}
        </div>
        <h1 className="text-[30px] mt-[10px]">
          {value} {measure}
        </h1>
      </div>
    )
  }