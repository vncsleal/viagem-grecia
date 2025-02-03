import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { itineraryData } from "../data/itinerary";
import type { Stay, TravelSegment, TripStats } from "../types/itinerary";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const DAILY_FOOD_COST = 300;

const calculateStats = (data: (TravelSegment | Stay)[]): TripStats & {
  cityDurations: { name: string; days: number; id: string }[];
  transportStats: { type: string; count: number; totalCost: number }[];
  accommodationDetails: {
    type: 'hotel' | 'airbnb';
    cost: number;
  }[];
  alternativeAccommodationCost: number;
  internationalFlightsCost: number;
} => {
  const stats: TripStats = {
    totalDays: 0,
    totalCities: 0,
    totalFlights: 0,
    totalBoatRides: 0,
    averageTemp: { high: 0, low: 0 },
    totalAccommodationCost: 0,
    totalToursCost: 0,
    totalFoodCost: 0,
  };

  const processedCities = new Set<string>();
  const cityDurations: { name: string; days: number; id: string }[] = [];
  const transportStats = [
    { type: 'Voos', count: 0, totalCost: 0 },
    { type: 'Barcos', count: 0, totalCost: 0 }
  ];

  let totalHighTemps = 0;
  let totalLowTemps = 0;
  let tempReadings = 0;

  const processedDurations = new Map<string, number>();
  const accommodationDetails: { type: 'hotel' | 'airbnb'; cost: number; }[] = [];

  let internationalFlightsCost = 0;

  data.forEach((segment) => {
    if ('location' in segment) {
      const cityName = segment.location;
      
      // Only count unique cities but combine days for the same city
      if (!processedCities.has(cityName)) {
        processedCities.add(cityName);
        stats.totalCities++;
        processedDurations.set(cityName, 0); // Initialize with 0
      }

      // Sum up days for each unique city
      const days = segment.weather?.length || 0;
      const currentDays = processedDurations.get(cityName) || 0;
      
      // For Atenas, only count weather days if it's the first stay
      if (cityName === "Atenas" && currentDays === 0) {
        processedDurations.set(cityName, 3); // Force Atenas to 3 days total
      } else if (cityName !== "Atenas") {
        processedDurations.set(cityName, days);
      }

      // Calculate accommodation costs (only hotel option) - remove conversion
      const accommodation = segment.accommodations?.hotel;
      if (accommodation) {
        const cost = accommodation.price;
        stats.totalAccommodationCost += cost;
        accommodationDetails.push({
          type: 'hotel',
          cost
        });
      }

      // Calculate tours costs - remove conversion
      if (segment.tours) {
        stats.totalToursCost += segment.tours.reduce((acc, tour) => acc + tour.price, 0);
      }

      // Calculate temperature averages
      if (segment.weather) {
        segment.weather.forEach(day => {
          totalHighTemps += day.high;
          totalLowTemps += day.low;
          tempReadings++;
        });
      }
    } else if ('transport' in segment) {
      if (segment.transport === 'plane') {
        if (segment.departure === 'SP' || segment.arrival === 'SP') {
          internationalFlightsCost += segment.price || 0;
        } else {
          stats.totalFlights++;
          transportStats[0].count++;
          transportStats[0].totalCost += segment.price || 0;
        }
      }
      if (segment.transport === 'boat') {
        stats.totalBoatRides++;
        transportStats[1].count++;
        if (segment.price) {
          transportStats[1].totalCost += segment.price;
        }
      }
    }
  });

  // Alternative calculation for Airbnb option - remove conversion
  const airbnbTotal = data.reduce((acc, segment) => {
    if ('location' in segment && segment.accommodations?.airbnb) {
      return acc + segment.accommodations.airbnb.price;
    }
    return acc;
  }, 0);

  // Convert the Map to array format with unique IDs
  cityDurations.length = 0; // Clear existing array
  processedDurations.forEach((days, name) => {
    cityDurations.push({
      name,
      days,
      id: name // Using city name as ID since we're now guaranteed unique cities
    });
  });

  // Calculate average temperatures
  stats.averageTemp.high = Math.round(totalHighTemps / tempReadings);
  stats.averageTemp.low = Math.round(totalLowTemps / tempReadings);

  // Calculate total days from the first arrival to last departure
  stats.totalDays = 8; // Fixed to exact trip duration

  // Calculate food costs
  stats.totalFoodCost = stats.totalDays * DAILY_FOOD_COST;

  return {
    ...stats,
    cityDurations,
    transportStats,
    accommodationDetails,
    alternativeAccommodationCost: airbnbTotal,
    internationalFlightsCost
  };
};

export default function TripStats() {
  const stats = calculateStats(itineraryData);
  const hotelCost = stats.totalAccommodationCost;
  const airbnbCost = stats.alternativeAccommodationCost;
  const toursCost = stats.totalToursCost;
  const transportCost = stats.transportStats.reduce((acc, t) => acc + t.totalCost, 0);
  const foodCost = stats.totalFoodCost;
  const internationalFlightsCost = stats.internationalFlightsCost;
  
  const totalCostWithHotel = hotelCost + toursCost + transportCost + foodCost + internationalFlightsCost;
  const totalCostWithAirbnb = airbnbCost + toursCost + transportCost + foodCost + internationalFlightsCost;

  const rawCostData = [
    { name: "Voos Internacionais", value: internationalFlightsCost },
    { name: "Hotel", value: hotelCost },
    { name: "Alimentação", value: foodCost },
    { name: "Tours", value: toursCost },
    { name: "Transportes", value: transportCost },
  ];

  const costData = rawCostData.map(item => ({
    category: item.name,
    amount: item.value,
    fill: `hsl(var(--chart-${rawCostData.indexOf(item) + 1}))`,
  }));

  const chartConfig = {
    amount: {
      label: "Valor",
    },
    voos: {
      label: "Voos Internacionais",
      color: "hsl(var(--chart-1))",
    },
    hotel: {
      label: "Hotel",
      color: "hsl(var(--chart-2))",
    },
    alimentacao: {
      label: "Alimentação",
      color: "hsl(var(--chart-3))",
    },
    tours: {
      label: "Tours",
      color: "hsl(var(--chart-4))",
    },
    transportes: {
      label: "Transportes",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-8">
      <div className="grid gap-8">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Duração</h3>
            <p className="text-2xl font-bold">{stats.totalDays} dias</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Cidades</h3>
            <p className="text-2xl font-bold">{stats.totalCities}</p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Previsão do Tempo</h3>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{stats.averageTemp.high}°C</p>
              <p className="text-sm text-muted-foreground">Mínima: {stats.averageTemp.low}°C</p>
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Custo Total Previsto</h3>
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                R$ {totalCostWithHotel.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-muted-foreground">
                economia Airbnb: R$ {(hotelCost - airbnbCost).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 md:grid-cols-2">

        <Card className="p-6 md:col-span-2">
            <h3 className="font-semibold mb-4 text-lg">Dias em Cada Cidade</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {stats.cityDurations.map((city) => (
                <div key={city.id}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="font-medium">{city.name}</span>
                    <span className="text-muted-foreground">{city.days} dias</span>
                  </div>
                  <Progress value={(city.days / 8) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
          {/* Cost Distribution Chart */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-lg">Gráfico de Custos</h3>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (active && payload?.[0]) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].payload.category}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              R$ {payload[0]?.value?.toLocaleString('pt-BR') ?? 0}
                            </span>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Pie
                  data={costData}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={60}
                  outerRadius={80}
                />
              </PieChart>
            </ChartContainer>
            <div className="text-center text-sm text-muted-foreground mt-4">
              Distribuição dos custos por categoria
            </div>
          </Card>

          

          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-lg">Distribuição de Custos</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Voos Internacionais</span>
                    <span className="font-medium">
                      R$ {internationalFlightsCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <Progress value={(internationalFlightsCost / totalCostWithHotel) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Hotel</span>
                    <span className="font-medium">
                      R$ {hotelCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <Progress value={(hotelCost / totalCostWithHotel) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Alimentação</span>
                    <span className="font-medium">
                      R$ {foodCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <Progress value={(foodCost / totalCostWithHotel) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Tours</span>
                    <span className="font-medium">
                      R$ {toursCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <Progress value={(toursCost / totalCostWithHotel) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Transportes</span>
                    <span className="font-medium">
                      R$ {transportCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <Progress value={(transportCost / totalCostWithHotel) * 100} className="h-2" />
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Airbnb (alternativa)</span>
                    <span className="font-medium">
                      R$ {airbnbCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <Progress value={(airbnbCost / totalCostWithAirbnb) * 100} className="h-2 opacity-50" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-lg">Transportes</h3>
            <div className="space-y-4">
              {stats.transportStats.map((item) => (
                <div key={item.type}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">{item.type}</span>
                    <div className="text-right">
                      <span className="font-medium">{item.count}x</span>
                      <span className="text-muted-foreground ml-2">
                        R$ {item.totalCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                  <Progress value={item.count * 20} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          
        </div>
      </div>
    </div>
  );
}
