"use client";

import { useEffect, useState } from "react";

export type SpringName = "gentle" | "snappy" | "heavy";

export type SpringConfig = {
  type: "spring";
  stiffness: number;
  damping: number;
  mass: number;
};

export function readSpringToken(name: SpringName): SpringConfig | null {
  if (typeof window === "undefined") return null;

  const styles = window.getComputedStyle(document.documentElement);
  const stiffness = Number.parseFloat(styles.getPropertyValue("--spring-" + name + "-stiffness"));
  const damping = Number.parseFloat(styles.getPropertyValue("--spring-" + name + "-damping"));
  const mass = Number.parseFloat(styles.getPropertyValue("--spring-" + name + "-mass"));

  if (![stiffness, damping, mass].every(Number.isFinite)) return null;

  return { type: "spring", stiffness, damping, mass };
}

export function readMotionNumber(tokenName: string): number {
  if (typeof window === "undefined") return 0;

  const raw = window.getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return 0;
  if (raw.endsWith("rem")) {
    const rootSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    return value * (Number.isFinite(rootSize) ? rootSize : 0);
  }
  return value;
}

export function readDurationToken(tokenName: string): number {
  if (typeof window === "undefined") return 0;

  const raw = window.getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return 0;
  return raw.endsWith("ms") ? value / 1000 : value;
}

export function useSpringToken(name: SpringName): SpringConfig | null {
  const [config, setConfig] = useState<SpringConfig | null>(null);

  useEffect(() => {
    setConfig(readSpringToken(name));
  }, [name]);

  return config;
}