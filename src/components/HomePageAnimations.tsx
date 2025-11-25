
'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function HomePageAnimations() {
    useGSAP(() => {
        const sections = gsap.utils.toArray('.scroll-section');
        sections.forEach((section: any) => {
            gsap.from(section, {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }, []);

    return null;
}

    