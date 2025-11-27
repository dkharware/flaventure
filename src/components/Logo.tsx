
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = ({ width, height = 56 }: LogoProps) => {
    // If only one dimension is provided, calculate the other based on a fixed aspect ratio.
    // The native aspect ratio of the image is 210/56 = 3.75
    const aspectRatio = 3.75;
    const calculatedWidth = width || (height ? height * aspectRatio : 150);
    const calculatedHeight = height || (width ? width / aspectRatio : 40);
    
    return (
        <Image 
            src="https://5lgivccarqkvddiv.public.blob.vercel-storage.com/storedevguide.com.webp" 
            alt="shopifydevguide logo"
            width={calculatedWidth} 
            height={calculatedHeight}
        />
    );
};
