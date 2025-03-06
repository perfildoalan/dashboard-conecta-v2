import Image from 'next/image';


interface IconButtomProps {
    srcImg: string
    alt: string
    hover: boolean
  }
  
  export function IconButtom({ srcImg, alt, hover }: IconButtomProps) {
    return (
      <>
        <Image
          src={srcImg} 
          alt={alt}
          style= {{
            WebkitMaskImage: `url(${srcImg})`,
            maskImage: `url(${srcImg})`,
            backgroundColor: 'blue',
          }}
          className={"mask-icon size-12 bg-red-600 transition-all duration-500  cursor-pointer " + (hover ? 'sepia saturate-(--saturation-extreme) brightness-[0.80] hue-rotate-90' : '')}
        />
        {console.log(srcImg)}
      </>
    ) 
  } 