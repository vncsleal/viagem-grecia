import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Plane, Clock } from 'lucide-react';
import type { TravelSegment } from '@/types/itinerary';

export function TravelCard({ departure, arrival, departureTime, arrivalTime }: TravelSegment) {
  return (
    <Card className="bg-primary/5">
      <CardHeader className="flex-row items-center gap-2 pb-2">
        <Plane className="w-5 h-5" />
        <h3 className="text-lg font-semibold">{departure} → {arrival}</h3>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>Partida: {departureTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>Chegada: {arrivalTime}</span>
        </div>
      </CardContent>
    </Card>
  );
}
