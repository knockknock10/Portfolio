"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./ExperienceShowcase.module.css";

const githubProfile = "https://github.com/knockknock10";

const focusModes = {
  graph: {
    label: "Knowledge graphs",
    eyebrow: "CURRENT RESEARCH · OCT 2026",
    title: "Context across time",
    detail: "Exploring causal-temporal audio knowledge graphs for non-visual situational intelligence.",
    tags: ["Temporal graphs", "Causal reasoning", "GraphRAG"],
  },
  audio: {
    label: "SemBind-Audio",
    eyebrow: "FIRST-AUTHOR MANUSCRIPT · 2026",
    title: "Audio, represented",
    detail: "Reference-based audio watermarking, transformer contributions, spectral placement and cryptographic binding.",
    tags: ["HuBERT", "STFT", "SHA-256"],
  },
  platform: {
    label: "Developer platforms",
    eyebrow: "BUILDING & CONTRIBUTING",
    title: "Tools people can use",
    detail: "Building Aevor and full-stack projects while contributing tests, fixes and integrations upstream.",
    tags: ["Go", "PostgreSQL", "Open source"],
  },
};

function FocusGraphic({ mode }) {
  if (mode === "graph") {
    return (
      <svg className={styles.focusGraphic} viewBox="0 0 480 230" role="img" aria-label="Illustrative temporal knowledge graph showing related concepts across time">
        <defs>
          <linearGradient id="graphStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#77a9ff" />
            <stop offset="100%" stopColor="#b78aff" />
          </linearGradient>
          <radialGradient id="graphGlow">
            <stop offset="0%" stopColor="#6a8aff" stopOpacity=".38" />
            <stop offset="100%" stopColor="#6a8aff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="236" cy="112" rx="178" ry="104" fill="url(#graphGlow)" />
        <g stroke="url(#graphStroke)" strokeWidth="1.6" strokeOpacity=".55" fill="none">
          <path d="M70 83 L150 53 L232 91 L329 45 L405 90" />
          <path d="M70 83 L116 158 L232 91 L293 165 L405 90" />
          <path d="M150 53 L183 199 L293 165 L329 45" />
          <path d="M116 158 L183 199 L293 165 L380 204" />
          <path d="M232 91 L248 27 L329 45" />
          <path d="M232 91 L248 27 L150 53" strokeDasharray="4 6" />
        </g>
        {[
          [70,83,8,"#7ca7ff"],[150,53,11,"#a1bcff"],[232,91,15,"#9c85ff"],
          [329,45,9,"#82e0d1"],[405,90,11,"#9a9aff"],[116,158,10,"#7fe0d2"],
          [183,199,8,"#82b2ff"],[293,165,12,"#c0a3ff"],[380,204,8,"#7fe0d2"],
          [248,27,7,"#c2a2ff"]
        ].map(([cx,cy,r,color],index)=>(
          <g key={index}>
            <circle cx={cx} cy={cy} r={r*2.15} fill={color} opacity=".08" />
            <circle cx={cx} cy={cy} r={r} fill={color} stroke="#f5f4ff" strokeOpacity=".72" strokeWidth="1.5" />
          </g>
        ))}
        <g fill="#e0e7ff" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, monospace">
          <text x="38" y="66">event</text>
          <text x="130" y="32">time</text>
          <text x="210" y="119">context</text>
          <text x="319" y="27">cause</text>
          <text x="374" y="74">signal</text>
          <text x="289" y="188">entity</text>
        </g>
      </svg>
    );
  }

  if (mode === "audio") {
    const bars = Array.from({ length: 64 }, (_, i) => 7 + ((i * 17 + (i % 7) * 11) % 43));
    return (
      <svg className={styles.focusGraphic} viewBox="0 0 480 230" role="img" aria-label="Illustrative audio waveform and spectral-analysis visual">
        <defs>
          <linearGradient id="audioBars" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4d79ff" />
            <stop offset="55%" stopColor="#bc65ee" />
            <stop offset="100%" stopColor="#f5ad9f" />
          </linearGradient>
        </defs>
        <g stroke="#94a5d7" strokeOpacity=".13">
          {Array.from({ length: 8 }, (_, i) => <path key={"h"+i} d={`M20 ${24+i*25} H460`} />)}
          {Array.from({ length: 15 }, (_, i) => <path key={"v"+i} d={`M${30+i*30} 18 V212`} />)}
        </g>
        {bars.map((height, i) => (
          <g key={i}>
            <rect x={22+i*6.9} y={112-height/2} width="3.1" height={height} rx="1.55" fill="url(#audioBars)" opacity={.48+(height/60)} />
            <rect x={22+i*6.9} y={164-(height*.8)} width="3.1" height={height*.8} rx="1.55" fill="#8e70ff" opacity=".18" />
          </g>
        ))}
        <path d="M20 112 C50 91 62 138 86 110 S125 87 148 112 S195 144 217 108 S257 78 280 111 S320 142 342 109 S386 89 406 112 S438 137 460 105" fill="none" stroke="#f1dcff" strokeOpacity=".9" strokeWidth="1.5" />
        <path d="M20 112 H460" fill="none" stroke="#d5d8ff" strokeOpacity=".23" strokeDasharray="4 5" />
        <g fill="#acbce5" fontSize="9" fontFamily="ui-monospace, SFMono-Regular, monospace">
          <text x="20" y="219">TIME-FREQUENCY VIEW</text><text x="356" y="219">STFT · 16 kHz</text>
        </g>
      </svg>
    );
  }

  return (
    <svg className={styles.focusGraphic} viewBox="0 0 480 230" role="img" aria-label="Illustrative service and repository map for developer tooling">
      <defs>
        <linearGradient id="platformNode" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2c3c5b" />
          <stop offset="100%" stopColor="#141b2b" />
        </linearGradient>
      </defs>
      <g stroke="#84a6ff" strokeWidth="1.5" strokeOpacity=".58" fill="none">
        <path d="M240 59 V88 M240 142 V171 M107 115 H176 M304 115 H373" />
        <path d="M107 115 L75 77 M107 115 L75 154 M373 115 L404 77 M373 115 L404 154" strokeDasharray="4 5" />
      </g>
      {[
        [180,22,120,37,"API · Go"],
        [180,87,120,55,"POSTGRESQL"],
        [180,171,120,36,"WEB · REACT"],
        [20,58,87,35,"AUTH"],
        [20,138,87,35,"CI / TESTS"],
        [373,58,87,35,"GITHUB"],
        [373,138,87,35,"DOCKER"]
      ].map(([x,y,w,h,label],i)=>(
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="8" fill="url(#platformNode)" stroke="#91adff" strokeOpacity=".34" />
          <text x={x+w/2} y={y+h/2+3.5} fill="#dce5ff" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="ui-monospace, SFMono-Regular, monospace">{label}</text>
        </g>
      ))}
      <circle cx="240" cy="115" r="46" fill="#7e8fff" opacity=".055" />
    </svg>
  );
}

function FocusWorkbench() {
  const [mode, setMode] = useState("graph");
  const reducedMotion = useReducedMotion();
  const current = focusModes[mode];

  return (
    <aside className={styles.workbench} aria-label="Current workbench">
      <div className={styles.workbenchTop}>
        <div className={styles.windowControls} aria-hidden="true"><i /><i /><i /></div>
        <span>WORKBENCH / 2026</span>
        <a href={githubProfile} target="_blank" rel="noreferrer" aria-label="Open GitHub profile">GitHub <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.workbenchTabs} role="tablist" aria-label="Explore current work">
        {Object.entries(focusModes).map(([key, item]) => (
          <button key={key} type="button" role="tab" aria-selected={mode === key} onClick={() => setMode(key)} className={mode === key ? styles.workbenchTabActive : styles.workbenchTab}>
            <span className={styles.tabStatus} aria-hidden="true" />{item.label}
          </button>
        ))}
      </div>
      <div className={styles.workbenchVisual}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={mode} className={styles.visualInner} initial={reducedMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -5 }} transition={{ duration: reducedMotion ? 0 : .22 }}>
            <FocusGraphic mode={mode} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.workbenchInfo}>
        <p>{current.eyebrow}</p>
        <h3>{current.title}</h3>
        <span>{current.detail}</span>
        <div>{current.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      </div>
    </aside>
  );
}

const journey = [
  {
    id: "knowledge-graph",
    year: "OCT 2026",
    dates: "Current research",
    title: "Knowledge Graph Research",
    subtitle: "Causal-temporal audio knowledge graphs for non-visual situational intelligence",
    status: "Exploring",
    tone: "violet",
    detail: "Beginning a new research direction that connects audio events with temporal context, causal reasoning and graph-based retrieval.",
    tags: ["Knowledge graphs", "Temporal reasoning", "GraphRAG", "LLM systems"],
    href: "#research",
    linkLabel: "Research direction",
    marker: "graph",
  },
  {
    id: "sembind",
    year: "2026",
    dates: "Manuscript submitted",
    title: "SemBind-Audio Research",
    subtitle: "Reference-based speech watermarking with transformer representations and cryptographic binding",
    status: "Submitted",
    tone: "blue",
    detail: "A first-author manuscript submitted to IEEE Signal Processing Letters. The evaluation examines payload recovery and placement trade-offs across the LibriSpeech test-clean corpus.",
    tags: ["Audio watermarking", "HuBERT", "STFT", "SHA-256"],
    href: "https://github.com/knockknock10/SemBind_Audio",
    linkLabel: "Open research repository",
    marker: "audio",
  },
  {
    id: "nanosensor",
    year: "Earlier work",
    dates: "Research project",
    title: "Nano Sensor Project",
    subtitle: "Nano-scale sensor-network communication simulator",
    status: "Prior research",
    tone: "mint",
    detail: "MATLAB-based research work focused on network communication, routing and packet propagation in nano-scale sensor systems. A precise date and public project link are not recorded in the portfolio source.",
    tags: ["MATLAB", "Embedded systems", "Routing", "Simulation"],
    href: "#research",
    linkLabel: "Research section",
    marker: "sensor",
  },
  {
    id: "upstream",
    year: "2025–2026",
    dates: "Open source",
    title: "Open Source Contributor",
    subtitle: "Kestra · Apache Camel K · Wanaku AI · Aevor and other upstreams",
    status: "Ongoing",
    tone: "coral",
    detail: "Contributions span plugin integration work, test-focused changes, network-policy validation, bug fixes, and code-review iterations. Each project is linked to its original upstream record.",
    tags: ["Java", "Go", "Testing", "CI/CD"],
    href: "#open-source",
    linkLabel: "View contribution trail",
    marker: "code",
  },
  {
    id: "projects",
    year: "Across projects",
    dates: "Build & iterate",
    title: "Personal & Academic Projects",
    subtitle: "Aevor Platform · CommitHub · Wandera · ConvergenceGuard · NovaFest",
    status: "Building",
    tone: "violet",
    detail: "Full-stack applications and developer tooling across APIs, databases, collaboration workflows, deployments and distributed-system boundaries.",
    tags: ["Full stack", "Backend", "Databases", "DevOps"],
    href: "#work",
    linkLabel: "Explore selected work",
    marker: "platform",
  },
];

function JourneyItem({ item, index }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.article className={styles.journeyItem} data-tone={item.tone} initial={reducedMotion ? false : { opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: reducedMotion ? 0 : .36, delay: reducedMotion ? 0 : Math.min(index * .045, .18), ease: [.22, 1, .36, 1] }}>
      <div className={styles.journeyTime}><span>{item.year}</span><small>{item.dates}</small></div>
      <span className={styles.journeyMarker} aria-hidden="true">{String(index + 1).padStart(2,"0")}</span>
      <div className={styles.journeyBody}>
        <div className={styles.journeyHeader}>
          <div><h3>{item.title}</h3><p>{item.subtitle}</p></div>
          <span className={styles.journeyStatus} data-tone={item.tone}>{item.status}</span>
        </div>
        <p className={styles.journeyDetail}>{item.detail}</p>
        <div className={styles.journeyTags}>{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <a className={styles.journeyLink} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>{item.linkLabel} <span aria-hidden="true">↗</span></a>
      </div>
    </motion.article>
  );
}

export default function ExperienceShowcase({ researchItems = [], internships = [] }) {
  const [expanded, setExpanded] = useState(null);
  const reducedMotion = useReducedMotion();
  const manuscript = researchItems.find(item => /sembind/i.test(item.title));
  const researchCount = 3;
  const projectCount = 5;
  const communities = 7;
  const entries = useMemo(() => journey.map(item => {
    if (item.id !== "sembind" || !manuscript) return item;
    return {
      ...item,
      title: "SemBind-Audio Research",
      detail: manuscript.abstract && manuscript.abstract !== "MISSING" ? manuscript.abstract : item.detail,
      href: manuscript.link && manuscript.link !== "MISSING" ? manuscript.link : item.href,
      status: manuscript.status && manuscript.status !== "MISSING" ? "Submitted" : item.status,
    };
  }), [manuscript]);

  return (
    <section className={styles.experienceSection} id="internships" aria-labelledby="experience-heading" tabIndex={-1}>
      <header className={styles.experienceHeader}>
        <div className={styles.experienceIntro}>
          <p className={styles.experienceEyebrow}><span>05</span><i /> EXPERIENCE <b /></p>
          <h2 id="experience-heading">Experience<span>.</span></h2>
          <p>Research I’m pursuing, upstream software I help improve, and systems I’m building. A timeline of the work—not a list of job titles.</p>
        </div>
        <div className={styles.experienceStats} aria-label="Experience overview">
          <div><span className={styles.statGlyph} aria-hidden="true">⌘</span><strong>{researchCount}</strong><small>Research threads</small></div>
          <div><span className={styles.statGlyph} aria-hidden="true">◇</span><strong>{projectCount}</strong><small>Selected projects</small></div>
          <div><span className={styles.statGlyph} aria-hidden="true">⑂</span><strong>{communities}</strong><small>OSS communities</small></div>
        </div>
      </header>
      <div className={styles.experienceLayout}>
        <div className={styles.journeyPanel}>
          <div className={styles.journeyPanelTop}><span>THE WORK TRAIL</span><span>01 — 05</span></div>
          <div className={styles.journeyList}>
            {entries.map((item,index)=><JourneyItem key={item.id} item={item} index={index} />)}
            {internships.filter(item => item && item.company).map((item,index)=>(
              <article className={styles.externalExperience} key={item.company + item.role + index}>
                <span className={styles.externalExperienceNumber}>{String(entries.length + index + 1).padStart(2,"0")}</span>
                <div><p>PROFESSIONAL EXPERIENCE</p><h3>{item.role && item.role !== "MISSING" ? item.role : item.company}</h3><strong>{item.company}</strong><span>{[item.startDate,item.endDate].filter(value => value && value !== "MISSING").join(" — ")}</span><p>{item.summary && item.summary !== "MISSING" ? item.summary : "Professional experience details from the portfolio data."}</p></div>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.experienceAside}>
          <FocusWorkbench />
          <div className={styles.experienceToolkit}>
            <div className={styles.toolkitHeader}><h3>What I’ve worked with</h3><span>FIELD NOTES</span></div>
            <div className={styles.toolkitIcons}>
              {[
                ["Go","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg"],
                ["Java","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"],
                ["Python","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"],
                ["React","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"],
                ["Docker","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"],
                ["Kubernetes","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"],
                ["PostgreSQL","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"],
                ["MongoDB","https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"],
              ].map(([name,src])=><span key={name}><img src={src} alt="" loading="lazy" /><small>{name}</small></span>)}
            </div>
            <a href="#skills" className={styles.toolkitLink}>Explore the full toolkit <span aria-hidden="true">↗</span></a>
          </div>
          <div className={styles.experienceAsideQuote}>
            <span>“</span><p>Learn deeply. Contribute honestly. Keep building.</p><a href={githubProfile} target="_blank" rel="noreferrer"><span>Open GitHub profile</span><span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
      <div className={styles.experiencePrinciples}>
        <div><span data-tone="amber">✳</span><div><strong>Research with evidence</strong><small>Write down what the results actually say.</small></div></div>
        <div><span data-tone="blue">⌁</span><div><strong>Build useful systems</strong><small>Turn prototypes into work others can inspect.</small></div></div>
        <div><span data-tone="coral">↗</span><div><strong>Give back upstream</strong><small>Test carefully and follow the review through.</small></div></div>
      </div>
    </section>
  );
}
