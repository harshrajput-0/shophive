export default function HexLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="text-primary shrink-0">
      <polygon
        points="50,4 92,27 92,73 50,96 8,73 8,27"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
      />
      <polygon points="50,24 76,38 76,62 50,76 24,62 24,38" fill="currentColor" opacity=".9" />
    </svg>
  );
}
