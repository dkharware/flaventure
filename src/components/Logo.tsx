
import Image from 'next/image';

interface LogoProps {
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export const Logo = ({ width, height, className, priority = false }: LogoProps) => {
    return (
        <Image 
            src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/newlogo.webp" 
            alt="storedevguide logo"
            width={width} 
            height={height}
            className={`object-contain ${className || ''}`}
            priority={priority}
        />
    );
};
