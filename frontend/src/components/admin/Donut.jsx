import React from 'react'

const Donut = ({data}) => {
  const r = 48;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const slices = data.map((d) => {
    const slice = { ...d, offset, dash: (d.pct / 100) * circumference };
    offset += slice.dash;
    return slice;
  });

  return (
    <svg width={120} height={120} viewBox="0 0 120 120">
      {slices.map((s) => (
        <circle
          key={s.label}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={18}
          strokeDasharray={`${s.dash} ${circumference - s.dash}`}
          strokeDashoffset={-s.offset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ))}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#0F172A">
        100%
      </text>
    </svg>
  );
}

export default Donut