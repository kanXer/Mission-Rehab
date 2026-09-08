export default function JustdialIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#E65A00" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="#FFFFFF"
        letterSpacing="-0.5"
      >
        Jd
      </text>
    </svg>
  )
}
