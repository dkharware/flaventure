
import Image from 'next/image';

interface LogoProps {
  width: number;
  height: number;
  className?: string;
}

export const Logo = ({ width, height, className }: LogoProps) => {
    return (
        <Image 
            src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/storedevguide.com.webp" 
            alt="shopifydevguide logo"
            width={width} 
            height={height}
            className={`object-contain ${className || ''}`}
            priority
        />
    );
};
