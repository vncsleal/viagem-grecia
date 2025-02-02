import { TripCard } from './cards/TripCard';
import { CityCard } from './cards/CityCard';
import { StayCard } from './cards/StayCard';
import { ToursCard } from './cards/ToursCard';
import { itineraryData } from '@/data/itinerary';
import { Stay, TravelSegment } from '@/types/itinerary';
import { motion } from 'framer-motion';
import { Separator } from './ui/separator';

function isStay(item: TravelSegment | Stay): item is Stay {
  return 'location' in item;
}

export function TripView() {
  return (
    <div className="space-y-16">
      <motion.div 
        className="grid gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {itineraryData.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {isStay(item) ? (
              <div className="space-y-8 max-w-7xl mx-auto">
                <CityCard 
                  location={item.location} 
                  duration={item.duration}
                  cityImage={item.cityImage}
                />
                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                  <div className="2xl:col-span-2">
                    <StayCard 
                      location={item.location}
                      duration={item.duration}
                      accommodations={item.accommodations}
                    />
                  </div>
                  <div>
                    <ToursCard tours={item.tours} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto">
                <TripCard {...item} />
              </div>
            )}
            {index < itineraryData.length - 1 && (
              <div className="pt-16 max-w-7xl mx-auto">
                <Separator className="max-w-2xl mx-auto opacity-50" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}