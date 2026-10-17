"use client";

import { useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import styles from "./ResearchShowcase.module.css";

const repositoryUrl = "https://github.com/knockknock10/SemBind_Audio";
const evidenceUrl = "https://github.com/knockknock10/SemBind_Audio/tree/main/PAPER_EVIDENCE_PACKAGE";
const paperUrlFallback = "/papers/SemBind.pdf";

const resultRows = [
  { method: "Joint (Semantic + Spectral)", success: "100%", snr: "75.37", featured: true },
  { method: "Semantic-only", success: "100%", snr: "73.30" },
  { method: "Spectral-only", success: "100%", snr: "77.16" },
  { method: "Random", success: "99.96%", snr: "74.25" },
];

const stages = [
  { title: "Audio Input", detail: "16 kHz speech", kind: "wave" },
  { title: "Spectrogram", detail: "STFT · 513 bins", kind: "spectrogram" },
  { title: "Transformer-Based Semantic Representation", detail: "HuBERT contribution map", kind: "models" },
  { title: "Contribution map", detail: "Frame-level saliency", kind: "saliency" },
  { title: "Adaptive placement", detail: "Five rules compared", kind: "placement" },
  { title: "SHA-256 binding", detail: "256-bit · 3 replicas", kind: "lock" },
];

function isAvailable(value) {
  return typeof value === "string" && value.trim() !== "" && !/^MISSING(?:\s|$|—)/i.test(value);
}

function Waveform() {
  const heights = [9, 16, 7, 21, 30, 12, 18, 35, 15, 10, 25, 39, 17, 8, 20, 30, 12, 24, 15, 7, 18, 28, 10, 5];
  return (
    <svg className={styles.waveform} viewBox="0 0 144 48" role="img" aria-label="Illustrative audio waveform">
      {heights.map((height, index) => (
        <rect key={index} x={index * 5.7 + 3} y={(48 - height) / 2} width="2.4" height={height} rx="1.2" />
      ))}
    </svg>
  );
}

function Spectrogram() {
  return (
    <div className={styles.spectrogram} aria-label="Stylized STFT spectrogram">
      {Array.from({ length: 72 }, (_, index) => {
        const value = ((index * 17 + Math.floor(index / 9) * 11) % 29) / 28;
        return <i key={index} style={{ backgroundColor: `hsl(${254 - value * 220} 91% ${22 + value * 45}%)`, opacity: 0.43 + value * 0.57 }} />;
      })}
    </div>
  );
}

function SaliencyMap() {
  return (
    <div className={styles.saliencyMap} aria-label="Semantic contribution heat map">
      {Array.from({ length: 54 }, (_, index) => {
        const value = ((index * 13 + Math.floor(index / 6) * 7) % 31) / 30;
        return <i key={index} style={{ backgroundColor: `hsl(${220 - value * 200} 91% ${24 + value * 42}%)`, opacity: 0.4 + value * 0.6 }} />;
      })}
    </div>
  );
}

function PlacementGrid() {
  return (
    <div className={styles.placementGrid} aria-label="Selected time-frequency embedding coordinates">
      {Array.from({ length: 36 }, (_, index) => (
        <i key={index} className={[3, 4, 9, 10, 15, 16, 21, 22, 27, 28, 33].includes(index) ? styles.placementSelected : ""} />
      ))}
    </div>
  );
}

function LockGlyph() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M15 21v-6a9 9 0 0 1 18 0v6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="10" y="21" width="28" height="22" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M24 29v6m-3-3h6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function PipelineVisual() {
  return (
    <div className={styles.pipeline} aria-label="SemBind methodology from audio input through spectrogram, transformer features, contribution map and adaptive placement to SHA-256 binding">
      {stages.map((stage, index) => (
        <div className={`${styles.pipelineUnit} ${styles["pipelineUnit" + index]}`} key={stage.kind}>
          <div className={styles.pipelineVisual}>
            {stage.kind === "wave" && <Waveform />}
            {stage.kind === "spectrogram" && <Spectrogram />}
            {stage.kind === "models" && (
              <div className={styles.modelStack}>
                <strong>HuBERT</strong><strong>AST</strong><strong>wav2vec 2.0</strong><strong>BEATs</strong><strong>AudioMAE</strong><strong>CLAP</strong>
              </div>
            )}
            {stage.kind === "saliency" && <SaliencyMap />}
            {stage.kind === "placement" && <PlacementGrid />}
            {stage.kind === "lock" && <div className={styles.lockBox}><LockGlyph /></div>}
          </div>
          <strong className={styles.pipelineTitle}>{stage.title}</strong>
          <span className={styles.pipelineDetail}>{stage.detail}</span>
        </div>
      ))}
      {stages.slice(0, -1).map((stage, index) => (
        <span className={`${styles.flowArrow} ${styles["flowArrow" + index]}`} aria-hidden="true" key={stage.kind + "-arrow"}>→</span>
      ))}
    </div>
  );
}

function StatIcon({ kind }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "database") return <svg viewBox="0 0 32 32" {...shared}><ellipse cx="16" cy="7" rx="10" ry="4" /><path d="M6 7v18c0 2.2 4.5 4 10 4s10-1.8 10-4V7M6 13c0 2.2 4.5 4 10 4s10-1.8 10-4M6 19c0 2.2 4.5 4 10 4s10-1.8 10-4" /></svg>;
  if (kind === "people") return <svg viewBox="0 0 32 32" {...shared}><circle cx="12" cy="10" r="4" /><circle cx="23" cy="12" r="3" /><path d="M3 27c0-5 4-8 9-8s9 3 9 8M21 20c4 0 7 2.5 8 6" /></svg>;
  if (kind === "clock") return <svg viewBox="0 0 32 32" {...shared}><circle cx="16" cy="16" r="12" /><path d="M16 8v8l6 4" /></svg>;
  if (kind === "rules") return <svg viewBox="0 0 32 32" {...shared}><rect x="5" y="5" width="22" height="22" rx="5" /><path d="m10 12 3 3 6-6M10 21h12" /></svg>;
  return <svg viewBox="0 0 32 32" {...shared}><path d="M2 17h5l4-10 6 19 4-14 3 5h6" /><path d="M2 25h28" opacity=".35" /></svg>;
}

function StatsStrip() {
  const stats = [
    { kind: "database", value: "2,620", label: "Audio samples", sub: "LibriSpeech test-clean" },
    { kind: "people", value: "40", label: "Speakers", sub: "test-clean split" },
    { kind: "clock", value: "5.40 hrs", label: "Total audio", sub: "16 kHz speech" },
    { kind: "rules", value: "100%", label: "Payload success", sub: "mean · 3 replicas per bit" },
    { kind: "signal", value: "75.37 dB", label: "Mean SNR", sub: "joint method · E1" },
  ];
  return (
    <div className={styles.statsStrip} aria-label="Study scale">
      {stats.map((stat) => (
        <div className={styles.stat} key={stat.kind}>
          <span className={styles.statIcon}><StatIcon kind={stat.kind} /></span>
          <span className={styles.statCopy}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
            <small>{stat.sub}</small>
          </span>
        </div>
      ))}
    </div>
  );
}

function ResultsCard() {
  return (
    <article className={styles.panel + " " + styles.resultsPanel}>
      <header className={styles.panelHeader}>
        <span className={styles.panelIcon} aria-hidden="true">
          <svg viewBox="0 0 28 28"><path d="M4 23V13h5v10zm8 0V5h5v18zm8 0V9h5v14z" fill="currentColor" /></svg>
        </span>
        <h3>Results &amp; Comparison</h3>
        <span className={styles.panelNumber}>02</span>
      </header>
      <div className={styles.tableWrap}>
        <table className={styles.resultsTable}>
          <thead><tr><th>Method</th><th>Payload success ↑</th><th>Mean SNR (dB) ↑</th></tr></thead>
          <tbody>
            {resultRows.map((row) => (
              <tr className={row.featured ? styles.resultFeatured : ""} key={row.method}>
                <th scope="row">{row.method}</th><td>{row.success}</td><td>{row.snr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.tableNote}>Clean-reference E1 benchmark · n = 2,620. Random placement records one payload failure (99.96% success); joint roundtrip accuracy is 100% with three replicas per bit.</p>
    </article>
  );
}

function ResourceIcon({ kind }) {
  if (kind === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.03c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
  if (kind === "pdf") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6zM14 3v5h4M8.5 13h7M8.5 16h7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" /></svg>;
  if (kind === "folder") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h7l2 2h9v11H3z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8 22h8M12 19v3M7 9h3v3H7zm7 0h3m-3 3h3M7 15h10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function PaperCard({ item }) {
  const [previewFailed, setPreviewFailed] = useState(false);
  const pdf = isAvailable(item?.pdf) ? item.pdf : paperUrlFallback;
  const resources = [
    { label: "Full Paper (PDF)", href: pdf, kind: "pdf" },
    { label: "Supplementary Material", href: evidenceUrl, kind: "folder" },
    { label: "Implementation Code", href: repositoryUrl, kind: "github" },
    { label: "Figures & Evidence", href: evidenceUrl + "/04_FIGURES", kind: "slides" },
  ];
  return (
    <article className={styles.panel + " " + styles.paperPanel}>
      <header className={styles.panelHeader}>
        <span className={styles.panelIcon} aria-hidden="true"><ResourceIcon kind="pdf" /></span>
        <h3>Paper &amp; Resources</h3>
        <span className={styles.panelNumber}>03</span>
      </header>
      <div className={styles.paperContent}>
        <div className={styles.paperPreview}>
          {!previewFailed ? (
            <iframe
              src={pdf + "#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH"}
              title="First page of the SemBind research manuscript"
              loading="lazy"
              onError={() => setPreviewFailed(true)}
            />
          ) : (
            <img src="/images/research/sembind-paper-fig1.svg" alt="Actual SemBind architecture figure from the manuscript" />
          )}
          <span className={styles.paperPreviewLabel}>MANUSCRIPT · 2026</span>
        </div>
        <div className={styles.paperInfo}>
          <h4>SemBind-Audio</h4>
          <p>IEEE Signal Processing Letters · Submitted manuscript</p>
          <div className={styles.resourceList}>
            {resources.map((resource) => (
              <a key={resource.label} href={resource.href} target="_blank" rel="noreferrer" className={styles.resourceLink}>
                <span className={styles.resourceIcon}><ResourceIcon kind={resource.kind} /></span>
                <span>{resource.label}</span>
                <span className={styles.resourceArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

const contributions = [
  { title: "Inspectable self-supervised placement", detail: "HuBERT leave-one-out contribution map from one forward pass." },
  { title: "Controlled placement study", detail: "Five location-selection rules compared across six target SNRs." },
  { title: "Cryptographic payload binding", detail: "256-bit SHA-256 payload with three replicas per bit." },
  { title: "Evidence-led conclusion", detail: "Spectral suitability remains the stronger operational signal in current tests." },
];

function ContributionsCard() {
  return (
    <article className={styles.panel + " " + styles.contributionsPanel}>
      <header className={styles.panelHeader}>
        <span className={styles.panelIcon} aria-hidden="true"><svg viewBox="0 0 28 28"><path d="M14 3a7 7 0 0 0-4 12.7c.8.6 1.2 1.4 1.2 2.3h5.6c0-.9.4-1.7 1.2-2.3A7 7 0 0 0 14 3ZM11 21h6m-5 3h4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        <h3>Key Contributions</h3>
        <span className={styles.panelNumber}>04</span>
      </header>
      <ol className={styles.contributionList}>
        {contributions.map((item, index) => (
          <li key={item.title}>
            <span className={styles.contributionNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.contributionCopy}><strong>{item.title}</strong><small>{item.detail}</small></span>
          </li>
        ))}
      </ol>
    </article>
  );
}

function ResearchAdditional({ items }) {
  if (!items.length) return null;
  return (
    <section className={styles.additional} aria-label="Additional research">
      <div className={styles.additionalHeading}><span>ALSO EXPLORING</span><h2>Other research experience</h2></div>
      <div className={styles.additionalList}>
        {items.map((item) => (
          <article className={styles.additionalItem} key={item.title}>
            <div><h3>{item.title}</h3><p>{isAvailable(item.abstract) ? item.abstract : "Research experience and supporting technical work."}</p>{Array.isArray(item.tags) && <span>{item.tags.join(" · ")}</span>}</div>
            {isAvailable(item.image) && <img src={item.image} alt="" loading="lazy" />}
            {isAvailable(item.link) && <a href={item.link} target="_blank" rel="noreferrer">Explore ↗</a>}
          </article>
        ))}
      </div>
    </section>
  );
}

/** @param {{ items?: object[], standalone?: boolean }} props */
export default function ResearchShowcase({ items = [], standalone = false }) {
  const reducedMotion = Boolean(useReducedMotion());
  const [pipelineOpen, setPipelineOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const featured = items.find((item) => item.title?.toLowerCase().includes("sembind")) || items[0];
  const additional = items.filter((item) => item !== featured);
  const repo = isAvailable(featured?.link) ? featured.link : repositoryUrl;
  const paper = isAvailable(featured?.pdf) ? featured.pdf : paperUrlFallback;
  if (!featured) return null;

  return (
    <>
      <section className={styles.stage} aria-labelledby="research-showcase-title" data-standalone={standalone ? "true" : "false"}>
        <div className={styles.scene} aria-hidden="true" />
        <div className={styles.sceneWash} aria-hidden="true" />
        <div className={styles.stageContent}>
          <motion.div
            className={styles.intro}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.eyebrow}><span className={styles.sectionNumber}>03</span><span className={styles.eyebrowDot}>·</span><span>RESEARCH</span><i /></div>
            <h2 id="research-showcase-title">SemBind-<span>Audio</span></h2>
            <span className={styles.signature} aria-hidden="true">Research</span>
            <p className={styles.subtitle}>Semantic-Aware Zero-Trust Audio Watermarking Framework via Transformer-Based Representation and Cryptographic Binding</p>
            <p className={styles.summary}>A reference-based speech-watermarking study that makes embedding-location selection explicit, comparing semantic contribution and spectral suitability across the full LibriSpeech test-clean corpus.</p>
            <p className={styles.authors}>RESEARCH BY <strong>Sanjeev Kumar</strong><span>·</span><strong>Biswajit Maity</strong></p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href={paper} target="_blank" rel="noreferrer">Read Paper <span aria-hidden="true">→</span></a>
              <a className={styles.secondaryAction} href={repo} target="_blank" rel="noreferrer"><ResourceIcon kind="github" /> View Code <span aria-hidden="true">↗</span></a>
            </div>
          </motion.div>

          <motion.section
            className={styles.methodPanel}
            aria-labelledby="methodology-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className={styles.methodHeader}>
              <span className={styles.methodIcon} aria-hidden="true"><svg viewBox="0 0 28 28"><path d="m14 3 11 6-11 6L3 9zm-11 11 11 6 11-6M3 19l11 6 11-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg></span>
              <h3 id="methodology-heading">Methodology Overview</h3>
              <span className={styles.methodNumber}>01</span>
            </header>
            <PipelineVisual />
            <button className={styles.pipelineToggle} type="button" aria-expanded={pipelineOpen} aria-controls="research-pipeline-details" onClick={() => setPipelineOpen((open) => !open)}>
              {pipelineOpen ? "Hide methodology details" : "Explore methodology"}<span aria-hidden="true">{pipelineOpen ? "−" : "+"}</span>
            </button>
            {pipelineOpen && (
              <div className={styles.pipelineDetails} id="research-pipeline-details">
                <div className={styles.pipelineTabs} role="tablist" aria-label="Methodology stages">
                  {["Represent", "Select", "Embed", "Verify"].map((label, index) => (
                    <button key={label} type="button" role="tab" aria-selected={activeStage === index} className={activeStage === index ? styles.pipelineTabActive : ""} onClick={() => setActiveStage(index)}>{String(index + 1).padStart(2, "0")} <strong>{label}</strong></button>
                  ))}
                </div>
                <p role="tabpanel">{[
                  "Compute a frozen HuBERT frame-contribution map and a reference STFT representation.",
                  "Compare joint, spectral-only, low-contribution, high-contribution and random coordinate selection.",
                  "Embed a 256-bit SHA-256-bound payload with three replicas per bit at the selected coordinates.",
                  "Recover payload bits against the clean reference. The paper evaluates reference-based verification, not blind extraction or post-processing robustness.",
                ][activeStage]}</p>
              </div>
            )}
          </motion.section>

          <div className={styles.statsPosition}><StatsStrip /></div>

          <div className={styles.bottomGrid}>
            <ResultsCard />
            <PaperCard item={featured} />
            <ContributionsCard />
          </div>
        </div>
      </section>
      <ResearchAdditional items={additional} />
    </>
  );
}
