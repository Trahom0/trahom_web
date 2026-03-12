import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

interface StoryCardProps {
  image: string;
  title: string;
  description: string;
  name?: string;
  role?: string;
}

export function StoryCard({ image, title, description, name, role }: StoryCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
        {name && (
          <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
            <div>
              <p className="opacity-60 text-sm">{name}</p>
              <p className="opacity-40 text-xs">{role}</p>
            </div>
            <ArrowRight className="w-5 h-5 opacity-40" />
          </div>
        )}
      </div>
    </div>
  );
}
