interface SealProps {
  size?: number;
  className?: string;
}

/**
 * Sceau doré "D8" — élément signature de l'identité Dynasty 8, évoquant
 * un sceau de notaire / acte de propriété, cohérent avec l'univers
 * immobilier de prestige du site.
 */
export default function Seal({ size = 40, className = '' }: SealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Dynasty 8"
    >
      <circle cx="32" cy="32" r="30" fill="none" stroke="#C9A24B" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="#C9A24B" strokeWidth="0.75" opacity="0.6" />
      <text
        x="32"
        y="39"
        textAnchor="middle"
        fontFamily="'Playfair Display', serif"
        fontWeight="700"
        fontSize="22"
        fill="#E8C878"
      >
        D8
      </text>
      <path
        d="M 32 10 L 34 16 L 32 14 L 30 16 Z"
        fill="#C9A24B"
      />
    </svg>
  );
}
