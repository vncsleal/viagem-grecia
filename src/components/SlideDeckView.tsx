import { itineraryData } from '@/data/itinerary';
import { Stay, TravelSegment } from '@/types/itinerary';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';

interface CityContent {
  location: string;
  duration: string;
  cityImage: string;
}

interface AccommodationsContent {
  location: string;
  accommodations: Stay['accommodations'];
}

interface ToursContent {
  location: string;
  tours: NonNullable<Stay['tours']>;
}

type Slide = {
  type: 'city';
  content: CityContent;
} | {
  type: 'accommodations';
  content: AccommodationsContent;
} | {
  type: 'tours';
  content: ToursContent;
} | {
  type: 'travel';
  content: TravelSegment;
}

function generateSlides(): Slide[] {
  return itineraryData.flatMap((item): Slide[] => {
    if ('location' in item) {
      const slides: Slide[] = [
        {
          type: 'city',
          content: {
            location: item.location,
            duration: item.duration,
            cityImage: item.cityImage,
          },
        } as const,
        {
          type: 'accommodations',
          content: {
            location: item.location,
            accommodations: item.accommodations,
          },
        } as const,
      ];

      if (item.tours && item.tours.length > 0) {
        slides.push({
          type: 'tours',
          content: {
            location: item.location,
            tours: item.tours,
          },
        } as const);
      }

      return slides;
    } else {
      return [{
        type: 'travel',
        content: item,
      } as const];
    }
  });
}

export function SlideDeckView() {
  const slides = generateSlides();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const renderSlide = (slide: Slide) => {
    switch (slide.type) {
      case 'city': {
        const content = slide.content;
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold">{content.location}</h2>
            <img
              src={content.cityImage}
              alt={content.location}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <p className="text-xl">{content.duration}</p>
          </div>
        );
      }

      case 'accommodations': {
        const { accommodations, location } = slide.content;
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">Acomodações em {location}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">🏨 Hotel</h3>
                <div className="aspect-video relative mb-4">
                  <img
                    src={accommodations.hotel.image}
                    alt={accommodations.hotel.name}
                    className="rounded-lg object-cover absolute inset-0 w-full h-full"
                  />
                </div>
                <h4 className="font-medium text-lg">{accommodations.hotel.name}</h4>
                <p className="text-muted-foreground mt-1">{accommodations.hotel.address}</p>
                <p className="font-semibold mt-2">R$ {accommodations.hotel.price}/noite</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">🏡 Airbnb</h3>
                <div className="aspect-video relative mb-4">
                  <img
                    src={accommodations.airbnb.image}
                    alt={accommodations.airbnb.name}
                    className="rounded-lg object-cover absolute inset-0 w-full h-full"
                  />
                </div>
                <h4 className="font-medium text-lg">{accommodations.airbnb.name}</h4>
                <p className="text-muted-foreground mt-1">{accommodations.airbnb.address}</p>
                <p className="font-semibold mt-2">R$ {accommodations.airbnb.price}/noite</p>
              </Card>
            </div>
          </div>
        );
      }

      case 'tours': {
        const { tours, location } = slide.content;
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">Passeios em {location}</h2>
            <div className="grid gap-6">
              {tours.map((tour, index) => (
                <Card key={index} className="p-6">
                  <div className="aspect-video relative mb-4">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="rounded-lg object-cover absolute inset-0 w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{tour.name}</h3>
                  <p className="text-muted-foreground mt-1">{tour.time}</p>
                  <p className="font-semibold mt-2">R$ {tour.price}</p>
                </Card>
              ))}
            </div>
          </div>
        );
      }

      case 'travel': {
        const content = slide.content;
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold">
              {content.departure} → {content.arrival}
            </h2>
            <div className="text-xl">
              <p>Partida: {content.departureTime}</p>
              <p>Chegada: {content.arrivalTime}</p>
            </div>
            <p className="text-lg">
              Transporte: {content.transport === 'plane' ? '✈️' : '🚢'}
            </p>
            {content.price && (
              <p className="font-semibold">R$ {content.price}</p>
            )}
          </div>
        );
      }
    }
  };

  return (
    <div className="relative h-[calc(100vh-12rem)] flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 z-10"
        onClick={previousSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl mx-auto p-8"
        >
          {renderSlide(slides[currentSlide])}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
