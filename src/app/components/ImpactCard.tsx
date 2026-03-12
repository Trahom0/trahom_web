interface ImpactCardProps {
  number: string;
  label: string;
  color: string;
}

export function ImpactCard({ number, label, color }: ImpactCardProps) {
  return (
    <div className={`${color} p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl flex flex-col justify-between h-full min-h-[140px] sm:min-h-[160px]`}>
      <div className="space-y-1 sm:space-y-2 min-w-0">
        <div className="text-3xl sm:text-4xl lg:text-[3.5rem] leading-tight tracking-tight font-bold break-words">{number}</div>
        <p className="text-sm sm:text-base opacity-80 leading-snug break-words">{label}</p>
      </div>
    </div>
  );
}
