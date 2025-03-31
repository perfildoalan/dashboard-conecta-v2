interface EmissionsCardProps {
    title: string
    subtitle: string
}
export default function EmissionsCard({ title, subtitle}: EmissionsCardProps) {
    return (
        <div className=" flex flex-col justify-between h-24 w-36 m-3 bg-[#001121] rounded-xl">
            <h2 className="text-xl font-thin bg-[#00ABD0] w-full text-start rounded-t-xl px-4">{title}</h2>
            <p className=" text-lg font-bold text-white p-4 flex items-center justify-center h-full">{subtitle}</p>
        </div>
    )
}