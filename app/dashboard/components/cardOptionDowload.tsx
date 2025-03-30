interface CardOptionsProps {
  image: string
  text: string
  pdf: string
}

export default function CardOptionsDownload({
  image,
  text,
  pdf,
}: CardOptionsProps) {
  return (
    <a
      href={pdf}
      download
      target="_blank"
      className="no-underline text-black"
      rel="noreferrer"
    >
      <div className="flex flex-col justify-center items-center bg-[#e3f6fa] rounded-[20px] border border-[#01aad0] p-10 m-[0_10px] w-[100px] transition duration-300 hover:bg-[rgba(1,170,208,0.35)] hover:cursor-pointer">
        <img src={image} className="text-[74px] text-[#01AAD0]" />
        <p className="m-0 mt-[15px] text-center">{text}</p>
      </div>
    </a>
  )
}