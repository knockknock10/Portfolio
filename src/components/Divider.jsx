export default function Divider({ className = '' }) {
  return <div aria-hidden="true" className={`h-px w-full bg-line ${className}`} />
}
