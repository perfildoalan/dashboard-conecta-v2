export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className=" min-h-[50vh] bg-conecta-azul">{children}</div>
}
