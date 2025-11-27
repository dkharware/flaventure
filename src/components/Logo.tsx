
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = ({ width, height = 56 }: LogoProps) => {
    // Aspect ratio of the image is 210/56 = 3.75
    const calculatedWidth = width || height * 3.75;
    
    return (
        <Image 
            src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/storedevguide.com.webp" 
            alt="shopifydevguide logo"
            width={calculatedWidth} 
            height={height}
        />
    );
};
