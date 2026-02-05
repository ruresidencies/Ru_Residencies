// app/page.tsx
'use client';

import Hero from '@/components/home/Hero';
import VideoSection from '@/components/home/VideoSection';
import Introduction from '@/components/home/Introduction';
import Gallery from '@/components/home/Gallery';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <Introduction />
      <Gallery />
      <ContactSection />
      <Footer />
    </>
  );
}