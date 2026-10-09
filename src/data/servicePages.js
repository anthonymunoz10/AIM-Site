// src/data/servicePages.js
//
// One entry per service page. These pages exist so Google and AI search
// tools (ChatGPT, Gemini, Perplexity, Claude) can match AIM to specific
// searches like "directional drilling Miami" or "kitchen remodel Miami Lakes".
//
// Keep every statement true. Only list work AIM actually does, and don't
// add response-time promises.

export const SERVICE_AREA_COMMERCIAL =
  "Based in Miami Lakes and working across Florida, with directional drilling jobs from the Panhandle, Orlando, Tampa and Fort Myers down through Palm Beach, Broward, Miami-Dade and the Florida Keys, plus completed projects in Virginia, North Carolina, South Carolina and Georgia.";

export const SERVICE_AREA_RESIDENTIAL =
  "Based in Miami Lakes and serving homeowners across South Florida.";

export const SERVICE_PAGES = [
  /* ---------------- COMMERCIAL ---------------- */
  {
    slug: "directional-drilling",
    projects: ["savannah-fiber"],
    side: "commercial",
    path: "/services/directional-drilling",
    nav: "Directional Drilling",
    title: "Directional Drilling (HDD) Contractor in Florida",
    metaTitle: "Directional Drilling (HDD) Contractor in Miami & Across Florida | AIM Construction",
    metaDescription:
      "Horizontal directional drilling (HDD) from 2″ to 24″ for water, sewer, force main, electrical and telecom. Florida-certified underground utility contractor based in Miami Lakes, drilling statewide.",
    image: "/img/projects-bg.jpg",
    kicker: "Commercial",
    intro:
      "AIM Construction Management performs horizontal directional drilling (HDD) for utilities, general contractors, public agencies and private customers. We bore from 2″ to 24″ to install water, sewer, force main, electrical and telecom lines under roads, driveways and sensitive areas with minimal surface disruption.",
    bullets: [
      "Bores from 2″ to 24″",
      "Water main, force main and sewer crossings",
      "Electrical and telecom conduit",
      "Road, driveway and right-of-way crossings",
      "Our own Vermeer drills: 23×30, 24×40, 80×100 and 250×300",
      "Vacuum truck, excavators, loaders and support equipment",
    ],
    why: [
      "Florida Certified Underground Utility Contractor (CUC1226535)",
      "Jobs across Florida: the Panhandle, Orlando, Tampa, Fort Myers and South Florida",
      "Completed projects in Virginia, North Carolina, South Carolina and Georgia",
      "Concrete and asphalt restoration handled in-house",
    ],
    faqs: [
      {
        q: "What bore sizes can AIM drill?",
        a: "We bore from 2″ up to 24″ with our own fleet of Vermeer directional drills (23×30, 24×40, 80×100 and 250×300).",
      },
      {
        q: "Where does AIM do directional drilling?",
        a: SERVICE_AREA_COMMERCIAL,
      },
      {
        q: "Who does AIM drill for?",
        a: "General contractors, electrical contractors, utilities, public agencies and private customers. Send plans or a scope and we will review it and price it.",
      },
    ],
  },
  {
    slug: "water-sewer",
    projects: ["miami-shores-force-main", "port-everglades-2025"],
    side: "commercial",
    path: "/services/water-sewer",
    nav: "Water & Sewer",
    title: "Water Main, Sewer & Force Main Contractor in South Florida",
    metaTitle: "Water Main & Sewer Contractor in Miami & South Florida | AIM Construction",
    metaDescription:
      "Water main installation, sanitary sewer, force main, open-cut trenching, manholes and utility structures. Florida-certified underground utility contractor based in Miami Lakes.",
    image: "/img/about-bg.jpg",
    kicker: "Commercial",
    intro:
      "AIM installs water and sewer infrastructure for general contractors and public agencies: water main, gravity sanitary sewer, force main, manholes and utility structures, by open-cut trench or directional drill.",
    bullets: [
      "Water main installation",
      "Sanitary sewer and force main",
      "Open-cut trenching and excavation",
      "Manholes and utility structures",
      "Directional drilling crossings",
      "Concrete and asphalt restoration",
    ],
    why: [
      "Florida Certified Underground Utility Contractor (CUC1226535)",
      "Our own excavators, loaders, dump trucks and vacuum truck",
      "Trench and drill under one contractor",
      "Restoration handled in-house, so the job closes out clean",
    ],
    faqs: [
      {
        q: "Is water and sewer work considered underground utility work?",
        a: "Yes. Water main, sanitary sewer and force main are core underground utility work, and AIM is a Florida Certified Underground Utility Contractor (CUC1226535).",
      },
      {
        q: "Can AIM do both the open-cut and the bored sections?",
        a: "Yes. We do open-cut trenching and horizontal directional drilling, so one contractor can handle both on the same job.",
      },
      {
        q: "Where does AIM work?",
        a: SERVICE_AREA_COMMERCIAL,
      },
    ],
  },
  {
    slug: "ductbank",
    projects: ["port-of-miami", "virginia-key-phase3", "ft-lauderdale-police", "fpl-turkey-point", "miami-beach-ductbank", "team-fishel-fpl"],
    side: "commercial",
    path: "/services/ductbank",
    nav: "Ductbank",
    title: "Electrical & Telecom Ductbank Contractor in South Florida",
    metaTitle: "Ductbank Contractor in Miami & South Florida | AIM Construction",
    metaDescription:
      "Concrete-encased electrical and telecom ductbank, conduit, utility structures and cable pulling for electrical contractors and GCs. Based in Miami Lakes, Florida.",
    image: "/img/projects-bg.jpg",
    kicker: "Commercial",
    intro:
      "AIM builds electrical and telecom ductbank for electrical contractors and general contractors: trenching, conduit installation, concrete encasement, utility structures and cable pulling, with directional drilling where open-cut won't work.",
    bullets: [
      "Concrete-encased electrical ductbank",
      "Telecom conduit and ductbank",
      "Utility structures",
      "Cable pulling",
      "Directional drilling where trenching isn't practical",
      "Concrete and asphalt restoration",
    ],
    why: [
      "Florida Certified Underground Utility Contractor (CUC1226535)",
      "Regular ductbank work for South Florida electrical contractors",
      "Trenching and drilling crews and equipment in-house",
      "Restoration handled in-house",
    ],
    faqs: [
      {
        q: "Does AIM work as a subcontractor to electrical contractors?",
        a: "Yes. Much of our ductbank work is for electrical contractors and general contractors. Send the drawings and we will review and price the underground scope.",
      },
      {
        q: "Can AIM bore conduit instead of trenching?",
        a: "Yes. We drill from 2″ to 24″, so road and driveway crossings can be bored instead of cut.",
      },
      {
        q: "Where does AIM work?",
        a: SERVICE_AREA_COMMERCIAL,
      },
    ],
  },
  {
    slug: "restoration",
    projects: ["port-everglades-2025"],
    side: "commercial",
    path: "/services/restoration",
    nav: "Restoration",
    title: "Concrete & Asphalt Restoration for Utility Work",
    metaTitle: "Concrete & Asphalt Restoration in Miami & South Florida | AIM Construction",
    metaDescription:
      "Concrete and asphalt restoration after utility installation: sidewalks, driveways, curbs and pavement patches. Underground utility contractor based in Miami Lakes, Florida.",
    image: "/img/about-bg.jpg",
    kicker: "Commercial",
    intro:
      "After the pipe or conduit is in, AIM restores the site: concrete sidewalks, driveways and curbs, and asphalt pavement patches, so the job is closed out by the same contractor that dug it.",
    bullets: [
      "Concrete sidewalks, driveways and curbs",
      "Asphalt pavement restoration",
      "Restoration after trenching and boring",
      "Bridge attachments",
    ],
    why: [
      "One contractor from excavation to final restoration",
      "Florida Certified Underground Utility Contractor (CUC1226535)",
      "Florida Certified Building Contractor (CBC1263235)",
    ],
    faqs: [
      {
        q: "Does AIM do restoration on its own utility work?",
        a: "Yes. We restore concrete and asphalt on our own trenching and boring jobs, so there is no hand-off to another contractor.",
      },
      {
        q: "Where does AIM work?",
        a: SERVICE_AREA_COMMERCIAL,
      },
    ],
  },

  /* ---------------- RESIDENTIAL ---------------- */
  {
    slug: "kitchen-remodeling",
    side: "residential",
    path: "/residential/kitchen-remodeling",
    nav: "Kitchen Remodeling",
    title: "Kitchen Remodeling in Miami Lakes & South Florida",
    metaTitle: "Kitchen Remodeling in Miami Lakes & South Florida | AIM Construction",
    metaDescription:
      "Full kitchen remodels: layout changes, cabinets, countertops, backsplash, lighting and appliances. Licensed, insured and permitted. Based in Miami Lakes, FL.",
    image: "/img/working-site.webp",
    kicker: "Residential",
    intro:
      "AIM Construction Management remodels kitchens across South Florida, from cabinet and countertop updates to full layout changes. We pull the permits, schedule the licensed trades and run the job start to finish.",
    bullets: [
      "Layout changes and full gut remodels",
      "Cabinets and countertops",
      "Backsplash and tile",
      "Lighting and electrical (Florida-licensed electricians)",
      "Plumbing for sinks and appliances (Florida-licensed plumbers)",
      "Flooring, drywall and paint",
    ],
    why: [
      "Florida Certified Building Contractor (CBC1263235)",
      "Permits pulled and inspections passed",
      "One contractor managing every trade",
      "Clear written estimate after a site visit",
    ],
    faqs: [
      {
        q: "Do you pull permits for kitchen remodels?",
        a: "Yes. We pull the permits, schedule the inspections and coordinate the plumbing and electrical, which is done by Florida-licensed trade contractors.",
      },
      {
        q: "How do I get an estimate?",
        a: "Send the address, what you want done and a few photos through our quote form. We'll set up a site visit and give you a clear written estimate.",
      },
      {
        q: "Where do you work?",
        a: SERVICE_AREA_RESIDENTIAL,
      },
    ],
  },
  {
    slug: "bathroom-remodeling",
    side: "residential",
    path: "/residential/bathroom-remodeling",
    nav: "Bathroom Remodeling",
    title: "Bathroom Remodeling in Miami Lakes & South Florida",
    metaTitle: "Bathroom Remodeling in Miami Lakes & South Florida | AIM Construction",
    metaDescription:
      "Bathroom remodels from tub-to-shower conversions to complete gut renovations. Licensed, insured and permitted. Based in Miami Lakes, FL.",
    image: "/img/working-site.webp",
    kicker: "Residential",
    intro:
      "AIM remodels bathrooms across South Florida, from tub-to-shower conversions to complete gut renovations, with permits, licensed plumbing and electrical, and one contractor running the job.",
    bullets: [
      "Tub-to-shower conversions",
      "Complete gut renovations",
      "Tile showers, floors and walls",
      "Vanities, fixtures and lighting",
      "Plumbing by Florida-licensed plumbers",
      "Drywall and paint",
    ],
    why: [
      "Florida Certified Building Contractor (CBC1263235)",
      "Permits pulled and inspections passed",
      "One contractor managing every trade",
      "Clear written estimate after a site visit",
    ],
    faqs: [
      {
        q: "Can you convert a tub to a walk-in shower?",
        a: "Yes. Tub-to-shower conversions are one of the most common bathroom jobs we do, including the plumbing changes, which are done by Florida-licensed plumbers under permit.",
      },
      {
        q: "How do I get an estimate?",
        a: "Send the address, what you want done and a few photos through our quote form. We'll set up a site visit and give you a clear written estimate.",
      },
      {
        q: "Where do you work?",
        a: SERVICE_AREA_RESIDENTIAL,
      },
    ],
  },
  {
    slug: "roofing",
    side: "residential",
    path: "/residential/roofing",
    nav: "Roofing",
    title: "Roof Replacement & Repair in South Florida",
    metaTitle: "Roof Replacement & Repair in Miami Lakes & South Florida | AIM Construction",
    metaDescription:
      "Roof replacements and repairs: shingle, tile, metal and flat roofs, performed by Florida-licensed roofing contractors under permit and managed by AIM Construction.",
    image: "/img/working-site.webp",
    kicker: "Residential",
    intro:
      "AIM manages roof replacements and repairs for South Florida homeowners: shingle, tile, metal and flat roofs. Roofing work is performed by Florida-licensed roofing contractors under permit, with AIM coordinating the job from estimate to final inspection.",
    bullets: [
      "Full roof replacements",
      "Roof repairs",
      "Shingle, tile, metal and flat roofs",
      "Permits and inspections",
    ],
    why: [
      "Roofing performed by Florida-licensed roofing contractors",
      "Managed by a Florida Certified Building Contractor (CBC1263235)",
      "Permits pulled and inspections passed",
      "Clear written estimate after a site visit",
    ],
    faqs: [
      {
        q: "Who does the roofing work?",
        a: "Roofing is performed by Florida-licensed roofing contractors under permit. AIM manages the job: estimate, permit, scheduling and final inspection.",
      },
      {
        q: "What kinds of roofs do you handle?",
        a: "Shingle, tile, metal and flat roofs, both replacements and repairs.",
      },
      {
        q: "Where do you work?",
        a: SERVICE_AREA_RESIDENTIAL,
      },
    ],
  },
  {
    slug: "home-remodeling",
    side: "residential",
    path: "/residential/home-remodeling",
    nav: "Home Remodeling",
    title: "Home Remodeling & Additions in Miami Lakes & South Florida",
    metaTitle: "Home Remodeling & Additions in Miami Lakes & South Florida | AIM Construction",
    metaDescription:
      "Whole-home renovations, room additions, flooring, painting and drywall. Permitted and inspected work from a Florida Certified Building Contractor based in Miami Lakes.",
    image: "/img/working-site.webp",
    kicker: "Residential",
    intro:
      "AIM handles whole-home renovations and room additions across South Florida, plus the finish work that goes with them: flooring, painting and drywall. Structural changes are permitted and inspected, and every trade is coordinated by one contractor.",
    bullets: [
      "Whole-home renovations",
      "Room additions and structural changes",
      "Tile, luxury vinyl, laminate and wood flooring",
      "Interior and exterior painting",
      "Drywall repair, texture and trim",
      "Plumbing, HVAC and electrical by Florida-licensed trade contractors",
    ],
    why: [
      "Florida Certified Building Contractor (CBC1263235)",
      "Permits pulled and inspections passed",
      "One contractor managing every trade",
      "Clear written estimate after a site visit",
    ],
    faqs: [
      {
        q: "Do you handle permits for additions and structural changes?",
        a: "Yes. We pull the permits and schedule the inspections for additions, structural changes and remodels.",
      },
      {
        q: "Do you do smaller jobs like flooring or painting?",
        a: "Yes. Flooring, painting and drywall can be done on their own or as part of a larger remodel.",
      },
      {
        q: "Where do you work?",
        a: SERVICE_AREA_RESIDENTIAL,
      },
    ],
  },
];

export function getServicePage(path) {
  return SERVICE_PAGES.find((p) => p.path === path);
}
