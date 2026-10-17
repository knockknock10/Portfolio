"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./SkillsShowcase.module.css";
import { publicUrl } from "@/lib/public-url";

const focusTabs = {
  backend: {
    label: "BACKEND / PLATFORM",
    file: "workstreams.map",
    lines: [
      { n: "01", lead: "platform", op: ":", value: '"Go · Gin · PostgreSQL"', tone: "mint" },
      { n: "02", lead: "services", op: ":", value: '"APIs · Auth · Data"', tone: "blue" },
      { n: "03", lead: "workflow", op: ":", value: '"Docker · CI/CD · Review"', tone: "amber" },
      { n: "04", lead: "goal", op: ":", value: '"Small services, clear boundaries"', tone: "violet" },
    ],
  },
  audio: {
    label: "AUDIO AI / RESEARCH",
    file: "research.map",
    lines: [
      { n: "01", lead: "represent", op: ":", value: '"HuBERT · Wav2Vec2 · AST"', tone: "blue" },
      { n: "02", lead: "signal", op: ":", value: '"STFT · Spectral placement"', tone: "violet" },
      { n: "03", lead: "bind", op: ":", value: '"SHA-256 · Reference check"', tone: "mint" },
      { n: "04", lead: "question", op: ":", value: '"Measure before claiming"', tone: "amber" },
    ],
  },
  graph: {
    label: "KNOWLEDGE GRAPHS / CURRENT",
    file: "exploration.map",
    lines: [
      { n: "01", lead: "entities", op: ":", value: '"Events · Context · Sources"', tone: "violet" },
      { n: "02", lead: "time", op: ":", value: '"Temporal relationships"', tone: "blue" },
      { n: "03", lead: "reasoning", op: ":", value: '"Causal questions · GraphRAG"', tone: "mint" },
      { n: "04", lead: "phase", op: ":", value: '"Exploration · Early research"', tone: "amber" },
    ],
  },
};

const categories = [
  {
    id: "languages",
    index: "01",
    title: "Programming Languages",
    icon: "code",
    target: "#work",
    items: [
      ["Go", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg"],
      ["Java", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"],
      ["C++", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"],
      ["C", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"],
      ["Python", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"],
      ["JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"],
      ["SQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"],
      ["Rust · exploring", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg"],
    ],
  },
  {
    id: "web",
    index: "02",
    title: "Web Development",
    icon: "web",
    target: "#work",
    items: [
      ["React", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"],
      ["Next.js", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"],
      ["Node.js", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"],
      ["Express", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"],
      ["HTML", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"],
      ["CSS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"],
      ["Tailwind CSS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"],
      ["Vite", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"],
    ],
  },
  {
    id: "cloud",
    index: "03",
    title: "DevOps & Cloud",
    icon: "cloud",
    target: "#open-source",
    items: [
      ["Docker", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"],
      ["Kubernetes", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"],
      ["AWS", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"],
      ["Git", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"],
      ["GitHub", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"],
      ["Linux", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"],
      ["GitHub Actions", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg"],
      ["Minikube", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"],
    ],
  },
  {
    id: "data",
    index: "04",
    title: "Databases & Data",
    icon: "database",
    target: "#work",
    items: [
      ["PostgreSQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"],
      ["MongoDB", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"],
      ["MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"],
      ["MariaDB", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg"],
      ["pgvector", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"],
    ],
  },
  {
    id: "ai",
    index: "05",
    title: "AI / ML & Audio",
    icon: "brain",
    target: "#research",
    items: [
      ["PyTorch", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg"],
      ["Transformers", "https://cdn.simpleicons.org/huggingface/FFD21E"],
      ["Hugging Face", "https://cdn.simpleicons.org/huggingface/FFD21E"],
      ["HuBERT", "https://cdn.simpleicons.org/huggingface/FFD21E"],
      ["Wav2Vec2", "https://cdn.simpleicons.org/huggingface/FFD21E"],
      ["AST", ""],
      ["CLAP", ""],
      ["AudioMAE", ""],
      ["STFT", ""],
      ["SHA-256", ""],
    ],
  },
  {
    id: "tools",
    index: "06",
    title: "Tools & Platforms",
    icon: "tools",
    target: "#work",
    items: [
      ["VS Code", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"],
      ["Docker Desktop", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"],
      ["Minikube", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"],
      ["Ollama", ""],
      ["OpenRouter", ""],
      ["Postman", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg"],
    ],
  },
];

const domains = [
  "Full-stack development",
  "Open source",
  "Audio AI",
  "Knowledge graphs",
  "Cloud & DevOps",
  "System design",
  "Research & publications",
  "Robotics",
  "Problem solving",
  "Product building",
];

const learning = [
  { title: "Knowledge graphs", stage: "New research direction", note: "Scoping" },
  { title: "Causal reasoning", stage: "Concepts & methods", note: "Exploring" },
  { title: "GraphRAG", stage: "Retrieval patterns", note: "Exploring" },
  { title: "LLM systems", stage: "System behaviour", note: "Studying" },
  { title: "System design", stage: "Trade-offs & boundaries", note: "Practising" },
];

function CategoryIcon({ kind }) {
  const props = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "web") return <svg viewBox="0 0 24 24" {...props}><rect x="3" y="4" width="18" height="15" rx="2"/><path d="M3 8h18M7 6h.01M10 6h.01M12 12l-2 2 2 2M16 12l2 2-2 2M14 11l-2 6"/></svg>;
  if (kind === "cloud") return <svg viewBox="0 0 24 24" {...props}><path d="M6 18a4 4 0 0 1-.3-8A6 6 0 0 1 17 8a5 5 0 0 1 1 10Z"/><path d="M12 11v7m-3-3 3 3 3-3"/></svg>;
  if (kind === "database") return <svg viewBox="0 0 24 24" {...props}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 10c0 1.7 3.6 3 8 3s8-1.3 8-3M4 15c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>;
  if (kind === "brain") return <svg viewBox="0 0 24 24" {...props}><path d="M12 5a4 4 0 0 0-7 2.5A4 4 0 0 0 4 15a4 4 0 0 0 4 5h4zm0 0a4 4 0 0 1 7 2.5A4 4 0 0 1 20 15a4 4 0 0 1-4 5h-4M8 9v6m8-6v6M8 12h4m4 0h-4"/></svg>;
  if (kind === "tools") return <svg viewBox="0 0 24 24" {...props}><path d="m14 7 3 3M4 20l8-8m3-8a5 5 0 0 0 6 6l-4 4-6-6 4-4a5 5 0 0 0-8 5l-3 3 6 6 3-3"/></svg>;
  return <svg viewBox="0 0 24 24" {...props}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>;
}

function SkillIcon({ item }) {
  const [failed, setFailed] = useState(false);
  const [name, src] = item;
  return (
    <span className={styles.skillIcon} aria-hidden="true">
      <span>{name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()}</span>
      {src && !failed ? <img src={publicUrl(src)} alt="" loading="lazy" onError={() => setFailed(true)} /> : null}
    </span>
  );
}

function FocusConsole() {
  const [tab, setTab] = useState("backend");
  const reduceMotion = useReducedMotion();
  const current = focusTabs[tab];
  return (
    <div className={styles.focusConsole}>
      <div className={styles.consoleTitlebar}>
        <div className={styles.consoleLights} aria-hidden="true"><i/><i/><i/></div>
        <span>WORKSPACE / FOCUS MAP</span>
        <span>01 — 03</span>
      </div>
      <div className={styles.consoleBody}>
        <div className={styles.consoleRail}>
          <span>~/ workstreams</span>
          <button type="button" onClick={() => setTab("backend")} className={tab === "backend" ? styles.consoleRailActive : ""}>platform</button>
          <button type="button" onClick={() => setTab("audio")} className={tab === "audio" ? styles.consoleRailActive : ""}>audio-research</button>
          <button type="button" onClick={() => setTab("graph")} className={tab === "graph" ? styles.consoleRailActive : ""}>knowledge-graphs</button>
          <span className={styles.consoleRailFoot}>focus.map</span>
        </div>
        <div className={styles.consoleCode}>
          <div className={styles.consoleFilebar}>
            <span>{current.file}</span><span>JS</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab} className={styles.consoleLines} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }} transition={{ duration: reduceMotion ? 0 : .2 }}>
              <p><span className={styles.codeKeyword}>const</span> <span className={styles.codeName}>focus</span> = {"{"}</p>
              {current.lines.map((line) => (
                <p key={line.n}><span className={styles.codeLineNumber}>{line.n}</span><span className={styles.codeKey}>{line.lead}</span><span className={styles.codePunctuation}>{line.op}</span> <span className={styles["code" + line.tone[0].toUpperCase() + line.tone.slice(1)]}>{line.value}</span></p>
              ))}
              <p>{"}"}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className={styles.consoleFooter}>
        <span><i/> {current.label}</span><span>BUILD · LEARN · REVIEW</span>
      </div>
    </div>
  );
}

function SkillCategory({ category, index }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article className={styles.skillCategory} initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .13 }} transition={{ duration: reduceMotion ? 0 : .33, delay: reduceMotion ? 0 : Math.min(index * .025, .14) }}>
      <header className={styles.skillCategoryHeader}>
        <span className={styles.categoryIcon}><CategoryIcon kind={category.icon}/></span>
        <h3>{category.title}</h3><span className={styles.categoryIndex}>{category.index}</span>
      </header>
      <div className={styles.skillTiles}>
        {category.items.map((item) => (
          <a className={styles.skillTile} key={item[0]} href={category.target} title={item[0] + " · related work"}>
            <SkillIcon item={item}/><span>{item[0]}</span><span className={styles.skillTileTarget} aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <a href={category.target} className={styles.categoryLink}>{category.target === "#research" ? "Related research" : category.target === "#open-source" ? "Upstream work" : "Related projects"} <span aria-hidden="true">↗</span></a>
    </motion.article>
  );
}

export default function SkillsShowcase() {
  const reduceMotion = useReducedMotion();
  return (
    <section className={styles.skillsSection} id="skills" aria-labelledby="skills-heading" tabIndex={-1}>
      <div className={styles.skillsHero}>
        <div className={styles.skillsIntro}>
          <p className={styles.skillsEyebrow}><span>06</span><i/> SKILLS <b/></p>
          <h2 id="skills-heading">Skills <span>&amp; Tools</span></h2>
          <p>These tools map to work I can point to: Go APIs and containerized services, React applications, PostgreSQL/MongoDB data layers, and audio-ML tooling used in SemBind-Audio. Rust is marked as exploration—not claimed proficiency.</p>
          <div className={styles.skillsHeroLinks}>
            <a href="#work">See projects <span aria-hidden="true">↗</span></a>
            <a href="#research">Explore research <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className={styles.skillsConsoleArea}>
          <div className={styles.skillsStats} aria-label="Engineering areas">
            <div><span aria-hidden="true">〈/〉</span><strong>6+</strong><small>Languages + SQL</small></div>
            <div><span aria-hidden="true">API</span><strong>Backend</strong><small>Services &amp; data</small></div>
            <div><span aria-hidden="true">☁</span><strong>Cloud</strong><small>Containers &amp; CI/CD</small></div>
            <div><span aria-hidden="true">∿</span><strong>Audio AI</strong><small>Research &amp; graphs</small></div>
          </div>
          <FocusConsole/>
        </div>
      </div>

      <div className={styles.skillGrid} aria-label="Skills and technical areas">
        {categories.map((category,index)=><SkillCategory key={category.id} category={category} index={index}/>)}
        <motion.article className={styles.domainCard} initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .13 }} transition={{ duration: reduceMotion ? 0 : .33, delay: reduceMotion ? 0 : .12 }}>
          <header className={styles.skillCategoryHeader}><span className={styles.categoryIcon}><CategoryIcon kind="brain"/></span><h3>Domains &amp; Interests</h3><span className={styles.categoryIndex}>07</span></header>
          <div className={styles.domainTags}>{domains.map(domain=><a key={domain} href={domain.toLowerCase().includes("graph") || domain.toLowerCase().includes("audio") || domain.toLowerCase().includes("research") ? "#research" : domain.toLowerCase().includes("source") ? "#open-source" : "#work"}>{domain}</a>)}</div>
          <a href="#work" className={styles.categoryLink}>See applied work <span aria-hidden="true">↗</span></a>
        </motion.article>
        <motion.article className={styles.learningCard} initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .13 }} transition={{ duration: reduceMotion ? 0 : .33, delay: reduceMotion ? 0 : .14 }}>
          <header className={styles.skillCategoryHeader}><span className={styles.categoryIcon}><CategoryIcon kind="tools"/></span><h3>Currently Learning</h3><span className={styles.categoryIndex}>08</span></header>
          <div className={styles.learningList}>
            {learning.map((item,index)=><a key={item.title} href="#research" className={styles.learningItem}><span className={styles.learningNumber}>0{index+1}</span><span className={styles.learningCopy}><strong>{item.title}</strong><small>{item.stage}</small></span><span className={styles.learningStatus}>{item.note}</span></a>)}
          </div>
          <p className={styles.learningFootnote}>No invented progress percentages—just the directions I’m working through now.</p>
        </motion.article>
      </div>
    </section>
  );
}
