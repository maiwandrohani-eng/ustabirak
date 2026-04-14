export interface ServiceSection {
  heading: string;
  paragraphs: string[];
  list?: Array<{ label: string; text: string }>;
}

export interface ServiceDetailData {
  id: string;
  emoji: string;
  title: string;
  category: string;
  tagline: string;
  heroGradient: string;
  accentBg: string;
  catId: string;
  body: {
    intro: string;
    sections: ServiceSection[];
  };
}

export const SERVICE_DETAILS: Record<string, ServiceDetailData> = {
  "Handyman": {
    id: "handyman",
    emoji: "🔧",
    title: "Handyman Services",
    category: "Handyman",
    tagline: "Need help around the house? Hire a trusted Tasker to tackle your to-do list — from repairs to installations.",
    heroGradient: "linear-gradient(150deg, #6e4c2a 0%, #c4773a 50%, #e8a660 100%)",
    accentBg: "linear-gradient(135deg, #fff4e8 0%, #fde6c8 100%)",
    catId: "other",
    body: {
      intro: "From fixing a leaky faucet to hanging shelves, our verified Taskers bring tools, experience, and professionalism to every job. No task is too big or too small.",
      sections: [
        {
          heading: "Handyman Services",
          paragraphs: [
            "Taskers handle everything from door and cabinet repairs to smart home device installations. Whether you need a quick fix or a full home improvement project completed, we have the right person for you.",
            "Every Tasker is background-checked, reviewed by real customers, and brings their own tools — so you don't have to worry about a thing.",
          ],
        },
        {
          heading: "What can a Handyman help with?",
          paragraphs: ["With a reliable Tasker, your home to-do list gets done quickly and professionally:"],
          list: [
            { label: "Repairs:", text: "Fix doors, cabinets, hinges, locks, and any DIY project gone wrong." },
            { label: "Installations:", text: "Appliance setup, smart home devices, shelving, and organizers." },
            { label: "Maintenance:", text: "Drywall patching, caulking, weatherstripping, and general upkeep." },
            { label: "Carpentry:", text: "Light woodwork, trimming, framing, and finishing touches." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Handyman work?",
          paragraphs: [
            "Every Tasker is vetted and reviewed — you can see their ratings, experience, and hourly rate before booking. No surprises.",
            "Flexible scheduling means you can book for today, tomorrow, or whenever it suits you best.",
          ],
        },
      ],
    },
  },
  "Cleaning": {
    id: "cleaning",
    emoji: "🧹",
    title: "Cleaning Services",
    category: "Cleaning",
    tagline: "Taskers will make your home sparkle! Book professional cleaning in minutes — deep clean, regular, or move-out.",
    heroGradient: "linear-gradient(150deg, #0a6640 0%, #1a9e61 50%, #2ec97a 100%)",
    accentBg: "linear-gradient(135deg, #e8fff4 0%, #c8f0dc 100%)",
    catId: "cleaning",
    body: {
      intro: "Let our professional Taskers do the cleaning so you don't have to. Whether it's a regular tidy-up, a thorough deep clean, or a move-in / move-out clean, we have experienced cleaners ready to help.",
      sections: [
        {
          heading: "Cleaning Services",
          paragraphs: [
            "Our Taskers use eco-friendly products and professional-grade equipment to leave your home spotless. From kitchens and bathrooms to living areas and offices — every surface gets attention.",
            "You can book recurring cleanings on a weekly, bi-weekly, or monthly basis, or a one-time clean whenever you need it.",
          ],
        },
        {
          heading: "Types of cleaning we offer",
          paragraphs: ["Our Taskers cover everything from a quick tidy to a full deep clean:"],
          list: [
            { label: "Regular Cleaning:", text: "Dusting, vacuuming, mopping, and wiping down surfaces." },
            { label: "Deep Cleaning:", text: "Inside appliances, grout scrubbing, and hard-to-reach spots." },
            { label: "Move-In / Move-Out:", text: "Thorough cleaning to meet landlord or buyer standards." },
            { label: "Office Cleaning:", text: "Desks, common areas, kitchens, and sanitizing high-touch surfaces." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Cleaning?",
          paragraphs: [
            "All Taskers are background-checked and reviewed. You pick your preferred Tasker and build a relationship with a cleaner you trust.",
            "Eco-friendly products are available on request — great for families with children or pets.",
          ],
        },
      ],
    },
  },
  "Furniture Assembly": {
    id: "furniture-assembly",
    emoji: "🪑",
    title: "Furniture Assembly",
    category: "Handyman",
    tagline: "Need someone to put together furniture? Hire a Tasker to assemble it and leave the building to them.",
    heroGradient: "linear-gradient(150deg, #8B6914 0%, #D4A843 50%, #F0C04E 100%)",
    accentBg: "linear-gradient(135deg, #fffbea 0%, #faefc0 100%)",
    catId: "other",
    body: {
      intro: "Let's be honest — you were never going to read that assembly manual. Taskers will come to your home and assemble your furniture quickly, correctly, and without the stress.",
      sections: [
        {
          heading: "Furniture Assembly Services",
          paragraphs: [
            "Taskers frequently assemble beds, dressers, desks, couches, tables, chairs, wardrobes, and more.",
            "Taskers bring their own tools for quick, efficient assembly — with the option for furniture disassembly and removal as well.",
          ],
        },
        {
          heading: "Official IKEA Assembly Partner",
          paragraphs: [
            "As official furniture assembly partners, Taskers are familiar with popular collections like MALM, KALLAX, and HEMNES. Fill your space with exactly what you want, no matter how complex the build.",
            "Furniture assembly doesn't need to be a hassle. Taskers will put it together in a snap and save you time and effort.",
          ],
        },
        {
          heading: "What furniture can we assemble?",
          paragraphs: ["With a reliable Tasker, you can go from box to beautifully assembled in no time:"],
          list: [
            { label: "For the living room:", text: "Couches, coffee tables, TV stands, and shelving units." },
            { label: "For the bedroom:", text: "Bed frames, dressers, nightstands, and wardrobes." },
            { label: "For the office:", text: "Desks, office chairs, and bookcases." },
            { label: "And everywhere else:", text: "Patio furniture, dining sets, and play equipment." },
          ],
        },
        {
          heading: "Why choose UstaYolda for furniture assembly?",
          paragraphs: [
            "Taskers are experienced, efficient, and reviewed by real customers. You'll find the perfect fit for your project and schedule.",
            "Flexible booking means you can get assembly help the same day — perfect for new home deliveries.",
          ],
        },
      ],
    },
  },
  "Mounting & Installation": {
    id: "mounting-installation",
    emoji: "🖼️",
    title: "Mounting & Installation",
    category: "Mounting & Installation",
    tagline: "TV mounting, shelves, ceiling fans, blinds — hire a Tasker to install it right, first time.",
    heroGradient: "linear-gradient(150deg, #1a3a6e 0%, #2d5fa8 50%, #4a7fd4 100%)",
    accentBg: "linear-gradient(135deg, #eaf0ff 0%, #c8d8ff 100%)",
    catId: "other",
    body: {
      intro: "Don't risk a crooked TV or a shelf that won't hold. Our Taskers have the tools and expertise to mount and install anything securely the first time.",
      sections: [
        {
          heading: "Mounting & Installation Services",
          paragraphs: [
            "From TV wall mounts to ceiling fans and everything in between, UstaYolda Taskers handle all types of mounting and installation jobs.",
            "They use professional-grade hardware and anchors to ensure everything is secure and level — no guessing, no damage.",
          ],
        },
        {
          heading: "What can we mount and install?",
          paragraphs: ["Taskers are experienced with a wide range of installations:"],
          list: [
            { label: "TV Mounting:", text: "Any size TV on any wall type. Includes cable management." },
            { label: "Shelves, Rods & Hooks:", text: "Floating shelves, closet rods, picture rails, and coat hooks." },
            { label: "Ceiling Fans:", text: "Safe installation with proper electrical connections." },
            { label: "Blinds & Window Treatments:", text: "Roller blinds, curtain rods, shutters, and more." },
            { label: "Art, Mirrors & Decor:", text: "Gallery walls, heavy mirrors, and statement pieces hung perfectly." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Mounting?",
          paragraphs: [
            "Every Tasker is reviewed and brings professional tools — drill bits, stud finders, levels, and anchors. No need to buy or borrow anything.",
            "Get same-day availability for urgent installs, or schedule in advance for planned renovations.",
          ],
        },
      ],
    },
  },
  "Moving": {
    id: "moving",
    emoji: "🚚",
    title: "Moving Services",
    category: "Moving",
    tagline: "From heavy lifting to full moves — hire a Tasker to make your move stress-free.",
    heroGradient: "linear-gradient(150deg, #2d4a1a 0%, #4a7a2a 50%, #6aa83a 100%)",
    accentBg: "linear-gradient(135deg, #f0fff0 0%, #c8f0be 100%)",
    catId: "moving",
    body: {
      intro: "Moving is stressful enough — let a Tasker handle the heavy lifting. Whether it's a single item, a full apartment, or just packing help, we have experienced movers ready.",
      sections: [
        {
          heading: "Moving Services",
          paragraphs: [
            "Taskers help with every stage of your move: packing, loading, transporting, unloading, and unpacking. You can book help for the whole job or just the parts you need.",
            "For bigger moves, truck-assisted moving is available. Taskers work with you to ensure everything arrives safely.",
          ],
        },
        {
          heading: "Types of moving help available",
          paragraphs: ["Pick exactly the help you need:"],
          list: [
            { label: "Help Moving:", text: "Hands-on muscle for loading and unloading your truck or van." },
            { label: "Packing & Unpacking:", text: "Careful packing with boxes and materials to protect your belongings." },
            { label: "Furniture Removal:", text: "Remove old or unwanted furniture quickly and safely." },
            { label: "Junk Pickup:", text: "Clear out clutter, old appliances, and anything you don't want to take." },
            { label: "Single-Item Moves:", text: "Move just a couch, mattress, or appliance to another room or location." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Moving?",
          paragraphs: [
            "Our Taskers are reviewed by real customers and experienced with moves of all sizes. You can read reviews, compare hourly rates, and book in minutes.",
            "Same-day and next-day availability means you can get moving help even on short notice.",
          ],
        },
      ],
    },
  },
  "Yardwork": {
    id: "yardwork",
    emoji: "🌿",
    title: "Yardwork Services",
    category: "Yardwork",
    tagline: "Hire a Tasker to help with yardwork and landscaping — lawn care, gardening, and more.",
    heroGradient: "linear-gradient(150deg, #1a4a1a 0%, #2e7a2e 50%, #42a842 100%)",
    accentBg: "linear-gradient(135deg, #f0fff0 0%, #c0ecc0 100%)",
    catId: "other",
    body: {
      intro: "Keep your outdoor spaces looking great without spending your weekends doing it. Our Taskers handle lawn care, gardening, landscaping, and all kinds of yardwork.",
      sections: [
        {
          heading: "Yardwork Services",
          paragraphs: [
            "From regular lawn mowing to one-off seasonal clean-ups, Taskers bring the right tools and know-how for any outdoor job.",
            "Whether you have a small balcony garden or a large backyard, there's a Tasker ready to help it look its best.",
          ],
        },
        {
          heading: "What yardwork can Taskers help with?",
          paragraphs: [],
          list: [
            { label: "Lawn Mowing:", text: "Regular cuts to keep your lawn healthy and tidy." },
            { label: "Gardening:", text: "Planting, weeding, pruning, and general garden care." },
            { label: "Gutter Cleaning:", text: "Remove debris and ensure proper drainage." },
            { label: "Tree & Hedge Trimming:", text: "Shape hedges, trim branches, and remove overgrowth safely." },
            { label: "Leaf Raking:", text: "Seasonal clean-up to keep your yard spotless." },
            { label: "Pressure Washing:", text: "Driveways, patios, decks, and outdoor furniture." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Yardwork?",
          paragraphs: [
            "Book one-time help or set up a regular schedule — weekly, bi-weekly, or monthly. Taskers bring their own tools and leave your yard looking great.",
            "All Taskers are reviewed and rated by real customers. Find someone you trust and keep booking them.",
          ],
        },
      ],
    },
  },
  "Shopping & Delivery": {
    id: "shopping-delivery",
    emoji: "🛒",
    title: "Shopping & Delivery",
    category: "Shopping & Delivery",
    tagline: "Get anything from groceries to furniture delivered to your door — hire a Tasker to run your errands.",
    heroGradient: "linear-gradient(150deg, #4a1a6e 0%, #7a2aa8 50%, #9a4ad4 100%)",
    accentBg: "linear-gradient(135deg, #f8f0ff 0%, #e8d0ff 100%)",
    catId: "other",
    body: {
      intro: "Too busy to run errands? Our Taskers handle grocery shopping, deliveries, waiting in lines, and more — saving you time for what matters most.",
      sections: [
        {
          heading: "Shopping & Delivery Services",
          paragraphs: [
            "From a quick grocery run to large furniture deliveries, Taskers get it done efficiently. You can communicate in real time and they'll keep you updated every step of the way.",
            "Contactless delivery options are available for added peace of mind.",
          ],
        },
        {
          heading: "What can a Tasker pick up or deliver?",
          paragraphs: [],
          list: [
            { label: "Grocery Shopping:", text: "Fresh produce, household staples, and specialty items from any store." },
            { label: "Running Errands:", text: "Post office, pharmacy, dry cleaning, and more." },
            { label: "Furniture Delivery:", text: "Pick up and deliver large items that won't fit in your car." },
            { label: "Wait in Line:", text: "Let a Tasker queue for you — event tickets, government offices, and more." },
            { label: "Pet & Baby Supplies:", text: "Pet food, formula, nappies, and anything else you need." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Shopping & Delivery?",
          paragraphs: [
            "Taskers communicate in real time and can substitute items with your approval — just like having a trusted friend do your shopping.",
            "All Taskers are background-checked and reviewed. You can trust them with your home and your errands.",
          ],
        },
      ],
    },
  },
  "Virtual & Online Tasks": {
    id: "virtual-tasks",
    emoji: "💼",
    title: "Virtual & Online Tasks",
    category: "Virtual & Online Tasks",
    tagline: "Virtual assistance, organization, research & more — get expert help without leaving your home.",
    heroGradient: "linear-gradient(150deg, #1a2a4a 0%, #2a4a7a 50%, #3a6aa8 100%)",
    accentBg: "linear-gradient(135deg, #eaf2ff 0%, #c8dcff 100%)",
    catId: "other",
    body: {
      intro: "From administrative support to data research and computer help, our Taskers provide professional virtual assistance that saves you time and effort.",
      sections: [
        {
          heading: "Virtual & Online Task Services",
          paragraphs: [
            "Our Taskers work remotely to take tasks off your plate — from inbox management and scheduling to data entry and online research.",
            "Whether you're a busy professional, a small business owner, or someone who just needs an extra pair of hands, virtual Taskers are ready to help.",
          ],
        },
        {
          heading: "What virtual tasks can we help with?",
          paragraphs: [],
          list: [
            { label: "Virtual Assistant:", text: "Email management, scheduling, calendar organisation, and admin support." },
            { label: "Research:", text: "Product research, competitor analysis, travel research, and more." },
            { label: "Data Entry:", text: "Spreadsheets, databases, contact lists, and document formatting." },
            { label: "Computer Help:", text: "Tech setup, software installs, troubleshooting, and basic IT support." },
            { label: "Organisation:", text: "File organisation, cloud storage setup, and digital decluttering." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Virtual Tasks?",
          paragraphs: [
            "Our virtual Taskers are skilled professionals available on-demand. No long-term commitment — just pay for the hours you need.",
            "Communicate via chat, email, or video call. Taskers are responsive and professional from the first message.",
          ],
        },
      ],
    },
  },
  "Painting": {
    id: "painting",
    emoji: "🎨",
    title: "Painting Services",
    category: "Painting",
    tagline: "Interior, exterior & specialist finishes — hire a professional Tasker to transform your space.",
    heroGradient: "linear-gradient(150deg, #6e1a1a 0%, #a83030 50%, #d45050 100%)",
    accentBg: "linear-gradient(135deg, #fff0f0 0%, #ffd0d0 100%)",
    catId: "painting",
    body: {
      intro: "A fresh coat of paint can transform a room completely. Our Taskers handle everything from prep and priming to final coats — clean, professional, and on time.",
      sections: [
        {
          heading: "Painting Services",
          paragraphs: [
            "Taskers will paint walls, ceilings, moldings, and doors — including full prep (taping, covering furniture, repairing small holes) and thorough cleanup when the job is done.",
            "Whether you want a single accent wall or a complete interior refresh, we have experienced painters ready.",
          ],
        },
        {
          heading: "Types of painting we offer",
          paragraphs: [],
          list: [
            { label: "Interior Painting:", text: "Walls, ceilings, doors, trim, and built-in furniture." },
            { label: "Exterior Painting:", text: "Facades, fences, gates, and outdoor structures." },
            { label: "Wallpapering:", text: "Hanging, replacing, and removing all types of wallpaper." },
            { label: "Accent & Feature Walls:", text: "Bold colours, geometric patterns, and statement finishes." },
            { label: "Wood Staining & Varnishing:", text: "Decks, floors, furniture, and joinery." },
          ],
        },
        {
          heading: "Trending finishes right now",
          paragraphs: [
            "Taskers are experienced with the latest trends: limewash finishes, matte deep tones, Japandi neutrals, and bold jewel-tone accent walls.",
            "Not sure about colour? Taskers can advise on what works best for your space and light.",
          ],
        },
        {
          heading: "Why choose UstaYolda for Painting?",
          paragraphs: [
            "Every Tasker brings professional-grade tools, brushes, and rollers. They prep carefully, paint precisely, and clean up completely.",
            "Read verified reviews from real homeowners and see photos of previous work before you book.",
          ],
        },
      ],
    },
  },
  "Featured Tasks": {
    id: "featured-tasks",
    emoji: "⭐",
    title: "Featured Tasks",
    category: "Featured Tasks",
    tagline: "Let Taskers help tackle your to-do list — the most popular services, booked by thousands every week.",
    heroGradient: "linear-gradient(150deg, #1a1a2e 0%, #2d2d5a 50%, #4a4a8a 100%)",
    accentBg: "linear-gradient(135deg, #f0f0ff 0%, #d8d8ff 100%)",
    catId: "other",
    body: {
      intro: "Not sure where to start? These are the most-booked services on UstaYolda — trusted by thousands of customers every week. Whatever's on your list, a Tasker can handle it.",
      sections: [
        {
          heading: "Most Popular Services",
          paragraphs: [
            "From furniture assembly on delivery day to a spring clean before guests arrive, these are the tasks our customers book most.",
            "All Taskers are background-checked, reviewed, and bring their own tools. Just pick a task and book in minutes.",
          ],
        },
        {
          heading: "Top booked tasks right now",
          paragraphs: [],
          list: [
            { label: "Furniture Assembly:", text: "Same-day assembly for IKEA and all major brands." },
            { label: "Home Repairs:", text: "Fix anything broken — doors, hinges, drywall, and more." },
            { label: "Help Moving:", text: "Experienced movers for any size job." },
            { label: "Yard Work:", text: "Lawn mowing, weeding, and garden care." },
            { label: "Spring Cleaning:", text: "Deep clean every room and start fresh." },
            { label: "TV Mounting:", text: "Secure installation on any wall type." },
            { label: "Hang Art, Mirror & Decor:", text: "Gallery walls, heavy mirrors, and statement pieces." },
            { label: "Electrical Help:", text: "Outlet repairs, light fixtures, and fan installs." },
            { label: "Wait in Line:", text: "Let a Tasker queue for you anywhere." },
          ],
        },
        {
          heading: "Why choose UstaYolda?",
          paragraphs: [
            "Transparent pricing, verified workers, and flexible scheduling — book any task in under 2 minutes.",
            "Not happy? Our satisfaction guarantee means we'll make it right.",
          ],
        },
      ],
    },
  },
  "Moving Services": {
    id: "moving-services",
    emoji: "🚚",
    title: "Moving Services",
    category: "Moving Services",
    tagline: "From heavy lifting to unpacking and organising — make your move stress-free with UstaYolda.",
    heroGradient: "linear-gradient(150deg, #2d4a1a 0%, #4a7a2a 50%, #6aa83a 100%)",
    accentBg: "linear-gradient(135deg, #f0fff0 0%, #c8f0be 100%)",
    catId: "moving",
    body: {
      intro: "Moving is stressful enough — let a Tasker handle the heavy lifting, packing, and everything in between. Whether it's a single item, a full apartment, or just packing help, we have experienced movers ready.",
      sections: [
        {
          heading: "Moving Services",
          paragraphs: [
            "Taskers help with every stage of your move: packing, loading, transporting, unloading, and unpacking. Book help for the whole job or just the parts you need.",
            "For bigger moves, truck-assisted moving is available. Taskers work with you to ensure everything arrives safely.",
          ],
        },
        {
          heading: "Full range of moving help",
          paragraphs: [],
          list: [
            { label: "Help Moving:", text: "Muscle for loading and unloading your truck or van." },
            { label: "Truck Assisted Moving:", text: "Tasker brings a vehicle for a full door-to-door move." },
            { label: "Packing & Unpacking:", text: "Careful packing with materials to protect your belongings." },
            { label: "Heavy Lifting:", text: "Pianos, safes, appliances, and any oversized items." },
            { label: "Junk Pickup:", text: "Clear out old furniture, appliances, and clutter." },
            { label: "Furniture Movers:", text: "Rearrange furniture within your home or office." },
            { label: "Couch & Mattress Removal:", text: "Fast, responsible disposal or donation drop-off." },
            { label: "Storage Unit Moving:", text: "Move in or out of storage with ease." },
            { label: "In-Home Furniture Movers:", text: "Rearrange any room without the heavy lifting." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Moving?",
          paragraphs: [
            "Our Taskers are reviewed by real customers and experienced with moves of all sizes. Compare hourly rates and book in minutes.",
            "Same-day and next-day availability means you can get moving help even on short notice.",
          ],
        },
      ],
    },
  },
  "IKEA Services": {
    id: "ikea-services",
    emoji: "🏢",
    title: "IKEA Services",
    category: "IKEA Services",
    tagline: "Hire a Tasker for all your IKEA needs — assembly, mounting, installation & organisation.",
    heroGradient: "linear-gradient(150deg, #003F88 0%, #0057B7 50%, #006FD6 100%)",
    accentBg: "linear-gradient(135deg, #e8f0ff 0%, #c0d4ff 100%)",
    catId: "other",
    body: {
      intro: "Skip the stress of flat-pack furniture. Our Taskers are experts with every IKEA range — from MALM beds to KALLAX shelving — and will have everything assembled and looking perfect.",
      sections: [
        {
          heading: "IKEA Assembly & Installation",
          paragraphs: [
            "Taskers are familiar with popular IKEA collections like MALM, KALLAX, HEMNES, PAX, BILLY, and BESTA. Whatever you order, they'll put it together correctly and efficiently.",
            "They bring all the tools needed and can handle instructions in any language — so you don't need to figure out a single diagram.",
          ],
        },
        {
          heading: "What IKEA services do we offer?",
          paragraphs: [],
          list: [
            { label: "Furniture Assembly:", text: "Beds, wardrobes, desks, sofas, tables, shelving — any IKEA product." },
            { label: "Light Installation:", text: "Install IKEA light fixtures, smart bulbs, and pendant lights." },
            { label: "Furniture Removal:", text: "Remove and dispose of old furniture before your new pieces arrive." },
            { label: "Smart Home Installation:", text: "Set up IKEA Tradfri smart home devices and smart storage." },
            { label: "Organisation:", text: "Set up PAX wardrobes, KALLAX inserts, and storage systems." },
            { label: "General Mounting:", text: "Wall mount IKEA mirrors, shelves, and cabinets securely." },
          ],
        },
        {
          heading: "Why choose UstaYolda for IKEA?",
          paragraphs: [
            "Our Taskers have assembled hundreds of IKEA products and know every quirk. They work quickly, accurately, and clean up when done.",
            "Book same-day or schedule around your IKEA delivery — flexible timing to suit you.",
          ],
        },
      ],
    },
  },
  "Office Services": {
    id: "office-services",
    emoji: "🏢",
    title: "Office Services",
    category: "Office Services",
    tagline: "Hire a Tasker to help around the office — cleaning, setup, moving, tech & more.",
    heroGradient: "linear-gradient(150deg, #1a2a3a 0%, #2a4a6e 50%, #3a6a9a 100%)",
    accentBg: "linear-gradient(135deg, #eaf4ff 0%, #c0dcf8 100%)",
    catId: "other",
    body: {
      intro: "Keep your office running smoothly. From regular cleaning and furniture assembly to tech setup and office moves, UstaYolda Taskers are ready to help your workplace look and work its best.",
      sections: [
        {
          heading: "Office Services",
          paragraphs: [
            "Our Taskers handle all types of office tasks — whether you need a one-off deep clean before a client visit or ongoing weekly help keeping the space tidy.",
            "For office moves and reconfigurations, Taskers can disassemble, move, and reassemble workstations, desks, and storage units.",
          ],
        },
        {
          heading: "What office tasks can Taskers help with?",
          paragraphs: [],
          list: [
            { label: "Office Cleaning:", text: "Regular or deep cleaning of desks, floors, kitchens, and bathrooms." },
            { label: "Office Tech Setup:", text: "Computer monitors, printers, cabling, and peripherals." },
            { label: "Office Movers:", text: "Pack, move, and set up your office in the new location." },
            { label: "Office Supply & Snack Delivery:", text: "Regular restocking of stationery, coffee, and kitchen essentials." },
            { label: "Office Furniture Assembly:", text: "Desks, chairs, storage units, and shelving systems." },
            { label: "Office Setup & Organisation:", text: "Cable management, filing systems, and storage optimisation." },
            { label: "Office Interior Design:", text: "Advise on layout, plants, and creating a productive workspace." },
            { label: "Office Mounting:", text: "Whiteboards, TVs, display screens, and signage." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Office Services?",
          paragraphs: [
            "Flexible bookings — early morning, evenings, or weekends so your operations aren't disrupted.",
            "All Taskers are background-checked and experienced. You can book recurring help or a one-time job.",
          ],
        },
      ],
    },
  },
  "Baby Prep": {
    id: "baby-prep",
    emoji: "👶",
    title: "Baby Prep",
    category: "Baby Prep",
    tagline: "Set up the nursery, childproof your home, and get ready for your new arrival with a trusted Tasker.",
    heroGradient: "linear-gradient(150deg, #a04a80 0%, #c870a8 50%, #e890c8 100%)",
    accentBg: "linear-gradient(135deg, #fff0f8 0%, #ffd8f0 100%)",
    catId: "other",
    body: {
      intro: "Getting ready for a new baby is exciting — and overwhelming. Let a Tasker take care of the practical side so you can focus on the fun parts.",
      sections: [
        {
          heading: "Baby Prep Services",
          paragraphs: [
            "Taskers help you get your home ready for your new arrival: assembling nursery furniture, installing safety gates, baby-proofing every room, and even organising the nursery.",
            "Whether your due date is weeks away or days away, we can get a Tasker to you quickly.",
          ],
        },
        {
          heading: "How can we help you prepare?",
          paragraphs: [],
          list: [
            { label: "Baby Proofing:", text: "Safety gates, cabinet locks, outlet covers, corner guards, and anchoring furniture." },
            { label: "Nursery Assembly:", text: "Cots, changing tables, wardrobes, shelves, and rocking chairs." },
            { label: "Organise a Room:", text: "Set up nursery storage, organise baby clothes, and create a functional space." },
            { label: "Smart Home Installation:", text: "Baby monitors, smart locks, and automated lighting for peace of mind." },
            { label: "Painting:", text: "Paint the nursery in your chosen colours with safe, low-VOC paint." },
            { label: "Shopping & Delivery:", text: "Pick up last-minute essentials — formula, nappies, and baby supplies." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Baby Prep?",
          paragraphs: [
            "Every Tasker is background-checked. We understand how important trust is when preparing your home for a new family member.",
            "Book quickly and flexibly — even same-day for urgent jobs before your due date.",
          ],
        },
      ],
    },
  },
  "Holidays": {
    id: "holidays",
    emoji: "🎁",
    title: "Holiday Help",
    category: "Holidays",
    tagline: "Gift wrapping, Christmas lights, tree delivery, holiday decorating — let a Tasker make the season magical.",
    heroGradient: "linear-gradient(150deg, #8B1a1a 0%, #c03030 50%, #e05050 100%)",
    accentBg: "linear-gradient(135deg, #fff0f0 0%, #ffd0cc 100%)",
    catId: "other",
    body: {
      intro: "The holiday season is meant to be enjoyed — not spent untangling lights or fighting with wrapping paper. Let a Tasker handle the decorating, delivering, and clearing up so you can focus on the festive fun.",
      sections: [
        {
          heading: "Holiday Services",
          paragraphs: [
            "Whether you want your home to look like a winter wonderland or just need a hand with the heavy lifting, our Taskers are here to help every step of the holiday season.",
            "From hanging outdoor lights to gift wrapping, Taskers bring the skills and enthusiasm to make your holidays stress-free.",
          ],
        },
        {
          heading: "Holiday tasks we can help with",
          paragraphs: [],
          list: [
            { label: "Gift Wrapping:", text: "Beautiful, professional wrapping for any number of gifts." },
            { label: "Hang Christmas Lights:", text: "Indoor and outdoor lights hung safely and neatly." },
            { label: "Christmas Tree Delivery:", text: "Pick up and deliver your fresh or artificial tree." },
            { label: "Holiday Decorating:", text: "Full home decoration — mantelpiece, table settings, outdoor displays." },
            { label: "Party Cleaning:", text: "Before and after party clean-up so you don't have to." },
            { label: "Toy Assembly Service:", text: "Build gifts before the big day — no surprises on Christmas morning." },
            { label: "Christmas Tree Removal:", text: "Take down, pack up, and dispose of your tree after the season." },
          ],
        },
        {
          heading: "Why choose UstaYolda for the Holidays?",
          paragraphs: [
            "Book in advance and lock in your preferred date — holiday slots fill up fast.",
            "All Taskers are reviewed and reliable. No last-minute cancellations ruining your plans.",
          ],
        },
      ],
    },
  },
  "Winter Tasks": {
    id: "winter-tasks",
    emoji: "❄️",
    title: "Winter Tasks",
    category: "Winter Tasks",
    tagline: "Get help with winter tasks — snow removal, winterization, pipe insulation, and more.",
    heroGradient: "linear-gradient(150deg, #1a3a5a 0%, #2a5a8a 50%, #3a7abf 100%)",
    accentBg: "linear-gradient(135deg, #eaf4ff 0%, #c0dcff 100%)",
    catId: "other",
    body: {
      intro: "Winter brings its own set of challenges. Our Taskers are ready to clear snow, winterise your home, service your heating, and make sure you're safe and warm all season long.",
      sections: [
        {
          heading: "Winter Task Services",
          paragraphs: [
            "From first snowfall to the last frost, Taskers handle every seasonal task so you stay comfortable, safe, and prepared.",
            "Book recurring snow removal, one-off pipe insulation before a cold snap, or anything in between.",
          ],
        },
        {
          heading: "Winter tasks Taskers can handle",
          paragraphs: [],
          list: [
            { label: "Snow Removal:", text: "Driveways, pathways, steps, and rooftops cleared safely." },
            { label: "Sidewalk Salting:", text: "Ice prevention and de-icing for safety." },
            { label: "Window Winterization:", text: "Seal draughts, add insulating film, and weatherstrip windows." },
            { label: "AC Winterization:", text: "Cover and protect AC units from frost and moisture damage." },
            { label: "Pipe Insulation:", text: "Insulate exposed pipes to prevent freezing and bursting." },
            { label: "Storm Door Installation:", text: "Add a storm door for extra insulation and weather protection." },
            { label: "Water Heater Maintenance:", text: "Flush and service your water heater before cold weather hits." },
            { label: "Winter Yardwork:", text: "Cut back plants, mulch beds, and prepare your garden for winter." },
            { label: "Winter Deck Maintenance:", text: "Seal and protect decking from moisture and frost damage." },
            { label: "Christmas Tree Removal:", text: "Take down and dispose of trees after the holidays." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Winter Tasks?",
          paragraphs: [
            "Book recurring snow removal and never worry about shovelling again. Taskers show up reliably — even in bad weather.",
            "One-off jobs or regular seasonal help — book exactly what you need.",
          ],
        },
      ],
    },
  },
  "Personal Assistant": {
    id: "personal-assistant",
    emoji: "🙋",
    title: "Personal Assistant",
    category: "Personal Assistant",
    tagline: "Hire a Tasker to be your personal assistant — errands, organisation, admin & more on an hourly or ongoing basis.",
    heroGradient: "linear-gradient(150deg, #3a1a6e 0%, #6a2aa8 50%, #9a4ae0 100%)",
    accentBg: "linear-gradient(135deg, #f4f0ff 0%, #ddd0ff 100%)",
    catId: "other",
    body: {
      intro: "Busy schedule? A personal assistant Tasker takes the load off. Whether you need ongoing weekly support or help with a one-off project, we have organised, reliable Taskers ready.",
      sections: [
        {
          heading: "Personal Assistant Services",
          paragraphs: [
            "Think of your Tasker as a trusted right-hand person — someone who handles the practical side of your life so you have more time for what matters.",
            "From running errands and organising your home to scheduling and light admin, personal assistant Taskers are flexible and professional.",
          ],
        },
        {
          heading: "What can a Personal Assistant Tasker do?",
          paragraphs: [],
          list: [
            { label: "Running Errands:", text: "Post office, pharmacy, dry cleaning, returns, and shopping." },
            { label: "Wait in Line:", text: "Queue for permits, tickets, government offices, and appointments." },
            { label: "Home Organisation:", text: "Declutter and organise any room, cupboard, or garage." },
            { label: "Closet Organisation:", text: "Sort, categorise, and create a wardrobe system that works for you." },
            { label: "Interior Design:", text: "Advice on layout, styling, and sourcing pieces to refresh your space." },
            { label: "Virtual Assistant:", text: "Email triage, calendar management, bookings, and admin support." },
          ],
        },
        {
          heading: "Why choose UstaYolda for a Personal Assistant?",
          paragraphs: [
            "Find a Tasker you click with and book them regularly — build a working relationship with someone who knows how you like things done.",
            "Flexible hourly rates with no long-term contracts. Book for a few hours or set up a weekly arrangement.",
          ],
        },
      ],
    },
  },
  "Contactless Tasks": {
    id: "contactless-tasks",
    emoji: "📦",
    title: "Contactless Tasks",
    category: "Contactless Tasks",
    tagline: "No-contact delivery, shopping & errands — get things done safely without any in-person interaction.",
    heroGradient: "linear-gradient(150deg, #1a4a4a 0%, #2a7a7a 50%, #3aacac 100%)",
    accentBg: "linear-gradient(135deg, #e8ffff 0%, #c0f0f0 100%)",
    catId: "other",
    body: {
      intro: "Need help but prefer no direct contact? Our contactless Taskers handle deliveries, shopping, and errands while maintaining safe social distancing — leaving everything at your door.",
      sections: [
        {
          heading: "Contactless Task Services",
          paragraphs: [
            "Taskers complete your errands and deliveries without requiring any in-person interaction. They communicate via the app and leave items at a designated spot.",
            "Perfect for those who are health-conscious, busy, or simply prefer a hands-off experience.",
          ],
        },
        {
          heading: "Contactless tasks we offer",
          paragraphs: [],
          list: [
            { label: "Contactless Delivery:", text: "Any item delivered and left at your door — no contact required." },
            { label: "Prescription Pick-up & Delivery:", text: "Collect and deliver prescriptions from any pharmacy." },
            { label: "Grocery Shopping & Delivery:", text: "Full grocery shop from your list, delivered contactlessly." },
            { label: "Running Errands:", text: "Post office, returns, banking, and any local errand." },
            { label: "Disinfecting Services:", text: "Sanitise high-touch surfaces in your home or office." },
            { label: "Drop Off Donations:", text: "Take donated items to charity shops or collection points." },
            { label: "Yard Work:", text: "Lawn and garden work completed while you stay inside." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Contactless Tasks?",
          paragraphs: [
            "All communications happen through the app — no need to open the door or interact in person.",
            "Taskers are background-checked and reviewed. Trust that your errands are in safe hands.",
          ],
        },
      ],
    },
  },
};
