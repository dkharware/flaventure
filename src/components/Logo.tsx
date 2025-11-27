
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = ({ width = 210, height = 56 }: LogoProps) => (
  <Image 
    src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/storedevguide.com.webp" 
    alt="shopifydevguide logo"
    width={width} 
    height={height}
  />
);
