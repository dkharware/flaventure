
'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, FileText, Star, Briefcase } from 'lucide-react';
import gsap from 'gsap';

export function HeroBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(SVGSVGElement | null)[]>([]);

  useEffect(() => {
    const context = gsap.context(() => {
      // Intro animation
      gsap.from(titleRef.current, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from(textRef.current, { y: 20, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
      gsap.from(buttonRef.current, { y: 20, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });
      gsap.from(iconsRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.6,
      });

      // Mouse move parallax effect
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = containerRef.current!;
        const x = (clientX / offsetWidth - 0.5) * 40;
        const y = (clientY / offsetHeight - 0.5) * 40;

        gsap.to(iconsRef.current, {
          x: (i) => x * (i % 2 === 0 ? -1 : 1) * 0.5,
          y: (i) => y * (i % 2 === 0 ? 1 : -1) * 0.5,
          rotate: x * 0.2,
          duration: 1,
          ease: 'power3.out',
        });
      };
      
      containerRef.current?.addEventListener('mousemove', onMouseMove);

      return () => {
        containerRef.current?.removeEventListener('mousemove', onMouseMove);
      }
    }, containerRef);
    
    return () => context.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-20 md:py-32 lg:py-40 xl:py-56 bg-gradient-to-br from-indigo-900 via-slate-900 to-cyan-900 text-primary-foreground overflow-hidden"
    >
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 ref={titleRef} className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none text-white shadow-lg">
              Craft Your Perfect Resume with EasyFreeCV
            </h1>
            <p ref={textRef} className="mx-auto max-w-[600px] text-white/80 md:text-xl">
              Choose from dozens of professional templates, get AI-powered content suggestions, and create a standout resume in minutes.
            </p>
          </div>
          <div ref={buttonRef} className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/templates">
                Create Your Resume Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Animated Icons */}
      <FileText ref={el => iconsRef.current[0] = el} className="absolute top-[15%] left-[10%] w-16 h-16 text-white/20 -rotate-12" />
      <Star ref={el => iconsRef.current[1] = el} className="absolute top-[20%] right-[15%] w-12 h-12 text-white/20 rotate-12" />
      <Briefcase ref={el => iconsRef.current[2] = el} className="absolute bottom-[25%] left-[20%] w-14 h-14 text-white/20 rotate-6" />
      <FileText ref={el => iconsRef.current[3] = el} className="absolute bottom-[15%] right-[10%] w-20 h-20 text-white/20 -rotate-6" />
      <Star ref={el => iconsRef.current[4] = el} className="absolute top-[50%] left-[30%] w-8 h-8 text-white/10" />
      <Briefcase ref={el => iconsRef.current[5] = el} className="absolute top-[40%] right-[40%] w-10 h-10 text-white/10 rotate-12" />
    </section>
  );
}
