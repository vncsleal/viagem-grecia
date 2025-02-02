import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Link, Map, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { Stay } from '@/types/itinerary';
import { Map as MapComponent } from '@/components/ui/map';
import { motion } from 'framer-motion';

type StayCardProps = Pick<Stay, 'accommodations' | 'location' | 'duration'>;

export function StayCard({ accommodations, location, duration }: StayCardProps) {
  return (
    <motion.div>
      <Card className="w-full bg-card">
        <Tabs defaultValue="hotel" className="h-full">
          <div className="relative w-full aspect-[16/9]">
            <TabsContent value="hotel" className="m-0 h-full">
              <div className="relative h-full">
                <img
                  src={accommodations.hotel.image}
                  alt={accommodations.hotel.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </TabsContent>
            <TabsContent value="airbnb" className="m-0 h-full">
              <div className="relative h-full">
                <img
                  src={accommodations.airbnb.image}
                  alt={accommodations.airbnb.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </TabsContent>
            
            <div className="absolute inset-x-4 bottom-4">
              <TabsList className=" bg-background/95 backdrop-blur-sm shadow-lg ">
                <TabsTrigger 
                  value="hotel" 
                  className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
                >
                  <Building className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Hotel</span>
                  <Badge 
                    variant="outline" 
                    className="ml-2 bg-background/50 backdrop-blur-sm border-0"
                  >
                    R$ {accommodations.hotel.price}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="airbnb" 
                  className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Airbnb</span>
                  <Badge 
                    variant="outline" 
                    className="ml-2 bg-background/50 backdrop-blur-sm border-0"
                  >
                    R$ {accommodations.airbnb.price}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <CardContent className="p-6">
            <TabsContent value="hotel" className="mt-0 space-y-6">
              <AccommodationDetails 
                type="hotel"
                accommodation={accommodations.hotel}
                location={location}
                duration={duration}
              />
            </TabsContent>
            <TabsContent value="airbnb" className="mt-0 space-y-6">
              <AccommodationDetails 
                type="airbnb"
                accommodation={accommodations.airbnb}
                location={location}
                duration={duration}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </motion.div>
  );
}

function AccommodationDetails({ 
  type, 
  accommodation}: { 
  type: 'hotel' | 'airbnb';
  accommodation: Stay['accommodations']['hotel' | 'airbnb'];
  location: string;
  duration: string;
}) {
  const Icon = type === 'hotel' ? Building : Home;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="font-semibold tracking-tight text-xl">
            {accommodation.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          {accommodation.address}
        </p>
      </div>

      

      {type === 'hotel' && accommodation.mapEmbed && (
        <div className="rounded-lg overflow-hidden border">
          <MapComponent
            src={accommodation.mapEmbed}
            title={`${accommodation.name} - Localização`}
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Button asChild variant="outline" size="lg">
          <a 
            href={accommodation.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2"
          >
            <Map className="w-4 h-4" />
            Ver no Maps
          </a>
        </Button>
        <Button asChild variant="default" size="lg">
          <a 
            href={accommodation.bookingUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2"
          >
            <Link className="w-4 h-4" />
            Ver mais detalhes
          </a>
        </Button>
      </div>
    </div>
  );
}

export default StayCard;