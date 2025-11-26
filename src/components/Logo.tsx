import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = ({ width = 150, height = 40 }: LogoProps) => (
  <Image 
    src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/shopifydevguide.webp" 
    alt="shopifydevguide logo"
    width={width} 
    height={height}
    priority
  />
);
