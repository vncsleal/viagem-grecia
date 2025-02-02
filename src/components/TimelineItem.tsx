import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Plane, Hotel, MapPin, Clock, BanknoteIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TravelItem {
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
}

interface LocationItem {
  location: string;
  hotel: string;
  duration: string;
  pricePerDay?: number;
  tours?: Array<{
    name: string;
    price: number;
    time: string;
  }>;
}

interface TimelineItemProps {
  item: TravelItem | LocationItem;
  index: number;
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  const isTravel = 'departure' in item;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-4 relative"
    >
      {/* Timeline line */}
      <div className="absolute left-6 top-0 w-0.5 h-full bg-muted" />
      
      {/* Timeline dot */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 
        ${isTravel ? 'bg-primary' : 'bg-secondary'}`}>
        {isTravel ? (
          <Plane className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MapPin className="w-6 h-6 text-secondary-foreground" />
        )}
      </div>

      {/* Content */}
      <Card className="flex-1 mb-8">
        {isTravel ? (
          <>
            <CardHeader>
              <h3 className="text-xl font-semibold">
                {item.departure} → {item.arrival}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground w-4 h-4" />
                  <span>Partida: {item.departureTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground w-4 h-4" />
                  <span>Chegada: {item.arrivalTime}</span>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="text-secondary" />
                {item.location}
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Hotel className="text-muted-foreground w-4 h-4" />
                  <span>{item.hotel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground w-4 h-4" />
                  <span>{item.duration}</span>
                </div>
                {item.pricePerDay && (
                  <div className="flex items-center gap-2">
                    <BanknoteIcon className="text-muted-foreground w-4 h-4" />
                    <span>R$ {item.pricePerDay}/pessoa/dia</span>
                  </div>
                )}
              </div>

              {item.tours && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-semibold">Passeios:</h4>
                    {item.tours.map((tour, i) => (
                      <div key={i} className="bg-muted p-3 rounded-md space-y-2">
                        <p className="font-medium">{tour.name}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            R$ {tour.price}/pessoa
                          </Badge>
                          <Badge variant="secondary">
                            {tour.time}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </>
        )}
      </Card>
    </motion.div>
  );
}
