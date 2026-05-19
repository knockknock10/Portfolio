import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profileInfo, skillsData, projects, openSourceInfo } from "../data/profile";

const TerminalConsole = () => {
  const [history, setHistory] = useState([
    { type: "output", text: "Initializing session...", isRaw: false },
    { type: "output", text: "Developer console loaded. System: ONLINE", isRaw: false },
    { type: "output", text: "Type 'help' to see the list of available commands.", isRaw: false }
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);

  const commandList = [
    "help",
    "about",
    "skills",
    "projects",
    "docker",
    "kubernetes",
    "opensource",
    "resume",
    "contact",
    "neofetch",
    "clear"
  ];

  // Auto-scroll on new entries WITHOUT triggering browser viewport scroll jump!
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  const getSuggestions = () => {
    if (!input) return [];
    return commandList.filter(cmd => cmd.startsWith(input.toLowerCase()) && cmd !== input.toLowerCase());
  };

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add to input history
    setCommandHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const cmd = trimmed.toLowerCase();
    let response = [];

    switch (cmd) {
      case "help":
        response = [
          { type: "output", text: "DEVELOPER CONSOLE - AVAILABLE COMMANDS:", isRaw: false },
          { type: "output", text: "  about       - Display background and academic credentials", isRaw: false },
          { type: "output", text: "  skills      - Display skills list", isRaw: false },
          { type: "output", text: "  projects    - List development and engineering projects", isRaw: false },
          { type: "output", text: "  docker      - Show containerization setup", isRaw: false },
          { type: "output", text: "  kubernetes  - Show local Kubernetes cluster configuration", isRaw: false },
          { type: "output", text: "  opensource  - Show Webpack-CLI open-source contribution details", isRaw: false },
          { type: "output", text: "  resume      - Get resume download link", isRaw: false },
          { type: "output", text: "  contact     - Show contact information", isRaw: false },
          { type: "output", text: "  neofetch    - Display system overview", isRaw: false },
          { type: "output", text: "  clear       - Clear console screen", isRaw: false }
        ];
        break;

      case "about":
        response = [
          { type: "output", text: `[Identity Profile]`, isRaw: false },
          { type: "output", text: `  Name:        ${profileInfo.name}`, isRaw: false },
          { type: "output", text: `  Focus:       ${profileInfo.title}`, isRaw: false },
          { type: "output", text: `  Stack:       ${profileInfo.subheading}`, isRaw: false },
          { type: "output", text: `  Education:   SRM University AP B.Tech CSE (Current CGPA: 8.42 | SGPA: 8.73)`, isRaw: false },
          { type: "output", text: `  Location:    ${profileInfo.location}`, isRaw: false },
          { type: "output", text: `  Bio:         ${profileInfo.supportingText}`, isRaw: false }
        ];
        break;

      case "skills":
        response = [
          { type: "output", text: "Loading skills list...", isRaw: false }
        ];
        Object.entries(skillsData).forEach(([category, skills]) => {
          const names = skills.map(s => s.name).join(", ");
          response.push({ type: "output", text: `  [${category.toUpperCase()}]:`, isRaw: false });
          response.push({ type: "output", text: `    ${names}`, isRaw: false });
        });
        break;

      case "projects":
        response = [
          { type: "output", text: "Loading projects list...", isRaw: false }
        ];
        projects.forEach((proj, idx) => {
          response.push({ type: "output", text: `  [0${idx + 1}] ${proj.title}`, isRaw: false });
          response.push({ type: "output", text: `       Specs: ${proj.intro}`, isRaw: false });
          response.push({ type: "output", text: `       Stack: ${proj.tags.join(" | ")}`, isRaw: false });
        });
        break;

      case "docker":
        response = [
          { type: "output", text: "Docker Setup Details:", isRaw: false },
          { type: "output", text: "  Technique:  Multi-stage builds, Alpine base optimization, layer caching", isRaw: false },
          { type: "output", text: "  Coverage:   Local containerized development environments, database volumes", isRaw: false },
          { type: "output", text: "  Status:     Ready", isRaw: false }
        ];
        break;

      case "kubernetes":
        response = [
          { type: "output", text: "Kubernetes Local Configuration:", isRaw: false },
          { type: "output", text: "  Topology:   Minikube local multi-pod node cluster", isRaw: false },
          { type: "output", text: "  Entities:   Declarative Deployment manifests, ClusterIP Services, ConfigMaps, Secrets", isRaw: false },
          { type: "output", text: "  Toolchain:  Skaffold continuous hot-reload configuration directories", isRaw: false }
        ];
        break;

      case "opensource":
        response = [
          { type: "output", text: `Open Source Contribution Details:`, isRaw: false },
          { type: "output", text: `  Target:     ${openSourceInfo.highlight.repo} (PR #20356)`, isRaw: false },
          { type: "output", text: `  Impact:     Webpack-CLI is a dependency for millions of active projects (28M+ weekly downloads)`, isRaw: false },
          { type: "output", text: `  Change:     Clarified local npm audit warnings handling inside CONTRIBUTING.md.`, isRaw: false }
        ];
        break;

      case "resume":
        response = [
          { type: "output", text: "Resume Download Details:", isRaw: false },
          { type: "output", text: `  Payload:    ${profileInfo.resumeLink}`, isRaw: false },
          { type: "output", text: `  Path:       https://kr-sanjeev.netlify.app/Kr_Sanjeev_Resume.pdf`, isRaw: false }
        ];
        break;

      case "contact":
        response = [
          { type: "output", text: "Contact Information:", isRaw: false },
          { type: "output", text: `  Email:      ${profileInfo.email}`, isRaw: false },
          { type: "output", text: `  GitHub:     https://github.com/knockknock10`, isRaw: false },
          { type: "output", text: `  LinkedIn:   https://www.linkedin.com/in/-sanjeev-kr/`, isRaw: false }
        ];
        break;

      case "neofetch":
        response = [
          {
            type: "output",
            text: `
      _/\_       kr_sanjeev
     /    \      ----------
    |  []  |     OS: Ubuntu Linux Environment
    \  ()  /     Host: SRM University AP (B.Tech CSE)
     \____/      CGPA: 8.42 / 10.0 (SGPA: 8.73)
                 Shell: bash / zsh
                 Languages: JavaScript, Java, C++, Python, Bash
                 Infra: Docker, Kubernetes, GitHub Actions
                 Open Source: Webpack CLI contributor
`,
            isRaw: true
          }
        ];
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        response = [
          { type: "output", text: `bash: command not found: '${trimmed}'. Type 'help' to see available commands.`, isRaw: false }
        ];
    }

    setHistory(prev => [
      ...prev,
      { type: "input", text: trimmed },
      ...response
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = getSuggestions();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
      }
    }
  };

  const suggestions = getSuggestions();

  return (
    <section id="console" className="w-full bg-bg-primary border-b border-border-card py-24 flex justify-center px-4 md:px-8 relative overflow-hidden">
      {/* Background ambient glow for console */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl flex flex-col relative z-10">
        
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mono-font">
              [Developer Console]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mt-1">
              Interactive Console
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md md:text-right font-sans">
            A terminal simulator to query skills, credentials, and open-source contributions directly.
          </p>
        </div>

        {/* Warp/VSCode Immersive Terminal Container */}
        <div 
          onClick={focusInput}
          className="w-full bg-bg-card border border-neutral-850 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-text transition-all duration-300 hover:border-purple-500/25 flex flex-col"
        >
          {/* VSCode/Warp Navigation Bar tabs */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-bg-darker/80 border-b border-neutral-850/60 select-none">
            <div className="flex items-center gap-6">
              {/* Mac-like Window Controls */}
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              
              {/* Active Tab */}
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-bg-darker border-t-2 border-purple-500 text-[10px] text-neutral-300 font-mono">
                <span className="text-purple-400 font-bold">🐚</span>
                <span>bash: kr_sanjeev</span>
              </div>

              {/* Inactive Tab */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 text-[10px] text-neutral-500 font-mono hover:text-neutral-400 cursor-pointer">
                <span>⚙️</span>
                <span>session.sh</span>
              </div>
            </div>

            {/* Terminal Utilization Stats */}
            <div className="text-[9px] text-neutral-600 font-mono flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>SESSION ACTIVE</span>
              </span>
            </div>
          </div>

          {/* Console Output Screen with premium thin scrollbar */}
          <div 
            ref={scrollContainerRef}
            className="p-5 h-[340px] overflow-y-auto font-mono text-[12px] leading-relaxed select-text bg-bg-darker/30 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-800 hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-width:thin] [scrollbar-color:#262626_transparent]"
          >
            <AnimatePresence initial={false}>
              {history.map((line, idx) => (
                <div 
                  key={idx} 
                  className="mb-2"
                >
                  {line.type === "input" ? (
                    <motion.div 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start mt-4 mb-2"
                    >
                      <span className="text-purple-400 select-none mr-2 font-bold">
                        kr_sanjeev:~$
                      </span>
                      <span className="text-white font-medium">{line.text}</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className={line.isRaw ? "whitespace-pre text-neutral-300 leading-normal font-mono text-xs" : "whitespace-pre-wrap text-neutral-300 pl-4 border-l border-purple-500/20 text-xs"}
                    >
                      {line.text}
                    </motion.div>
                  )}
                </div>
              ))}
            </AnimatePresence>
          </div>

          {/* Quick Query Dashboard Row */}
          <div className="px-5 py-3 border-t border-neutral-850/50 bg-bg-darker/60 backdrop-blur-md flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] text-neutral-600 uppercase font-bold tracking-wider mr-2 select-none mono-font">
              [Quick commands] &gt;
            </span>
            {commandList.map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className="px-2 py-0.5 text-[10px] font-mono text-neutral-500 border border-neutral-850/60 rounded bg-bg-darker hover:bg-bg-card-hover hover:border-purple-500/20 hover:text-white transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input Prompt Row with Custom Blinking Cursor */}
          <div className="flex items-center px-5 py-3 border-t border-neutral-850/50 bg-bg-darker/80 font-mono text-[12px] relative">
            <span className="text-purple-400 font-bold select-none mr-2">kr_sanjeev:~$</span>
            <div className="flex-1 relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type command..."
                className="w-full bg-transparent text-white focus:outline-none border-none outline-none caret-purple-400 placeholder-neutral-800"
              />
              
              {/* Tab Completion Suggestion */}
              {suggestions.length > 0 && (
                <span className="absolute left-0 pointer-events-none text-neutral-700 select-none">
                  {input}
                  <span className="text-neutral-500">{suggestions[0].substring(input.length)} (Tab to complete)</span>
                </span>
              )}
            </div>
            
            <span className="text-[10px] text-neutral-600 select-none hidden md:block">
              ↑↓ history • tab auto-fill
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TerminalConsole;
