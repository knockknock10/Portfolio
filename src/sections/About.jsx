import React from "react";
import { Timeline } from "../components/Timeline";
import { journeyTimeline } from "../data/profile";

const About = () => {
  return (
    <section id="about" className="w-full bg-bg-primary border-b border-border-card">
      <Timeline 
        data={journeyTimeline} 
        title="Engineering Journey" 
        subtitle="A detailed narrative of my academic achievements, systems-focused projects, open-source efforts, and ongoing exploration into cloud-native infrastructures."
      />
    </section>
  );
};

export default About;
