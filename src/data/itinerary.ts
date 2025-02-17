import { TravelSegment, Stay } from "../types/itinerary";

export const itineraryData: (TravelSegment | Stay)[] = [
	{
		departure: "SP",
		arrival: "Atenas",
		departureTime: "22/06 17:50",
		arrivalTime: "23/06 18:35",
		transport: "plane",
		price: 3500,
		flightUrl: "https://www.google.com/travel/flights/s/ZhpdhQxUtaMSMt5e6",
		mapUrl: "https://maps.app.goo.gl/Rm6rTzexn3NY2Zu28",
		mapEmbed:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.632412427978!2d23.946376376576133!3d37.93901707194454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1901ad9e75c61%3A0x38b215df0aeeb3aa!2sAeroporto%20Internacional%20de%20Atenas!5e0!3m2!1spt-BR!2sbr!4v1738519534120!5m2!1spt-BR!2sbr",
	},
	{
		location: "Atenas",
		duration: "23/06 a 25/06",
		cityImage:
			"https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1000",
		accommodations: {
			hotel: {
				type: "hotel",
				name: "Acropolis View Hotel",
				image:
					"https://cf.bstatic.com/xdata/images/hotel/max1280x900/44136781.jpg?k=6fb19ccef849296981b36ba6b31ff082dca2814c684492ce38debb55568eb0ab&o=&hp=1",
				price: 400,
				address: "Webster 10, Atenas 117 42, Grécia",
				mapUrl: "https://maps.app.goo.gl/8qBhhE8PPkkgS8kV7",
				mapEmbed:
					"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.353575705835!2d23.721362376577236!3d37.968877071937165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd1bd6dd4455%3A0x5d5157fc7299d631!2sAcropolis%20View%20Hotel!5e0!3m2!1spt-BR!2sbr!4v1738518762416!5m2!1spt-BR!2sbr",
				bookingUrl:
					"https://www.booking.com/hotel/gr/acropolis-view.pt-br.html",
			},
			airbnb: {
				type: "airbnb",
				name: "Koukaki - 2 quartos e 2 banheiros",
				image:
					"https://a0.muscache.com/im/pictures/miso/Hosting-1103372406833637122/original/8f5ae7a4-4dfc-494a-b09f-37db85a484d3.jpeg?im_w=1440&im_format=avif",
				price: 250,
				address: "Koukaki, Athina, Greece",
				mapUrl: "https://maps.app.goo.gl/tvkGFuECc68MHtB8A",
				mapEmbed:
					"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d196.6019292144241!2d23.721309979785467!3d37.962404185365905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd5eac7a34c3%3A0x728322da57f8ce80!2sCentral%20elegant%20apartment%20in%20koukaki%2Cnear%20acropoli!5e0!3m2!1spt-BR!2sbr!4v1738519482502!5m2!1spt-BR!2sbr",
				bookingUrl:
					"https://www.airbnb.com.br/rooms/1103372406833637122?adults=5&search_mode=regular_search&check_in=2025-06-23&check_out=2025-06-25",
			},
		},
		tours: [
			{
				name: "Visita guiada + Acrópole e seu Museu",
				price: 555,
				time: "8:15 -> 13:15",
				image:
					"https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=1000",
				bookingUrl:
					"https://www.civitatis.com/br/atenas/visita-guiada-atenas-completa/",
			},
		],
		extras: ["alimentação", "transporte"],
		weather: [
			{ high: 31, low: 21, condition: "sunny", precipitation: 0 }, // 23/06
			{ high: 31, low: 21, condition: "sunny", precipitation: 0 }, // 24/06
			{ high: 31, low: 21, condition: "sunny", precipitation: 0 }, // 25/06
		],
	},
	{
		departure: "Atenas",
		arrival: "Mykonos",
		departureTime: "25/06 9:45",
		arrivalTime: "25/06 12:35",
		transport: "boat",
		price: 570, // Add price per person
		bookingUrl: "https://www.ferryhopper.com/",
	},
	{
		location: "Mykonos",
		duration: "25/06 a 27/06",
		cityImage:
			"https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=1000",
		accommodations: {
			hotel: {
				type: "hotel",
				name: "Portes Mykonos Suites e Villas",
				image:
					"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
				price: 700,
				address: "Platys Gialos Beach, Platys Gialos, 84600, Grécia",
				mapUrl: "https://maps.app.goo.gl/ZzGMdugSyRscMwdg9",
				mapEmbed:
					"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18310.468240298258!2d25.32079323366683!3d37.427193851667084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a2bef7ea5e1e6f%3A0x6b099f6373c6d291!2sPortes%20Mykonos%20Hotel!5e0!3m2!1spt-BR!2sbr!4v1738521488457!5m2!1spt-BR!2sbr",
				bookingUrl:
					"https://www.booking.com/hotel/gr/portes-mykonos.pt-br.html?aid=304142&label=gen173nr-1FCAsoXEIOYWNyb3BvbGlzLXZpZXdILVgEaCCIAQGYAS24AQfIAQ3YAQHoAQH4AQKIAgGoAgO4Atbs_rwGwAIB0gIkYzE2NmJmNzItZDc4MC00NzAyLTliYzYtN2E0OTg3MTllMzUx2AIF4AIB",
			},
			airbnb: {
				type: "airbnb",
				name: "Fenomeno House, na cidade de Míconos",
				image:
					"https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1000",
				price: 350,
				address: "Mikonos 846 00, Greece",
				mapUrl: "https://maps.app.goo.gl/dzAbDqEKxR5nA3Sd8",
				mapEmbed:
					"https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3167.605298965437!2d25.327838000000003!3d37.446428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzfCsDI2JzQ3LjEiTiAyNcKwMTknNDAuMiJF!5e0!3m2!1spt-BR!2sbr!4v1738532856232!5m2!1spt-BR!2sbr",
				bookingUrl:
					"https://www.airbnb.com.br/rooms/893445338255611925?adults=5&search_mode=regular_search&check_in=2025-06-25&check_out=2025-06-27",
			},
		},
		tours: [
			{
				name: "Visita guiada por Mykonos",
				price: 230,
				time: "18:00 -> 20:00",
				image:
					"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000",
				bookingUrl:
					"https://www.civitatis.com/br/mykonos/visita-guiada-mykonos/",
			},
		],
		extras: ["alimentação", "transporte"],
		weather: [
			{ high: 31, low: 21, condition: "sunny", precipitation: 0 }, // 25/06
			{ high: 31, low: 21, condition: "sunny", precipitation: 0 }, // 26/06
		],
	},
	{
		departure: "Mykonos",
		arrival: "Santorini",
		departureTime: "27/06 9:45",
		arrivalTime: "27/06 12:35",
		transport: "boat",
		price: 540,
		bookingUrl: "https://www.ferryhopper.com/",
	},
	{
		location: "Santorini",
		duration: "27/06 a 30/06",
		cityImage:
			"https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000",
		accommodations: {
			hotel: {
				type: "hotel",
				name: "El Greco",
				image:
					"https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&w=1000",
				price: 720,
				address: "Fira, Fira, 84700, Grécia",
				mapUrl: "https://maps.app.goo.gl/Yd4xgjaK9skBhhh48",
				mapEmbed:
					"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3210.923903023902!2d25.43218947651937!3d36.41103637236054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1499cdd64d3927cd%3A0x1754c0ecde3b20fb!2sEl%20Greco%20Hotel%20Resort!5e0!3m2!1spt-BR!2sbr!4v1738522316926!5m2!1spt-BR!2sbr",
				bookingUrl: "https://www.booking.com/hotel/gr/el-greco.pt-br.html",
			},
			airbnb: {
				type: "airbnb",
				name: "Bianco Diverso Suites",
				image:
					"https://a0.muscache.com/im/pictures/70ef8918-5c56-4152-9b73-f5cd67104602.jpg?im_w=1200&im_format=avif",
				price: 360,
				address: "Oia, Egeo, Greece",
				mapUrl: "https://maps.app.goo.gl/example-santorini",
				bookingUrl:
					"https://www.airbnb.com.br/rooms/36248917?adults=5&search_mode=regular_search&check_in=2025-06-27&check_out=2025-06-30",
			},
		},
		tours: [
			{
				name: "Visita guiada por Santorini em português",
				price: 400,
				time: "10:00 -> 14:00",
				image:
					"https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1000",
				bookingUrl:
					"https://www.civitatis.com/br/santorini/visita-guiada-santorini-portugues/",
			},
		],
		extras: ["alimentação", "transporte"],
		weather: [
			{ high: 31, low: 21, condition: "sunny", precipitation: 0 }, // 27/06
			{ high: 31, low: 21, condition: "sunny", precipitation: 0 }, // 28/06
			{ high: 31, low: 21, condition: "sunny", precipitation: 0 }, // 29/06
		],
	},
	{
		departure: "Santorini",
		arrival: "Atenas",
		departureTime: "30/06 11:35",
		arrivalTime: "30/06 12:25",
		transport: "plane",
		price: 500,
		flightUrl: "https://www.google.com/travel/flights/s/FopAYiZ1sMaZcgrr7",
		mapUrl: "https://maps.app.goo.gl/Rm6rTzexn3NY2Zu28",
		mapEmbed:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.632412427978!2d23.946376376576133!3d37.93901707194454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1901ad9e75c61%3A0x38b215df0aeeb3aa!2sAeroporto%20Internacional%20de%20Atenas!5e0!3m2!1spt-BR!2sbr!4v1738519534120!5m2!1spt-BR!2sbr",
	},
	{
		location: "Atenas",
		duration: "30/06 a 01/07",
		cityImage:
			"https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1000",
		accommodations: {
			hotel: {
				type: "hotel",
				name: "Hotel próximo ao aeroporto",
				image:
					"https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
				price: 400,
				address: "Attiki Odos, Spata Artemida 190 04, Grécia",
				mapUrl: "https://maps.app.goo.gl/Rm6rTzexn3NY2Zu28",
				mapEmbed:
					"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.632412427978!2d23.946376376576133!3d37.93901707194454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1901ad9e75c61%3A0x38b215df0aeeb3aa!2sAeroporto%20Internacional%20de%20Atenas!5e0!3m2!1spt-BR!2sbr!4v1738519534120!5m2!1spt-BR!2sbr",
				bookingUrl:
					"https://www.booking.com/hotel/gr/sofitel-athens-airport.pt-br.html",
			},
			airbnb: {
				type: "airbnb",
				name: "Thresh Apartment Airport by Airstay",
				image:
					"https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=1000",
				price: 200,
				address: "Koropi, Greece",
				mapUrl: "https://maps.app.goo.gl/example-athens-airport",
				bookingUrl:
					"https://www.airbnb.com.br/rooms/44654568?adults=5&search_mode=regular_search&check_in=2025-06-30&check_out=2025-07-01",
			},
		},
		extras: ["alimentação", "transporte"],
		weather: [
			{ high: 31, low: 21, condition: "sunny", precipitation: 0 }, // 30/06
			{ high: 31, low: 22, condition: "sunny", precipitation: 0 }, // 01/07
		],
	},
	{
		departure: "Atenas",
		arrival: "SP",
		departureTime: "01/07 6:05",
		arrivalTime: "01/07 19:50",
		transport: "plane",
		price: 3100,
		flightUrl: "https://www.google.com/travel/flights/s/ZhpdhQxUtaMSMt5e6",
	},
];

export const travelItinerary = {
	outbound: {
		departure: "São Paulo",
		arrival: "Atenas",
		departureTime: "22/06 17:50",
		arrivalTime: "23/06 18:35",
		transport: "plane",
	},
	return: {
		departure: "Atenas",
		arrival: "São Paulo",
		departureTime: "01/07 06:05",
		arrivalTime: "01/07 19:50",
		transport: "plane",
	},
} as const;
