function dashColor(deg) {
  const p = Math.sin((deg / 360) * Math.PI);
  const gold = [249, 200, 70];
  const coral = [232, 107, 90];
  return `rgb(${Math.round(gold[0] + (coral[0] - gold[0]) * p)},${Math.round(gold[1] + (coral[1] - gold[1]) * p)},${Math.round(gold[2] + (coral[2] - gold[2]) * p)})`;
}

export default function LogoMark({ size = 40 }) {
  const N = 36;
  const cx = 50, cy = 50;
  const innerR = 27, outerR = 46;
  const dashW = 4.5, dashRx = 2.2;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-label="Indo Aquatic UK Ltd"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {Array.from({ length: N }, (_, i) => {
        const angle = (360 / N) * i;
        return (
          <rect
            key={i}
            x={cx - dashW / 2}
            y={cy - outerR}
            width={dashW}
            height={outerR - innerR}
            rx={dashRx}
            ry={dashRx}
            fill={dashColor(angle)}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
      <rect x={cx - 1.4} y={cy - 14} width={2.8} height={28} rx={1.4} fill="#F09050" />
    </svg>
  );
}
