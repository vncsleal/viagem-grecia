import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Clock, BanknoteIcon, Link, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Stay } from '@/types/itinerary';
import { motion } from 'framer-motion';

type ToursCardProps = Pick<Stay, 'tours'>;

export function ToursCard({ tours }: ToursCardProps) {
  if (!tours?.length) return null;

  return (
    <motion.div>
      <Card className="w-full bg-card">
        <CardHeader className="pb-4">
          <h3 className="font-semibold tracking-tight text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {tours[0].name}
          </h3>
        </CardHeader>

        <div className="relative w-full aspect-[16/9]">
          <div className="relative h-full">
            <img
              src={tours[0].image}
              alt={tours[0].name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-background/95 backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  {tours[0].time.replace(' -> ', ' - ')}
                </Badge>
                <Badge variant="outline" className="bg-background/95 backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  Guia Local
                </Badge>
                <Badge variant="outline" className="bg-background/95 backdrop-blur-sm">
                  <BanknoteIcon className="w-3.5 h-3.5 mr-1.5" />
                  R$ {tours[0].price.toLocaleString('pt-BR')}
                </Badge>
              </div>
            </div>

            <Button
              asChild
              variant="default"
              size="lg"
              className="w-full"
            >
              <a
                href={tours[0].bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Link className="w-4 h-4" />
                Ver mais detalhes
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ToursCard;