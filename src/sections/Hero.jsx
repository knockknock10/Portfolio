import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, openSourceInfo } from "../data/profile";

// ── Engineering landscape nodes ──────────────────────────────────────────────
const nodes = [
  {
    id: "commithub",
    label: "CommitHub",
    type: "project",
    github: "https://github.com/knockknock10/CommitHub",
    description: "Developer collaboration platform with JWT auth, role-based access, and AWS S3 storage.",
    tags: ["React", "Node.js", "MongoDB", "AWS S3"],
    x: 0.25,
    y: 0.35,
    stars: 5,
    category: "Projects",
  },
  {
    id: "wandera",
    label: "Wandera",
    type: "project",
    github: "https://github.com/knockknock10/Wandera",
    description: "Travel listings platform with CRUD, MVC architecture, Cloudinary image storage.",
    tags: ["Node.js", "Express", "MongoDB", "Cloudinary"],
    x: 0.55,
    y: 0.28,
    stars: 4,
    category: "Projects",
  },
  {
    id: "ecom",
    label: "E-Commerce + CI/CD",
    type: "project",
    github: "https://github.com/knockknock10/E_Com",
    description: "Containerized microservices with Kubernetes orchestration and GitHub Actions CI/CD.",
    tags: ["Docker", "Kubernetes", "GitHub Actions", "Node.js"],
    x: 0.78,
    y: 0.40,
    stars: 0,
    category: "Projects",
  },
  {
    id: "novafest",
    label: "NOVAFEST",
    type: "project",
    github: "https://github.com/knockknock10/NOVAFEST",
    description: "Project showcase and management hub with role-based access and voting systems.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    x: 0.45,
    y: 0.65,
    stars: 0,
    category: "Projects",
  },
  // Open source
  {
    id: "webpack",
    label: "webpack-cli PR #20356",
    type: "opensource",
    github: "https://github.com/webpack/webpack-cli/pull/20356",
    description: "Merged contribution clarifying npm audit warnings for local dev dependencies in CONTRIBUTING.md.",
    tags: ["JavaScript", "Webpack", "CLI", "Documentation"],
    x: 0.18,
    y: 0.72,
    stars: 0,
    category: "Open Source",
  },
  // Domains
  {
    id: "backend",
    label: "Backend Systems",
    type: "domain",
    description: "REST APIs, JWT authentication, Express.js, and scalable server architecture.",
    tags: ["Node.js", "Express", "REST", "JWT"],
    x: 0.08,
    y: 0.15,
    category: "Domains",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    type: "domain",
    description: "Docker containerization, Kubernetes orchestration, CI/CD pipelines, and cloud deployment.",
    tags: ["Docker", "Kubernetes", "GitHub Actions", "AWS S3"],
    x: 0.92,
    y: 0.15,
    category: "Domains",
  },
  {
    id: "ai",
    label: "AI & Research",
    type: "domain",
    description: "Semantic audio binding research and applied machine learning exploration.",
    tags: ["SemBind-Audio", "Python", "Research"],
    x: 0.92,
    y: 0.60,
    category: "Domains",
  },
];

// ── Connection pairs ──────────────────────────────────────────────────────────
const connections = [
  ["commithub", "backend"],
  ["commithub", "infrastructure"],
  ["wandera", "backend"],
  ["ecom", "infrastructure"],
  ["ecom", "backend"],
  ["novafest", "backend"],
  ["webpack", "backend"],
  ["ai", "backend"],
  ["backend", "infrastructure"],
];

// ── Status items (bottom strip) ──────────────────────────────────────────────
const statusItems = [
  { label: "Aevor", status: "Currently building" },
  { label: "SemBind-Audio", status: "Researching" },
];

// ── Component ────────────────────────────────────────────────────────────────
const Hero = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [dimensions, setDimensions] = useState({ w: 1200, h: 700 });
  const heroRef = useRef(null);

  // Track mouse for subtle parallax on the ambient glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setDimensions({ w: rect.width, h: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  const handleNodeClick = (node) => {
    if (node.type === "project" || node.type === "opensource") {
      window.open(node.github, "_blank", "noopener,noreferrer");
    } else {
      setActiveNode(activeNode?.id === node.id ? null : node);
    }
  };

  const nodeMap = {};
  nodes.forEach((n) => (nodeMap[n.id] = n));

  // Compute connection lines
  const connectionLines = connections.map(([fromId, toId], i) => {
    const from = nodeMap[fromId];
    const to = nodeMap[toId];
    if (!from || !to) return null;

    const isActive =
      hoveredNode && (hoveredNode.id === fromId || hoveredNode.id === toId);
    const isHighlighted =
      activeNode &&
      (activeNode.id === fromId ||
        activeNode.id === toId ||
        activeNode.category === from.category ||
        activeNode.category === to.category);

    return {
      from,
      to,
      x1: from.x * dimensions.w,
      y1: from.y * dimensions.h,
      x2: to.x * dimensions.w,
      y2: to.y * dimensions.h,
      opacity: isHighlighted || isActive ? 0.55 : 0.10,
      strokeWidth: isHighlighted || isActive ? 1.5 : 0.8,
      highlighted: isHighlighted || isActive,
      delay: i * 0.04,
    };
  }).filter(Boolean);

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen pt-20 pb-8 overflow-hidden bg-[#050508] cursor-default"
    >
      {/* ── Ambient background glow ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-[120px] transition-all duration-700 ease-out"
          style={{
            width: "600px",
            height: "600px",
            top: "-200px",
            right: "-100px",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
            transform: `translate(${mousePos.x * 24}px, ${mousePos.y * 18}px)`,
          }}
        />
        <div
          className="absolute rounded-full blur-[80px] transition-all duration-700 ease-out"
          style={{
            width: "400px",
            height: "400px",
            bottom: "-100px",
            left: "-100px",
            background:
              "radial-gradient(circle, rgba(217,167,74,0.04) 0%, transparent 70%)",
            transform: `translate(${-mousePos.x * 16}px, ${-mousePos.y * 12}px)`,
          }}
        />
      </div>

      {/* ── Subtle grid texture ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── LEFT CONTENT COLUMN ───────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-col justify-center min-h-screen px-6 sm:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="max-w-xl"
        >
          {/* Name — the anchor */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-3">
            Sanjeev Kumar
          </h1>

          {/* Role */}
          <p className="text-lg sm:text-xl text-neutral-400 font-light tracking-tight mb-8">
            Software Engineer
          </p>

          {/* Position statement */}
          <p className="text-xl sm:text-2xl text-neutral-300 font-light italic leading-relaxed mb-6 border-l-2 border-purple-500/40 pl-4">
            &ldquo;Software engineer building at the intersection of systems and AI.&rdquo;
          </p>

          {/* Supporting text */}
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-md mb-10">
            Backend systems, infrastructure, developer tools, and applied research.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Primary: Explore Work */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors duration-200"
            >
              Explore Work
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* Secondary: GitHub */}
            <a
              href="https://github.com/knockknock10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-neutral-800 text-neutral-300 font-medium text-sm hover:border-neutral-600 hover:text-white transition-colors duration-200"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>

            {/* Resume — visually secondary */}
            <a
              href="/Kr_Sanjeev_Resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-800/60 text-neutral-500 text-xs font-medium hover:border-neutral-600 hover:text-neutral-300 transition-colors duration-200"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── RIGHT VISUAL COMPOSITION ──────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 px-6 sm:px-12 lg:px-20">
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              maxHeight: "calc(100vh - 40px)",
              pointerEvents: "auto",
            }}
          >
            <defs>
              {/* Glow for active nodes */}
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Line glow */}
              <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Node gradient backgrounds */}
              <radialGradient id="nodeGradProject" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="rgba(217,167,74,0.13)"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(217,167,74,0.03)"
                />
              </radialGradient>
              <radialGradient
                id="nodeGradOpenSource"
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(139,92,246,0.13)"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(139,92,246,0.03)"
                />
              </radialGradient>
              <radialGradient id="nodeGradDomain" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="rgba(255,255,255,0.05)"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(255,255,255,0.01)"
                />
              </radialGradient>
            </defs>

            {/* ── Connection lines (behind nodes) ───────────────────────── */}
            {connectionLines.map((line, i) => (
              <line
                key={`conn-${i}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.highlighted ? "#d9a74a" : "#ffffff"}
                strokeWidth={line.strokeWidth}
                strokeOpacity={line.opacity}
                strokeLinecap="round"
                filter={line.highlighted ? "url(#lineGlow)" : undefined}
                style={{
                  transition: "stroke-opacity 0.2s ease, stroke-width 0.2s ease",
                }}
              />
            ))}

            {/* ── Nodes ───────────────────────────────────────────────────── */}
            {nodes.map((node) => {
              const isHovered = hoveredNode?.id === node.id;
              const isSelected = activeNode?.id === node.id;
              const isActive = isHovered || isSelected;
              const isProject = node.type === "project";
              const isOpenSource = node.type === "opensource";
              const isDomain = node.type === "domain";

              const cx = node.x * dimensions.w;
              const cy = node.y * dimensions.h;

              const labelWidth = Math.min(node.label.length * 7.2, 200);
              const boxWidth = labelWidth + 44;
              const boxHeight = isDomain ? 40 : 52;

              return (
                <g
                  key={node.id}
                  transform={`translate(${cx - boxWidth / 2}, ${cy - boxHeight / 2})`}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeClick(node)}
                  className="hero-node cursor-pointer"
                  style={{
                    transform: isActive
                      ? `translate(${cx - boxWidth / 2}px, ${cy - boxHeight / 2 - 3}px)`
                      : `translate(${cx - boxWidth / 2}px, ${cy - boxHeight / 2}px)`,
                    transition: "transform 0.18s ease-out",
                  }}
                >
                  {/* Node background panel */}
                  <rect
                    x={0}
                    y={0}
                    width={boxWidth}
                    height={boxHeight}
                    rx={6}
                    fill={
                      isProject
                        ? "url(#nodeGradProject)"
                        : isOpenSource
                        ? "url(#nodeGradOpenSource)"
                        : "url(#nodeGradDomain)"
                    }
                    stroke={isActive ? "#d9a74a" : "rgba(255,255,255,0.07)"}
                    strokeWidth={isActive ? 1.5 : 0.5}
                    style={{
                      transition: "all 0.2s ease-out",
                    }}
                  />

                  {/* Accent bar on left edge of active nodes */}
                  {isActive && (
                    <rect
                      x={0}
                      y={0}
                      width={3}
                      height={boxHeight}
                      rx={1.5}
                      fill="#d9a74a"
                    />
                  )}

                  {/* Stars badge for projects */}
                  {isProject && node.stars > 0 && (
                    <g
                      transform={`translate(${boxWidth - 22}, 7)`}
                      style={{ transition: "opacity 0.2s ease" }}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={9}
                        fill="rgba(217,167,74,0.12)"
                        stroke="rgba(217,167,74,0.25)"
                        strokeWidth={0.5}
                      />
                      <text
                        x={0}
                        y={2.8}
                        textAnchor="middle"
                        fill="#d9a74a"
                        fontSize={9}
                        fontFamily="'JetBrains Mono', monospace"
                        fontWeight={600}
                      >
                        {node.stars}
                      </text>
                    </g>
                  )}

                  {/* Category indicator dot */}
                  <circle
                    cx={12}
                    cy={boxHeight / 2}
                    r={2.8}
                    fill={
                      isProject
                        ? "#d9a74a"
                        : isOpenSource
                        ? "#8b5cf6"
                        : "rgba(255,255,255,0.18)"
                    }
                    style={{ transition: "fill 0.2s ease" }}
                  />

                  {/* Label text */}
                  <text
                    x={24}
                    y={boxHeight / 2 + 3.5}
                    fill={isActive ? "#ffffff" : "#d1d5db"}
                    fontSize={isDomain ? 10.5 : 11.5}
                    fontFamily="'Inter', sans-serif"
                    fontWeight={isActive ? 600 : 500}
                    letterSpacing={isDomain ? "0.04em" : "0"}
                    style={{ transition: "fill 0.2s ease" }}
                  >
                    {node.label}
                  </text>

                  {/* Tag chips for active nodes */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.g
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        transform={`translate(0, ${boxHeight + 6})`}
                      >
                        {node.tags.slice(0, 3).map((tag, i) => (
                          <g key={i} transform={`translate(4, ${i * 15})`}>
                            <rect
                              x={0}
                              y={0}
                              width={tag.length * 6.5 + 10}
                              height={12}
                              rx={3}
                              fill="rgba(255,255,255,0.03)"
                              stroke="rgba(255,255,255,0.07)"
                              strokeWidth={0.5}
                            />
                            <text
                              x={5}
                              y={9}
                              fill="#9ca3af"
                              fontSize={8.5}
                              fontFamily="'JetBrains Mono', monospace"
                            >
                              {tag}
                            </text>
                          </g>
                        ))}
                      </motion.g>
                    )}
                  </AnimatePresence>

                  {/* Description tooltip for active nodes */}
                  <AnimatePresence>
                    {isActive && node.description && (
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        transform={`translate(${boxWidth + 8}, ${-boxHeight - 4})`}
                      >
                        <rect
                          x={0}
                          y={0}
                          width={Math.min(node.description.length * 5.8, 300) + 12}
                          height={34}
                          rx={5}
                          fill="rgba(15,17,21,0.93)"
                          stroke="rgba(217,167,74,0.15)"
                          strokeWidth={0.5}
                        />
                        <text
                          x={6}
                          y={14}
                          fill="#d1d5db"
                          fontSize={9.5}
                          fontFamily="'Inter', sans-serif"
                          fontWeight={400}
                        >
                          {node.description}
                        </text>
                        <line
                          x1={0}
                          y1={26}
                          x2={Math.min(node.description.length * 5.8, 300) + 12}
                          y2={26}
                          stroke="rgba(255,255,255,0.04)"
                          strokeWidth={0.5}
                        />
                        <text
                          x={6}
                          y={31}
                          fill="#9ca3af"
                          fontSize={8}
                          fontFamily="'JetBrains Mono', monospace"
                        >
                          {node.category}
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── BOTTOM STATUS STRIP ───────────────────────────────────────────── */}
      <div className="absolute bottom-6 left-6 sm:left-12 lg:left-20 z-20 flex items-center gap-5">
        {statusItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
            className="flex items-center gap-2 text-xs text-neutral-500 font-light"
          >
            <span className="text-neutral-600">{item.status}</span>
            <span className="text-neutral-300 font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 right-6 sm:right-10 z-20"
      >
        <svg
          className="w-4.5 h-4.5 text-neutral-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
