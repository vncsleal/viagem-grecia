export interface TravelSegment {
	departure: string;
	arrival: string;
	departureTime: string;
	arrivalTime: string;
	transport: "plane" | "boat";
	mapUrl?: string;
	mapEmbed?: string;
	flightUrl?: string;
	price?: number;
	bookingUrl?: string;
}

interface Accommodation {
	type: "hotel" | "airbnb";
	name: string;
	image: string;
	price: number;
	address: string;
	mapUrl: string;
	mapEmbed?: string;
	bookingUrl: string;
}

export interface Weather {
	high: number;
	low: number;
	condition: "sunny" | "cloudy" | "partly-cloudy" | "rainy";
	precipitation: number;
}

export interface Stay {
	location: string;
	duration: string;
	cityImage: string;
	accommodations: {
		hotel: Accommodation;
		airbnb: Accommodation;
	};
	tours?: {
		name: string;
		price: number;
		time: string;
		image: string;
		bookingUrl: string;
	}[];
	extras?: string[];
	weather?: Weather[];
}

export interface TripStats {
	totalDays: number;
	totalCities: number;
	totalFlights: number;
	totalBoatRides: number;
	averageTemp: {
		high: number;
		low: number;
	};
	totalAccommodationCost: number;
	totalToursCost: number;
	totalFoodCost: number;
}
