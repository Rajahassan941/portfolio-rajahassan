import { Hero } from "@/sections/hero";
import { TechMarquee } from "@/sections/tech-marquee";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Experience } from "@/sections/experience";
import { Projects } from "@/sections/projects";
import { Differentiators } from "@/sections/differentiators";
import { Journey } from "@/sections/journey";
import { Contact } from "@/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Differentiators />
      <Journey />
      <Contact />
    </>
  );
}
