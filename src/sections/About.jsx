import { motion } from "framer-motion";
import { journeyTimeline } from "../data/profile";

const About = () => {
  return (
    <section id="about" className="w-full py-24 sm:py-32 bg-bg-primary border-t border-border-card">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="mb-16 sm:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mono-font mb-4">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            The Engineer Behind the Work
          </h2>
        </div>

        {/* Profile summary */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <p className="text-xl sm:text-2xl text-neutral-300 leading-relaxed mb-6">
            I&apos;m a computer science student at SRM University AP with a focus on
            backend engineering and systems that handle real load. I build APIs, deploy
            services, and contribute to open source infrastructure used by millions of
            developers.
          </p>
          <p className="text-neutral-500 text-sm leading-relaxed">
            My strongest project is CommitHub — a GitHub-inspired collaboration platform
            with JWT auth, role-based access, and AWS S3 storage, deployed and live.
            I&apos;ve also contributed to webpack-cli, the command-line interface for the
            bundler that powers the JavaScript ecosystem.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-neutral-800 -translate-x-1/2 hidden sm:block" />

          {journeyTimeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative pl-10 sm:pl-0 mb-10 last:mb-0 ${
                i % 2 === 0 ? "sm:grid-cols-2 sm:gap-8 sm:items-start" : "sm:grid-cols-2 sm:gap-8 sm:items-end sm:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 top-1 sm:static sm:mr-4 sm:text-right">
                <div className="w-3 h-3 rounded-full bg-purple-500 border-2 border-bg-primary sm:order-2" />
              </div>

              {/* Card */}
              <div className="ml-0 sm:ml-0 w-full sm:w-auto">
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mono-font block mb-2">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-neutral-500 mono-font mb-3">{item.institution}</p>
                <p className="text-sm text-neutral-400 leading-relaxed mb-3">{item.description}</p>
                {item.details && (
                  <ul className="space-y-1">
                    {item.details.map((d, j) => (
                      <li key={j} className="text-xs text-neutral-500 flex items-start gap-2">
                        <span className="text-purple-400/60 mt-0.5">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
