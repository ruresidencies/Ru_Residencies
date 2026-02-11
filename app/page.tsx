'use client';

import Hero from '@/components/home/Hero';
import VideoSection from '@/components/home/VideoSection';
import Introduction from '@/components/home/Introduction';
import Gallery from '@/components/home/Gallery';
import ResidenciesPreview from '@/components/home/ResidenciesPreview'; // Add this import
import SchedulePreview from '@/components/home/SchedulePreview';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <Introduction />
      <Gallery />
      <ResidenciesPreview /> {/* Add this line */}
      <SchedulePreview />
      <Footer />
    </>
  );
}