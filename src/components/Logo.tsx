
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
            src="https://cdn.shopify.com/s/files/1/0944/6896/4636/files/logo.webp" 
            alt="storedevguide logo"
            width={width} 
            height={height}
            className={`object-contain ${className || ''}`}
            priority={priority}
        />
    );
};
