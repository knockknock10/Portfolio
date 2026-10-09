"use client"

type LiquidBackdropProps = {
  className?: string;
};

export function LiquidBackdrop({ className }: LiquidBackdropProps) {
  return <div className={["liquid-backdrop", className].filter(Boolean).join(" ")} aria-hidden="true" />;
}