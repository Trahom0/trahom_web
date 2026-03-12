interface TextCardProps {
  title: string;
  description: string;
  color: string;
}

export function TextCard({ title, description, color }: TextCardProps) {
  return (
    <div className={`${color} p-8 rounded-2xl h-full flex flex-col justify-center`}>
      <div className="space-y-3">
        <h3 className="text-xl">{title}</h3>
        <p className="opacity-80 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
