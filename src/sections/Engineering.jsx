import { motion } from "framer-motion";

const Engineering = () => {
  const domains = [
    {
      name: "Backend Systems",
      items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "MongoDB", "Mongoose"],
    },
    {
      name: "Frontend Engineering",
      items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    },
    {
      name: "Databases",
      items: ["MongoDB", "SQL"],
    },
    {
      name: "DevOps & Infrastructure",
      items: ["Docker", "Kubernetes", "Linux", "GitHub Actions", "AWS S3", "Cloudinary", "Render"],
    },
    {
      name: "Tools",
      items: ["Git", "GitHub", "Postman", "VS Code", "npm"],
    },
  ];

  return (
    <section id="engineering" className="w-full py-24 sm:py-32 bg-bg-primary border-t border-border-card">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="mb-16 sm:mb-20">
          <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mono-font mb-4">
            Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Engineering Domains
          </h2>
          <p className="text-neutral-500 max-w-xl text-sm sm:text-base leading-relaxed">
            Technologies organized by the kind of work they&apos;re used for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="p-6 sm:p-8 rounded-xl border border-neutral-800 bg-bg-card hover:border-neutral-700 transition-all duration-300"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mono-font mb-5">
                {domain.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {domain.items.map(item => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs text-neutral-300 bg-neutral-900/60 border border-neutral-800 rounded-md hover:border-purple-500/30 hover:text-white transition-all duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Engineering;
