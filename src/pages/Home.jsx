import Hero from '../components/Hero/Hero';
import GlimpsesPreview from '../components/GlimpsesPreview/GlimpsesPreview';
import Projects from '../components/Projects/Projects';

export default function Home() {
  return (
    <>
      <Hero />
      <GlimpsesPreview />
      <Projects limit={2} />
    </>
  );
}
