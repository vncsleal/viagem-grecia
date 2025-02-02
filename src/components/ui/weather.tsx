import { Cloud, CloudRain, CloudSun, Sun, Droplets } from 'lucide-react';
import type { Weather } from '@/types/itinerary';

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  'partly-cloudy': CloudSun,
  rainy: CloudRain,
} as const;

const weatherLabels = {
  sunny: 'Ensolarado',
  cloudy: 'Nublado',
  'partly-cloudy': 'Parcialmente nublado',
  rainy: 'Chuvoso',
} as const;

export function WeatherInfo({ high, low, condition, precipitation }: Weather) {
  const Icon = weatherIcons[condition];
  const label = weatherLabels[condition];

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-white/80" />
        <p className="text-[10px] uppercase tracking-wide text-white/70 font-medium">
          {label}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm font-medium text-white">
          <span>{low}°</span>
          <span className="mx-1 text-white/40">—</span>
          <span className="text-white/90">{high}°</span>
        </div>
        {precipitation > 0 && (
          <div className="flex items-center gap-1 text-blue-300/80">
            <Droplets className="w-3 h-3" />
            <span className="text-xs">{precipitation}%</span>
          </div>
        )}
      </div>
    </div>
  );
}