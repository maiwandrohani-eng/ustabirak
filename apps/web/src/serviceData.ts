export interface ServiceSection {
  heading: string;
  headingTr: string;
  paragraphs: string[];
  paragraphsTr: string[];
  list?: Array<{ label: string; labelTr: string; text: string; textTr: string }>;
}

export interface ServiceDetailData {
  id: string;
  emoji: string;
  title: string;
  titleTr: string;
  category: string;
  categoryTr: string;
  tagline: string;
  taglineTr: string;
  heroGradient: string;
  accentBg: string;
  catId: string;
  body: {
    intro: string;
    introTr: string;
    sections: ServiceSection[];
  };
}

export const SERVICE_DETAILS: Record<string, ServiceDetailData> = {
  "Handyman": {
    id: "handyman",
    emoji: "🔧",
    title: "Handyman",
    titleTr: "Tamirci",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Get a skilled handyman for repairs, fixes, and small jobs around the home — fast and affordable.",
    taglineTr: "Evdeki tamir, düzeltme ve küçük işler için yetenekli bir tamirci — hızlı ve uygun fiyatlı.",
    heroGradient: "linear-gradient(150deg, #1a2a4a 0%, #2a4a8a 50%, #3a6abf 100%)",
    accentBg: "linear-gradient(135deg, #eaf0ff 0%, #c0d0ff 100%)",
    catId: "other",
    body: {
      intro: "From squeaky doors to leaky taps, a skilled handyman can tackle a huge range of home tasks. Book a trusted UstaYolda Tasker and get it sorted today.",
      introTr: "Gıcırdayan kapılardan damlayan musluklara kadar, yetenekli bir tamirci evdeki pek çok işi halledebilir. Güvenilir bir UstaYolda ustası rezervasyonu yapın ve bugün çözün.",
      sections: [
        {
          heading: "Handyman Services",
          headingTr: "Tamirci Hizmetleri",
          paragraphs: [
            "Our handyman Taskers are experienced in a wide range of home repair and maintenance tasks. Whether it's a one-off fix or a list of jobs, they'll get it done efficiently.",
            "Every Tasker is reviewed by customers and background-checked, so you can trust who you're letting into your home.",
          ],
          paragraphsTr: [
            "Tamirci ustalarımız, ev tamir ve bakımında geniş bir deneyime sahiptir. İster tek seferlik bir tamir, ister uzun bir iş listesi olsun, verimli şekilde tamamlanır.",
            "Her usta müşteriler tarafından değerlendirilir ve kimlik doğrulamasından geçirilir; evinize aldığınız kişiye güvenebilirsiniz.",
          ],
        },
        {
          heading: "Common handyman tasks",
          headingTr: "Sık yapılan tamirci işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Furniture Assembly:", labelTr: "Mobilya Montajı:", text: "Flat-pack and freestanding furniture assembled quickly.", textTr: "Demonte ve serbest duran mobilyalar hızlıca monte edilir." },
            { label: "TV & Shelf Mounting:", labelTr: "TV & Raf Montajı:", text: "Safely mount TVs and shelves on any wall type.", textTr: "Her duvar tipinde TV ve raf güvenli şekilde monte edilir." },
            { label: "Door & Window Repairs:", labelTr: "Kapı & Pencere Tamiri:", text: "Fix sticking doors, broken handles, and draughty windows.", textTr: "Sıkışan kapılar, kırık kollar ve sızıntılı pencereler onarılır." },
            { label: "Minor Plumbing:", labelTr: "Küçük Tesisat:", text: "Fix dripping taps, replace washers, and sort minor leaks.", textTr: "Damlayan musluklar, conta değişimi ve küçük sızıntılar giderilir." },
            { label: "Painting & Patching:", labelTr: "Boyama & Alçı Onarımı:", text: "Fill holes, touch up paint, and refresh walls quickly.", textTr: "Delikler doldurulur, boya rötuşu yapılır ve duvarlar yenilenir." },
            { label: "General Repairs:", labelTr: "Genel Tamirat:", text: "Anything else around the house that needs fixing.", textTr: "Evde tamir gerektiren diğer her şey." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Handyman?",
          headingTr: "Tamirci için neden UstaYolda?",
          paragraphs: [
            "Book same-day or schedule in advance — our Taskers fit around your timetable.",
            "Pay only for the time you need. No callout fees, no surprises.",
          ],
          paragraphsTr: [
            "Aynı gün rezervasyon yapın veya önceden planlayın — ustalarımız sizin programınıza uyum sağlar.",
            "Yalnızca ihtiyacınız olan süre için ödeme yapın. Çağrı ücreti yok, sürpriz yok.",
          ],
        },
      ],
    },
  },

  "Cleaning": {
    id: "cleaning",
    emoji: "🧹",
    title: "Cleaning",
    titleTr: "Temizlik",
    category: "Cleaning",
    categoryTr: "Temizlik",
    tagline: "Professional home cleaning — regular, deep, or move-in/out. Book a trusted cleaner today.",
    taglineTr: "Profesyonel ev temizliği — düzenli, derin veya taşınma temizliği. Bugün güvenilir bir temizlikçi rezervasyonu yapın.",
    heroGradient: "linear-gradient(150deg, #0d3320 0%, #1a6640 50%, #2a9960 100%)",
    accentBg: "linear-gradient(135deg, #eafff4 0%, #b0ffd8 100%)",
    catId: "cleaning",
    body: {
      intro: "A clean home is a happy home. Our cleaning Taskers are experienced, reliable, and bring everything they need to leave your space spotless.",
      introTr: "Temiz bir ev, mutlu bir evdir. Temizlik ustalarımız deneyimli ve güvenilirdir; evinizi pırıl pırıl bırakmak için gerekli her şeyi getirir.",
      sections: [
        {
          heading: "Cleaning Services",
          headingTr: "Temizlik Hizmetleri",
          paragraphs: [
            "From a quick tidy to a full deep clean, our Taskers handle all types of home cleaning. They bring their own cleaning products and equipment.",
            "Book a one-time clean or set up a regular schedule — weekly, fortnightly, or monthly.",
          ],
          paragraphsTr: [
            "Hızlı bir düzenden tam kapsamlı derin temizliğe kadar, ustalarımız her türlü ev temizliğini üstlenir. Kendi temizleme ürünleri ve ekipmanlarını getirirler.",
            "Tek seferlik temizlik rezervasyonu yapın veya düzenli bir program oluşturun — haftalık, iki haftada bir veya aylık.",
          ],
        },
        {
          heading: "Types of cleaning we offer",
          headingTr: "Sunduğumuz temizlik türleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Standard Cleaning:", labelTr: "Standart Temizlik:", text: "Regular top-to-bottom clean of all rooms.", textTr: "Tüm odaların düzenli baştan aşağı temizliği." },
            { label: "Deep Cleaning:", labelTr: "Derin Temizlik:", text: "Detailed scrubbing of every surface, corner, and appliance.", textTr: "Her yüzey, köşe ve cihazın detaylı ovularak temizlenmesi." },
            { label: "Move-In / Move-Out Cleaning:", labelTr: "Taşınma Temizliği:", text: "Thorough clean for end of tenancy or before arrival.", textTr: "Kiracılık sonu veya taşınmadan önce kapsamlı temizlik." },
            { label: "Oven Cleaning:", labelTr: "Fırın Temizliği:", text: "Deep clean and degrease your oven inside and out.", textTr: "Fırın içinin ve dışının derinlemesine temizlenmesi ve yağ giderimi." },
            { label: "Window Cleaning:", labelTr: "Cam Temizliği:", text: "Streak-free interior window cleaning.", textTr: "İç mekan pencerelerinin çizik bırakmadan temizlenmesi." },
            { label: "Carpet Cleaning:", labelTr: "Halı Temizliği:", text: "Steam or dry cleaning for fresh, stain-free carpets.", textTr: "Taze ve leke bırakmayan halılar için buhar veya kuru temizlik." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Cleaning?",
          headingTr: "Temizlik için neden UstaYolda?",
          paragraphs: [
            "All cleaners are background-checked and reviewed. You'll get the same high standard every time.",
            "Our Happiness Pledge means if something isn't right, we'll send someone back to fix it — free of charge.",
          ],
          paragraphsTr: [
            "Tüm temizlikçiler kimlik doğrulamasından geçirilir ve değerlendirilir. Her seferinde aynı yüksek standardı elde edersiniz.",
            "Mutluluk Taahhüdümüz, bir şey doğru değilse ücretsiz olarak birisini geri göndereceğimiz anlamına gelir.",
          ],
        },
      ],
    },
  },

  "Furniture Assembly": {
    id: "furniture-assembly",
    emoji: "🪑",
    title: "Furniture Assembly",
    titleTr: "Mobilya Montajı",
    category: "Furniture Assembly",
    categoryTr: "Mobilya Montajı",
    tagline: "Flat-pack furniture assembled stress-free — IKEA, Wayfair, and more. Book a Tasker today.",
    taglineTr: "Demonte mobilyalar stressiz monte edilir — IKEA, Wayfair ve daha fazlası. Bugün bir usta rezervasyonu yapın.",
    heroGradient: "linear-gradient(150deg, #3a1a0a 0%, #7a3a1a 50%, #bf6a2a 100%)",
    accentBg: "linear-gradient(135deg, #fff5e8 0%, #ffd8a0 100%)",
    catId: "other",
    body: {
      intro: "Skip the confusing instructions and missing Allen keys. Our Taskers assemble all types of flat-pack and freestanding furniture quickly and correctly.",
      introTr: "Kafa karıştırıcı talimatlara ve kayıp anahtarlara elveda deyin. Ustalarımız her türlü demonte ve serbest duran mobilyayı hızlı ve doğru şekilde monte eder.",
      sections: [
        {
          heading: "Furniture Assembly Services",
          headingTr: "Mobilya Montaj Hizmetleri",
          paragraphs: [
            "Whether you've just received a delivery or have a pile of flat-pack boxes waiting, our Taskers handle it all — from beds and wardrobes to desks and TV units.",
            "Taskers bring their own tools and work quickly, leaving your home tidy when they're done.",
          ],
          paragraphsTr: [
            "İster yeni bir teslimat aldınız isterse bekleyen bir kutu yığınınız var olsun, ustalarımız her şeyi halleder — yataklardan gardırop ve masalara kadar.",
            "Ustalar kendi aletlerini getirir ve hızlı çalışır; işi bitince evinizi düzenli bırakır.",
          ],
        },
        {
          heading: "What can Taskers assemble?",
          headingTr: "Ustalar neler monte edebilir?",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "IKEA Furniture:", labelTr: "IKEA Mobilyaları:", text: "Any IKEA flat-pack, including PAX, KALLAX, HEMNES, and BILLY.", textTr: "PAX, KALLAX, HEMNES ve BILLY dahil her IKEA demontesi." },
            { label: "Beds & Wardrobes:", labelTr: "Yataklar & Gardıroplar:", text: "Full assembly of bed frames, headboards, and large wardrobes.", textTr: "Yatak çerçeveleri, başlıklar ve büyük gardıropların tam montajı." },
            { label: "Desks & Chairs:", labelTr: "Masalar & Sandalyeler:", text: "Office desks, gaming chairs, and study furniture assembled.", textTr: "Ofis masaları, oyun koltuğu ve çalışma mobilyaları monte edilir." },
            { label: "Shelving & Storage:", labelTr: "Raf & Depolama:", text: "Bookcases, shelving units, and storage systems assembled.", textTr: "Kitaplıklar, raf sistemleri ve depolama üniteleri monte edilir." },
            { label: "Outdoor Furniture:", labelTr: "Dış Mekan Mobilyaları:", text: "Garden sets, barbecues, and outdoor storage assembled.", textTr: "Bahçe setleri, barbekü ve dış mekan depolama üniteleri monte edilir." },
            { label: "Flatpack Disassembly:", labelTr: "Demontaj:", text: "Take apart furniture safely for moving or storage.", textTr: "Taşıma veya depolama için mobilyalar güvenle sökülerek ayrıştırılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Furniture Assembly?",
          headingTr: "Mobilya Montajı için neden UstaYolda?",
          paragraphs: [
            "Taskers are experienced with all major brands and assembly styles. No job is too complex.",
            "Book same-day for urgent deliveries or schedule in advance at a time that suits you.",
          ],
          paragraphsTr: [
            "Ustalar tüm büyük markalar ve montaj stilleriyle deneyimlidir. Hiçbir iş çok karmaşık değil.",
            "Aceleci teslimatlar için aynı gün rezervasyon yapın veya size uygun bir zamanda önceden planlayın.",
          ],
        },
      ],
    },
  },

  "Mounting & Installation": {
    id: "mounting-installation",
    emoji: "🖼️",
    title: "Mounting & Installation",
    titleTr: "Montaj & Kurulum",
    category: "Mounting & Installation",
    categoryTr: "Montaj & Kurulum",
    tagline: "TV mounting, picture rails, shelves, and more — perfectly level, every time.",
    taglineTr: "TV montajı, tablo rayları, raflar ve daha fazlası — her seferinde mükemmel hizalama.",
    heroGradient: "linear-gradient(150deg, #2a1a5a 0%, #4a2a9a 50%, #7a4ade 100%)",
    accentBg: "linear-gradient(135deg, #f4f0ff 0%, #d8c8ff 100%)",
    catId: "other",
    body: {
      intro: "Getting things perfectly straight on a wall is harder than it looks. Our Taskers have the tools and experience to mount anything securely and level — first time.",
      introTr: "Bir duvara bir şeyi mükemmel şekilde düz asmak göründüğünden daha zordur. Ustalarımız her şeyi güvenli ve düzgün şekilde monte etmek için gerekli araçlara ve deneyime sahiptir.",
      sections: [
        {
          heading: "Mounting & Installation Services",
          headingTr: "Montaj & Kurulum Hizmetleri",
          paragraphs: [
            "From a single picture frame to a full gallery wall, from a TV bracket to a towel rail — our Taskers handle all wall mounting and installation jobs with precision.",
            "We work on all wall types including plasterboard, brick, stone, and tile.",
          ],
          paragraphsTr: [
            "Tek bir çerçeveden tam galeri duvara, TV braketten havlu askısına kadar — ustalarımız tüm duvar montaj ve kurulum işlerini hassasiyetle yapar.",
            "Alçıpan, tuğla, taş ve fayans dahil tüm duvar türlerinde çalışırız.",
          ],
        },
        {
          heading: "Mounting & installation tasks",
          headingTr: "Montaj & kurulum işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "TV Mounting:", labelTr: "TV Montajı:", text: "Wall mount a TV on any wall type, including cable management.", textTr: "Her duvar tipinde kablo yönetimi dahilinde TV montajı." },
            { label: "Picture & Mirror Hanging:", labelTr: "Tablo & Ayna Asma:", text: "Hang pictures, mirrors, and wall art perfectly level.", textTr: "Tablo, ayna ve duvar sanatı eserlerini mükemmel şekilde asma." },
            { label: "Shelf Installation:", labelTr: "Raf Kurulumu:", text: "Floating shelves, bracket shelves, and wall storage installed.", textTr: "Duvara monte raflar ve duvar depolama üniteleri kurulumu." },
            { label: "Curtain Rail & Blinds:", labelTr: "Perde Rayı & Stor:", text: "Curtain poles, tracks, Roman blinds, and roller blinds fitted.", textTr: "Perde çubukları, raylar, stor perdeler ve rulo storların takılması." },
            { label: "Bathroom Accessories:", labelTr: "Banyo Aksesuarları:", text: "Towel rails, toilet roll holders, and hooks installed.", textTr: "Havlu askıları, tuvalet kağıdı tutucuları ve kancaların takılması." },
            { label: "Flat Screen & Monitor:", labelTr: "Düz Ekran & Monitör:", text: "Single, dual, or multi-monitor setups mounted at your desk.", textTr: "Tek, çift veya çoklu monitör kurulumu masanıza monte edilir." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Mounting?",
          headingTr: "Montaj için neden UstaYolda?",
          paragraphs: [
            "Taskers use professional spirit levels and wall anchors — no crooked pictures or falling shelves.",
            "All wall types covered. Taskers carry the right fixings for brick, plasterboard, and tile.",
          ],
          paragraphsTr: [
            "Ustalar profesyonel su terazileri ve dübeller kullanır — eğri tablolar veya düşen raflar yok.",
            "Tüm duvar tipleri kapsanır. Ustalar tuğla, alçıpan ve fayans için doğru sabitleyicileri taşır.",
          ],
        },
      ],
    },
  },

  "Moving": {
    id: "moving",
    emoji: "🚛",
    title: "Moving Services",
    titleTr: "Taşıma Hizmetleri",
    category: "Moving",
    categoryTr: "Taşıma",
    tagline: "Local moves, heavy lifting, and packing help — stress-free moving from start to finish.",
    taglineTr: "Yerel taşımacılık, ağır yük taşıma ve paketleme yardımı — baştan sona stressiz taşınma.",
    heroGradient: "linear-gradient(150deg, #1a3a2a 0%, #2a6a4a 50%, #3a9a6a 100%)",
    accentBg: "linear-gradient(135deg, #eafff4 0%, #b0ffd8 100%)",
    catId: "moving",
    body: {
      intro: "Moving home doesn't have to be stressful. Our Taskers provide the muscle — and the care — to get your belongings safely from A to B.",
      introTr: "Ev taşımak stresli olmak zorunda değil. Ustalarımız, eşyalarınızı güvenle A'dan B'ye taşımak için hem kas gücünü hem de özeni sağlar.",
      sections: [
        {
          heading: "Moving Services",
          headingTr: "Taşıma Hizmetleri",
          paragraphs: [
            "Whether you're moving across town or just shifting furniture between rooms, our Taskers are ready to help.",
            "Book a single helper or a full moving team — whatever your move requires.",
          ],
          paragraphsTr: [
            "İster şehrin karşısına taşınıyor olun ister sadece odalar arasında mobilya taşıyor olun, ustalarımız yardıma hazır.",
            "Tek bir yardımcı veya tam bir taşıma ekibi rezervasyonu yapın — taşınmanızın gerektirdiği her şey.",
          ],
        },
        {
          heading: "Moving tasks we help with",
          headingTr: "Yardım ettiğimiz taşıma işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Local Moving:", labelTr: "Yerel Taşıma:", text: "Full-service local moves including loading, transport, and unloading.", textTr: "Yükleme, nakliye ve boşaltma dahil tam hizmetli yerel taşıma." },
            { label: "Heavy Lifting:", labelTr: "Ağır Kaldırma:", text: "Sofas, appliances, pianos — moved safely by experienced Taskers.", textTr: "Koltuklar, beyaz eşyalar, piyano — deneyimli ustalar tarafından güvenle taşınır." },
            { label: "Packing & Unpacking:", labelTr: "Paketleme & Paketi Açma:", text: "Professional packing with protective materials included.", textTr: "Koruyucu malzemeler dahil profesyonel paketleme." },
            { label: "Furniture Disassembly:", labelTr: "Mobilya Demontajı:", text: "Disassemble for the move, reassemble at the new place.", textTr: "Taşıma için söküp yeni yerde tekrar monte etme." },
            { label: "Junk Removal:", labelTr: "Hurda & Çöp Kaldırma:", text: "Clear out unwanted items before or after the move.", textTr: "Taşınmadan önce veya sonra istenmeyen eşyaların temizlenmesi." },
            { label: "Storage Solutions:", labelTr: "Depolama Çözümleri:", text: "Help moving to and from storage, plus loading units.", textTr: "Depoya ve depodan taşıma ile yükleme ünitelerine yardım." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Moving?",
          headingTr: "Taşıma için neden UstaYolda?",
          paragraphs: [
            "All moving Taskers are experienced with fragile items and heavy furniture. Your belongings are in safe hands.",
            "Transparent hourly pricing — no hidden fees or surprise charges on the day.",
          ],
          paragraphsTr: [
            "Tüm taşıma ustaları, kırılgan eşyalar ve ağır mobilyalar konusunda deneyimlidir. Eşyalarınız emin ellerde.",
            "Şeffaf saatlik fiyatlandırma — gün içinde gizli ücret veya sürpriz masraf yok.",
          ],
        },
      ],
    },
  },

  "Moving Services": {
    id: "moving",
    emoji: "🚛",
    title: "Moving Services",
    titleTr: "Taşıma Hizmetleri",
    category: "Moving",
    categoryTr: "Taşıma",
    tagline: "Local moves, heavy lifting, and packing help — stress-free moving from start to finish.",
    taglineTr: "Yerel taşımacılık, ağır yük taşıma ve paketleme yardımı — baştan sona stressiz taşınma.",
    heroGradient: "linear-gradient(150deg, #1a3a2a 0%, #2a6a4a 50%, #3a9a6a 100%)",
    accentBg: "linear-gradient(135deg, #eafff4 0%, #b0ffd8 100%)",
    catId: "moving",
    body: {
      intro: "Moving home doesn't have to be stressful. Our Taskers provide the muscle — and the care — to get your belongings safely from A to B.",
      introTr: "Ev taşımak stresli olmak zorunda değil. Ustalarımız, eşyalarınızı güvenle A'dan B'ye taşımak için hem kas gücünü hem de özeni sağlar.",
      sections: [
        {
          heading: "Moving Services",
          headingTr: "Taşıma Hizmetleri",
          paragraphs: [
            "Whether you're moving across town or just shifting furniture between rooms, our Taskers are ready to help.",
            "Book a single helper or a full moving team — whatever your move requires.",
          ],
          paragraphsTr: [
            "İster şehrin karşısına taşınıyor olun ister sadece odalar arasında mobilya taşıyor olun, ustalarımız yardıma hazır.",
            "Tek bir yardımcı veya tam bir taşıma ekibi rezervasyonu yapın — taşınmanızın gerektirdiği her şey.",
          ],
        },
        {
          heading: "Moving tasks we help with",
          headingTr: "Yardım ettiğimiz taşıma işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Local Moving:", labelTr: "Yerel Taşıma:", text: "Full-service local moves including loading, transport, and unloading.", textTr: "Yükleme, nakliye ve boşaltma dahil tam hizmetli yerel taşıma." },
            { label: "Heavy Lifting:", labelTr: "Ağır Kaldırma:", text: "Sofas, appliances, pianos — moved safely by experienced Taskers.", textTr: "Koltuklar, beyaz eşyalar, piyano — deneyimli ustalar tarafından güvenle taşınır." },
            { label: "Packing & Unpacking:", labelTr: "Paketleme & Paketi Açma:", text: "Professional packing with protective materials included.", textTr: "Koruyucu malzemeler dahil profesyonel paketleme." },
            { label: "Furniture Disassembly:", labelTr: "Mobilya Demontajı:", text: "Disassemble for the move, reassemble at the new place.", textTr: "Taşıma için söküp yeni yerde tekrar monte etme." },
            { label: "Junk Removal:", labelTr: "Hurda & Çöp Kaldırma:", text: "Clear out unwanted items before or after the move.", textTr: "Taşınmadan önce veya sonra istenmeyen eşyaların temizlenmesi." },
            { label: "Storage Solutions:", labelTr: "Depolama Çözümleri:", text: "Help moving to and from storage, plus loading units.", textTr: "Depoya ve depodan taşıma ile yükleme ünitelerine yardım." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Moving?",
          headingTr: "Taşıma için neden UstaYolda?",
          paragraphs: [
            "All moving Taskers are experienced with fragile items and heavy furniture. Your belongings are in safe hands.",
            "Transparent hourly pricing — no hidden fees or surprise charges on the day.",
          ],
          paragraphsTr: [
            "Tüm taşıma ustaları, kırılgan eşyalar ve ağır mobilyalar konusunda deneyimlidir. Eşyalarınız emin ellerde.",
            "Şeffaf saatlik fiyatlandırma — gün içinde gizli ücret veya sürpriz masraf yok.",
          ],
        },
      ],
    },
  },

  "Yardwork": {
    id: "yardwork",
    emoji: "🌿",
    title: "Yardwork",
    titleTr: "Bahçe İşleri",
    category: "Yardwork",
    categoryTr: "Bahçe İşleri",
    tagline: "Lawn mowing, garden clearance, planting, and more — get your outdoor space looking its best.",
    taglineTr: "Çim biçme, bahçe temizliği, dikim ve daha fazlası — dış mekanınızı en iyi haline getirin.",
    heroGradient: "linear-gradient(150deg, #1a3a0a 0%, #2a6a1a 50%, #4aaa2a 100%)",
    accentBg: "linear-gradient(135deg, #f0ffe8 0%, #c0f090 100%)",
    catId: "other",
    body: {
      intro: "Your garden should be a place you enjoy — not a source of stress. UstaYolda Taskers handle all outdoor tasks so you can sit back and enjoy the results.",
      introTr: "Bahçeniz stres kaynağı değil, keyif aldığınız bir yer olmalı. UstaYolda ustaları tüm dış mekan işlerini halleder, siz de sonuçların keyfini çıkarırsınız.",
      sections: [
        {
          heading: "Yardwork Services",
          headingTr: "Bahçe İşleri Hizmetleri",
          paragraphs: [
            "From a simple lawn mow to a full garden overhaul, our Taskers bring the skills and equipment to transform your outdoor space.",
            "Book a one-off job or set up a regular garden maintenance schedule.",
          ],
          paragraphsTr: [
            "Basit bir çim biçmeden tam bahçe yenilemeye kadar, ustalarımız dış mekanınızı dönüştürmek için gereken beceri ve ekipmanı getirir.",
            "Tek seferlik iş rezervasyonu yapın veya düzenli bahçe bakım programı oluşturun.",
          ],
        },
        {
          heading: "Yardwork tasks available",
          headingTr: "Mevcut bahçe işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Lawn Mowing:", labelTr: "Çim Biçme:", text: "Regular mowing and edging to keep your lawn looking neat.", textTr: "Çiminizi düzenli tutmak için düzenli biçme ve kenar düzeltme." },
            { label: "Garden Clearance:", labelTr: "Bahçe Temizliği:", text: "Remove weeds, dead plants, and garden waste efficiently.", textTr: "Yabani otlar, ölü bitkiler ve bahçe atıklarının verimli şekilde kaldırılması." },
            { label: "Hedge Trimming:", labelTr: "Çit Budama:", text: "Neat and shaped hedges and shrubs trimmed to perfection.", textTr: "Çitler ve çalıların mükemmel şekilde düzeltilmesi ve şekillendirilmesi." },
            { label: "Planting & Seeding:", labelTr: "Dikim & Ekim:", text: "Plant flowers, vegetables, trees, or lay fresh turf.", textTr: "Çiçek, sebze, ağaç dikme veya yeni çim serme." },
            { label: "Leaf Blowing & Raking:", labelTr: "Yaprak Toplama:", text: "Clear fallen leaves from lawns, paths, and driveways.", textTr: "Çimlerden, patikalardan ve yollardan düşen yaprakların temizlenmesi." },
            { label: "Pressure Washing:", labelTr: "Basınçlı Yıkama:", text: "Clean driveways, patios, and outdoor surfaces effectively.", textTr: "Yollar, teraslar ve dış mekan yüzeylerinin etkili şekilde temizlenmesi." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Yardwork?",
          headingTr: "Bahçe işleri için neden UstaYolda?",
          paragraphs: [
            "Taskers bring their own tools and equipment — no need to own a lawn mower or hedge trimmer.",
            "Book once or set up a regular schedule. Keep your garden looking great all year.",
          ],
          paragraphsTr: [
            "Ustalar kendi araç ve ekipmanlarını getirir — çim biçme makinesi veya çit makası satın almanıza gerek yok.",
            "Bir kez rezervasyon yapın veya düzenli bir program oluşturun. Bahçenizi yıl boyu harika tutun.",
          ],
        },
      ],
    },
  },

  "Shopping & Delivery": {
    id: "shopping-delivery",
    emoji: "🛒",
    title: "Shopping & Delivery",
    titleTr: "Alışveriş & Teslimat",
    category: "Shopping & Delivery",
    categoryTr: "Alışveriş & Teslimat",
    tagline: "Grocery shopping, errand running, and same-day delivery — done for you by a trusted Tasker.",
    taglineTr: "Market alışverişi, ayak işleri ve aynı gün teslimat — güvenilir bir usta tarafından sizin için yapılır.",
    heroGradient: "linear-gradient(150deg, #1a2a5a 0%, #2a508a 50%, #3a7abf 100%)",
    accentBg: "linear-gradient(135deg, #eaf0ff 0%, #c0d8ff 100%)",
    catId: "other",
    body: {
      intro: "Too busy to run errands? Let a Tasker handle your shopping, deliveries, and day-to-day errands so you can focus on what matters most.",
      introTr: "Ayak işlerini halledecek vaktiniz mi yok? Ustanın alışveriş, teslimat ve günlük işleri halletmesine izin verin, siz de en önemli şeylere odaklanın.",
      sections: [
        {
          heading: "Shopping & Delivery Services",
          headingTr: "Alışveriş & Teslimat Hizmetleri",
          paragraphs: [
            "Our Taskers run errands, do your grocery shop, pick up parcels, and handle deliveries — all on your schedule.",
            "Give them your list and they'll take care of the rest. Receipts and change always returned.",
          ],
          paragraphsTr: [
            "Ustalarımız ayak işlerini yapar, market alışverişinizi halleder, kargolarınızı alır ve teslimatları yönetir — hepsi sizin programınıza göre.",
            "Listelerinizi verin, geri kalanını onlar halleder. Fiş ve üstü her zaman iade edilir.",
          ],
        },
        {
          heading: "Shopping & delivery tasks",
          headingTr: "Alışveriş & teslimat işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Grocery Shopping:", labelTr: "Market Alışverişi:", text: "Shop your full grocery list from any supermarket.", textTr: "Her marketten tam alışveriş listenizi halleder." },
            { label: "Prescription Pick-up:", labelTr: "Reçete Alma:", text: "Collect prescriptions from pharmacies and deliver to your door.", textTr: "Eczanelerden reçete alıp kapınıza teslim eder." },
            { label: "Parcel Sending:", labelTr: "Kargo Gönderme:", text: "Take your parcels to any post office or courier drop-off.", textTr: "Paketlerinizi herhangi bir postaneye veya kargo noktasına götürür." },
            { label: "Alcohol & Convenience:", labelTr: "İçecek & Market:", text: "Same-day delivery from off-licences and corner shops.", textTr: "Alkol satış noktaları ve köşe marketlerinden aynı gün teslimat." },
            { label: "Dry Cleaning Pick-up:", labelTr: "Kuru Temizleme:", text: "Drop off and collect dry cleaning on your behalf.", textTr: "Kuru temizlemeye bırakıp almanızı sizin adınıza yapar." },
            { label: "General Errands:", labelTr: "Genel İşler:", text: "Any errand — bank, post office, returns, and more.", textTr: "Her türlü iş — banka, posta, iade ve daha fazlası." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Shopping?",
          headingTr: "Alışveriş için neden UstaYolda?",
          paragraphs: [
            "Taskers are trusted, background-checked, and reviewed by hundreds of customers. Your shopping is in safe hands.",
            "Book same-day for urgent needs or schedule in advance for regular weekly shops.",
          ],
          paragraphsTr: [
            "Ustalar güvenilir, kimlik doğrulamasından geçirilmiş ve yüzlerce müşteri tarafından değerlendirilmiştir. Alışverişiniz güvende.",
            "Acil ihtiyaçlar için aynı gün rezervasyon yapın veya haftalık düzenli alışverişler için önceden planlayın.",
          ],
        },
      ],
    },
  },

  "Virtual & Online Tasks": {
    id: "virtual-online",
    emoji: "💻",
    title: "Virtual & Online Tasks",
    titleTr: "Sanal & Çevrimiçi Görevler",
    category: "Virtual & Online Tasks",
    categoryTr: "Sanal & Çevrimiçi Görevler",
    tagline: "Online research, admin, data entry, tech support — get virtual help from skilled Taskers.",
    taglineTr: "Çevrimiçi araştırma, yönetim, veri girişi, teknik destek — yetenekli ustalardan sanal yardım alın.",
    heroGradient: "linear-gradient(150deg, #0a2a4a 0%, #1a5a8a 50%, #2a8abf 100%)",
    accentBg: "linear-gradient(135deg, #e8f4ff 0%, #b0d8ff 100%)",
    catId: "other",
    body: {
      intro: "Not every task needs someone at your door. Virtual Taskers handle research, admin, social media, and tech support remotely — saving you time and hassle.",
      introTr: "Her işin kapınıza birinin gelmesine gerek yoktur. Sanal ustalar araştırma, yönetim, sosyal medya ve teknik desteği uzaktan halleder — zaman ve zahmetten tasarruf sağlar.",
      sections: [
        {
          heading: "Virtual & Online Task Services",
          headingTr: "Sanal & Çevrimiçi Görev Hizmetleri",
          paragraphs: [
            "From sorting your inbox to researching your next holiday, virtual Taskers are skilled professionals ready to take work off your plate.",
            "Communicate via the UstaYolda app — no need to be in the same room or even the same city.",
          ],
          paragraphsTr: [
            "Gelen kutunuzu düzenlemekten bir sonraki tatilinizi araştırmaya kadar, sanal ustalar işlerinizi devralmaya hazır yetenekli profesyonellerdir.",
            "UstaYolda uygulaması üzerinden iletişim kurun — aynı odada, hatta aynı şehirde olmanıza gerek yok.",
          ],
        },
        {
          heading: "Virtual tasks available",
          headingTr: "Mevcut sanal görevler",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Online Research:", labelTr: "Çevrimiçi Araştırma:", text: "Product comparisons, travel research, market research, and more.", textTr: "Ürün karşılaştırma, seyahat araştırması, pazar araştırması ve daha fazlası." },
            { label: "Data Entry:", labelTr: "Veri Girişi:", text: "Spreadsheets, databases, and form-filling completed accurately.", textTr: "Elektronik tablolar, veritabanları ve formlar doğru şekilde doldurulur." },
            { label: "Email & Calendar Management:", labelTr: "E-posta & Takvim Yönetimi:", text: "Inbox triage, scheduling, and inbox zero strategies.", textTr: "Gelen kutusu düzenleme, programlama ve sıfır gelen kutusu stratejileri." },
            { label: "Social Media Help:", labelTr: "Sosyal Medya Yardımı:", text: "Content scheduling, comment replies, and basic design work.", textTr: "İçerik programlama, yorum yanıtlama ve temel tasarım çalışmaları." },
            { label: "Tech Support:", labelTr: "Teknik Destek:", text: "Remote help setting up devices, software, and accounts.", textTr: "Cihaz, yazılım ve hesap kurulumu için uzaktan yardım." },
            { label: "Transcription:", labelTr: "Transkripsiyon:", text: "Audio and video transcribed accurately and quickly.", textTr: "Ses ve video hızlı ve doğru şekilde yazıya aktarılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Virtual Tasks?",
          headingTr: "Sanal görevler için neden UstaYolda?",
          paragraphs: [
            "All virtual Taskers are vetted and reviewed. Trust that your work is being handled by a skilled professional.",
            "Flexible bookings — one hour or a full day, whenever you need support.",
          ],
          paragraphsTr: [
            "Tüm sanal ustalar incelenir ve değerlendirilir. İşinizin yetenekli bir profesyonel tarafından yürütüldüğüne güvenin.",
            "Esnek rezervasyonlar — bir saat veya tam gün, ihtiyaç duyduğunuzda destek.",
          ],
        },
      ],
    },
  },

  "Painting": {
    id: "painting",
    emoji: "🎨",
    title: "Painting",
    titleTr: "Boyama",
    category: "Painting",
    categoryTr: "Boyama",
    tagline: "Interior and exterior painting, feature walls, ceilings — professional finish, every time.",
    taglineTr: "İç ve dış cephe boyama, aksan duvarlar, tavanlar — her seferinde profesyonel sonuç.",
    heroGradient: "linear-gradient(150deg, #3a0a1a 0%, #7a1a3a 50%, #bf2a5a 100%)",
    accentBg: "linear-gradient(135deg, #fff0f4 0%, #ffc8d8 100%)",
    catId: "painting",
    body: {
      intro: "A fresh coat of paint can transform any room. Our painting Taskers deliver clean lines, even coverage, and a professional finish — without the mess.",
      introTr: "Taze bir kat boya her odayı dönüştürebilir. Boyama ustalarımız temiz çizgiler, düzgün kaplama ve profesyonel sonuç sunar — dağınıklık olmadan.",
      sections: [
        {
          heading: "Painting Services",
          headingTr: "Boyama Hizmetleri",
          paragraphs: [
            "From a single feature wall to a whole house exterior, our Taskers have the experience and skill to deliver a flawless paint job.",
            "They prepare surfaces, protect floors and furniture, and clean up after — you just enjoy the end result.",
          ],
          paragraphsTr: [
            "Tek bir aksan duvardan tüm binanın dış cephesine kadar, ustalarımız kusursuz bir boya işi sunacak deneyim ve beceriye sahiptir.",
            "Yüzeyleri hazırlarlar, yer ve mobilyaları korurlar ve sonra temizlerler — siz sadece sonucun keyfini çıkarın.",
          ],
        },
        {
          heading: "Types of painting services",
          headingTr: "Boyama hizmetleri türleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Interior Painting:", labelTr: "İç Mekan Boyama:", text: "Walls, ceilings, trims, and doors painted professionally.", textTr: "Duvarlar, tavanlar, süpürgelikler ve kapılar profesyonelce boyanır." },
            { label: "Exterior Painting:", labelTr: "Dış Cephe Boyama:", text: "Weather-resistant exterior paint applied properly.", textTr: "Hava dayanıklı dış cephe boyası uygun şekilde uygulanır." },
            { label: "Feature Walls:", labelTr: "Aksan Duvarlar:", text: "Bold colours or textured finishes for a statement wall.", textTr: "Çarpıcı renkler veya dokulu kaplamalar ile aksan duvar." },
            { label: "Ceiling Painting:", labelTr: "Tavan Boyama:", text: "Ceilings painted cleanly with no drips or mess.", textTr: "Tavanlar damla veya dağınıklık bırakmadan temizce boyanır." },
            { label: "Furniture Painting:", labelTr: "Mobilya Boyama:", text: "Upcycle or refresh furniture with a professional paint job.", textTr: "Mobilyaları yenileyin veya profesyonel boyamayla tazeliğine kavuşturun." },
            { label: "Wallpaper Removal & Prep:", labelTr: "Duvar Kağıdı Sökme & Hazırlık:", text: "Remove old wallpaper and prepare surfaces for painting.", textTr: "Eski duvar kağıdını sökme ve yüzeyleri boyama için hazırlama." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Painting?",
          headingTr: "Boyama için neden UstaYolda?",
          paragraphs: [
            "Professional painters who take pride in their work. Clean lines, no drips, and thorough preparation every time.",
            "They supply their own brushes, rollers, and protective sheeting. You choose the colour.",
          ],
          paragraphsTr: [
            "İşini benimsemiş profesyonel boyacılar. Her seferinde temiz çizgiler, damla yok ve kapsamlı hazırlık.",
            "Kendi fırça, rulo ve koruyucu örtülerini getirirler. Rengi siz seçersiniz.",
          ],
        },
      ],
    },
  },

  "Featured Tasks": {
    id: "featured",
    emoji: "⭐",
    title: "Featured Tasks",
    titleTr: "Öne Çıkan Görevler",
    category: "Featured Tasks",
    categoryTr: "Öne Çıkan Görevler",
    tagline: "Our most popular and top-rated services — handpicked for quality and value.",
    taglineTr: "En popüler ve en yüksek puanlı hizmetlerimiz — kalite ve değer için özenle seçildi.",
    heroGradient: "linear-gradient(150deg, #3a2a0a 0%, #7a5a1a 50%, #cfaa2a 100%)",
    accentBg: "linear-gradient(135deg, #fffbe8 0%, #ffe88a 100%)",
    catId: "other",
    body: {
      intro: "These are the services our customers love most — tried, tested, and consistently top-rated. Whether you're new to UstaYolda or a regular, these are the best place to start.",
      introTr: "Bunlar müşterilerimizin en çok sevdiği hizmetler — denendi, test edildi ve sürekli olarak en yüksek puan aldı. UstaYolda'ya yeni olsanız da düzenli kullanıcı olsanız da başlamak için en iyi yer.",
      sections: [
        {
          heading: "Why these tasks are Featured",
          headingTr: "Bu görevler neden öne çıkıyor?",
          paragraphs: [
            "Featured tasks are selected based on customer reviews, booking volume, and Tasker performance. They represent the very best of what UstaYolda offers.",
            "Each featured category has a dedicated pool of top-rated Taskers ready to help.",
          ],
          paragraphsTr: [
            "Öne çıkan görevler, müşteri yorumları, rezervasyon hacmi ve usta performansına göre seçilir. UstaYolda'nın sunduğu en iyiyi temsil ederler.",
            "Her öne çıkan kategoride yardıma hazır üst düzey ustalar bulunur.",
          ],
        },
        {
          heading: "Most popular featured tasks",
          headingTr: "En popüler öne çıkan görevler",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Furniture Assembly:", labelTr: "Mobilya Montajı:", text: "Fast, stress-free assembly of all flat-pack furniture.", textTr: "Tüm demonte mobilyaların hızlı ve stressiz montajı." },
            { label: "TV Mounting:", labelTr: "TV Montajı:", text: "Perfectly positioned TV wall mounts every time.", textTr: "Her seferinde mükemmel konumlanmış TV duvar montajı." },
            { label: "Cleaning:", labelTr: "Temizlik:", text: "Regular and deep cleaning for homes of all sizes.", textTr: "Her boyuttaki ev için düzenli ve derin temizlik." },
            { label: "Moving Help:", labelTr: "Taşıma Yardımı:", text: "Local moves and heavy lifting made simple.", textTr: "Yerel taşıma ve ağır kaldırma basitleştirildi." },
            { label: "Handyman Repairs:", labelTr: "Tamirci Onarımları:", text: "Quick fixes for the everyday tasks that pile up.", textTr: "Biriken gündelik işler için hızlı çözümler." },
            { label: "Garden Clearance:", labelTr: "Bahçe Temizliği:", text: "One-off garden clear-outs and regular maintenance.", textTr: "Tek seferlik bahçe temizliği ve düzenli bakım." },
          ],
        },
        {
          heading: "Book a featured task today",
          headingTr: "Bugün öne çıkan bir görev rezervasyonu yapın",
          paragraphs: [
            "All featured Taskers maintain a rating of 4.8 stars or above. You're guaranteed outstanding service.",
            "Same-day and next-day slots available. Don't wait — get it done today.",
          ],
          paragraphsTr: [
            "Tüm öne çıkan ustalar 4,8 yıldız veya üzeri puan korur. Olağanüstü hizmet garanti.",
            "Aynı gün ve ertesi gün slotları mevcuttur. Beklemeyin — bugün hallettirin.",
          ],
        },
      ],
    },
  },

  "IKEA Services": {
    id: "ikea-services",
    emoji: "🛋️",
    title: "IKEA Services",
    titleTr: "IKEA Hizmetleri",
    category: "IKEA Services",
    categoryTr: "IKEA Hizmetleri",
    tagline: "IKEA furniture assembly, delivery help, and installation — all handled by expert Taskers.",
    taglineTr: "IKEA mobilya montajı, teslimat yardımı ve kurulum — tümü uzman ustalar tarafından halledilir.",
    heroGradient: "linear-gradient(150deg, #1a2a5a 0%, #003399 50%, #0050cc 100%)",
    accentBg: "linear-gradient(135deg, #eaf0ff 0%, #c0d8ff 100%)",
    catId: "other",
    body: {
      intro: "IKEA furniture shouldn't come with a side of stress. Our Taskers are experts in assembling every IKEA range — from KALLAX to PAX to HEMNES — quickly and correctly.",
      introTr: "IKEA mobilyaları stresle birlikte gelmek zorunda değil. Ustalarımız KALLAX'tan PAX'a, HEMNES'e kadar her IKEA serisini hızlı ve doğru şekilde monte etme konusunda uzmandır.",
      sections: [
        {
          heading: "IKEA Services Available",
          headingTr: "Mevcut IKEA Hizmetleri",
          paragraphs: [
            "Whether you've just come back from IKEA with a car full of flat-pack or you need an entire room furnished, our Taskers handle it all.",
            "They carry their own tools and know IKEA assembly inside-out — no instructions needed.",
          ],
          paragraphsTr: [
            "İster IKEA'dan kolunuzda demonte kutularla döndünüz isterse tüm bir odanın döşenmesi gerekiyor olsun, ustalarımız her şeyi halleder.",
            "Kendi aletlerini taşıyorlar ve IKEA montajını içeriden dışarıya biliyorlar — talimat gerekmez.",
          ],
        },
        {
          heading: "IKEA tasks we cover",
          headingTr: "Üstlendiğimiz IKEA işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "PAX Wardrobe Assembly:", labelTr: "PAX Gardırop Montajı:", text: "Full PAX wardrobe systems assembled and fitted.", textTr: "Tam PAX gardırop sistemleri monte edilir ve kurulur." },
            { label: "KALLAX & BILLY:", labelTr: "KALLAX & BILLY:", text: "Shelving and storage units assembled in any configuration.", textTr: "Herhangi bir konfigürasyonda raf ve depolama üniteleri monte edilir." },
            { label: "HEMNES & MALM Beds:", labelTr: "HEMNES & MALM Yataklar:", text: "Bed frames, storage beds, and headboards built.", textTr: "Yatak çerçeveleri, depolama yatakları ve başlıklar kurulur." },
            { label: "Kitchen Units:", labelTr: "Mutfak Üniteleri:", text: "IKEA kitchen cabinets and units assembled and positioned.", textTr: "IKEA mutfak dolabı ve üniteleri monte edilir ve yerleştirilir." },
            { label: "IKEA Delivery Help:", labelTr: "IKEA Teslimat Yardımı:", text: "Help carry and unbox IKEA deliveries to the right room.", textTr: "IKEA teslimatlarını taşımak ve doğru odaya kutudan çıkarmak için yardım." },
            { label: "Disassembly & Moving:", labelTr: "Demontaj & Taşıma:", text: "Carefully disassemble IKEA furniture for moving or storage.", textTr: "Taşıma veya depolama için IKEA mobilyalarının dikkatle sökülmesi." },
          ],
        },
        {
          heading: "Why choose UstaYolda for IKEA?",
          headingTr: "IKEA için neden UstaYolda?",
          paragraphs: [
            "Our Taskers have assembled hundreds of IKEA pieces. They're fast, accurate, and leave no bolts behind.",
            "Book same-day when your delivery arrives, or schedule in advance for a stress-free setup.",
          ],
          paragraphsTr: [
            "Ustalarımız yüzlerce IKEA parçası monte etmiştir. Hızlı, doğru ve arkalarında hiçbir cıvata bırakmaz.",
            "Teslimatınız geldiğinde aynı gün rezervasyon yapın veya stressiz bir kurulum için önceden planlayın.",
          ],
        },
      ],
    },
  },

  "Office Services": {
    id: "office-services",
    emoji: "🏢",
    title: "Office Services",
    titleTr: "Ofis Hizmetleri",
    category: "Office Services",
    categoryTr: "Ofis Hizmetleri",
    tagline: "Office furniture assembly, IT setup, cleaning, and more — keep your workplace running smoothly.",
    taglineTr: "Ofis mobilya montajı, BT kurulumu, temizlik ve daha fazlası — iş yerinizin sorunsuz çalışmasını sağlayın.",
    heroGradient: "linear-gradient(150deg, #1a1a3a 0%, #2a2a7a 50%, #3a3abf 100%)",
    accentBg: "linear-gradient(135deg, #f0f0ff 0%, #d0d0ff 100%)",
    catId: "other",
    body: {
      intro: "Keep your office or workspace running efficiently. Our Taskers handle everything from furniture assembly and tech setup to cleaning and general maintenance.",
      introTr: "Ofisinizin veya çalışma alanınızın verimli çalışmasını sağlayın. Ustalarımız mobilya montajından teknoloji kurulumuna, temizlikten genel bakıma kadar her şeyi halleder.",
      sections: [
        {
          heading: "Office Services Available",
          headingTr: "Mevcut Ofis Hizmetleri",
          paragraphs: [
            "Whether you're setting up a new office, refreshing an existing space, or need regular maintenance, our Taskers are experienced in commercial and home office environments.",
            "One Tasker can handle multiple tasks in a single visit — saving you time and cost.",
          ],
          paragraphsTr: [
            "İster yeni bir ofis kuruyorsunuz ister mevcut bir alanı tazeliyorsunuz isterse düzenli bakım gerekiyor olsun, ustalarımız ticari ve ev ofisi ortamlarında deneyimlidir.",
            "Bir usta tek ziyarette birden fazla görevi halledebilir — zaman ve maliyet tasarrufu sağlar.",
          ],
        },
        {
          heading: "Office tasks Taskers handle",
          headingTr: "Ustaların üstlendiği ofis görevleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Office Furniture Assembly:", labelTr: "Ofis Mobilya Montajı:", text: "Desks, chairs, shelving, and storage units assembled.", textTr: "Masalar, sandalyeler, raflar ve depolama üniteleri monte edilir." },
            { label: "IT & Tech Setup:", labelTr: "BT & Teknoloji Kurulumu:", text: "Computer setup, cable management, and monitor mounting.", textTr: "Bilgisayar kurulumu, kablo yönetimi ve monitör montajı." },
            { label: "Office Cleaning:", labelTr: "Ofis Temizliği:", text: "Regular or one-off professional office cleans.", textTr: "Düzenli veya tek seferlik profesyonel ofis temizliği." },
            { label: "Moving Office Items:", labelTr: "Ofis Eşyaları Taşıma:", text: "Safely move equipment, furniture, and files within or between offices.", textTr: "Ekipman, mobilya ve dosyaları ofis içinde veya ofisler arası güvenle taşıma." },
            { label: "Wall Mounting:", labelTr: "Duvar Montajı:", text: "Whiteboards, TVs, and art hung professionally.", textTr: "Beyaz tahta, TV'ler ve resimler profesyonelce asılır." },
            { label: "General Maintenance:", labelTr: "Genel Bakım:", text: "Repairs, replacements, and minor works in the office.", textTr: "Ofiste onarımlar, değişimler ve küçük çalışmalar." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Office Services?",
          headingTr: "Ofis hizmetleri için neden UstaYolda?",
          paragraphs: [
            "Taskers are punctual, professional, and discreet — suitable for client-facing and working environments.",
            "Book out of hours for minimal disruption. Early morning and evening bookings available.",
          ],
          paragraphsTr: [
            "Ustalar dakik, profesyonel ve gizli davranır — müşteriye dönük ve çalışma ortamlarına uygundur.",
            "Minimum aksaklık için mesai dışında rezervasyon yapın. Erken sabah ve akşam rezervasyonları mevcuttur.",
          ],
        },
      ],
    },
  },

  "Baby Prep": {
    id: "baby-prep",
    emoji: "👶",
    title: "Baby Prep",
    titleTr: "Bebek Hazırlığı",
    category: "Baby Prep",
    categoryTr: "Bebek Hazırlığı",
    tagline: "Nursery assembly, childproofing, and baby gear setup — get your home ready for the new arrival.",
    taglineTr: "Bebek odası montajı, çocuk güvenliği ve bebek gereçleri kurulumu — yeni üyeniz için evinizi hazırlayın.",
    heroGradient: "linear-gradient(150deg, #3a1a5a 0%, #7a4aaa 50%, #c080e0 100%)",
    accentBg: "linear-gradient(135deg, #f8f0ff 0%, #e8c8ff 100%)",
    catId: "other",
    body: {
      intro: "Getting ready for a new baby is exciting — but the preparation can be overwhelming. Let our Taskers handle the physical side so you can focus on the joy.",
      introTr: "Yeni bir bebek için hazırlanmak heyecan verici — ancak hazırlık bunaltıcı olabilir. Ustalarımız fiziksel işleri halletsin, siz de mutluluğa odaklanın.",
      sections: [
        {
          heading: "Baby Prep Services",
          headingTr: "Bebek Hazırlığı Hizmetleri",
          paragraphs: [
            "From assembling the cot and wardrobe to childproofing cupboards and installing safety gates, our Taskers make your home safe and ready for your new arrival.",
            "Many Taskers are parents themselves and understand what needs to be done before baby arrives.",
          ],
          paragraphsTr: [
            "Bebek yatağı ve gardırop montajından dolap güvenliğine ve emniyet kapılarının kurulumuna kadar, ustalarımız evinizi bebek için güvenli ve hazır hale getirir.",
            "Pek çok usta kendileri de ebeveyn olduğundan, bebek gelmeden önce ne yapılması gerektiğini bilirler.",
          ],
        },
        {
          heading: "Baby prep tasks we handle",
          headingTr: "Üstlendiğimiz bebek hazırlığı görevleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Cot & Nursery Assembly:", labelTr: "Bebek Yatağı & Oda Montajı:", text: "Cots, changing tables, wardrobes, and storage assembled.", textTr: "Bebek yatakları, alt açma masaları, gardıroplar ve depolama üniteleri monte edilir." },
            { label: "Childproofing:", labelTr: "Çocuk Güvenliği:", text: "Cabinet locks, corner guards, and outlet covers installed.", textTr: "Dolap kilitleri, köşe koruyucuları ve priz kapakları takılır." },
            { label: "Safety Gates:", labelTr: "Emniyet Kapıları:", text: "Stair gates and door barriers fitted securely.", textTr: "Merdiven kapıları ve kapı bariyerleri sağlam şekilde kurulur." },
            { label: "Baby Gear Setup:", labelTr: "Bebek Gereçleri Kurulumu:", text: "Prams, high chairs, bouncers, and swings assembled.", textTr: "Arabalar, mama sandalyeleri, bebek salıncakları ve salıncaklar monte edilir." },
            { label: "Nursery Painting:", labelTr: "Bebek Odası Boyama:", text: "Fresh, child-safe paint applied to the nursery.", textTr: "Bebek odasına taze, çocuk güvenli boya uygulanır." },
            { label: "Decluttering & Organising:", labelTr: "Düzenleme & Organizasyon:", text: "Create space and set up the nursery layout perfectly.", textTr: "Yer açın ve bebek odasının düzenini mükemmel şekilde oluşturun." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Baby Prep?",
          headingTr: "Bebek hazırlığı için neden UstaYolda?",
          paragraphs: [
            "Every Tasker is background-checked. We understand how important trust is when preparing your home for a new family member.",
            "Book quickly and flexibly — even same-day for urgent jobs before your due date.",
          ],
          paragraphsTr: [
            "Her usta kimlik doğrulamasından geçirilir. Yeni bir aile üyesi için evinizi hazırlarken güvenin ne kadar önemli olduğunu anlıyoruz.",
            "Hızlı ve esnek rezervasyon yapın — doğum tarihinizden önce acil işler için aynı gün bile.",
          ],
        },
      ],
    },
  },

  "Holidays": {
    id: "holidays",
    emoji: "🎁",
    title: "Holiday Help",
    titleTr: "Tatil & Özel Gün Yardımı",
    category: "Holidays",
    categoryTr: "Tatil & Özel Günler",
    tagline: "Gift wrapping, Christmas lights, tree delivery, holiday decorating — let a Tasker make the season magical.",
    taglineTr: "Hediye paketleme, yılbaşı ışıkları, ağaç teslimatı, tatil süslemesi — bir usta mevsimi büyülü hale getirsin.",
    heroGradient: "linear-gradient(150deg, #8B1a1a 0%, #c03030 50%, #e05050 100%)",
    accentBg: "linear-gradient(135deg, #fff0f0 0%, #ffd0cc 100%)",
    catId: "other",
    body: {
      intro: "The holiday season is meant to be enjoyed — not spent untangling lights or fighting with wrapping paper. Let a Tasker handle the decorating, delivering, and clearing up so you can focus on the festive fun.",
      introTr: "Tatil sezonu, ışıkları çözmek veya ambalaj kağıdıyla boğuşmak için değil, keyif almak için olmalıdır. Bir usta süsleme, teslimat ve temizliği halletsin, siz de şenliğin tadını çıkarın.",
      sections: [
        {
          heading: "Holiday Services",
          headingTr: "Tatil & Özel Gün Hizmetleri",
          paragraphs: [
            "Whether you want your home to look like a winter wonderland or just need a hand with the heavy lifting, our Taskers are here to help every step of the holiday season.",
            "From hanging outdoor lights to gift wrapping, Taskers bring the skills and enthusiasm to make your holidays stress-free.",
          ],
          paragraphsTr: [
            "İster evinizin bir kış masalı gibi görünmesini isteyin isterse ağır yük taşımada yardıma ihtiyaç duyun, ustalarımız tatil sezonunun her adımında yardımcı olmak için burada.",
            "Dış mekan ışıkları asmaktan hediye paketlemeye kadar, ustalar tatili stressiz kılacak beceri ve coşkuyu getirir.",
          ],
        },
        {
          heading: "Holiday tasks we can help with",
          headingTr: "Yardım edebileceğimiz tatil görevleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Gift Wrapping:", labelTr: "Hediye Paketleme:", text: "Beautiful, professional wrapping for any number of gifts.", textTr: "Her sayıda hediye için güzel, profesyonel paketleme." },
            { label: "Hang Christmas Lights:", labelTr: "Yılbaşı Işıkları Asma:", text: "Indoor and outdoor lights hung safely and neatly.", textTr: "İç ve dış mekan ışıkları güvenli ve düzenli şekilde asılır." },
            { label: "Christmas Tree Delivery:", labelTr: "Yılbaşı Ağacı Teslimatı:", text: "Pick up and deliver your fresh or artificial tree.", textTr: "Doğal veya yapay ağacınızı alıp teslim eder." },
            { label: "Holiday Decorating:", labelTr: "Tatil Süslemesi:", text: "Full home decoration — mantelpiece, table settings, outdoor displays.", textTr: "Tam ev dekorasyonu — şömine rafı, sofra düzeni, dış mekan gösterisi." },
            { label: "Party Cleaning:", labelTr: "Parti Temizliği:", text: "Before and after party clean-up so you don't have to.", textTr: "Parti öncesi ve sonrası temizlik, siz yapmak zorunda kalmayın." },
            { label: "Toy Assembly Service:", labelTr: "Oyuncak Montajı:", text: "Build gifts before the big day — no surprises on Christmas morning.", textTr: "Büyük günden önce hediyeleri monte edin — yılbaşı sabahı sürpriz yok." },
            { label: "Christmas Tree Removal:", labelTr: "Yılbaşı Ağacı Kaldırma:", text: "Take down, pack up, and dispose of your tree after the season.", textTr: "Sezon sonrası ağacınızı sökmek, toplamak ve elden çıkarmak." },
          ],
        },
        {
          heading: "Why choose UstaYolda for the Holidays?",
          headingTr: "Tatil için neden UstaYolda?",
          paragraphs: [
            "Book in advance and lock in your preferred date — holiday slots fill up fast.",
            "All Taskers are reviewed and reliable. No last-minute cancellations ruining your plans.",
          ],
          paragraphsTr: [
            "Önceden rezervasyon yapın ve tercih ettiğiniz tarihi kilitleyin — tatil slotları hızla dolar.",
            "Tüm ustalar değerlendirilir ve güvenilirdir. Son dakika iptalleriyle planlarınız mahvolmaz.",
          ],
        },
      ],
    },
  },

  "Winter Tasks": {
    id: "winter-tasks",
    emoji: "❄️",
    title: "Winter Tasks",
    titleTr: "Kış Görevleri",
    category: "Winter Tasks",
    categoryTr: "Kış Görevleri",
    tagline: "Get help with winter tasks — snow removal, winterization, pipe insulation, and more.",
    taglineTr: "Kış görevlerinde yardım alın — kar temizleme, kışlık hazırlık, boru yalıtımı ve daha fazlası.",
    heroGradient: "linear-gradient(150deg, #1a3a5a 0%, #2a5a8a 50%, #3a7abf 100%)",
    accentBg: "linear-gradient(135deg, #eaf4ff 0%, #c0dcff 100%)",
    catId: "other",
    body: {
      intro: "Winter brings its own set of challenges. Our Taskers are ready to clear snow, winterise your home, service your heating, and make sure you're safe and warm all season long.",
      introTr: "Kış kendi zorluklarını beraberinde getirir. Ustalarımız kar temizlemeye, evinizi kışa hazırlamaya, ısıtmanızı servise ve tüm sezon boyunca güvende ve sıcak olmanızı sağlamaya hazır.",
      sections: [
        {
          heading: "Winter Task Services",
          headingTr: "Kış Görevi Hizmetleri",
          paragraphs: [
            "From first snowfall to the last frost, Taskers handle every seasonal task so you stay comfortable, safe, and prepared.",
            "Book recurring snow removal, one-off pipe insulation before a cold snap, or anything in between.",
          ],
          paragraphsTr: [
            "İlk kar yağışından son don gününe kadar, ustalar mevsimsel her görevi halleder; siz rahat, güvende ve hazırlıklı kalırsınız.",
            "Tekrarlayan kar temizleme, soğuk hava öncesi tek seferlik boru yalıtımı veya aradaki her şeyi rezerve edin.",
          ],
        },
        {
          heading: "Winter tasks Taskers can handle",
          headingTr: "Ustaların üstlenebileceği kış görevleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Snow Removal:", labelTr: "Kar Temizleme:", text: "Driveways, pathways, steps, and rooftops cleared safely.", textTr: "Yollar, patikalar, merdivenler ve çatılar güvenle temizlenir." },
            { label: "Sidewalk Salting:", labelTr: "Kaldırım Tuzlama:", text: "Ice prevention and de-icing for safety.", textTr: "Güvenlik için buz önleme ve buz çözme." },
            { label: "Window Winterization:", labelTr: "Pencere Kışlıklama:", text: "Seal draughts, add insulating film, and weatherstrip windows.", textTr: "Hava sızıntılarını kapatın, yalıtım filmi ekleyin ve pencerelere conta takın." },
            { label: "AC Winterization:", labelTr: "Klima Kışlıklama:", text: "Cover and protect AC units from frost and moisture damage.", textTr: "Klima ünitelerini don ve nem hasarından koruyun ve örtün." },
            { label: "Pipe Insulation:", labelTr: "Boru Yalıtımı:", text: "Insulate exposed pipes to prevent freezing and bursting.", textTr: "Donmayı ve patlamayı önlemek için açık boruları yalıtın." },
            { label: "Storm Door Installation:", labelTr: "Fırtına Kapısı Kurulumu:", text: "Add a storm door for extra insulation and weather protection.", textTr: "Ekstra yalıtım ve hava koruması için fırtına kapısı ekleyin." },
            { label: "Water Heater Maintenance:", labelTr: "Su Isıtıcısı Bakımı:", text: "Flush and service your water heater before cold weather hits.", textTr: "Soğuk hava gelmeden önce su ısıtıcınızı yıkayın ve servise edin." },
            { label: "Winter Yardwork:", labelTr: "Kış Bahçe İşleri:", text: "Cut back plants, mulch beds, and prepare your garden for winter.", textTr: "Bitkileri kısaltın, tarhları malçlayın ve bahçenizi kışa hazırlayın." },
            { label: "Winter Deck Maintenance:", labelTr: "Kış Teras Bakımı:", text: "Seal and protect decking from moisture and frost damage.", textTr: "Terasınızı nem ve don hasarından korumak için sızdırmazlık uygulayın." },
            { label: "Christmas Tree Removal:", labelTr: "Yılbaşı Ağacı Kaldırma:", text: "Take down and dispose of trees after the holidays.", textTr: "Tatillerden sonra ağaçları söküp elden çıkarın." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Winter Tasks?",
          headingTr: "Kış görevleri için neden UstaYolda?",
          paragraphs: [
            "Book recurring snow removal and never worry about shovelling again. Taskers show up reliably — even in bad weather.",
            "One-off jobs or regular seasonal help — book exactly what you need.",
          ],
          paragraphsTr: [
            "Tekrarlayan kar temizleme rezervasyonu yapın ve kürek çekmekten bir daha endişelenmeyin. Ustalar güvenilir şekilde gelir — kötü havada bile.",
            "Tek seferlik işler veya düzenli mevsimsel yardım — tam olarak ihtiyacınız olanı rezerve edin.",
          ],
        },
      ],
    },
  },

  "Personal Assistant": {
    id: "personal-assistant",
    emoji: "🙋",
    title: "Personal Assistant",
    titleTr: "Kişisel Asistan",
    category: "Personal Assistant",
    categoryTr: "Kişisel Asistan",
    tagline: "Hire a Tasker to be your personal assistant — errands, organisation, admin & more.",
    taglineTr: "Bir ustayı kişisel asistanınız olarak işe alın — ayak işleri, organizasyon, yönetim ve daha fazlası.",
    heroGradient: "linear-gradient(150deg, #3a1a6e 0%, #6a2aa8 50%, #9a4ae0 100%)",
    accentBg: "linear-gradient(135deg, #f4f0ff 0%, #ddd0ff 100%)",
    catId: "other",
    body: {
      intro: "Busy schedule? A personal assistant Tasker takes the load off. Whether you need ongoing weekly support or help with a one-off project, we have organised, reliable Taskers ready.",
      introTr: "Yoğun bir program mı var? Kişisel asistan usta yükünüzü hafifletir. İster haftalık süregelen desteğe ihtiyacınız olsun ister tek seferlik bir projede yardıma, organize ve güvenilir ustalarımız hazır.",
      sections: [
        {
          heading: "Personal Assistant Services",
          headingTr: "Kişisel Asistan Hizmetleri",
          paragraphs: [
            "Think of your Tasker as a trusted right-hand person — someone who handles the practical side of your life so you have more time for what matters.",
            "From running errands and organising your home to scheduling and light admin, personal assistant Taskers are flexible and professional.",
          ],
          paragraphsTr: [
            "Ustanızı güvenilir bir sağ kolunuz olarak düşünün — hayatınızın pratik tarafını halleden, size önemli şeyler için daha fazla zaman bırakan biri.",
            "Ayak işlerinden ev organizasyonuna, programlamadan hafif yönetim işlerine kadar, kişisel asistan ustalar esnek ve profesyoneldir.",
          ],
        },
        {
          heading: "What can a Personal Assistant Tasker do?",
          headingTr: "Kişisel Asistan usta neler yapabilir?",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Running Errands:", labelTr: "Ayak İşleri:", text: "Post office, pharmacy, dry cleaning, returns, and shopping.", textTr: "Posta, eczane, kuru temizleme, iade ve alışveriş." },
            { label: "Wait in Line:", labelTr: "Sıra Bekleme:", text: "Queue for permits, tickets, government offices, and appointments.", textTr: "İzinler, biletler, devlet daireleri ve randevular için sıra bekleme." },
            { label: "Home Organisation:", labelTr: "Ev Organizasyonu:", text: "Declutter and organise any room, cupboard, or garage.", textTr: "Her odayı, dolabı veya garajı düzenleyin ve organize edin." },
            { label: "Closet Organisation:", labelTr: "Dolap Organizasyonu:", text: "Sort, categorise, and create a wardrobe system that works for you.", textTr: "Sıralayın, kategorize edin ve sizin için işe yarayan bir gardırop sistemi oluşturun." },
            { label: "Interior Design:", labelTr: "İç Tasarım:", text: "Advice on layout, styling, and sourcing pieces to refresh your space.", textTr: "Alanınızı tazelemek için düzen, şekillendirme ve parça temini konusunda tavsiye." },
            { label: "Virtual Assistant:", labelTr: "Sanal Asistan:", text: "Email triage, calendar management, bookings, and admin support.", textTr: "E-posta düzenleme, takvim yönetimi, rezervasyonlar ve yönetim desteği." },
          ],
        },
        {
          heading: "Why choose UstaYolda for a Personal Assistant?",
          headingTr: "Kişisel Asistan için neden UstaYolda?",
          paragraphs: [
            "Find a Tasker you click with and book them regularly — build a working relationship with someone who knows how you like things done.",
            "Flexible hourly rates with no long-term contracts. Book for a few hours or set up a weekly arrangement.",
          ],
          paragraphsTr: [
            "Anlaştığınız bir usta bulun ve düzenli olarak rezervasyon yapın — işleri nasıl yapmanızı istediğinizi bilen biriyle çalışma ilişkisi kurun.",
            "Uzun vadeli sözleşme olmadan esnek saatlik ücretler. Birkaç saatliğine rezervasyon yapın veya haftalık bir düzenleme oluşturun.",
          ],
        },
      ],
    },
  },

  "Contactless Tasks": {
    id: "contactless-tasks",
    emoji: "📦",
    title: "Contactless Tasks",
    titleTr: "Temassız Görevler",
    category: "Contactless Tasks",
    categoryTr: "Temassız Görevler",
    tagline: "No-contact delivery, shopping & errands — get things done safely without any in-person interaction.",
    taglineTr: "Temassız teslimat, alışveriş & ayak işleri — yüz yüze etkileşim olmadan işleri güvenle halledin.",
    heroGradient: "linear-gradient(150deg, #1a4a4a 0%, #2a7a7a 50%, #3aacac 100%)",
    accentBg: "linear-gradient(135deg, #e8ffff 0%, #c0f0f0 100%)",
    catId: "other",
    body: {
      intro: "Need help but prefer no direct contact? Our contactless Taskers handle deliveries, shopping, and errands while maintaining safe social distancing — leaving everything at your door.",
      introTr: "Yardıma ihtiyacınız var ama doğrudan temas istemiyorsunuz? Temassız ustalarımız teslimat, alışveriş ve ayak işlerini güvenli sosyal mesafeyi koruyarak halleder — her şeyi kapınıza bırakır.",
      sections: [
        {
          heading: "Contactless Task Services",
          headingTr: "Temassız Görev Hizmetleri",
          paragraphs: [
            "Taskers complete your errands and deliveries without requiring any in-person interaction. They communicate via the app and leave items at a designated spot.",
            "Perfect for those who are health-conscious, busy, or simply prefer a hands-off experience.",
          ],
          paragraphsTr: [
            "Ustalar yüz yüze etkileşim gerektirmeden ayak işlerinizi ve teslimatlarınızı tamamlar. Uygulama üzerinden iletişim kurar ve eşyaları belirlenen yere bırakır.",
            "Sağlığına dikkat edenler, meşgul olanlar veya sadece temassız bir deneyim tercih edenler için mükemmel.",
          ],
        },
        {
          heading: "Contactless tasks we offer",
          headingTr: "Sunduğumuz temassız görevler",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Contactless Delivery:", labelTr: "Temassız Teslimat:", text: "Any item delivered and left at your door — no contact required.", textTr: "Her eşya teslim edilir ve kapınıza bırakılır — temas gerekmez." },
            { label: "Prescription Pick-up & Delivery:", labelTr: "Reçete Alma & Teslimat:", text: "Collect and deliver prescriptions from any pharmacy.", textTr: "Her eczaneden reçete alıp teslim eder." },
            { label: "Grocery Shopping & Delivery:", labelTr: "Market Alışverişi & Teslimat:", text: "Full grocery shop from your list, delivered contactlessly.", textTr: "Listenizdeki tam market alışverişi, temassız şekilde teslim edilir." },
            { label: "Running Errands:", labelTr: "Ayak İşleri:", text: "Post office, returns, banking, and any local errand.", textTr: "Posta, iade, bankacılık ve yerel her türlü iş." },
            { label: "Disinfecting Services:", labelTr: "Dezenfeksiyon Hizmetleri:", text: "Sanitise high-touch surfaces in your home or office.", textTr: "Evinizdeki veya ofisinizde çok dokunulan yüzeyleri sanitize edin." },
            { label: "Drop Off Donations:", labelTr: "Bağış Bırakma:", text: "Take donated items to charity shops or collection points.", textTr: "Bağış eşyalarını hayır kurumlarına veya toplama noktalarına götürür." },
            { label: "Yard Work:", labelTr: "Bahçe İşleri:", text: "Lawn and garden work completed while you stay inside.", textTr: "Siz içerideyken çim ve bahçe işleri tamamlanır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Contactless Tasks?",
          headingTr: "Temassız görevler için neden UstaYolda?",
          paragraphs: [
            "All communications happen through the app — no need to open the door or interact in person.",
            "Taskers are background-checked and reviewed. Trust that your errands are in safe hands.",
          ],
          paragraphsTr: [
            "Tüm iletişim uygulama üzerinden gerçekleşir — kapı açmanıza veya yüz yüze etkileşime gerek yok.",
            "Ustalar kimlik doğrulamasından geçirilir ve değerlendirilir. Ayak işlerinizin güvende olduğuna güvenin.",
          ],
        },
      ],
    },
  },
};
