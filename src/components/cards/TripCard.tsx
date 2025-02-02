import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Clock, Calendar, Ship, Link, ArrowRight } from 'lucide-react';
import type { TravelSegment } from '@/types/itinerary';
import { Badge } from '@/components/ui/badge';
import { calculateRealDuration } from '@/utils/time';
import { Map } from '@/components/ui/map';
import { Button } from '@/components/ui/button';

export function TripCard({ 
  departure, 
  arrival, 
  departureTime, 
  arrivalTime, 
  transport,
  price,
  mapEmbed, 
  flightUrl}: TravelSegment) {
  const [departureDate, departureHour] = departureTime.split(' ');
  const [, arrivalHour] = arrivalTime.split(' ');
  const isPlane = transport === 'plane';
  const TransportIcon = isPlane ? Plane : Ship;
  
  const getDuration = () => {
    if (!isPlane) {
      const [depHours, depMinutes] = departureHour.split(':').map(Number);
      const [arrHours, arrMinutes] = arrivalHour.split(':').map(Number);
      let hours = arrHours - depHours;
      let minutes = arrMinutes - depMinutes;
      if (minutes < 0) {
        hours--;
        minutes += 60;
      }
      return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
    }
    const { hours, minutes } = calculateRealDuration(departure, arrival, departureTime, arrivalTime);
    return `${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
  };

  return (
    <Card className="w-full bg-card">
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isPlane ? 'bg-blue-100' : 'bg-cyan-100'}`}>
              <TransportIcon className={`w-5 h-5 ${isPlane ? 'text-blue-600' : 'text-cyan-600'}`} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-lg font-semibold">
                {departure} <ArrowRight className="w-4 h-4 text-muted-foreground" /> {arrival}
              </div>
              <Badge 
                variant={isPlane ? "default" : "secondary"}
                className="rounded-full"
              >
                {isPlane ? "Voo" : "Balsa"}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className="bg-muted/50 rounded-lg"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {departureDate}
            </Badge>
            <Badge 
              variant="outline"
              className="bg-muted/50 rounded-lg"
            >
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              {getDuration()}
            </Badge>
            {price && (
              <Badge 
                variant="outline"
                className="bg-muted/50 rounded-lg"
              >
                R$ {price.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="bg-muted hover:bg-muted/80 transition-colors">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="p-2 bg-background rounded-full">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Horário de Partida
                </p>
                <p className="text-sm font-medium">{departureHour}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted hover:bg-muted/80 transition-colors">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="p-2 bg-background rounded-full">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  Horário de Chegada
                </p>
                <p className="text-sm font-medium">{arrivalHour}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {mapEmbed && (
            <div className="rounded-lg overflow-hidden border">
              <Map src={mapEmbed} title={`${arrival} Airport`} />
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            {flightUrl && (
              <Button 
                asChild 
                variant="default" 
                size="lg"
                className="flex-1"
              >
                <a
                  href={flightUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Link className="w-4 h-4" />
                  Ver detalhes do {isPlane ? "voo" : "trajeto"}
                </a>
              </Button>
            )}
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TripCard;