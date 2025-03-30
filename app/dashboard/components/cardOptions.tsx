interface CardOptionsProps {
  image: string
  text: string
}

export default function CardOptions({ image, text }: CardOptionsProps) {
  return (
    <div className="flex flex-col mt-8 justify-center items-center bg-[#e3f6fa] rounded-[20px] border border-[#01aad0] p-[20px_40px] m-[0_10px] w-[10rem]">
      <img src={image} alt="" />
      <p className="m-0 mt-[15px] text-center text-black">{text}</p>
    </div>
  )
}
