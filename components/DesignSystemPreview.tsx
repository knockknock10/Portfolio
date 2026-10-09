"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Glass, LiquidBackdrop, MagneticButton, Noise, Reveal, Squircle } from "@/components/primitives";

const colorTokens = [
  { label: "Base near-black", token: "--color-ink" },
  { label: "Off-white", token: "--color-paper" },
  { label: "Neutral 800", token: "--color-neutral-800" },
  { label: "Neutral 500", token: "--color-neutral-500" },
  { label: "Neutral 300", token: "--color-neutral-300" },
  { label: "Accent", token: "--color-accent" },
  { label: "Glass light", token: "--color-glass-light" },
  { label: "Glass dark", token: "--color-glass-dark" },
  { label: "Glass accent", token: "--color-glass-accent" },
  { label: "Top edge", token: "--color-edge-top" },
  { label: "Bottom edge", token: "--color-edge-bottom" },
  { label: "Inner highlight", token: "--color-inner-highlight" },
  { label: "Shadow", token: "--color-shadow" },
  { label: "Soft shadow", token: "--color-shadow-soft" },
];

const typeSteps = ["12", "14", "16", "18", "20", "24", "32", "44", "64", "88", "120"];
const spacingSteps = [
  { name: "--spacing-1" },
  { name: "--spacing-2" },
  { name: "--spacing-3" },
  { name: "--spacing-4" },
  { name: "--spacing-6" },
  { name: "--spacing-8" },
  { name: "--spacing-12" },
  { name: "--spacing-16" },
  { name: "--spacing-24" },
  { name: "--spacing-32" },
];
const radiusTokens = [
  { label: "Small", token: "--radius-sm" },
  { label: "Medium", token: "--radius-md" },
  { label: "Large", token: "--radius-lg" },
  { label: "Extra large", token: "--radius-xl" },
  { label: "Squircle", token: "--radius-squircle" },
];
const springNames = ["gentle", "snappy", "heavy"] as const;
const durations = [
  { label: "Fast", token: "--duration-fast" },
  { label: "Base", token: "--duration-base" },
  { label: "Slow", token: "--duration-slow" },
];
const elevationTokens = [
  { label: "Elevation 1", blur: "--elevation-1-blur", shadow: "--elevation-1-shadow" },
  { label: "Elevation 2", blur: "--elevation-2-blur", shadow: "--elevation-2-shadow" },
  { label: "Elevation 3", blur: "--elevation-3-blur", shadow: "--elevation-3-shadow" },
];
const glassVariants = [
  { tint: "light" as const, elevation: 1 as const },
  { tint: "dark" as const, elevation: 2 as const },
  { tint: "accent" as const, elevation: 3 as const },
  { tint: "light" as const, elevation: 2 as const },
  { tint: "dark" as const, elevation: 3 as const },
  { tint: "accent" as const, elevation: 1 as const },
];

function TokenValue({ token }: { token: string }) {
  const [value, setValue] = useState(token);

  useEffect(() => {
    const next = window.getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    if (next) setValue(next);
  }, [token]);

  return <code className="ds-token-value">{value}</code>;
}

export function DesignSystemPreview() {
  const [blurValues, setBlurValues] = useState<number[]>([]);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const styles = window.getComputedStyle(document.documentElement);
    const values = elevationTokens.map((entry) => Number.parseFloat(styles.getPropertyValue(entry.blur)));
    setBlurValues(values.filter((value) => Number.isFinite(value)));
  }, []);

  return (
    <main className="ds-page">
      <Noise />
      <div className="ds-content">
        <header className="ds-header">
          <p className="ds-eyebrow">Phase 2 / Foundation</p>
          <h1 className="ds-title">Design system</h1>
          <div className="ds-inline-controls">
            <span className="ds-pill">Dark by default</span>
            <span className="ds-pill">Token led</span>
            <span className="ds-pill">Reduced motion ready</span>
          </div>
        </header>

        <section className="ds-section" aria-labelledby="color-tokens">
          <h2 className="ds-section-title" id="color-tokens">Color tokens</h2>
          <div className="ds-color-grid">
            {colorTokens.map((entry) => (
              <article className="ds-token-card" key={entry.token}>
                <div className="ds-color-chip" style={{ backgroundColor: "var(" + entry.token + ")" }} />
                <p className="ds-token-name">{entry.label}</p>
                <TokenValue token={entry.token} />
              </article>
            ))}
          </div>
        </section>

        <section className="ds-section" aria-labelledby="type-tokens">
          <h2 className="ds-section-title" id="type-tokens">Type scale</h2>
          <div className="ds-type-list">
            {typeSteps.map((step) => (
              <div className="ds-type-row" key={step}>
                <span className="ds-label">{step}</span>
                <p
                  className="ds-type-specimen"
                  style={{
                    fontSize: "var(--text-" + step + ")",
                    lineHeight: "var(--text-" + step + "--line-height)",
                    letterSpacing: step === "44" || step === "64" || step === "88" || step === "120"
                      ? "var(--text-" + step + "--letter-spacing)"
                      : "normal",
                  }}
                >
                  Aa 0123
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="ds-section" aria-labelledby="spacing-tokens">
          <h2 className="ds-section-title" id="spacing-tokens">Spacing scale</h2>
          <div className="ds-spacing-list">
            {spacingSteps.map((entry) => (
              <div className="ds-spacing-row" key={entry.name}>
                <div>
                  <p className="ds-token-name">{entry.name}</p>
                  <TokenValue token={entry.name} />
                </div>
                <div className="ds-spacing-bar" style={{ width: "var(" + entry.name + ")" }} />
              </div>
            ))}
          </div>
        </section>

        <section className="ds-section" aria-labelledby="radius-tokens">
          <h2 className="ds-section-title" id="radius-tokens">Corner language</h2>
          <div className="ds-radius-grid">
            {radiusTokens.map((entry) => (
              <article className="ds-token-card" key={entry.token}>
                <Squircle
                  radius={"var(" + entry.token + ")"}
                  className="ds-demo-squircle"
                  aria-label={entry.label}
                >
                  <span className="ds-label">{entry.label}</span>
                </Squircle>
                <p className="ds-token-name">{entry.token}</p>
                <TokenValue token={entry.token} />
              </article>
            ))}
          </div>
        </section>

        <section className="ds-section" aria-labelledby="motion-tokens">
          <h2 className="ds-section-title" id="motion-tokens">Motion tokens</h2>
          <div className="ds-motion-grid">
            {springNames.map((name) => (
              <article className="ds-token-card" key={name}>
                <p className="ds-token-name">{name}</p>
                <TokenValue token={"--spring-" + name + "-stiffness"} />
                <TokenValue token={"--spring-" + name + "-damping"} />
                <TokenValue token={"--spring-" + name + "-mass"} />
              </article>
            ))}
          </div>
          <div className="ds-motion-grid">
            {durations.map((entry) => (
              <article className="ds-token-card" key={entry.token}>
                <p className="ds-token-name">{entry.label}</p>
                <TokenValue token={entry.token} />
              </article>
            ))}
          </div>
          <div className="ds-motion-grid">
            <article className="ds-token-card">
              <p className="ds-token-name">Overshoot curve</p>
              <TokenValue token="--ease-overshoot" />
            </article>
            <article className="ds-token-card">
              <p className="ds-token-name">Liquid loop</p>
              <TokenValue token="--duration-liquid-loop" />
            </article>
          </div>
        </section>

        <section className="ds-section" aria-labelledby="elevation-tokens">
          <h2 className="ds-section-title" id="elevation-tokens">Elevation</h2>
          <div className="ds-elevation-grid">
            {elevationTokens.map((entry, index) => (
              <article
                className="ds-token-card"
                key={entry.label}
                style={{
                  boxShadow: "var(" + entry.shadow + ")",
                  background: "var(--color-neutral-800)",
                }}
              >
                <p className="ds-token-name">{entry.label}</p>
                <TokenValue token={entry.blur} />
                <TokenValue token={entry.shadow} />
                <span className="ds-label">Level {index + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="ds-section" aria-labelledby="glass-primitives">
          <h2 className="ds-section-title" id="glass-primitives">Glass surfaces</h2>
          <div className="ds-glass-stage">
            <LiquidBackdrop />
            <div className="ds-glass-grid">
              {glassVariants.map((entry, index) => (
                <Glass
                  key={entry.tint + "-" + entry.elevation + "-" + index}
                  as="article"
                  tint={entry.tint}
                  elevation={entry.elevation}
                  className="ds-glass-card"
                >
                  <p className="ds-demo-label">{entry.tint} tint</p>
                  <p>Elevation {entry.elevation}</p>
                </Glass>
              ))}
            </div>
          </div>
          <div className="ds-motion-grid">
            {blurValues.map((blur, index) => (
              <Glass key={blur} blur={blur} elevation={(index + 1) as 1 | 2 | 3} className="ds-glass-card">
                <p className="ds-demo-label">Blur sample</p>
                <TokenValue token={elevationTokens[index].blur} />
              </Glass>
            ))}
          </div>
          <p className="ds-inline-note">At most three visible surfaces enable backdrop blur at once.</p>
        </section>

        <section className="ds-section" aria-labelledby="shape-primitives">
          <h2 className="ds-section-title" id="shape-primitives">Squircle surfaces</h2>
          <div className="ds-radius-grid">
            <Squircle as="figure" radius="var(--radius-lg)" className="ds-stage">
              <p className="ds-demo-label">Figure element</p>
              <p className="ds-inline-note">Large corner profile</p>
            </Squircle>
            <Squircle as="div" radius="var(--radius-squircle)" className="ds-stage">
              <p className="ds-demo-label">Block element</p>
              <p className="ds-inline-note">Squircle corner profile</p>
            </Squircle>
          </div>
        </section>

        <section className="ds-section" aria-labelledby="grain-primitives">
          <h2 className="ds-section-title" id="grain-primitives">Grain overlay</h2>
          <div className="ds-stage">
            <p className="ds-demo-label">Fixed, non-interactive SVG grain</p>
            <TokenValue token="--glass-noise-opacity" />
          </div>
        </section>

        <section className="ds-section" aria-labelledby="backdrop-primitives">
          <h2 className="ds-section-title" id="backdrop-primitives">Liquid backdrop</h2>
          <div className="ds-stage">
            <LiquidBackdrop />
            <p className="ds-demo-label">Low-contrast amber drift</p>
            <TokenValue token="--duration-liquid-loop" />
          </div>
        </section>

        <section className="ds-section" aria-labelledby="reveal-primitives">
          <h2 className="ds-section-title" id="reveal-primitives">Reveal variants</h2>
          <div className="ds-reveal-grid">
            {(["fade-up", "scale-in", "blur-in"] as const).map((variant) => (
              <Reveal key={variant} variant={variant}>
                <article className="ds-reveal-card">
                  <p className="ds-demo-label">{variant}</p>
                  <p className="ds-inline-note">Scroll out of view and back to inspect the entrance.</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="ds-section" aria-labelledby="button-primitives">
          <h2 className="ds-section-title" id="button-primitives">Magnetic button</h2>
          <div className="ds-stage">
            <div className="ds-inline-controls">
              <MagneticButton aria-pressed={pressed} onClick={() => setPressed((value) => !value)}>
                {pressed ? "Primary action selected" : "Primary action"}
              </MagneticButton>
              <button className="ds-pill" type="button" disabled>
                Disabled state
              </button>
            </div>
            <p className="ds-inline-note">Pointer attraction is enabled only for fine hover pointers.</p>
            <TokenValue token="--magnetic-max-offset" />
            <TokenValue token="--press-scale" />
          </div>
        </section>
      </div>
    </main>
  );
}