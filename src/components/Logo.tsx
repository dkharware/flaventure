
import Image from 'next/image';

export const Logo = () => (
  <Image 
    src="/logo.png" 
    alt="easyfreecv logo" 
    width={150} 
    height={32} 
    className="h-8 w-auto"
    priority
  />
);
