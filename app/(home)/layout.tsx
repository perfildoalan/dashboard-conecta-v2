export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
  <div className="bg-white/95 h-screen">
  <div className=" min-h-[50vh] bg-conecta-azul"/>
    <div className="flex text-black flex-col w-[33rem] gap-4 p-8 rounded-2xl bg-white items-center justify-center absolute top-1/2 left-1/2 transLoginAction -translate-x-1/2 -translate-y-1/2">
    {children}
    </div>
  </div>)
}
