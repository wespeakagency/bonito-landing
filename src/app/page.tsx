import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import IdeaSection from '@/components/idea-section';
import PrinciplesSection from '@/components/principles-section';
import AuthorVideosSection from '@/components/author-videos-section';
import ExtractsSection from '@/components/extracts-section';
import CtaSection from '@/components/cta-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IdeaSection />
        <PrinciplesSection />
        <ExtractsSection />
        <AuthorVideosSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
