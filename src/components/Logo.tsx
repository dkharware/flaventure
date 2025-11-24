import Image from 'next/image';

export const Logo = () => (
  <Image 
    src="/logo.png" 
    alt="easyfreecv logo"
    width={150} 
    height={40}
    priority
  />
);
