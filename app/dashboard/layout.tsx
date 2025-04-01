import Header from '@/components/header'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
        <main className='flex flex-col'>
          <Header />
          <div className='container mx-auto max-w-[1500px]'>
            {children}
          </div>
        </main>
    </>
  )
}
