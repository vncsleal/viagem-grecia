import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, CalendarDays } from 'lucide-react';
import type { Stay, Weather } from '@/types/itinerary';
import { WeatherInfo } from '@/components/ui/weather';

type CityCardProps = Pick<Stay, 'location' | 'duration' | 'cityImage' | 'weather'>;

export function CityCard({ location, duration, cityImage, weather }: CityCardProps) {
  const getDates = () => {
    const [start, end] = duration.split(' a ').map(date => {
      const [day, month] = date.split('/');
      const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
      return {
        formatted: `${day} de ${months[parseInt(month, 10) - 1]}.`,
        date: new Date(2025, parseInt(month, 10) - 1, parseInt(day, 10))
      };
    });

    const days = Math.ceil((end.date.getTime() - start.date.getTime()) / (1000 * 60 * 60 * 24));
    return {
      arrival: start.formatted,
      departure: end.formatted,
      days
    };
  };

  const getAverageWeather = (weatherData: Weather[] | undefined): Weather | null => {
    if (!weatherData?.length) return null;
    
    // Use the most frequent condition as the representative condition
    const conditions = weatherData.map(w => w.condition);
    const mostFrequentCondition = conditions.sort((a, b) =>
      conditions.filter(v => v === a).length - conditions.filter(v => v === b).length
    ).pop();

    const avg = weatherData.reduce((acc, day) => ({
      high: acc.high + day.high,
      low: acc.low + day.low,
      precipitation: acc.precipitation + (day.precipitation || 0),
    }), { high: 0, low: 0, precipitation: 0 });

    return {
      high: Math.round(avg.high / weatherData.length),
      low: Math.round(avg.low / weatherData.length),
      condition: mostFrequentCondition || 'sunny',
      precipitation: Math.round(avg.precipitation / weatherData.length),
    };
  };

  const averageWeather = getAverageWeather(weather);
  const { arrival, departure, days } = getDates();

  return (
    <Card className="w-full bg-card overflow-hidden">
      <div className="relative w-full aspect-[16/9]">
        <div className="relative h-full">
          <img
            src={cityImage}
            alt={`Cidade de ${location}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="px-3 py-1.5 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-xs font-medium">
                {days} {days === 1 ? 'dia' : 'dias'}
              </p>
            </div>
          </div>

          {averageWeather && (
            <div className="px-3 py-2 bg-background/95 backdrop-blur-sm rounded-lg border border-border/50">
              <WeatherInfo {...averageWeather} />
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-background/95 backdrop-blur-sm rounded-full border border-border/50">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white tracking-tight">{location}</h2>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <span className="font-medium">{arrival}</span>
                <span className="text-white/60">→</span>
                <span className="font-medium">{departure}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}