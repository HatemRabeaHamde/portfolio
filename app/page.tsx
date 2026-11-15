import Hero from "@/components/home/Hero";
import StackStrip from "@/components/home/StackStrip";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import ContactCta from "@/components/home/ContactCta";
import Thread from "@/components/home/Thread";
import { Divider } from "@/components/ui";

export default function Home() {
  return (
    <main id="top" style={{ position: "relative" }}>
      <Hero />
      <StackStrip />
      <About />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Experience />
      <div style={{ height: 62 }} />
      <ContactCta />
      <Thread />
    </main>
  );
}
