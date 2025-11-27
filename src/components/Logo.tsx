
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo = ({ width, height, className }: LogoProps) => {
    // The native aspect ratio of the image is approx 2.428
    const aspectRatio = 2.428;
    const calculatedWidth = width || (height ? height * aspectRatio : 150);
    const calculatedHeight = height || (width ? width / aspectRatio : 40);
    
    return (
        <Image 
            src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/storedevguide.com.webp" 
            alt="shopifydevguide logo"
            width={calculatedWidth} 
            height={calculatedHeight}
            className={`object-contain ${className || ''}`}
        />
    );
};
