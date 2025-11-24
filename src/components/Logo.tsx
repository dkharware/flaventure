import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = ({ width = 150, height = 40 }: LogoProps) => (
  <Image 
    src="https://khahax3ontgwrypo.public.blob.vercel-storage.com/asset/easyfreecv.webp" 
    alt="easyfreecv logo"
    width={width} 
    height={height}
    priority
  />
);
