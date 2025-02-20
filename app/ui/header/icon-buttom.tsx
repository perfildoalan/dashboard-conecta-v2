import Image from 'next/image';

interface IconButtomProps {
    srcImg: string
    alt: string
    hover: boolean
  }
  
  export function IconButtom({ srcImg, alt, hover }: IconButtomProps) {
    return (
        <Image 
            src={srcImg} 
            alt={alt}
            className={"size-12 transition-all duration-500 cursor-pointer " + (hover ? 'sepia saturate-(--saturation-extreme) brightness-[0.30] hue-rotate-[3.142rad]' : '')}
        />
    ) 
  }