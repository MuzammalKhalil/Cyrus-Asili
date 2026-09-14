export const companyInfo = {
  name: "ASILI Holding Ltd.",
  tagline: "Buy, Build, Invest – Turning Bricks to Gold™",
  headline: "International Real Estate Investment & Construction Agency",
  subheadline: "ASILI Holding Ltd. provides international property investment opportunities across the United Kingdom, UAE, Greece, Cyprus, & Turkey.",
  address: "128 Kensington High Street, London, W8 4SG, UK",
  phones: ["+44 (0)20 7580 8490", "+44 (0)78 1144 1111"],
  email: "info@asili.uk",
  salesEmail: "sales@asili.uk",
  hours: "Mon - Fri: 9:00 - 18:00 | Sat: By appointment",
  stats: [
    { value: "25+", label: "Years of Experience" },
    { value: "$18M+", label: "Property Sales" },
    { value: "5", label: "Global Markets" },
    { value: "98%", label: "Client Satisfaction" }
  ]
};

export const destinations = [
  {
    id: "uk",
    name: "United Kingdom",
    code: "UK",
    activeListings: 54,
    avgYield: "5.8%",
    entryPrice: "£250,000",
    growthOutlook: "Steady",
    heroImage: "/assets/Group_1160445061-2003_1049.png",
    bgImage: "/assets/Group_1160445061-2003_1049.png",
    description: "Stable capital growth, world-class legal framework, and strong rental demand in London and key regional hubs.",
    cities: [
      { name: "London (Nine Elms / Kensington)", price: "£850,000", yield: "4.8%", outlook: "High Growth" },
      { name: "Manchester", price: "£220,000", yield: "6.5%", outlook: "Strong" },
      { name: "Birmingham", price: "£195,000", yield: "6.2%", outlook: "Strong" },
      { name: "Liverpool", price: "£145,000", yield: "7.1%", outlook: "Steady" }
    ]
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    code: "UAE",
    activeListings: 38,
    avgYield: "7.1%",
    entryPrice: "AED 850,000",
    growthOutlook: "High Growth",
    heroImage: "/assets/Group_1160445095-2003_2026.png",
    bgImage: "/assets/Group_1160445095-2003_2026.png",
    description: "Tax-free rental yields, Golden Visa eligibility, and ultra-luxury off-plan developments in Dubai & Abu Dhabi.",
    cities: [
      { name: "Dubai Marina", price: "AED 1,650,000", yield: "6.8%", outlook: "Strong" },
      { name: "Downtown Dubai", price: "AED 2,400,000", yield: "5.9%", outlook: "Steady" },
      { name: "Business Bay", price: "AED 1,300,000", yield: "7.4%", outlook: "Strong" },
      { name: "Abu Dhabi (Saadiyat)", price: "AED 2,100,000", yield: "6.2%", outlook: "Strong" },
      { name: "Ras Al Khaimah", price: "AED 850,000", yield: "8.1%", outlook: "High Growth" }
    ]
  },
  {
    id: "greece",
    name: "Greece",
    code: "GR",
    activeListings: 19,
    avgYield: "5.4%",
    entryPrice: "€150,000",
    growthOutlook: "High Growth",
    heroImage: "/assets/Group_1160445032-2003_451.png",
    bgImage: "/assets/Group_1160445032-2003_451.png",
    description: "Accessible Golden Visa route, booming tourism sector, and prime Mediterranean coastal investments.",
    cities: [
      { name: "Athens (Center)", price: "€210,000", yield: "5.6%", outlook: "Strong" },
      { name: "Piraeus", price: "€175,000", yield: "6.1%", outlook: "Strong" },
      { name: "Thessaloniki", price: "€150,000", yield: "5.2%", outlook: "Steady" },
      { name: "Crete", price: "€240,000", yield: "5.0%", outlook: "Steady" },
      { name: "Mykonos", price: "€620,000", yield: "4.3%", outlook: "High Growth" }
    ]
  },
  {
    id: "cyprus",
    name: "Cyprus",
    code: "CY",
    activeListings: 9,
    avgYield: "6.2%",
    entryPrice: "€180,000",
    growthOutlook: "Steady",
    heroImage: "/assets/Group_1160445032-2003_451.png",
    bgImage: "/assets/Group_1160445032-2003_451.png",
    description: "Favorable corporate tax rates, permanent residency programs, and high-yield beachfront villas.",
    cities: [
      { name: "Limassol Marina", price: "€385,000", yield: "6.0%", outlook: "Strong" },
      { name: "Larnaca Bay", price: "€280,000", yield: "6.5%", outlook: "High Growth" },
      { name: "Paphos", price: "€210,000", yield: "5.8%", outlook: "Steady" }
    ]
  },
  {
    id: "turkey",
    name: "Turkey",
    code: "TR",
    activeListings: 22,
    avgYield: "7.8%",
    entryPrice: "$120,000",
    growthOutlook: "High Growth",
    heroImage: "/assets/Group_1160445095-2003_2026.png",
    bgImage: "/assets/Group_1160445095-2003_2026.png",
    description: "Citizenship by investment, strategic gateway location between Europe & Asia, and vibrant urban regeneration.",
    cities: [
      { name: "Istanbul (Basaksehir)", price: "$180,000", yield: "7.5%", outlook: "High Growth" },
      { name: "Bodrum", price: "$450,000", yield: "6.2%", outlook: "Strong" },
      { name: "Antalya", price: "$130,000", yield: "8.0%", outlook: "Strong" }
    ]
  }
];

export const properties = [
  {
    id: "prop-1",
    title: "Riverside Residence, Nine Elms",
    location: "London, United Kingdom",
    country: "uk",
    price: "£2,450,000",
    priceNum: 2450000,
    currency: "GBP",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "2,150 sq.ft",
    badge: "Trophy",
    goldenVisa: true,
    offPlan: false,
    newBuild: true,
    image: "/assets/Rectangle_4353-2003_230.png",
    description: "Ultra-luxury waterfront apartment featuring panoramic Thames views, 24/7 concierge, private gym, and sky lounge."
  },
  {
    id: "prop-2",
    title: "Kensington Mews House",
    location: "London, United Kingdom",
    country: "uk",
    price: "£6,750,000",
    priceNum: 6750000,
    currency: "GBP",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 5,
    area: "4,800 sq.ft",
    badge: "Golden Visa",
    goldenVisa: true,
    offPlan: false,
    newBuild: false,
    image: "/assets/Rectangle_4400-2003_2741.png",
    description: "Exquisite freehold mews residence located in the heart of Royal Borough of Kensington with private courtyard and underground parking."
  },
  {
    id: "prop-3",
    title: "Marina Tower, Dubai Harbour",
    location: "Dubai, United Arab Emirates",
    country: "uae",
    price: "AED 3,100,000",
    priceNum: 3100000,
    currency: "AED",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,850 sq.ft",
    badge: "Off-Plan",
    goldenVisa: true,
    offPlan: true,
    newBuild: true,
    image: "/assets/image_39-2003_1026.png",
    description: "Iconic high-rise residence offering full yacht harbor views, direct beach access, and attractive post-handover payment plans."
  },
  {
    id: "prop-4",
    title: "Palm Signature Villa",
    location: "Dubai, United Arab Emirates",
    country: "uae",
    price: "AED 9,800,000",
    priceNum: 9800000,
    currency: "AED",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 5,
    area: "5,200 sq.ft",
    badge: "Trophy",
    goldenVisa: true,
    offPlan: false,
    newBuild: true,
    image: "/assets/Rectangle_4357-2003_231.png",
    description: "Bespoke beachside sanctuary on Palm Jumeirah with infinity pool, private dock, landscaped gardens, and smart automation."
  },
  {
    id: "prop-5",
    title: "Acropolis View Apartment",
    location: "Athens, Greece",
    country: "greece",
    price: "€420,000",
    priceNum: 420000,
    currency: "EUR",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,450 sq.ft",
    badge: "Golden Visa",
    goldenVisa: true,
    offPlan: false,
    newBuild: true,
    image: "/assets/image_55-2003_1166.png",
    description: "Newly refurbished boutique apartment in Kolonaki with direct views of the Parthenon. Qualifies for the Greek Golden Visa."
  },
  {
    id: "prop-6",
    title: "Cycladic Hillside Villa",
    location: "Mykonos, Greece",
    country: "greece",
    price: "€1,450,000",
    priceNum: 1450000,
    currency: "EUR",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 4,
    area: "3,100 sq.ft",
    badge: "Trophy",
    goldenVisa: true,
    offPlan: false,
    newBuild: true,
    image: "/assets/Rectangle_4358-2003_232.png",
    description: "Traditional luxury stone villa overlooking the Aegean Sea with private infinity pool, outdoor lounge, and high summer rental yield."
  },
  {
    id: "prop-7",
    title: "Larnaca Bay Villa",
    location: "Larnaca, Cyprus",
    country: "cyprus",
    price: "€890,000",
    priceNum: 890000,
    currency: "EUR",
    type: "Villa",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,400 sq.ft",
    badge: "Golden Visa",
    goldenVisa: true,
    offPlan: false,
    newBuild: true,
    image: "/assets/image_56-2003_1013.png",
    description: "Contemporary seafront home with private solar pool, roof terrace, and eligibility for permanent European residency."
  },
  {
    id: "prop-8",
    title: "Bosphorus Horizon Suite",
    location: "Istanbul, Turkey",
    country: "turkey",
    price: "$480,000",
    priceNum: 480000,
    currency: "USD",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,950 sq.ft",
    badge: "Golden Visa",
    goldenVisa: true,
    offPlan: true,
    newBuild: true,
    image: "/assets/Rectangle_4359-2003_233.png",
    description: "Luxury residence overlooking the Bosphorus Strait. Fully compliant with Turkish Citizenship by Investment program."
  }
];

export const testimonials = [
  {
    quote: "I bought my first investment property through ASILI Holding and am very happy with the service I received. Mr. Asili provides personalised advice and spends a lot of time making sure his clients are happy.",
    name: "Hillary WATSON",
    role: "Accountant & Investor",
    location: "London, UK"
  },
  {
    quote: "A great company to use for your every property need. My enquiry was a delicate one, I was travelling to London with my daughter over the summer and I needed a shortlet flat close to Regents Park. Everything went very smoothly.",
    name: "Sara AZARMNIA",
    role: "Art Curator",
    location: "Dubai, UAE"
  },
  {
    quote: "Thank you Mr. Asili for the great service. I purchased three apartments off plan in Dubai and managed to get a great deal. I highly recommend ASILI Holding.",
    name: "James LEVANTE",
    role: "CEO & International Investor",
    location: "Monaco"
  }
];

export const milestones = [
  { year: "2004", title: "Establishment of Newton Group", desc: "Formed the cornerstone of international advisory and education services." },
  { year: "2012", title: "Study Travel Star Awards", desc: "Recognized on the international red carpet for excellence in global client representation." },
  { year: "2016", title: "ASILI Holding Expansion", desc: "Consolidated international property investment portfolio across the UK, UAE, and Europe." },
  { year: "2024", title: "Celebrating 20th Anniversary", desc: "Over $18M+ in successful international property sales and investor guidance." }
];
