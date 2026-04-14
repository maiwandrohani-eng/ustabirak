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
          heading: "Why choose UstayaBirak for Handyman work?",
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
          heading: "Why choose UstayaBirak for Cleaning?",
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
          heading: "Why choose UstayaBirak for furniture assembly?",
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
            "From TV wall mounts to ceiling fans and everything in between, UstayaBirak Taskers handle all types of mounting and installation jobs.",
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
          heading: "Why choose UstayaBirak for Mounting?",
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
          heading: "Why choose UstayaBirak for Moving?",
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
          heading: "Why choose UstayaBirak for Yardwork?",
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
          heading: "Why choose UstayaBirak for Shopping & Delivery?",
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
          heading: "Why choose UstayaBirak for Virtual Tasks?",
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
          heading: "Why choose UstayaBirak for Painting?",
          paragraphs: [
            "Every Tasker brings professional-grade tools, brushes, and rollers. They prep carefully, paint precisely, and clean up completely.",
            "Read verified reviews from real homeowners and see photos of previous work before you book.",
          ],
        },
      ],
    },
  },
};
