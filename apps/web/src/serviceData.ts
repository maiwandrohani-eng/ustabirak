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

  "Door, Cabinet & Furniture Repair": {
    id: "door-cabinet-furniture-repair",
    emoji: "🚪",
    title: "Door, Cabinet & Furniture Repair",
    titleTr: "Kapı, Dolap & Mobilya Tamiri",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Fix sticking doors, repair cabinets, and restore furniture — skilled Taskers ready to help today.",
    taglineTr: "Sıkışan kapıları onarın, dolapları tamir edin ve mobilyaları yenileyin — yetenekli ustalar bugün yardıma hazır.",
    heroGradient: "linear-gradient(150deg, #2a1a0a 0%, #5a3a1a 50%, #9a6a3a 100%)",
    accentBg: "linear-gradient(135deg, #fff8f0 0%, #ffe0b8 100%)",
    catId: "other",
    body: {
      intro: "Sticking doors, broken hinges, sagging cabinet doors — these small issues add up. Our Taskers fix them quickly and affordably so your home feels right again.",
      introTr: "Sıkışan kapılar, kırık menteşeler, sarkan dolap kapıları — bu küçük sorunlar birikir. Ustalarımız bunları hızlı ve uygun fiyatlı şekilde düzelterek evinizin yeniden doğru hissetmesini sağlar.",
      sections: [
        {
          heading: "Door, Cabinet & Furniture Repair Services",
          headingTr: "Kapı, Dolap & Mobilya Tamir Hizmetleri",
          paragraphs: [
            "From internal doors that won't close properly to cabinet hinges that have come loose, our Taskers handle all types of door, cabinet, and furniture repairs.",
            "Every Tasker brings their own tools and parts — no need for you to source anything.",
          ],
          paragraphsTr: [
            "Düzgün kapanmayan iç kapılardan gevşemiş dolap menteşelerine kadar, ustalarımız her türlü kapı, dolap ve mobilya tamirini üstlenir.",
            "Her usta kendi araçlarını ve parçalarını getirir — sizin bir şey temin etmenize gerek yoktur.",
          ],
        },
        {
          heading: "Common repairs we handle",
          headingTr: "Üstlendiğimiz yaygın tamirler",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Sticking Doors:", labelTr: "Sıkışan Kapılar:", text: "Plane or adjust doors that stick, drag, or won't latch properly.", textTr: "Sıkışan, sürtünen veya düzgün kilitlenmeyen kapılar tornavidayla veya rendelerek ayarlanır." },
            { label: "Hinge Replacement:", labelTr: "Menteşe Değişimi:", text: "Replace worn or broken hinges on doors, cabinets, and wardrobes.", textTr: "Kapılar, dolaplar ve gardıroplardaki yıpranmış veya kırık menteşeler değiştirilir." },
            { label: "Cabinet Door Repair:", labelTr: "Dolap Kapısı Tamiri:", text: "Realign, rehang, or replace damaged cabinet doors and handles.", textTr: "Hasarlı dolap kapıları ve kolları yeniden hizalanır, asılır veya değiştirilir." },
            { label: "Furniture Repairs:", labelTr: "Mobilya Tamiri:", text: "Fix wobbly chairs, broken drawer runners, and loose joints.", textTr: "Salınan sandalyeler, kırık çekmece rayları ve gevşek eklemler onarılır." },
            { label: "Lock & Handle Replacement:", labelTr: "Kilit & Kol Değişimi:", text: "Replace door handles, knobs, and lock mechanisms.", textTr: "Kapı kolları, topuzlar ve kilit mekanizmaları değiştirilir." },
            { label: "Wardrobe Repairs:", labelTr: "Gardırop Tamiri:", text: "Fix sliding wardrobe doors, broken runners, and soft-close mechanisms.", textTr: "Sürgülü gardırop kapıları, kırık raylar ve soft-close mekanizmaları onarılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Door & Cabinet Repair?",
          headingTr: "Kapı & Dolap Tamiri için neden UstaYolda?",
          paragraphs: [
            "Our Taskers are experienced carpenters and handymen who fix these problems every day. Fast, tidy, and reliable.",
            "Book same-day for urgent repairs or schedule at a convenient time. No callout fees.",
          ],
          paragraphsTr: [
            "Ustalarımız bu sorunları her gün çözen deneyimli marangozlar ve tamircilerdir. Hızlı, düzenli ve güvenilir.",
            "Acil tamirler için aynı gün rezervasyon yapın veya uygun bir zamanda planlayın. Çağrı ücreti yoktur.",
          ],
        },
      ],
    },
  },

  "Appliance Installation & Repairs": {
    id: "appliance-installation-repairs",
    emoji: "🔌",
    title: "Appliance Installation & Repairs",
    titleTr: "Beyaz Eşya Kurulum & Tamiri",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Install or repair washing machines, dishwashers, ovens, and more — get your appliances working perfectly.",
    taglineTr: "Çamaşır makinesi, bulaşık makinesi, fırın ve daha fazlasını kurun veya tamir edin — beyaz eşyalarınızı mükemmel çalıştırın.",
    heroGradient: "linear-gradient(150deg, #1a1a3a 0%, #2a3a7a 50%, #3a5abf 100%)",
    accentBg: "linear-gradient(135deg, #f0f0ff 0%, #c8d0ff 100%)",
    catId: "other",
    body: {
      intro: "New appliance arrived but needs connecting? Old one acting up? Our Taskers install, connect, and repair household appliances safely and efficiently.",
      introTr: "Yeni bir beyaz eşya geldi ama bağlantısı yapılmadı mı? Eskisi sorun mu çıkarıyor? Ustalarımız ev aletlerini güvenli ve verimli şekilde kurar, bağlar ve tamir eder.",
      sections: [
        {
          heading: "Appliance Installation & Repair Services",
          headingTr: "Beyaz Eşya Kurulum & Tamir Hizmetleri",
          paragraphs: [
            "From connecting a new washing machine to diagnosing why your dishwasher isn't draining, our Taskers handle all types of appliance work.",
            "All appliance work is carried out safely. Taskers check connections, test functionality, and leave everything working as it should.",
          ],
          paragraphsTr: [
            "Yeni bir çamaşır makinesi bağlamaktan bulaşık makinenizin neden boşalmadığını teşhis etmeye kadar, ustalarımız her türlü beyaz eşya işini halleder.",
            "Tüm beyaz eşya çalışmaları güvenle yürütülür. Ustalar bağlantıları kontrol eder, işlevselliği test eder ve her şeyi gerektiği gibi çalışır bırakır.",
          ],
        },
        {
          heading: "Appliances we install and repair",
          headingTr: "Kurduğumuz ve tamir ettiğimiz beyaz eşyalar",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Washing Machine:", labelTr: "Çamaşır Makinesi:", text: "Install, connect water lines, and test your washing machine.", textTr: "Çamaşır makinenizi kurun, su hatlarını bağlayın ve test edin." },
            { label: "Dishwasher:", labelTr: "Bulaşık Makinesi:", text: "Fit, plumb in, and connect your dishwasher to power and drainage.", textTr: "Bulaşık makinenizi yerleştirin, su tesisatına ve elektriğe bağlayın." },
            { label: "Oven & Cooker:", labelTr: "Fırın & Ocak:", text: "Install electric or gas ovens and hobs safely.", textTr: "Elektrikli veya gazlı fırın ve ocakları güvenle kurun." },
            { label: "Fridge & Freezer:", labelTr: "Buzdolabı & Dondurucu:", text: "Position, level, and connect refrigerators and freezers.", textTr: "Buzdolabı ve dondurucuları yerleştirin, dengeleyin ve bağlayın." },
            { label: "Tumble Dryer:", labelTr: "Kurutma Makinesi:", text: "Install vented or condenser dryers with proper ventilation.", textTr: "Havalandırmalı veya yoğuşmalı kurutucuları uygun havalandırmayla kurun." },
            { label: "Minor Repairs:", labelTr: "Küçük Tamirler:", text: "Diagnose and fix common appliance faults and malfunctions.", textTr: "Yaygın beyaz eşya arızalarını teşhis edin ve düzeltin." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Appliance Work?",
          headingTr: "Beyaz Eşya İşleri için neden UstaYolda?",
          paragraphs: [
            "Our Taskers are experienced with all major appliance brands and installation types. Safe, fast, and done right.",
            "Book same-day for urgent installations or repairs — no long waits for an engineer.",
          ],
          paragraphsTr: [
            "Ustalarımız tüm büyük beyaz eşya markaları ve kurulum türlerinde deneyimlidir. Güvenli, hızlı ve doğru yapılır.",
            "Acil kurulum veya tamirler için aynı gün rezervasyon yapın — bir teknisyen için uzun bekleme yoktur.",
          ],
        },
      ],
    },
  },

  "TV Mounting": {
    id: "tv-mounting",
    emoji: "📺",
    title: "TV Mounting",
    titleTr: "TV Montajı",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Get your TV mounted safely on any wall — cables hidden, perfectly level, first time.",
    taglineTr: "TV'nizi her duvara güvenle monte edin — kablolar gizli, mükemmel hizalanmış, ilk seferinde.",
    heroGradient: "linear-gradient(150deg, #0a1a2a 0%, #1a3a5a 50%, #2a5a8a 100%)",
    accentBg: "linear-gradient(135deg, #e8f0ff 0%, #b0ccff 100%)",
    catId: "other",
    body: {
      intro: "Wall-mounting a TV looks simple but getting it perfectly level, finding the studs, and hiding the cables takes skill. Our Taskers do it properly — first time, every time.",
      introTr: "TV'yi duvara monte etmek basit görünür ama mükemmel hizalamak, direkleri bulmak ve kabloları gizlemek beceri gerektirir. Ustalarımız bunu doğru yapar — her seferinde ilk seferinde.",
      sections: [
        {
          heading: "TV Mounting Services",
          headingTr: "TV Montaj Hizmetleri",
          paragraphs: [
            "From a small bedroom TV to a large living room screen, our Taskers mount any size TV on any wall type — plasterboard, brick, stone, or tile.",
            "Cable management included: Taskers route cables neatly behind the wall or along trunking so your setup looks clean.",
          ],
          paragraphsTr: [
            "Küçük bir yatak odası TV'sinden büyük bir oturma odası ekranına kadar, ustalarımız her boyutta TV'yi her duvar tipine monte eder — alçıpan, tuğla, taş veya fayans.",
            "Kablo yönetimi dahil: Ustalar kurulumunuzun temiz görünmesi için kabloları duvarda veya kablo kanalında düzenli şekilde yönlendirir.",
          ],
        },
        {
          heading: "What's included in TV mounting",
          headingTr: "TV montajına dahil olanlar",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Wall Bracket Fitting:", labelTr: "Duvar Braketi Takma:", text: "Fixed, tilting, or full-motion brackets fitted on any wall.", textTr: "Her duvara sabit, eğim ayarlı veya tam hareketli braket takılır." },
            { label: "Cable Management:", labelTr: "Kablo Yönetimi:", text: "Cables hidden in-wall or along trunking for a tidy finish.", textTr: "Temiz bir görünüm için kablolar duvar içine veya kablo kanalına gizlenir." },
            { label: "All Screen Sizes:", labelTr: "Tüm Ekran Boyutları:", text: "Mount screens from 32\" up to 85\" and beyond.", textTr: "32\" ile 85\" ve üstü ekranlar monte edilir." },
            { label: "All Wall Types:", labelTr: "Tüm Duvar Tipleri:", text: "Plasterboard, brick, concrete, and stud walls all covered.", textTr: "Alçıpan, tuğla, beton ve ahşap karkas duvarlar dahil tümü kapsanır." },
            { label: "HDMI & Cable Setup:", labelTr: "HDMI & Kablo Kurulumu:", text: "Connect devices, run cables, and test the picture quality.", textTr: "Cihazlar bağlanır, kablolar çekilir ve görüntü kalitesi test edilir." },
            { label: "Multi-TV Setups:", labelTr: "Çoklu TV Kurulumu:", text: "Mount multiple TVs in the same room or different rooms.", textTr: "Aynı odada veya farklı odalarda birden fazla TV monte edilir." },
          ],
        },
        {
          heading: "Why choose UstaYolda for TV Mounting?",
          headingTr: "TV Montajı için neden UstaYolda?",
          paragraphs: [
            "Our Taskers use professional spirit levels and the right wall anchors for every wall type. No tilted screens, no falling TVs.",
            "Book same-day — most TV mounting jobs are done in under an hour.",
          ],
          paragraphsTr: [
            "Ustalarımız her duvar tipi için profesyonel su terazileri ve doğru dübeller kullanır. Eğri ekranlar yok, düşen TV'ler yok.",
            "Aynı gün rezervasyon yapın — çoğu TV montaj işi bir saatten kısa sürede tamamlanır.",
          ],
        },
      ],
    },
  },

  "Drywall Repair Service": {
    id: "drywall-repair",
    emoji: "🪣",
    title: "Drywall Repair Service",
    titleTr: "Alçıpan Tamir Hizmeti",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Patch holes, fix cracks, and restore your walls to a smooth, paint-ready finish.",
    taglineTr: "Delikleri kapatın, çatlakları onarın ve duvarlarınızı pürüzsüz, boyamaya hazır bir görünüme kavuşturun.",
    heroGradient: "linear-gradient(150deg, #2a2a2a 0%, #4a4a4a 50%, #7a7a7a 100%)",
    accentBg: "linear-gradient(135deg, #f8f8f8 0%, #e0e0e0 100%)",
    catId: "other",
    body: {
      intro: "Holes from door handles, cracks from settling, and scuffs from moving furniture — our Taskers repair all types of drywall damage, leaving walls smooth and ready to paint.",
      introTr: "Kapı kollarından oluşan delikler, çökmeden kaynaklanan çatlaklar ve mobilya taşırken oluşan izler — ustalarımız her türlü alçıpan hasarını onarır, duvarları pürüzsüz ve boyamaya hazır bırakır.",
      sections: [
        {
          heading: "Drywall Repair Services",
          headingTr: "Alçıpan Tamir Hizmetleri",
          paragraphs: [
            "Whether it's a small nail hole or a large section of damaged drywall, our Taskers have the skills and materials to repair it properly.",
            "Repairs are sanded smooth and primed so your wall is ready for painting immediately after.",
          ],
          paragraphsTr: [
            "İster küçük bir çivi deliği ister büyük bir hasar alanı olsun, ustalarımız onu düzgün şekilde tamir etmek için gerekli beceri ve malzemelere sahiptir.",
            "Tamirler pürüzsüz zımparalanır ve astar uygulanır, böylece duvarınız hemen boyamaya hazır olur.",
          ],
        },
        {
          heading: "Drywall repairs we handle",
          headingTr: "Üstlendiğimiz alçıpan tamirler",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Small Holes:", labelTr: "Küçük Delikler:", text: "Nail holes, screw holes, and anchor holes filled and smoothed.", textTr: "Çivi delikleri, vida delikleri ve dübel delikleri doldurulur ve düzeltilir." },
            { label: "Large Holes:", labelTr: "Büyük Delikler:", text: "Door handle holes and fist-sized damage patched with new drywall.", textTr: "Kapı kolu delikleri ve yumruk büyüklüğündeki hasarlar yeni alçıpanla kapatılır." },
            { label: "Cracks & Hairlines:", labelTr: "Çatlaklar & Saç Kılı Çatlaklar:", text: "Fill and tape hairline cracks to prevent them reappearing.", textTr: "Saç kılı çatlakları doldurulur ve bantlanır, tekrar oluşması önlenir." },
            { label: "Water Damage Repair:", labelTr: "Su Hasarı Tamiri:", text: "Replace water-damaged sections and treat for staining.", textTr: "Su hasarlı bölümler değiştirilir ve leke oluşumuna karşı işlem uygulanır." },
            { label: "Textured Finishes:", labelTr: "Dokulu Kaplamalar:", text: "Match existing wall texture for a seamless, invisible repair.", textTr: "Görünmez bir tamir için mevcut duvar dokusuyla eşleştirilir." },
            { label: "Full Wall Skim:", labelTr: "Tam Duvar Sıvası:", text: "Skim coat entire walls for a perfectly smooth, fresh finish.", textTr: "Mükemmel pürüzsüz ve taze bir görünüm için tüm duvarlar ince sıva ile kaplanır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Drywall Repair?",
          headingTr: "Alçıpan Tamiri için neden UstaYolda?",
          paragraphs: [
            "Expert repairs that blend seamlessly with your existing walls — no visible patches or uneven surfaces.",
            "Taskers come fully equipped with joint compound, tape, and sanding tools. You won't need to buy a thing.",
          ],
          paragraphsTr: [
            "Mevcut duvarlarınızla kusursuz şekilde bütünleşen uzman tamirler — görünür yamalar veya düzensiz yüzeyler yok.",
            "Ustalar derz alçısı, bant ve zımpara aletleriyle tam donanımlı gelir. Hiçbir şey satın almanıza gerek yoktur.",
          ],
        },
      ],
    },
  },

  "Flooring & Tiling Help": {
    id: "flooring-tiling",
    emoji: "🪵",
    title: "Flooring & Tiling Help",
    titleTr: "Zemin & Fayans Yardımı",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Tile installation, laminate fitting, and floor repairs — perfect floors from skilled Taskers.",
    taglineTr: "Fayans döşeme, laminat montajı ve zemin onarımları — yetenekli ustalardan mükemmel zeminler.",
    heroGradient: "linear-gradient(150deg, #1a0a00 0%, #4a2a0a 50%, #8a5a1a 100%)",
    accentBg: "linear-gradient(135deg, #fff8e8 0%, #ffd8a0 100%)",
    catId: "other",
    body: {
      intro: "New tiles in the bathroom, laminate in the living room, or a cracked floor tile that needs replacing — our Taskers handle all types of flooring and tiling work.",
      introTr: "Banyoda yeni fayanslar, oturma odasında laminat veya değiştirilmesi gereken kırık bir zemin fayansi — ustalarımız her türlü zemin ve fayans işini halleder.",
      sections: [
        {
          heading: "Flooring & Tiling Services",
          headingTr: "Zemin & Fayans Hizmetleri",
          paragraphs: [
            "From a single cracked tile to a full bathroom floor, our Taskers are skilled in laying tiles, fitting laminate, and repairing damaged flooring.",
            "They work neatly, cut precisely, and leave a professional finish that lasts.",
          ],
          paragraphsTr: [
            "Tek kırık bir fayans işinden tam banyo zeminine kadar, ustalarımız fayans döşeme, laminat yerleştirme ve hasar görmüş zemin onarımında yeteneklidir.",
            "Düzenli çalışırlar, hassas kesiş yaparlar ve kalıcı profesyonel bir sonuç bırakırlar.",
          ],
        },
        {
          heading: "Flooring tasks we handle",
          headingTr: "Üstlendiğimiz zemin işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Tile Installation:", labelTr: "Fayans Döşeme:", text: "Floor and wall tiles laid perfectly level with uniform grout lines.", textTr: "Zemin ve duvar fayansları eşit derz aralıklarıyla mükemmel düzgünlükte döşenir." },
            { label: "Tile Replacement:", labelTr: "Fayans Değişimi:", text: "Remove and replace cracked, chipped, or stained tiles.", textTr: "Çatlak, kırık veya lekeli fayanslar sökülür ve değiştirilir." },
            { label: "Laminate Fitting:", labelTr: "Laminat Döşeme:", text: "Floating laminate floors fitted in living rooms and bedrooms.", textTr: "Oturma odaları ve yatak odaları için yüzer laminat zemin döşenir." },
            { label: "Vinyl & LVT:", labelTr: "Vinil & LVT:", text: "Luxury vinyl tiles and sheet vinyl laid to a smooth finish.", textTr: "Lüks vinil karolar ve levha vinil pürüzsüz şekilde döşenir." },
            { label: "Grout Repair & Regrouting:", labelTr: "Derz Onarımı & Yeniden Derzleme:", text: "Remove old, cracked, and discoloured grout and regrout freshly.", textTr: "Eski, çatlak ve rengi değişmiş derz sökülür ve yenisi uygulanır." },
            { label: "Subfloor Prep:", labelTr: "Alt Zemin Hazırlığı:", text: "Level and prepare subfloors before tile or laminate installation.", textTr: "Fayans veya laminat döşemeden önce alt zemin düzlenir ve hazırlanır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Flooring?",
          headingTr: "Zemin İşleri için neden UstaYolda?",
          paragraphs: [
            "Our Taskers are experienced tilers and floor fitters who ensure level, long-lasting results.",
            "Bring your own tiles or ask your Tasker to source them — flexible to suit your project.",
          ],
          paragraphsTr: [
            "Ustalarımız düzgün ve kalıcı sonuçlar sağlayan deneyimli fayansçılar ve zemin döşemecileridir.",
            "Kendi fayanslarınızı getirin veya ustanızın temin etmesini isteyin — projenize göre esnek.",
          ],
        },
      ],
    },
  },

  "Electrical Help": {
    id: "electrical-help",
    emoji: "⚡",
    title: "Electrical Help",
    titleTr: "Elektrik Yardımı",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Fix outlets, install light fixtures, and handle electrical tasks safely — book a Tasker today.",
    taglineTr: "Prizleri onarın, aydınlatma armatürlerini takın ve elektrik işlerini güvenle hallediyin — bugün bir usta rezervasyonu yapın.",
    heroGradient: "linear-gradient(150deg, #2a2a00 0%, #5a5a00 50%, #a0a000 100%)",
    accentBg: "linear-gradient(135deg, #fffde8 0%, #fff0a0 100%)",
    catId: "electrician",
    body: {
      intro: "Electrical issues can be daunting, but our skilled Taskers handle common household electrical tasks safely and efficiently — from fixing a dead outlet to installing a new light fixture.",
      introTr: "Elektrik sorunları korkutucu olabilir, ancak yetenekli ustalarımız bozuk bir prizi onarmaktan yeni bir aydınlatma armatürü takmaya kadar yaygın ev elektrik işlerini güvenle ve verimli şekilde halleder.",
      sections: [
        {
          heading: "Electrical Help Services",
          headingTr: "Elektrik Yardım Hizmetleri",
          paragraphs: [
            "Our Taskers handle a wide range of non-specialist electrical tasks in the home, from replacing switches and outlets to installing light fittings and ceiling fans.",
            "All electrical work is carried out safely with proper testing. Taskers ensure everything is working correctly before they leave.",
          ],
          paragraphsTr: [
            "Ustalarımız, şalter ve priz değişiminden aydınlatma armatürü ve tavan vantilatörü takılmasına kadar evdeki çok çeşitli elektrik işlerini üstlenir.",
            "Tüm elektrik çalışmaları uygun testlerle güvenle yürütülür. Ustalar gitmeden önce her şeyin doğru çalıştığından emin olur.",
          ],
        },
        {
          heading: "Electrical tasks we handle",
          headingTr: "Üstlendiğimiz elektrik işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Outlet Repair & Replacement:", labelTr: "Priz Onarım & Değişimi:", text: "Fix dead or sparking outlets and replace faulty sockets.", textTr: "Ölü veya kıvılcım çıkaran prizler onarılır ve arızalı soketler değiştirilir." },
            { label: "Light Fixture Installation:", labelTr: "Aydınlatma Armatürü Kurulumu:", text: "Install pendant lights, ceiling lights, wall lights, and spotlights.", textTr: "Sarkıt lambalar, tavan lambaları, aplikler ve spot lambaları kurulumu." },
            { label: "Switch Replacement:", labelTr: "Anahtar Değişimi:", text: "Replace worn, broken, or outdated light switches.", textTr: "Yıpranmış, kırık veya eski moda aydınlatma anahtarları değiştirilir." },
            { label: "Ceiling Fan Wiring:", labelTr: "Tavan Vantilatörü Kablolaması:", text: "Wire and connect ceiling fans to existing switch circuits.", textTr: "Tavan vantilatörleri mevcut anahtar devrelerine bağlanır." },
            { label: "Smart Switches & Dimmers:", labelTr: "Akıllı Anahtarlar & Kısıcılar:", text: "Install smart switches, dimmer controls, and programmable timers.", textTr: "Akıllı anahtarlar, kısma kontrolleri ve programlanabilir zamanlayıcılar kurulur." },
            { label: "Outdoor Lighting:", labelTr: "Dış Mekan Aydınlatması:", text: "Install security lights, garden lights, and porch fixtures.", textTr: "Güvenlik lambaları, bahçe lambaları ve veranda armatürleri kurulur." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Electrical Help?",
          headingTr: "Elektrik Yardımı için neden UstaYolda?",
          paragraphs: [
            "Our Taskers handle common electrical tasks safely and efficiently. All work is tested before completion.",
            "Book same-day for urgent electrical faults or schedule a convenient time for installations.",
          ],
          paragraphsTr: [
            "Ustalarımız yaygın elektrik işlerini güvenle ve verimli şekilde halleder. Tüm işler tamamlanmadan önce test edilir.",
            "Acil elektrik arızaları için aynı gün rezervasyon yapın veya kurulumlar için uygun bir zaman planlayın.",
          ],
        },
      ],
    },
  },

  "Sealing & Caulking": {
    id: "sealing-caulking",
    emoji: "🔩",
    title: "Sealing & Caulking",
    titleTr: "Derz & Sızdırmazlık",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Re-caulk bathrooms, seal gaps, and weatherproof your home — clean lines from a skilled Tasker.",
    taglineTr: "Banyoları yeniden derzleyin, boşlukları kapatın ve evinizi hava koşullarına karşı koruyun — yetenekli bir ustadan temiz çizgiler.",
    heroGradient: "linear-gradient(150deg, #0a2a1a 0%, #1a5a3a 50%, #2a8a5a 100%)",
    accentBg: "linear-gradient(135deg, #e8fff4 0%, #b0ffd0 100%)",
    catId: "other",
    body: {
      intro: "Old, cracked, or mouldy caulk looks awful and lets in water. Our Taskers remove the old sealant and apply a fresh, clean bead — making your bathroom and kitchen look brand new.",
      introTr: "Eski, çatlak veya küflü derz malzemesi hem çirkin görünür hem de suya yol açar. Ustalarımız eski sızdırmazlık malzemesini kaldırır ve taze, temiz bir kat uygular — banyonuzu ve mutfağınızı yepyeni gösterir.",
      sections: [
        {
          heading: "Sealing & Caulking Services",
          headingTr: "Derz & Sızdırmazlık Hizmetleri",
          paragraphs: [
            "From bathroom re-caulking to sealing gaps around windows and doors, our Taskers apply sealant precisely and neatly.",
            "They remove all old sealant first, clean the surface, and apply fresh caulk in a long-lasting, moisture-resistant bead.",
          ],
          paragraphsTr: [
            "Banyo yeniden derzlemesinden pencere ve kapı çevresindeki boşlukların kapatılmasına kadar, ustalarımız sızdırmazlık malzemesini düzgün ve temiz şekilde uygular.",
            "Önce tüm eski sızdırmazlık malzemesini kaldırırlar, yüzeyi temizlerler ve uzun ömürlü, neme dayanıklı yeni bir tabaka uygularlar.",
          ],
        },
        {
          heading: "Sealing tasks we handle",
          headingTr: "Üstlendiğimiz sızdırmazlık işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Bathroom Re-caulking:", labelTr: "Banyo Yeniden Derzleme:", text: "Remove mouldy caulk around baths, showers, and basins and re-seal.", textTr: "Küvet, duş ve lavabo çevresindeki küflü derz kaldırılır ve yeniden sızdırmazlanır." },
            { label: "Kitchen Caulking:", labelTr: "Mutfak Derzleme:", text: "Seal gaps between worktops, sinks, and tiles in kitchens.", textTr: "Mutfaklarda tezgahlar, lavabolar ve fayanslar arasındaki boşluklar kapatılır." },
            { label: "Window & Door Sealing:", labelTr: "Pencere & Kapı Sızdırmazlığı:", text: "Draught-proof and weatherseal windows and external doors.", textTr: "Pencereler ve dış kapılar hava sızıntısına karşı korunur ve sızdırmazlanır." },
            { label: "Shower Tray Sealing:", labelTr: "Duş Teknesi Sızdırmazlığı:", text: "Seal around shower trays to prevent water damage below.", textTr: "Altındaki su hasarını önlemek için duş teknelerinin çevresi sızdırmazlanır." },
            { label: "External Gap Sealing:", labelTr: "Dış Boşluk Sızdırmazlığı:", text: "Fill and seal external gaps around pipes and cables.", textTr: "Borular ve kablolar çevresindeki dış boşluklar doldurulur ve kapatılır." },
            { label: "Floor & Wall Joints:", labelTr: "Zemin & Duvar Birleşim Yerleri:", text: "Seal expansion joints between floors and walls cleanly.", textTr: "Zemin ve duvarlar arasındaki genleşme derzleri temizce kapatılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Sealing & Caulking?",
          headingTr: "Derz & Sızdırmazlık için neden UstaYolda?",
          paragraphs: [
            "Proper caulk removal and application takes patience and a steady hand. Our Taskers deliver perfectly straight, clean lines every time.",
            "High-quality, mould-resistant sealants used as standard — your bathroom will stay looking great for years.",
          ],
          paragraphsTr: [
            "Uygun derz kaldırma ve uygulama sabır ve sabit bir el gerektirir. Ustalarımız her seferinde mükemmel düz, temiz çizgiler sunar.",
            "Standart olarak yüksek kaliteli, küf dirençli sızdırmazlık malzemeleri kullanılır — banyonuz yıllarca harika görünmeye devam eder.",
          ],
        },
      ],
    },
  },

  "Plumbing": {
    id: "plumbing",
    emoji: "🚿",
    title: "Plumbing",
    titleTr: "Su Tesisatı",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Fix leaks, clear drains, and install fixtures — trusted plumbing help when you need it most.",
    taglineTr: "Sızıntıları onarın, tıkalı giderleri açın ve armatürleri kurun — en çok ihtiyaç duyduğunuzda güvenilir tesisat yardımı.",
    heroGradient: "linear-gradient(150deg, #001a3a 0%, #003a7a 50%, #005abf 100%)",
    accentBg: "linear-gradient(135deg, #e8f4ff 0%, #a0d0ff 100%)",
    catId: "plumber",
    body: {
      intro: "A dripping tap, blocked drain, or leaking pipe can cause serious damage if left. Our Taskers fix plumbing problems quickly and correctly before they get worse.",
      introTr: "Damlayan bir musluk, tıkalı bir gider veya sızan bir boru放置 edilirse ciddi hasara yol açabilir. Ustalarımız tesisat sorunlarını daha kötüleşmeden önce hızlı ve doğru şekilde düzeltir.",
      sections: [
        {
          heading: "Plumbing Services",
          headingTr: "Su Tesisatı Hizmetleri",
          paragraphs: [
            "From fixing a dripping tap to unblocking a slow drain or fitting a new toilet, our Taskers handle a wide range of household plumbing tasks.",
            "All plumbing work is checked for leaks before the Tasker leaves. You won't be left with a wet surprise.",
          ],
          paragraphsTr: [
            "Damlayan bir musluğu onarmaktan tıkalı bir gideri açmaya veya yeni bir tuvalet takmaya kadar, ustalarımız çok çeşitli ev tesisatı işlerini üstlenir.",
            "Tüm tesisat çalışmaları usta gitmeden önce sızıntı açısından kontrol edilir. Sizi ıslak bir sürprizle bırakmayacaklar.",
          ],
        },
        {
          heading: "Plumbing tasks we handle",
          headingTr: "Üstlendiğimiz tesisat işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Dripping Taps:", labelTr: "Damlayan Musluklar:", text: "Fix leaking taps by replacing washers, o-rings, and cartridges.", textTr: "Contalar, o-halkalar ve kartuşlar değiştirilerek sızan musluklar onarılır." },
            { label: "Blocked Drains:", labelTr: "Tıkalı Giderler:", text: "Unblock sinks, baths, showers, and toilets quickly.", textTr: "Lavabolar, küvetler, duşlar ve tuvaletler hızlıca açılır." },
            { label: "Toilet Repairs:", labelTr: "Tuvalet Tamiri:", text: "Fix running toilets, replace flush valves, and adjust ballcocks.", textTr: "Sürekli çalışan tuvaletler onarılır, sifon valfleri değiştirilir, şamandıralar ayarlanır." },
            { label: "Tap & Fixture Installation:", labelTr: "Musluk & Armatür Kurulumu:", text: "Install new taps, mixers, showerheads, and bathroom fittings.", textTr: "Yeni musluklar, mikserlı armatürler, duş başlıkları ve banyo armatürleri kurulur." },
            { label: "Pipe Leaks:", labelTr: "Boru Sızıntıları:", text: "Locate and repair leaking pipes under sinks and behind walls.", textTr: "Lavabo altındaki ve duvardaki sızan borular tespit edilir ve onarılır." },
            { label: "Radiator Bleeding:", labelTr: "Radyatör Havalandırma:", text: "Bleed radiators and top up pressure for better heating efficiency.", textTr: "Radyatörler havalandırılır ve daha iyi ısıtma verimliliği için basınç artırılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Plumbing?",
          headingTr: "Su Tesisatı için neden UstaYolda?",
          paragraphs: [
            "Fast response for plumbing emergencies — book same-day and get the problem sorted before water damage sets in.",
            "Transparent pricing by the hour. No surprise call-out fees or inflated emergency rates.",
          ],
          paragraphsTr: [
            "Tesisat acil durumları için hızlı yanıt — aynı gün rezervasyon yapın ve su hasarı oluşmadan sorunu çözün.",
            "Saatlik şeffaf fiyatlandırma. Sürpriz çağrı ücretleri veya şişirilmiş acil fiyatlar yok.",
          ],
        },
      ],
    },
  },

  "Window & Blinds Repair": {
    id: "window-blinds-repair",
    emoji: "🪟",
    title: "Window & Blinds Repair",
    titleTr: "Pencere & Stor Tamiri",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Repair broken windows, fix blind mechanisms, and restore window hardware — fast and affordable.",
    taglineTr: "Kırık pencereleri onarın, stor mekanizmalarını düzeltin ve pencere donanımını eski haline getirin — hızlı ve uygun fiyatlı.",
    heroGradient: "linear-gradient(150deg, #0a1a3a 0%, #1a3a6a 50%, #2a5a9a 100%)",
    accentBg: "linear-gradient(135deg, #eaf2ff 0%, #b0ccff 100%)",
    catId: "other",
    body: {
      intro: "Broken window locks, damaged blind cords, and sticking sash windows are more than an inconvenience — they affect your home's security and energy efficiency. Our Taskers fix them fast.",
      introTr: "Kırık pencere kilitleri, hasarlı stor ipleri ve sıkışan çerçeveli pencereler sadece bir rahatsızlık değil — ev güvenliğinizi ve enerji verimliliğinizi etkiler. Ustalarımız bunları hızlıca düzeltir.",
      sections: [
        {
          heading: "Window & Blinds Repair Services",
          headingTr: "Pencere & Stor Tamir Hizmetleri",
          paragraphs: [
            "From a broken window lock to a blind that won't raise or lower, our Taskers diagnose and fix all types of window and blind problems.",
            "They carry common replacement parts so most repairs are completed in a single visit.",
          ],
          paragraphsTr: [
            "Kırık bir pencere kilidinden kaldırılıp indirilemeyen bir stora kadar, ustalarımız her türlü pencere ve stor sorununu teşhis edip düzeltir.",
            "Yaygın yedek parçaları yanlarında taşırlar, böylece çoğu tamir tek bir ziyarette tamamlanır.",
          ],
        },
        {
          heading: "Window & blind repairs we handle",
          headingTr: "Üstlendiğimiz pencere & stor tamirler",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Window Lock Repair:", labelTr: "Pencere Kilidi Tamiri:", text: "Repair or replace broken window locks and restrictor catches.", textTr: "Kırık pencere kilitleri ve kısıtlayıcı mandaller onarılır veya değiştirilir." },
            { label: "Sash Window Repairs:", labelTr: "Kanatlı Pencere Tamiri:", text: "Fix sticking, rattling, or painted-shut sash windows.", textTr: "Sıkışan, gürültülü veya boyayla kapatılan kanatlı pencereler onarılır." },
            { label: "Blind Mechanism Repair:", labelTr: "Stor Mekanizması Tamiri:", text: "Fix roller blinds, Venetian blinds, and Roman blind mechanisms.", textTr: "Rulo stor, jaluzi ve kıvrım stor mekanizmaları onarılır." },
            { label: "Blind Installation:", labelTr: "Stor Kurulumu:", text: "Fit new roller, Venetian, or blackout blinds on any window.", textTr: "Her pencereye yeni rulo, jaluzi veya karartma stor takılır." },
            { label: "Window Handle Replacement:", labelTr: "Pencere Kolu Değişimi:", text: "Replace damaged or stiff window handles and espagnolette bolts.", textTr: "Hasarlı veya sert pencere kolları ve espagnolette sürgüler değiştirilir." },
            { label: "Draught Proofing:", labelTr: "Hava Sızıntısı Önleme:", text: "Seal draughty windows with new brush seals and weatherstripping.", textTr: "Hava sızdıran pencereler yeni fırça contalar ve hava sızdırmaz bantlarla kapatılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Window & Blind Repair?",
          headingTr: "Pencere & Stor Tamiri için neden UstaYolda?",
          paragraphs: [
            "Our Taskers carry standard replacement parts and have experience with all window and blind types — most repairs done in one visit.",
            "Same-day booking available. Broken locks and security issues dealt with as a priority.",
          ],
          paragraphsTr: [
            "Ustalarımız standart yedek parçalar taşır ve tüm pencere ve stor türlerinde deneyimlidir — çoğu tamir tek ziyarette tamamlanır.",
            "Aynı gün rezervasyon mevcut. Kırık kilitler ve güvenlik sorunları öncelikli olarak ele alınır.",
          ],
        },
      ],
    },
  },

  "Ceiling Fan Installation": {
    id: "ceiling-fan-installation",
    emoji: "🌀",
    title: "Ceiling Fan Installation",
    titleTr: "Tavan Vantilatörü Kurulumu",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Get a ceiling fan safely installed and balanced — cool your home comfortably all summer.",
    taglineTr: "Tavan vantilatörünüzü güvenle kurun ve dengeleyin — tüm yaz boyunca evinizi rahatça serin tutun.",
    heroGradient: "linear-gradient(150deg, #001a3a 0%, #00408a 50%, #0060bf 100%)",
    accentBg: "linear-gradient(135deg, #e8f8ff 0%, #a0e0ff 100%)",
    catId: "electrician",
    body: {
      intro: "Installing a ceiling fan is more complex than it looks — it involves electrical wiring, secure mounting on a fan-rated box, and careful balancing. Our Taskers do it safely and correctly.",
      introTr: "Bir tavan vantilatörü kurmak göründüğünden daha karmaşıktır — elektrik kablolaması, vantilatör değerlendirilmiş bir kutuya güvenli montaj ve dikkatli dengeleme gerektirir. Ustalarımız bunu güvenle ve doğru şekilde yapar.",
      sections: [
        {
          heading: "Ceiling Fan Installation Services",
          headingTr: "Tavan Vantilatörü Kurulum Hizmetleri",
          paragraphs: [
            "Our Taskers install ceiling fans in any room — bedrooms, living rooms, kitchens, and covered outdoor areas.",
            "Whether you're replacing an existing light fitting or installing on a new circuit, Taskers handle the full job from start to finish.",
          ],
          paragraphsTr: [
            "Ustalarımız her odaya — yatak odaları, oturma odaları, mutfaklar ve kapalı dış alanlara — tavan vantilatörü kurar.",
            "Mevcut bir aydınlatma armatürünü değiştiriyor veya yeni bir devreye kurulum yapıyor olsanız da, ustalar işin tamamını başından sonuna kadar halleder.",
          ],
        },
        {
          heading: "What's included in ceiling fan installation",
          headingTr: "Tavan vantilatörü kurulumuna dahil olanlar",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "New Fan Installation:", labelTr: "Yeni Vantilatör Kurulumu:", text: "Install a brand new ceiling fan from your box to working.", textTr: "Kutusundan çıkarılmasından çalışır hale gelmesine kadar yeni tavan vantilatörü kurulumu." },
            { label: "Fan Replacement:", labelTr: "Vantilatör Değişimi:", text: "Remove old fan and install a new one on the existing wiring.", textTr: "Eski vantilatör sökülerek yeni vantilatör mevcut kablolamaya kurulur." },
            { label: "Light Fixture Swap:", labelTr: "Aydınlatma Armatürü Değişimi:", text: "Replace an existing ceiling light with a fan and light combo.", textTr: "Mevcut tavan lambası, aydınlatmalı bir vantilatör ile değiştirilir." },
            { label: "Remote Control Setup:", labelTr: "Uzaktan Kumanda Kurulumu:", text: "Install and programme remote controls and wall dimmers.", textTr: "Uzaktan kumandalar ve duvar kısıcıları kurularak programlanır." },
            { label: "Fan Balancing:", labelTr: "Vantilatör Dengeleme:", text: "Balance wobbling fans using balancing kits for smooth, quiet operation.", textTr: "Sallanan vantilatörler denge kitleri kullanılarak yumuşak ve sessiz çalışma için dengelenir." },
            { label: "Outdoor Fan Installation:", labelTr: "Dış Mekan Vantilatörü Kurulumu:", text: "Install damp or wet-rated ceiling fans on porches and covered patios.", textTr: "Verandalar ve kapalı teraslara nem veya ıslatma dayanımlı tavan vantilatörleri kurulur." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Ceiling Fan Installation?",
          headingTr: "Tavan Vantilatörü Kurulumu için neden UstaYolda?",
          paragraphs: [
            "Safe electrical work and secure mounting — our Taskers leave your fan running smoothly with no wobble or noise.",
            "Book at a time that suits you. Most ceiling fan installations are completed within an hour.",
          ],
          paragraphsTr: [
            "Güvenli elektrik çalışmaları ve sağlam montaj — ustalarımız vantilatörünüzü sallanma veya gürültü olmadan sorunsuz çalışır bırakır.",
            "Size uygun bir zamanda rezervasyon yapın. Çoğu tavan vantilatörü kurulumu bir saat içinde tamamlanır.",
          ],
        },
      ],
    },
  },

  "Smart Home Installation": {
    id: "smart-home-installation",
    emoji: "🏠",
    title: "Smart Home Installation",
    titleTr: "Akıllı Ev Kurulumu",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Smart lights, thermostats, video doorbells, and hubs — get your smart home set up by a Tasker.",
    taglineTr: "Akıllı ışıklar, termostatlar, görüntülü kapı zilleri ve hub'lar — akıllı evinizi bir usta tarafından kurun.",
    heroGradient: "linear-gradient(150deg, #0a0a2a 0%, #1a1a5a 50%, #2a2a9a 100%)",
    accentBg: "linear-gradient(135deg, #f0f0ff 0%, #c8c8ff 100%)",
    catId: "other",
    body: {
      intro: "Smart home devices can transform how you live, but setting them up can be frustrating. Our Taskers configure and install smart devices quickly — no confusing manuals needed.",
      introTr: "Akıllı ev cihazları yaşam şeklinizi dönüştürebilir, ancak bunları kurmak sinir bozucu olabilir. Ustalarımız akıllı cihazları hızlıca yapılandırır ve kurar — kafa karıştırıcı kılavuzlara gerek yoktur.",
      sections: [
        {
          heading: "Smart Home Installation Services",
          headingTr: "Akıllı Ev Kurulum Hizmetleri",
          paragraphs: [
            "From a single smart bulb to a full smart home ecosystem, our Taskers set up and configure all types of smart home devices.",
            "They link everything to your phone, set up automations, and make sure everything is working together before they leave.",
          ],
          paragraphsTr: [
            "Tek bir akıllı ampulden tam akıllı ev ekosistemine kadar, ustalarımız her türlü akıllı ev cihazını kurar ve yapılandırır.",
            "Her şeyi telefonunuza bağlar, otomasyonları ayarlar ve gitmeden önce her şeyin birlikte düzgün çalıştığından emin olurlar.",
          ],
        },
        {
          heading: "Smart home devices we install",
          headingTr: "Kurduğumuz akıllı ev cihazları",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Smart Lighting:", labelTr: "Akıllı Aydınlatma:", text: "Install and configure smart bulbs, strips, and lighting scenes.", textTr: "Akıllı ampuller, şerit ışıklar ve aydınlatma sahneleri kurulur ve yapılandırılır." },
            { label: "Smart Thermostat:", labelTr: "Akıllı Termostat:", text: "Install and set up Nest, Hive, or other smart thermostat brands.", textTr: "Nest, Hive veya diğer akıllı termostat markaları kurulur ve ayarlanır." },
            { label: "Video Doorbell:", labelTr: "Görüntülü Kapı Zili:", text: "Install Ring, Nest Hello, and other video doorbells with app setup.", textTr: "Ring, Nest Hello ve diğer görüntülü kapı zilleri uygulama ayarıyla kurulur." },
            { label: "Smart Plugs & Switches:", labelTr: "Akıllı Priz & Anahtarlar:", text: "Install smart plugs and switches to automate any device.", textTr: "Herhangi bir cihazı otomatikleştirmek için akıllı priz ve anahtarlar kurulur." },
            { label: "Smart Hub Setup:", labelTr: "Akıllı Hub Kurulumu:", text: "Configure Amazon Echo, Google Home, and Apple HomeKit hubs.", textTr: "Amazon Echo, Google Home ve Apple HomeKit hub'ları yapılandırılır." },
            { label: "Security Cameras:", labelTr: "Güvenlik Kameraları:", text: "Mount and configure indoor and outdoor security cameras.", textTr: "İç ve dış mekan güvenlik kameraları monte edilir ve yapılandırılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Smart Home Installation?",
          headingTr: "Akıllı Ev Kurulumu için neden UstaYolda?",
          paragraphs: [
            "Our Taskers are tech-savvy and experienced with all major smart home platforms. Setup done right, first time.",
            "They can integrate multiple systems and leave you confident on how to use everything.",
          ],
          paragraphsTr: [
            "Ustalarımız teknoloji konusunda bilgili ve tüm büyük akıllı ev platformlarında deneyimlidir. Kurulum ilk seferinde doğru yapılır.",
            "Birden fazla sistemi entegre edebilirler ve her şeyi nasıl kullanacağınız konusunda sizi güvende bırakırlar.",
          ],
        },
      ],
    },
  },

  "Install Air Conditioner": {
    id: "install-air-conditioner",
    emoji: "❄️",
    title: "Install Air Conditioner",
    titleTr: "Klima Kurulumu",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Professional air conditioner installation — stay cool and comfortable all summer long.",
    taglineTr: "Profesyonel klima kurulumu — tüm yaz boyunca serin ve rahat kalın.",
    heroGradient: "linear-gradient(150deg, #001a3a 0%, #003a5a 50%, #00608a 100%)",
    accentBg: "linear-gradient(135deg, #e8f8ff 0%, #a0e8ff 100%)",
    catId: "ac-repair",
    body: {
      intro: "A properly installed air conditioner makes all the difference in summer comfort. Our Taskers install portable, window, and split AC units efficiently and safely.",
      introTr: "Düzgün kurulmuş bir klima yaz aylarındaki konforu tamamen değiştirir. Ustalarımız taşınabilir, pencere tipi ve split klima ünitelerini verimli ve güvenle kurar.",
      sections: [
        {
          heading: "Air Conditioner Installation Services",
          headingTr: "Klima Kurulum Hizmetleri",
          paragraphs: [
            "Our Taskers handle the full installation of air conditioning units — positioning, mounting, electrical connection, and testing.",
            "They ensure your unit is installed for maximum efficiency and longevity.",
          ],
          paragraphsTr: [
            "Ustalarımız klima ünitelerinin tam kurulumunu üstlenir — konumlandırma, montaj, elektrik bağlantısı ve test.",
            "Ünitenizin maksimum verimlilik ve uzun ömür için kurulduğundan emin olurlar.",
          ],
        },
        {
          heading: "AC units we install",
          headingTr: "Kurduğumuz klima türleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Portable AC Units:", labelTr: "Taşınabilir Klimalar:", text: "Set up and position portable AC units with window venting.", textTr: "Taşınabilir klimalar pencereden havalandırma ile kurulur ve konumlandırılır." },
            { label: "Window AC Units:", labelTr: "Pencere Tipi Klimalar:", text: "Install window air conditioners securely and level in any frame.", textTr: "Pencere tipi klimalar her çerçeveye güvenli ve dengeli şekilde kurulur." },
            { label: "Split AC Indoor Unit:", labelTr: "Split Klima İç Ünite:", text: "Mount and position the indoor unit of a split system.", textTr: "Split sistemin iç ünitesi monte edilir ve konumlandırılır." },
            { label: "Electrical Connection:", labelTr: "Elektrik Bağlantısı:", text: "Wire and connect AC units to dedicated circuits safely.", textTr: "Klima üniteleri ayrı devrelere güvenle bağlanır." },
            { label: "AC Removal & Seasonal Storage:", labelTr: "Klima Söküm & Sezonluk Depolama:", text: "Remove and store window units safely at end of season.", textTr: "Sezon sonunda pencere üniteleri güvenle sökülür ve depolanır." },
            { label: "AC Unit Servicing:", labelTr: "Klima Bakımı:", text: "Clean filters, check refrigerant, and service AC units for peak performance.", textTr: "Filtreler temizlenir, soğutucu kontrol edilir ve klimalar en yüksek performans için bakıma alınır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for AC Installation?",
          headingTr: "Klima Kurulumu için neden UstaYolda?",
          paragraphs: [
            "Safe, efficient installation that maximises your unit's performance. No DIY shortcuts that could void your warranty.",
            "Book before the summer heat — our Taskers are in high demand during warm weather.",
          ],
          paragraphsTr: [
            "Ünitenizin performansını en üst düzeye çıkaran güvenli, verimli kurulum. Garantinizi geçersiz kılabilecek kendin yap kısayolları yok.",
            "Yaz sıcağı gelmeden önce rezervasyon yapın — ustalarımız sıcak havalarda yoğun talep görür.",
          ],
        },
      ],
    },
  },

  "Home Maintenance": {
    id: "home-maintenance",
    emoji: "🏡",
    title: "Home Maintenance",
    titleTr: "Ev Bakımı",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Keep your home in top condition with scheduled or one-off maintenance from a trusted Tasker.",
    taglineTr: "Güvenilir bir ustadan düzenli veya tek seferlik bakımla evinizi en iyi durumda tutun.",
    heroGradient: "linear-gradient(150deg, #0a2a0a 0%, #1a5a1a 50%, #2a8a2a 100%)",
    accentBg: "linear-gradient(135deg, #f0ffe8 0%, #c0f0a0 100%)",
    catId: "other",
    body: {
      intro: "Staying on top of home maintenance prevents small problems from becoming expensive repairs. Our Taskers help you keep your home safe, functional, and looking its best.",
      introTr: "Ev bakımını takip etmek, küçük sorunların pahalı onarımlara dönüşmesini önler. Ustalarımız evinizi güvenli, işlevsel ve en iyi görünümde tutmanıza yardımcı olur.",
      sections: [
        {
          heading: "Home Maintenance Services",
          headingTr: "Ev Bakımı Hizmetleri",
          paragraphs: [
            "From checking smoke alarms to clearing gutters and servicing appliances, our Taskers tackle your home maintenance list efficiently.",
            "Book a one-off maintenance visit or set up a regular seasonal check — whatever keeps your home in top shape.",
          ],
          paragraphsTr: [
            "Duman detektörlerini kontrol etmekten olukları temizlemeye ve beyaz eşyaları bakıma almaya kadar, ustalarımız ev bakımı listenizi verimli şekilde halleder.",
            "Tek seferlik bakım ziyareti rezervasyonu yapın veya düzenli mevsimlik kontrol ayarlayın — evinizi en iyi durumda tutan her şey.",
          ],
        },
        {
          heading: "Home maintenance tasks we handle",
          headingTr: "Üstlendiğimiz ev bakımı işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Smoke & CO Alarm Check:", labelTr: "Duman & CO Alarmı Kontrolü:", text: "Test, replace batteries, and reposition smoke and carbon monoxide alarms.", textTr: "Duman ve karbon monoksit alarmları test edilir, pilleri değiştirilir ve yeniden konumlandırılır." },
            { label: "Gutter Clearing:", labelTr: "Oluk Temizliği:", text: "Clear blocked gutters and downpipes before they cause leaks.", textTr: "Sızıntıya yol açmadan önce tıkalı oluklar ve yağmur boruları temizlenir." },
            { label: "Door & Window Check:", labelTr: "Kapı & Pencere Kontrolü:", text: "Check and lubricate locks, hinges, and window mechanisms.", textTr: "Kilitler, menteşeler ve pencere mekanizmaları kontrol edilerek yağlanır." },
            { label: "Caulk & Seal Inspection:", labelTr: "Derz & Sızdırmazlık Kontrolü:", text: "Inspect and replace failed seals in bathrooms and kitchens.", textTr: "Banyo ve mutfaklardaki bozulmuş contalar kontrol edilerek değiştirilir." },
            { label: "Seasonal Checklist:", labelTr: "Mevsimlik Kontrol Listesi:", text: "Winter prep or spring refresh — full seasonal maintenance check.", textTr: "Kış hazırlığı veya bahar tazelemesi — tam mevsimlik bakım kontrolü." },
            { label: "Odd Jobs List:", labelTr: "Çeşitli İşler Listesi:", text: "Tackle a list of small jobs efficiently in a single visit.", textTr: "Küçük işlerin listesini tek bir ziyarette verimli şekilde halleder." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Home Maintenance?",
          headingTr: "Ev Bakımı için neden UstaYolda?",
          paragraphs: [
            "Regular maintenance saves money long-term. Our Taskers help you stay ahead of problems before they become costly.",
            "Great for landlords and homeowners alike — schedule seasonal visits and keep your property in perfect condition.",
          ],
          paragraphsTr: [
            "Düzenli bakım uzun vadede para tasarrufu sağlar. Ustalarımız sorunların pahalıya dönüşmeden önce önde kalmanıza yardımcı olur.",
            "Hem ev sahipleri hem de kiracılar için harika — mevsimlik ziyaretler planlayın ve mülkünüzü mükemmel durumda tutun.",
          ],
        },
      ],
    },
  },

  "Home Repairs": {
    id: "home-repairs",
    emoji: "🛠️",
    title: "Home Repairs",
    titleTr: "Ev Tamiratı",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "General home repairs done right — no job too small for our skilled Taskers.",
    taglineTr: "Genel ev tamiratı doğru yapılır — yetenekli ustalarımız için hiçbir iş çok küçük değildir.",
    heroGradient: "linear-gradient(150deg, #1a0a00 0%, #3a2a10 50%, #6a4a20 100%)",
    accentBg: "linear-gradient(135deg, #fff8e8 0%, #ffe8b8 100%)",
    catId: "other",
    body: {
      intro: "Every home has a list of repairs that never quite gets done. Our Taskers tackle that list — fixing, patching, adjusting, and improving your home one task at a time.",
      introTr: "Her evin hiç bitirilemeyen bir tamirat listesi vardır. Ustalarımız bu listeyi tek seferde ele alır — evinizi onarır, yalar, ayarlar ve iyileştirir.",
      sections: [
        {
          heading: "Home Repair Services",
          headingTr: "Ev Tamirat Hizmetleri",
          paragraphs: [
            "From a leaky tap to a broken door hinge to a cracked tile, our Taskers handle all types of general home repairs quickly and professionally.",
            "No job too small. Book a Tasker with a list of repairs and get through them in one efficient visit.",
          ],
          paragraphsTr: [
            "Sızan bir musluktan kırık bir kapı menteşesine, çatlak bir fayanstan, ustalarımız her türlü genel ev tamiratını hızlı ve profesyonel şekilde halleder.",
            "Hiçbir iş çok küçük değildir. Bir tamirat listesiyle usta rezervasyonu yapın ve tek verimli bir ziyarette tamamlayın.",
          ],
        },
        {
          heading: "Common home repairs we handle",
          headingTr: "Üstlendiğimiz yaygın ev tamiratları",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Door & Window Fixes:", labelTr: "Kapı & Pencere Düzeltmeleri:", text: "Fix sticking doors, broken handles, and draughty windows.", textTr: "Sıkışan kapılar, kırık kollar ve hava sızdıran pencereler düzeltilir." },
            { label: "Wall & Ceiling Repairs:", labelTr: "Duvar & Tavan Tamiratı:", text: "Fill holes, repair cracks, and patch damaged plaster.", textTr: "Delikler doldurulur, çatlaklar onarılır ve hasar görmüş sıva yamanır." },
            { label: "Tile & Grout Fixes:", labelTr: "Fayans & Derz Düzeltmeleri:", text: "Replace cracked tiles and refresh discoloured grout lines.", textTr: "Çatlak fayanslar değiştirilir ve rengi değişmiş derz hatları tazelenir." },
            { label: "Minor Plumbing:", labelTr: "Küçük Tesisat:", text: "Dripping taps, running toilets, and minor pipe issues sorted.", textTr: "Damlayan musluklar, sürekli çalışan tuvaletler ve küçük boru sorunları çözülür." },
            { label: "Painting Touch-ups:", labelTr: "Boya Rötuşları:", text: "Touch up scuffs, marks, and areas that need a fresh coat.", textTr: "İzler, lekeler ve yeni bir kat gerektiren alanlar rötuş yapılır." },
            { label: "Odd Jobs:", labelTr: "Çeşitli İşler:", text: "Any small repair or fix around the house — bring your list.", textTr: "Evdeki her türlü küçük tamir veya düzeltme — listenizi getirin." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Home Repairs?",
          headingTr: "Ev Tamiratı için neden UstaYolda?",
          paragraphs: [
            "Book a Tasker with your full list of jobs and get everything done in one visit — no calling multiple tradesmen.",
            "Same-day booking available. Trusted, reviewed Taskers who take pride in their work.",
          ],
          paragraphsTr: [
            "Tüm iş listenizle usta rezervasyonu yapın ve tek bir ziyarette her şeyi tamamlatın — birden fazla ustacı aramak zorunda değilsiniz.",
            "Aynı gün rezervasyon mevcut. İşlerinden gurur duyan güvenilir, değerlendirilen ustalar.",
          ],
        },
      ],
    },
  },

  "Carpentry Services": {
    id: "carpentry-services",
    emoji: "🪚",
    title: "Carpentry Services",
    titleTr: "Marangozluk Hizmetleri",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Custom carpentry, wood repairs, and built-in solutions from skilled carpenters.",
    taglineTr: "Yetenekli marangozlardan özel marangozluk, ahşap onarımları ve ankastre çözümler.",
    heroGradient: "linear-gradient(150deg, #2a0a00 0%, #5a2a00 50%, #9a5010 100%)",
    accentBg: "linear-gradient(135deg, #fff5e0 0%, #ffd898 100%)",
    catId: "other",
    body: {
      intro: "From custom shelving to wood repairs and fitted furniture, our carpenter Taskers bring the skill and tools to make any carpentry project a success.",
      introTr: "Özel raflıklardan ahşap onarımlarına ve yerleşik mobilyalara kadar, marangoz ustalarımız her marangozluk projesini başarılı kılmak için gereken beceri ve araçları getirir.",
      sections: [
        {
          heading: "Carpentry Services",
          headingTr: "Marangozluk Hizmetleri",
          paragraphs: [
            "Our carpenter Taskers work with all types of wood, MDF, and timber — from small repairs to bespoke fitted furniture.",
            "Skilled in both traditional and modern carpentry techniques, they deliver precise, high-quality results.",
          ],
          paragraphsTr: [
            "Marangoz ustalarımız küçük onarımlardan ısmarlama yerleşik mobilyalara kadar her türlü ahşap, MDF ve ker teste ile çalışır.",
            "Hem geleneksel hem de modern marangozluk tekniklerinde yetenekli olarak hassas, yüksek kaliteli sonuçlar sunarlar.",
          ],
        },
        {
          heading: "Carpentry tasks we handle",
          headingTr: "Üstlendiğimiz marangozluk işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Custom Shelving:", labelTr: "Özel Raf Yapımı:", text: "Built-to-measure shelves for alcoves, home offices, and living spaces.", textTr: "Girintiler, ev ofisleri ve yaşam alanları için ölçüye göre yapılan raflar." },
            { label: "Fitted Furniture:", labelTr: "Yerleşik Mobilya:", text: "Built-in wardrobes, under-stairs storage, and alcove units.", textTr: "Yerleşik gardıroplar, merdiven altı depolama ve girintili üniteler." },
            { label: "Wood Repairs:", labelTr: "Ahşap Onarımı:", text: "Repair damaged timber, replace rotted sections, and restore woodwork.", textTr: "Hasar görmüş ahşap onarılır, çürük bölümler değiştirilir ve ahşap işleri restore edilir." },
            { label: "Skirting & Architrave:", labelTr: "Süpürgelik & Söve:", text: "Fit, replace, or repair skirting boards and door architraves.", textTr: "Süpürgelikler ve kapı söveleri takılır, değiştirilir veya onarılır." },
            { label: "Stud Wall Framing:", labelTr: "Bölme Duvar Çerçeveleme:", text: "Build timber stud frames for new partition walls.", textTr: "Yeni bölme duvarlar için ahşap iskelet çerçeveler inşa edilir." },
            { label: "Decking & Fencing:", labelTr: "Ahşap Teras & Çit:", text: "Build and repair timber decking, fencing, and garden structures.", textTr: "Ahşap teras, çit ve bahçe yapıları inşa edilir ve onarılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Carpentry?",
          headingTr: "Marangozluk için neden UstaYolda?",
          paragraphs: [
            "Skilled carpenters with a portfolio of completed projects. Quality craftsmanship you can trust.",
            "Flexible bookings for small repairs or larger projects. Taskers provide a clear estimate before starting.",
          ],
          paragraphsTr: [
            "Tamamlanmış projeleri olan yetenekli marangozlar. Güvenebileceğiniz kaliteli işçilik.",
            "Küçük onarımlar veya büyük projeler için esnek rezervasyonlar. Ustalar başlamadan önce net bir tahmin sunar.",
          ],
        },
      ],
    },
  },

  "Cabinet Installation": {
    id: "cabinet-installation",
    emoji: "🗄️",
    title: "Cabinet Installation",
    titleTr: "Dolap Kurulumu",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Kitchen and bathroom cabinet installation — precise, level, and professionally fitted.",
    taglineTr: "Mutfak ve banyo dolabı kurulumu — hassas, düzgün ve profesyonelce monte edilmiş.",
    heroGradient: "linear-gradient(150deg, #1a1a1a 0%, #3a3a2a 50%, #6a5a3a 100%)",
    accentBg: "linear-gradient(135deg, #f8f5e8 0%, #e8d8a8 100%)",
    catId: "other",
    body: {
      intro: "New kitchen or bathroom cabinets transform a space, but installation requires precision and the right tools. Our Taskers install cabinets perfectly level and securely mounted.",
      introTr: "Yeni mutfak veya banyo dolapları bir mekanı dönüştürür, ancak kurulum hassasiyet ve doğru araçlar gerektirir. Ustalarımız dolapları mükemmel düzgünlükte ve güvenli şekilde monte eder.",
      sections: [
        {
          heading: "Cabinet Installation Services",
          headingTr: "Dolap Kurulum Hizmetleri",
          paragraphs: [
            "Our Taskers install all types of kitchen and bathroom cabinets — wall-mounted, base, tower, and larder units — to a professional standard.",
            "They ensure all cabinets are level, plumb, and square, with doors and drawers aligned perfectly.",
          ],
          paragraphsTr: [
            "Ustalarımız duvara monte, zemin, kule ve kiler üniteleri de dahil olmak üzere her türlü mutfak ve banyo dolabını profesyonel standartlarda kurar.",
            "Tüm dolapların düzgün, dik ve kare olmasını, kapı ve çekmecelerin mükemmel hizalanmasını sağlarlar.",
          ],
        },
        {
          heading: "Cabinet installation tasks we handle",
          headingTr: "Üstlendiğimiz dolap kurulum işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Kitchen Wall Cabinets:", labelTr: "Mutfak Duvar Dolapları:", text: "Mount and level kitchen wall cabinets securely on any wall.", textTr: "Mutfak duvar dolapları her duvara güvenli şekilde monte edilir ve düzeltilir." },
            { label: "Base & Floor Cabinets:", labelTr: "Alt & Zemin Dolapları:", text: "Install base units level and square on uneven kitchen floors.", textTr: "Alt üniteler düzensiz mutfak zeminlerinde düzgün ve kare olarak kurulur." },
            { label: "Bathroom Vanity:", labelTr: "Banyo Tezgahı:", text: "Fit bathroom vanity units, mirror cabinets, and storage units.", textTr: "Banyo tezgah üniteleri, aynalı dolaplar ve depolama üniteleri takılır." },
            { label: "Wardrobe Installation:", labelTr: "Gardırop Kurulumu:", text: "Assemble and install flat-pack and fitted wardrobe systems.", textTr: "Demonte ve yerleşik gardırop sistemleri monte edilir ve kurulur." },
            { label: "Door & Drawer Alignment:", labelTr: "Kapı & Çekmece Hizalama:", text: "Adjust hinges and drawer runners for perfect alignment.", textTr: "Mükemmel hizalama için menteşeler ve çekmece rayları ayarlanır." },
            { label: "Cabinet Handles & Hardware:", labelTr: "Dolap Kolları & Donanımı:", text: "Fit handles, knobs, and soft-close mechanisms to cabinets.", textTr: "Dolaplara kollar, topuzlar ve soft-close mekanizmaları takılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Cabinet Installation?",
          headingTr: "Dolap Kurulumu için neden UstaYolda?",
          paragraphs: [
            "Precision installation that makes your kitchen or bathroom look like it was built by professionals — because it was.",
            "Taskers bring all necessary tools and fixings. Fast, clean, and zero mess left behind.",
          ],
          paragraphsTr: [
            "Mutfağınızı veya banyonuzu profesyoneller tarafından yapılmış gibi gösterin — çünkü öyle olacak.",
            "Ustalar tüm gerekli araçları ve bağlantı elemanlarını getirir. Hızlı, temiz ve sıfır dağınıklık.",
          ],
        },
      ],
    },
  },

  "Wallpapering Service": {
    id: "wallpapering-service",
    emoji: "🎨",
    title: "Wallpapering Service",
    titleTr: "Duvar Kağıdı Hizmeti",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Hang wallpaper perfectly — feature walls, full rooms, and wallpaper removal done professionally.",
    taglineTr: "Duvar kağıdını mükemmel asın — aksan duvarlar, tam odalar ve duvar kağıdı sökme işlemi profesyonelce yapılır.",
    heroGradient: "linear-gradient(150deg, #3a0a3a 0%, #6a1a6a 50%, #a030a0 100%)",
    accentBg: "linear-gradient(135deg, #fce8ff 0%, #f0b0ff 100%)",
    catId: "painting",
    body: {
      intro: "Wallpapering takes patience and precision to get right. Our Taskers hang wallpaper perfectly — patterns matched, seams invisible, and edges crisp.",
      introTr: "Duvar kağıdı asmak doğru yapmak için sabır ve hassasiyet gerektirir. Ustalarımız duvar kağıdını mükemmel şekilde asar — desenler hizalanmış, dikişler görünmez ve kenarlar keskin.",
      sections: [
        {
          heading: "Wallpapering Services",
          headingTr: "Duvar Kağıdı Hizmetleri",
          paragraphs: [
            "From a single feature wall to a full room, our Taskers are experienced in hanging all types of wallpaper — from simple rolls to complex pattern-matched designs.",
            "They prepare the walls properly, ensuring a smooth base, and leave a perfect, professional finish.",
          ],
          paragraphsTr: [
            "Tek bir aksan duvardan tam bir odaya kadar, ustalarımız basit rulolardan karmaşık desenli tasarımlara kadar her türlü duvar kağıdı asmada deneyimlidir.",
            "Duvarları düzgün şekilde hazırlarlar, pürüzsüz bir zemin sağlarlar ve mükemmel, profesyonel bir sonuç bırakırlar.",
          ],
        },
        {
          heading: "Wallpapering tasks we handle",
          headingTr: "Üstlendiğimiz duvar kağıdı işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Feature Wall:", labelTr: "Aksan Duvar:", text: "Transform one statement wall with premium wallpaper.", textTr: "Premium duvar kağıdıyla bir aksan duvarı dönüştürün." },
            { label: "Full Room Papering:", labelTr: "Tam Oda Kağıtlama:", text: "Paper all walls in bedrooms, living rooms, and hallways.", textTr: "Yatak odaları, oturma odaları ve koridorlardaki tüm duvarlar kağıtlanır." },
            { label: "Pattern Matching:", labelTr: "Desen Hizalama:", text: "Complex pattern-matched wallpapers hung precisely and seamlessly.", textTr: "Karmaşık desenli duvar kağıtları hassas ve kesintisiz şekilde asılır." },
            { label: "Wallpaper Removal:", labelTr: "Duvar Kağıdı Sökme:", text: "Remove old wallpaper and prepare walls for painting or re-papering.", textTr: "Eski duvar kağıtları sökülür ve duvarlar boyama veya yeniden kağıtlama için hazırlanır." },
            { label: "Wall Preparation:", labelTr: "Duvar Hazırlığı:", text: "Fill, sand, and prime walls before papering for a flawless base.", textTr: "Kusursuz bir zemin için duvarlar duvar kağıtlanmadan önce doldurulur, zımparalanır ve astar uygulanır." },
            { label: "Specialty Wallpapers:", labelTr: "Özel Duvar Kağıtları:", text: "Hang textured, fabric, metallic, and hand-painted wallcoverings.", textTr: "Dokulu, kumaşlı, metalik ve el boyamalı duvar kaplamaları asılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Wallpapering?",
          headingTr: "Duvar Kağıdı için neden UstaYolda?",
          paragraphs: [
            "Experienced Taskers who know how to handle every wallpaper type — no bubbles, no mismatched patterns, no lifting edges.",
            "They advise on quantities needed and can help choose the right adhesive for your wallpaper type.",
          ],
          paragraphsTr: [
            "Her duvar kağıdı türünü nasıl ele alacağını bilen deneyimli ustalar — hava kabarcığı yok, hizalanmamış desenler yok, kalkan kenarlar yok.",
            "Gerekli miktar konusunda tavsiye verirler ve duvar kağıdı türünüz için doğru yapıştırıcıyı seçmenize yardımcı olabilirler.",
          ],
        },
      ],
    },
  },

  "Fence Installation & Repair": {
    id: "fence-installation-repair",
    emoji: "🏕️",
    title: "Fence Installation & Repair",
    titleTr: "Çit Kurulum & Tamiri",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "New fence installation or existing fence repair — secure your garden with a trusted Tasker.",
    taglineTr: "Yeni çit kurulumu veya mevcut çit tamiri — güvenilir bir ustayla bahçenizi güvence altına alın.",
    heroGradient: "linear-gradient(150deg, #0a1a00 0%, #2a4a00 50%, #4a7a00 100%)",
    accentBg: "linear-gradient(135deg, #f0ffe0 0%, #c0e890 100%)",
    catId: "other",
    body: {
      intro: "A good fence provides privacy, security, and structure to your garden. Our Taskers install new fencing and repair existing panels, posts, and gates quickly and professionally.",
      introTr: "İyi bir çit bahçenize gizlilik, güvenlik ve yapı sağlar. Ustalarımız yeni çit kurar ve mevcut panelleri, direkleri ve kapıları hızlı ve profesyonelce onarır.",
      sections: [
        {
          heading: "Fence Installation & Repair Services",
          headingTr: "Çit Kurulum & Tamir Hizmetleri",
          paragraphs: [
            "From a single broken panel to a full new fence line, our Taskers handle all types of fencing installation and repair.",
            "They ensure posts are set deep and secure, panels are level, and the finished fence looks great and lasts.",
          ],
          paragraphsTr: [
            "Tek kırık bir panelden tam yeni bir çit hattına kadar, ustalarımız her türlü çit kurulum ve tamirini üstlenir.",
            "Direklerin derin ve güvenli yerleştirildiğini, panellerin düzgün olduğunu ve bitmiş çitin harika göründüğünü ve uzun ömürlü olduğunu sağlarlar.",
          ],
        },
        {
          heading: "Fence tasks we handle",
          headingTr: "Üstlendiğimiz çit işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Panel Fence Installation:", labelTr: "Panel Çit Kurulumu:", text: "Install new wooden or composite fence panels with concrete posts.", textTr: "Beton direklerle yeni ahşap veya kompozit çit panelleri kurulur." },
            { label: "Fence Panel Replacement:", labelTr: "Çit Paneli Değişimi:", text: "Replace damaged, rotten, or storm-damaged fence panels.", textTr: "Hasarlı, çürümüş veya fırtınayla zarar görmüş çit panelleri değiştirilir." },
            { label: "Post Replacement:", labelTr: "Direk Değişimi:", text: "Replace broken or leaning fence posts with new concrete footings.", textTr: "Kırık veya eğik çit direkleri yeni beton temelle değiştirilir." },
            { label: "Gate Installation:", labelTr: "Kapı Kurulumu:", text: "Fit new garden gates with secure hinges and latches.", textTr: "Güvenli menteşe ve mandallarla yeni bahçe kapıları takılır." },
            { label: "Fence Painting & Staining:", labelTr: "Çit Boyama & Ahşap Koruyucu:", text: "Paint or stain timber fencing for weather protection and appearance.", textTr: "Ahşap çitler hava koruması ve görünüm için boyanır veya ahşap koruyucu uygulanır." },
            { label: "Trellis & Screening:", labelTr: "Kafes & Paravan:", text: "Fit trellis panels, bamboo screening, and privacy panels.", textTr: "Kafes paneller, bambu ekranlar ve gizlilik panelleri takılır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Fencing?",
          headingTr: "Çit için neden UstaYolda?",
          paragraphs: [
            "Properly installed fences that stay upright through all weathers. Our Taskers use the right concrete mix and post depth for a lasting result.",
            "Fast turnaround — most fence repairs and single runs completed in one day.",
          ],
          paragraphsTr: [
            "Her hava koşulunda dik kalan düzgün kurulmuş çitler. Ustalarımız kalıcı bir sonuç için doğru beton karışımı ve direk derinliği kullanır.",
            "Hızlı dönüş — çoğu çit tamiri ve tek hat tek günde tamamlanır.",
          ],
        },
      ],
    },
  },

  "Deck Restoration Services": {
    id: "deck-restoration",
    emoji: "🏗️",
    title: "Deck Restoration Services",
    titleTr: "Deck Restorasyon Hizmetleri",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Sand, stain, and restore your deck — make your outdoor space beautiful again.",
    taglineTr: "Terası zımparalayın, boyana ve restore edin — dış mekanınızı yeniden güzel kılın.",
    heroGradient: "linear-gradient(150deg, #2a1a00 0%, #5a3a10 50%, #8a6020 100%)",
    accentBg: "linear-gradient(135deg, #fff5e0 0%, #ffd890 100%)",
    catId: "other",
    body: {
      intro: "Years of sun, rain, and foot traffic take their toll on timber decking. Our Taskers restore your deck to its former glory — cleaned, sanded, and freshly stained or painted.",
      introTr: "Yıllar içinde güneş, yağmur ve yoğun kullanım ahşap terası yorar. Ustalarımız terasınızı eski güzelliğine kavuşturur — temizlenmiş, zımparalanmış ve taze boyanmış veya ahşap koruyucu uygulanmış.",
      sections: [
        {
          heading: "Deck Restoration Services",
          headingTr: "Deck Restorasyon Hizmetleri",
          paragraphs: [
            "From a thorough clean and re-stain to full board replacement and structural repairs, our Taskers restore decks of all sizes and conditions.",
            "A restored deck not only looks like new — it's safer underfoot and better protected against weathering.",
          ],
          paragraphsTr: [
            "Kapsamlı temizlik ve yeniden ahşap koruyucu uygulamasından tam tahta değişimine ve yapısal onarımlara kadar, ustalarımız her boyut ve durumda terasları restore eder.",
            "Restore edilen bir teras sadece yeni gibi görünmekle kalmaz — ayak altında daha güvenli ve hava koşullarına karşı daha iyi korunmuş olur.",
          ],
        },
        {
          heading: "Deck restoration tasks we handle",
          headingTr: "Üstlendiğimiz deck restorasyon işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Deck Cleaning:", labelTr: "Teras Temizliği:", text: "Pressure wash and deep clean decking to remove algae, moss, and dirt.", textTr: "Yosun, yosun ve kiri gidermek için teras yüksek basınçla yıkanır ve derinlemesine temizlenir." },
            { label: "Sanding & Stripping:", labelTr: "Zımparalama & Soyma:", text: "Sand down weathered boards to reveal fresh, clean timber.", textTr: "Hava koşullarından etkilenmiş tahtalar zımparalanarak taze, temiz ahşap ortaya çıkarılır." },
            { label: "Staining & Sealing:", labelTr: "Ahşap Koruyucu & Sızdırmazlık:", text: "Apply premium deck stain or sealant for lasting protection.", textTr: "Kalıcı koruma için premium teras koruyucu veya sızdırmazlık uygulanır." },
            { label: "Board Replacement:", labelTr: "Tahta Değişimi:", text: "Replace individual rotten or damaged deck boards.", textTr: "Çürük veya hasarlı teras tahtaları tek tek değiştirilir." },
            { label: "Structural Repairs:", labelTr: "Yapısal Onarımlar:", text: "Repair joists, posts, and framework for a solid, safe deck.", textTr: "Sağlam ve güvenli bir teras için kirişler, direkler ve çerçeveler onarılır." },
            { label: "Deck Painting:", labelTr: "Teras Boyama:", text: "Paint composite or timber decking in any colour for a fresh look.", textTr: "Kompozit veya ahşap terası taze bir görünüm için herhangi bir renkte boyanır." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Deck Restoration?",
          headingTr: "Deck Restorasyonu için neden UstaYolda?",
          paragraphs: [
            "Your deck deserves more than a hurried DIY job. Our Taskers take time to do it properly — sanded smooth, evenly coated, and long-lasting.",
            "Book before summer for the best results. A restored deck makes outdoor living so much better.",
          ],
          paragraphsTr: [
            "Terasınız aceleyle yapılan kendin yap işten daha fazlasını hak ediyor. Ustalarımız bunu düzgün yapmak için zaman ayırır — pürüzsüz zımparalanmış, eşit kaplanmış ve uzun ömürlü.",
            "En iyi sonuçlar için yaz tatilinden önce rezervasyon yapın. Restore edilmiş bir teras açık havada yaşamı çok daha güzel kılar.",
          ],
        },
      ],
    },
  },

  "Doorbell Installation": {
    id: "doorbell-installation",
    emoji: "🔔",
    title: "Doorbell Installation",
    titleTr: "Kapı Zili Kurulumu",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "Install a traditional or smart video doorbell — quick, clean setup from a skilled Tasker.",
    taglineTr: "Geleneksel veya akıllı görüntülü kapı zili kurun — yetenekli bir ustadan hızlı, temiz kurulum.",
    heroGradient: "linear-gradient(150deg, #1a1a0a 0%, #3a3a1a 50%, #6a5a1a 100%)",
    accentBg: "linear-gradient(135deg, #fffbe8 0%, #ffecb8 100%)",
    catId: "other",
    body: {
      intro: "Whether you want a traditional wired doorbell or a modern smart video doorbell, our Taskers install and configure it quickly — so you never miss a visitor.",
      introTr: "İster geleneksel kablolu bir kapı zili ister modern akıllı görüntülü bir kapı zili isteyin, ustalarımız bunu hızlıca kurar ve yapılandırır — böylece hiçbir ziyaretçiyi kaçırmazsınız.",
      sections: [
        {
          heading: "Doorbell Installation Services",
          headingTr: "Kapı Zili Kurulum Hizmetleri",
          paragraphs: [
            "Our Taskers install all types of doorbells — wired, wireless, and smart video doorbells — with full setup and configuration.",
            "For video doorbells, they'll set up the app on your phone, connect to your WiFi, and configure motion zones before they leave.",
          ],
          paragraphsTr: [
            "Ustalarımız kablolu, kablosuz ve akıllı görüntülü kapı zilleri dahil her türlü kapı zilini tam kurulum ve yapılandırmayla takar.",
            "Görüntülü kapı zilleri için gitmeden önce telefonunuzdaki uygulamayı kurarlar, WiFi'ye bağlarlar ve hareket bölgelerini yapılandırırlar.",
          ],
        },
        {
          heading: "Doorbell types we install",
          headingTr: "Kurduğumuz kapı zili türleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Wired Doorbell:", labelTr: "Kablolu Kapı Zili:", text: "Install hardwired doorbells connected to your home's electrical system.", textTr: "Evinizin elektrik sistemine bağlı kablolu kapı zilleri kurulur." },
            { label: "Wireless Doorbell:", labelTr: "Kablosuz Kapı Zili:", text: "Fit battery-powered wireless doorbells quickly and cleanly.", textTr: "Pille çalışan kablosuz kapı zilleri hızlı ve temiz şekilde takılır." },
            { label: "Ring Video Doorbell:", labelTr: "Ring Görüntülü Kapı Zili:", text: "Install Ring devices with app setup, WiFi, and motion configuration.", textTr: "Ring cihazları uygulama kurulumu, WiFi ve hareket yapılandırmasıyla kurulur." },
            { label: "Nest Doorbell:", labelTr: "Nest Kapı Zili:", text: "Install and configure Google Nest Hello and Nest Doorbell.", textTr: "Google Nest Hello ve Nest Doorbell kurulur ve yapılandırılır." },
            { label: "Intercom Systems:", labelTr: "İnterkom Sistemleri:", text: "Install audio and video intercom systems for flats and gated homes.", textTr: "Daireler ve kapılı evler için sesli ve görüntülü interkom sistemleri kurulur." },
            { label: "Doorbell Replacement:", labelTr: "Kapı Zili Değişimi:", text: "Remove old doorbell and install a new one on existing wiring.", textTr: "Eski kapı zili sökülür ve yeni biri mevcut kablolamaya kurulur." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Doorbell Installation?",
          headingTr: "Kapı Zili Kurulumu için neden UstaYolda?",
          paragraphs: [
            "Quick installation with full app setup — our Taskers leave with your doorbell ringing and your phone notified.",
            "Most doorbell installations are done in under 30 minutes. Great value for the peace of mind.",
          ],
          paragraphsTr: [
            "Tam uygulama kurulumlu hızlı kurulum — ustalarımız kapı ziliniz çalarken ve telefonunuz bildirim alırken gider.",
            "Çoğu kapı zili kurulumu 30 dakikadan kısa sürede tamamlanır. Gönül rahatlığı için mükemmel değer.",
          ],
        },
      ],
    },
  },

  "Home Theater Installing": {
    id: "home-theater-installing",
    emoji: "🎬",
    title: "Home Theater Installing",
    titleTr: "Ev Sineması Kurulumu",
    category: "Handyman",
    categoryTr: "Tamirci",
    tagline: "AV receivers, surround sound, projectors, and screen mounting — your home cinema set up perfectly.",
    taglineTr: "AV alıcılar, surround ses, projektörler ve ekran montajı — ev sinema sisteminiz mükemmel şekilde kurulur.",
    heroGradient: "linear-gradient(150deg, #0a0a0a 0%, #1a0a2a 50%, #2a0a4a 100%)",
    accentBg: "linear-gradient(135deg, #f0e8ff 0%, #d0b0ff 100%)",
    catId: "other",

    body: {
      intro: "A proper home theater setup involves more than just a big TV. Our Taskers handle everything from projector mounting and speaker placement to AV receiver wiring and cable concealment.",
      introTr: "Düzgün bir ev sinema kurulumu sadece büyük bir TV'den daha fazlasını içerir. Ustalarımız projektör montajından hoparlör yerleşimine, AV alıcı kablolamasından kablo gizlemeye kadar her şeyi halleder.",
      sections: [
        {
          heading: "Home Theater Installation Services",
          headingTr: "Ev Sineması Kurulum Hizmetleri",
          paragraphs: [
            "Our Taskers design and install home theater systems tailored to your room and budget — from a simple surround sound setup to a full dedicated cinema room.",
            "They handle all the wiring, equipment placement, and system calibration so you get the best possible picture and sound.",
          ],
          paragraphsTr: [
            "Ustalarımız odanıza ve bütçenize uygun ev sinema sistemleri tasarlar ve kurar — basit bir surround ses kurulumundan tam özel bir sinema odasına kadar.",
            "Tüm kablolamayı, ekipman yerleşimini ve sistem kalibrasyonunu halleder, böylece mümkün olan en iyi görüntü ve sesi elde edersiniz.",
          ],
        },
        {
          heading: "Home theater tasks we handle",
          headingTr: "Üstlendiğimiz ev sineması işleri",
          paragraphs: [],
          paragraphsTr: [],
          list: [
            { label: "Projector Mounting:", labelTr: "Projektör Montajı:", text: "Ceiling or wall mount projectors with proper alignment and focus.", textTr: "Projektörler uygun hizalama ve odaklamayla tavana veya duvara monte edilir." },
            { label: "Screen Installation:", labelTr: "Ekran Kurulumu:", text: "Install fixed, drop-down, or motorized cinema screens.", textTr: "Sabit, aşağı sarkan veya motorlu sinema ekranları kurulur." },
            { label: "Surround Sound:", labelTr: "Surround Ses:", text: "Position and wire 5.1, 7.1, and Dolby Atmos speaker systems.", textTr: "5.1, 7.1 ve Dolby Atmos hoparlör sistemleri konumlandırılır ve bağlanır." },
            { label: "AV Receiver Setup:", labelTr: "AV Alıcı Kurulumu:", text: "Connect and configure AV receivers, streaming boxes, and source devices.", textTr: "AV alıcılar, akış kutuları ve kaynak cihazlar bağlanır ve yapılandırılır." },
            { label: "Cable Concealment:", labelTr: "Kablo Gizleme:", text: "Hide all HDMI, speaker, and power cables for a clean setup.", textTr: "Temiz bir kurulum için tüm HDMI, hoparlör ve güç kabloları gizlenir." },
            { label: "System Calibration:", labelTr: "Sistem Kalibrasyonu:", text: "Calibrate audio and video settings for optimal performance in your room.", textTr: "Odanızda en iyi performans için ses ve görüntü ayarları kalibre edilir." },
          ],
        },
        {
          heading: "Why choose UstaYolda for Home Theater Installation?",
          headingTr: "Ev Sineması Kurulumu için neden UstaYolda?",
          paragraphs: [
            "Our Taskers are experienced with all major AV brands and home theater configurations. They make it sound and look amazing.",
            "Clean cable management and perfect placement — your home theater will look like it was installed by a professional AV company.",
          ],
          paragraphsTr: [
            "Ustalarımız tüm büyük AV markaları ve ev sinema konfigürasyonlarında deneyimlidir. Muhteşem görüntü ve ses sağlarlar.",
            "Temiz kablo yönetimi ve mükemmel yerleşim — ev sinanız profesyonel bir AV şirketi tarafından kurulmuş gibi görünecek.",
          ],
        },
      ],
    },
  },

  // CLEANING SUBTYPES
  "Deep Cleaning": {
    id: "deep-cleaning",
    emoji: "🧹",
    title: "Deep Cleaning",
    titleTr: "Derin Temizlik",
    category: "Deep Cleaning",
    categoryTr: "Derin Temizlik",
    tagline: "Thorough deep cleaning of your home — every surface, corner, and crevice spotless.",
    taglineTr: "Evinizdeki kapsamlı derin temizlik — her yüzey, köşe ve yarık pırıl pırıl.",
    heroGradient: "linear-gradient(150deg, #0d3320 0%, #1a6640 50%, #2a9960 100%)",
    accentBg: "linear-gradient(135deg, #eafff4 0%, #b0ffd8 100%)",
    catId: "cleaning",
    body: {
      intro: "When a regular clean isn't enough, book a deep cleaning. Our Taskers tackle every surface, from skirting boards to ceiling corners — leaving your home immaculate.",
      introTr: "Düzenli temizlik yetmediğinde derin temizlik rezervasyonu yapın. Ustalarımız her yüzeyi, süpurgeden tavan köşelerine kadar halleder — evinizi kusursuz bırakır.",
      sections: [
        {
          heading: "What's included in deep cleaning",
          headingTr: "Derin temizlikte neler var",
          paragraphs: [
            "Deep cleaning goes beyond regular maintenance. We clean inside kitchen cupboards, behind appliances, under furniture, and detail every room thoroughly.",
            "All baseboards, skirting boards, light switches, and door handles receive special attention.",
          ],
          paragraphsTr: [
            "Derin temizlik düzenli bakımın ötesine gider. Mutfak dolaplarının içini, cihazların arkasını, mobilyanın altını temizleriz ve her odayı derinlemesine temizleriz.",
            "Tüm tabanlar, çıta tahtaları, ışık anahtarları ve kapı kolları özel ilgi alır.",
          ],
        },
      ],
    },
  },

  "Move In Cleaning": {
    id: "move-in-cleaning",
    emoji: "🧹",
    title: "Move In Cleaning",
    titleTr: "Taşınma Temizliği",
    category: "Move In Cleaning",
    categoryTr: "Taşınma Temizliği",
    tagline: "Fresh and clean before you move in. We'll prepare your new home spotless.",
    taglineTr: "Taşınmadan önce temiz ve taze. Yeni evinizi pırıl pırıl hazırlayacağız.",
    heroGradient: "linear-gradient(150deg, #0d3320 0%, #1a6640 50%, #2a9960 100%)",
    accentBg: "linear-gradient(135deg, #eafff4 0%, #b0ffd8 100%)",
    catId: "cleaning",
    body: {
      intro: "Start fresh in your new space. Our move-in cleaning ensures every corner is spotless before you unpack a single box.",
      introTr: "Yeni alanınızda temiz başlayın. Taşınma temizliğimiz, tek bir kutu açmadan önce her köşenin pırıl pırıl olmasını sağlar.",
      sections: [
        {
          heading: "Move-in cleaning includes",
          headingTr: "Taşınma temizliği içerir",
          paragraphs: ["Complete room-by-room deep clean ensuring your new home is pristine."],
          paragraphsTr: ["Yeni evinizin kusursuz olmasını sağlayan oda-oda tam derin temizlik."],
        },
      ],
    },
  },

  "Spring Cleaning": {
    id: "spring-cleaning",
    emoji: "🌱",
    title: "Spring Cleaning",
    titleTr: "Bahar Temizliği",
    category: "Spring Cleaning",
    categoryTr: "Bahar Temizliği",
    tagline: "Refresh your home from top to bottom with a complete spring clean.",
    taglineTr: "Evinizi baştan aşağıya tazeleyip tamamen yenileyin.",
    heroGradient: "linear-gradient(150deg, #0d3320 0%, #1a6640 50%, #2a9960 100%)",
    accentBg: "linear-gradient(135deg, #eafff4 0%, #b0ffd8 100%)",
    catId: "cleaning",
    body: {
      intro: "Time to refresh your home for the season. Spring cleaning tackles all those hard-to-reach places — windows, ceiling fans, carpets, and more.",
      introTr: "Evinizi sezon için tazelemek zamanı. Bahar temizliği, pencereler, tavan fanları, halılar ve daha fazla gibi tüm ulaşılması zor yerleri temizler.",
      sections: [
        {
          heading: "Spring cleaning services",
          headingTr: "Bahar temizliği hizmetleri",
          paragraphs: ["Full home seasonal refresh including windows, carpets, and seasonal maintenance."],
          paragraphsTr: ["Pencereler, halılar ve mevsimsel bakım dahil tam ev mevsimsel yenileme."],
        },
      ],
    },
  },

  "Disinfecting Services": {
    id: "disinfecting-services",
    emoji: "🦠",
    title: "Disinfecting Services",
    titleTr: "Dezenfeksiyon Hizmetleri",
    category: "Disinfecting Services",
    categoryTr: "Dezenfeksiyon Hizmetleri",
    tagline: "Professional disinfecting treatment for your home or office — safe and thorough.",
    taglineTr: "Eviniz veya ofisiniz için profesyonel dezenfeksiyon işlemi — güvenli ve kapsamlı.",
    heroGradient: "linear-gradient(150deg, #1a1a3a 0%, #2a2a6a 50%, #3a3a9a 100%)",
    accentBg: "linear-gradient(135deg, #ede8ff 0%, #cfc0ff 100%)",
    catId: "cleaning",
    body: {
      intro: "Protect your family with professional disinfection services using hospital-grade disinfectants approved for residential use.",
      introTr: "Konut kullanımı için onaylanmış hastane kalitesi dezenfektanları kullanan profesyonel dezenfeksiyon hizmetleriyle ailenizi koruyun.",
      sections: [
        {
          heading: "Disinfecting coverage",
          headingTr: "Dezenfeksiyon kapsamı",
          paragraphs: ["Complete disinfection of high-touch surfaces, door handles, and frequently used areas."],
          paragraphsTr: ["Sık dokunulan yüzeyler, kapı kolları ve sık kullanılan alanların tam dezenfeksiyonu."],
        },
      ],
    },
  },

  "Carpet Cleaning Service": {
    id: "carpet-cleaning",
    emoji: "🪴",
    title: "Carpet Cleaning",
    titleTr: "Halı Temizliği",
    category: "Carpet Cleaning",
    categoryTr: "Halı Temizliği",
    tagline: "Professional carpet cleaning using steam and dry methods — stain removal guaranteed.",
    taglineTr: "Buhar ve kuru yöntemler kullanarak profesyonel halı temizliği — leke kaldırma garantili.",
    heroGradient: "linear-gradient(150deg, #0d3320 0%, #1a6640 50%, #2a9960 100%)",
    accentBg: "linear-gradient(135deg, #eafff4 0%, #b0ffd8 100%)",
    catId: "cleaning",
    body: {
      intro: "Revive your carpets with professional cleaning. We remove stains, odors, and deep-set dirt leaving your carpets fresh and extends their life.",
      introTr: "Halılarınızı profesyonel temizlikle yenileyin. Lekeleri, kokuları ve derinlemesine çöpü kaldırarak halılarınızı taze tutarız ve ömrünü uzatırız.",
      sections: [
        {
          heading: "Carpet cleaning methods",
          headingTr: "Halı temizliği yöntemleri",
          paragraphs: ["Steam extraction for deep cleaning or dry cleaning for immediate use."],
          paragraphsTr: ["Derin temizlik için buhar ekstraksiyon veya hemen kullanım için kuru temizlik."],
        },
      ],
    },
  },

  // MOVING SUBTYPES
  "Help Moving": {
    id: "help-moving",
    emoji: "🚛",
    title: "Help Moving",
    titleTr: "Taşıma Yardımı",
    category: "Help Moving",
    categoryTr: "Taşıma Yardımı",
    tagline: "Extra hands to make your move easier — lifting, carrying, and organization.",
    taglineTr: "Taşınmanızı kolaylaştırmak için ek eller — kaldırma, taşıma ve organize etme.",
    heroGradient: "linear-gradient(150deg, #1a3a2a 0%, #2a6a4a 50%, #3a9a6a 100%)",
    accentBg: "linear-gradient(135deg, #eafff4 0%, #b0ffd8 100%)",
    catId: "moving",
    body: {
      intro: "Moving doesn't have to be a hassle. Book a Tasker to help with heavy lifting and packing — making your move stress-free.",
      introTr: "Taşınma zahmetli olmak zorunda değil. Ağır kaldırma ve paketlemede yardımcı olmak için bir usta rezervasyonu yapın.",
      sections: [
        {
          heading: "Moving help services",
          headingTr: "Taşıma yardımı hizmetleri",
          paragraphs: ["Professional movers ready to help with your residential or commercial move."],
          paragraphsTr: ["Konut veya ticari taşınmanızda yardımcı olmaya hazır profesyonel taşıyıcılar."],
        },
      ],
    },
  },

  "Heavy Lifting": {
    id: "heavy-lifting",
    emoji: "💪",
    title: "Heavy Lifting",
    titleTr: "Ağır Kaldırma",
    category: "Heavy Lifting",
    categoryTr: "Ağır Kaldırma",
    tagline: "Strong hands for heavy items — sofas, refrigerators, pianos, and more.",
    taglineTr: "Ağır eşyalar için güçlü eller — koltuklar, buzdolapları, piyanolar ve daha fazlası.",
    heroGradient: "linear-gradient(150deg, #3a1a0a 0%, #6a2a1a 50%, #9a4a2a 100%)",
    accentBg: "linear-gradient(135deg, #fff5e8 0%, #ffd8a0 100%)",
    catId: "moving",
    body: {
      intro: "Some items are just too heavy to move alone. Our Taskers have the strength and experience to safely move appliances, pianos, and furniture.",
      introTr: "Bazı eşyalar yalnız taşınmak için çok ağır. Ustalarımız cihazları, piyanolları ve mobilyaları güvenle taşımak için güç ve deneyime sahiptir.",
      sections: [
        {
          heading: "Heavy lifting services",
          headingTr: "Ağır kaldırma hizmetleri",
          paragraphs: ["Safe and experienced moving of heavy furniture and appliances within your home."],
          paragraphsTr: ["Evinizde ağır mobilya ve cihazların güvenli ve deneyimli taşınması."],
        },
      ],
    },
  },

  "Packing Services & Help": {
    id: "packing-services",
    emoji: "📦",
    title: "Packing Services",
    titleTr: "Paketleme Hizmetleri",
    category: "Packing Services",
    categoryTr: "Paketleme Hizmetleri",
    tagline: "Professional packing with protective materials — your items arrive safely.",
    taglineTr: "Koruyucu malzemelerle profesyonel paketleme — eşyalarınız güvenle vardığında.",
    heroGradient: "linear-gradient(150deg, #1a3a2a 0%, #2a6a4a 50%, #3a9a6a 100%)",
    accentBg: "linear-gradient(135deg, #eafff4 0%, #b0ffd8 100%)",
    catId: "moving",
    body: {
      intro: "Expert packing takes the stress out of moving. We use quality materials and proper technique to ensure fragile items arrive safely.",
      introTr: "Uzman paketleme taşınmanın stresini alır. Kırılgan eşyaların güvenle varmasını sağlamak için kaliteli malzemeler ve uygun teknik kullanırız.",
      sections: [
        {
          heading: "Packing services include",
          headingTr: "Paketleme hizmetleri içerir",
          paragraphs: ["Professional wrapping and packing of all items using protective materials."],
          paragraphsTr: ["Koruyucu malzemeleri kullanarak tüm eşyaların profesyonel sarılması ve paketlenmesi."],
        },
      ],
    },
  },

  "Junk Pickup": {
    id: "junk-pickup",
    emoji: "♻️",
    title: "Junk Pickup",
    titleTr: "Hurda Kaldırma",
    category: "Junk Pickup",
    categoryTr: "Hurda Kaldırma",
    tagline: "Get rid of unwanted items — furniture, appliances, and general clutter.",
    taglineTr: "İstenmeyen eşyalardan kurtulun — mobilya, cihazlar ve genel karışıklık.",
    heroGradient: "linear-gradient(150deg, #1a1a1a 0%, #3a3a3a 50%, #5a5a5a 100%)",
    accentBg: "linear-gradient(135deg, #e8e8e8 0%, #c0c0c0 100%)",
    catId: "moving",
    body: {
      intro: "Declutter quickly and easily. Our Taskers remove unwanted furniture, appliances, and general junk — leaving your space clean and tidy.",
      introTr: "Hızlı ve kolay bir şekilde düzeni bozun. Ustalarımız istenmeyen mobilya, cihazlar ve genel çöpü kaldırarak alanınızı temiz bırakırlar.",
      sections: [
        {
          heading: "Junk removal services",
          headingTr: "Hurda kaldırma hizmetleri",
          paragraphs: ["Removal and disposal of old furniture, appliances, and unwanted items."],
          paragraphsTr: ["Eski mobilya, cihazlar ve istenmeyen eşyaların kaldırılması ve imha edilmesi."],
        },
      ],
    },
  },

  "Furniture Removal": {
    id: "furniture-removal",
    emoji: "🪑",
    title: "Furniture Removal",
    titleTr: "Mobilya Kaldırma",
    category: "Furniture Removal",
    categoryTr: "Mobilya Kaldırma",
    tagline: "Remove old furniture safely — couches, beds, dressers, and more.",
    taglineTr: "Eski mobilyaları güvenle kaldırın — koltuklar, yataklar, komodolar ve daha fazlası.",
    heroGradient: "linear-gradient(150deg, #3a1a0a 0%, #6a2a1a 50%, #9a4a2a 100%)",
    accentBg: "linear-gradient(135deg, #fff5e8 0%, #ffd8a0 100%)",
    catId: "moving",
    body: {
      intro: "Clear out old pieces without the effort. Our Taskers remove bulky furniture and make sure it's disposed of responsibly.",
      introTr: "Çaba harcamadan eski parçaları temizleyin. Ustalarımız büyük mobilyaları kaldırır ve sorumlu şekilde imha edilmesini sağlar.",
      sections: [
        {
          heading: "Furniture removal",
          headingTr: "Mobilya kaldırma",
          paragraphs: ["Safe removal of old furniture from your home with responsible disposal."],
          paragraphsTr: ["Eski mobilyanın evinizden sorumlu şekilde güvenli kaldırılması."],
        },
      ],
    },
  },

  "Grocery Shopping & Delivery": {
    id: "grocery-shopping",
    emoji: "🛒",
    title: "Grocery Shopping & Delivery",
    titleTr: "Market Alışverişi & Teslimat",
    category: "Grocery Shopping",
    categoryTr: "Market Alışverişi",
    tagline: "Shop for groceries and have them delivered to your door — save time, stay home.",
    taglineTr: "Marketten alışveriş yapın ve kapınıza teslim edilsin — zamandan tasarruf edin, evde kalın.",
    heroGradient: "linear-gradient(150deg, #1a2a5a 0%, #2a508a 50%, #3a7abf 100%)",
    accentBg: "linear-gradient(135deg, #eaf0ff 0%, #c0d8ff 100%)",
    catId: "other",
    body: {
      intro: "Too busy for grocery shopping? Send a Tasker to shop your full grocery list and deliver fresh items to your door.",
      introTr: "Market alışverişi için çok mu meşgul? Tam alışveriş listenizi almak için bir usta gönderin ve taze eşyaları kapınıza teslim etsin.",
      sections: [
        {
          heading: "Grocery shopping services",
          headingTr: "Market alışverişi hizmetleri",
          paragraphs: ["Full grocery shopping from any supermarket with same-day delivery to your home."],
          paragraphsTr: ["Her marketten tam alışveriş ve aynı gün eve teslim."],
        },
      ],
    },
  },

  "Running Your Errands": {
    id: "running-errands",
    emoji: "🏃",
    title: "Running Errands",
    titleTr: "Ayak İşleri Yapma",
    category: "Running Errands",
    categoryTr: "Ayak İşleri",
    tagline: "Handle all your errands — bank, post office, returns, shopping, and more.",
    taglineTr: "Tüm ayak işlerinizi yapın — banka, posta, iade, alışveriş ve daha fazlası.",
    heroGradient: "linear-gradient(150deg, #1a2a5a 0%, #2a508a 50%, #3a7abf 100%)",
    accentBg: "linear-gradient(135deg, #eaf0ff 0%, #c0d8ff 100%)",
    catId: "other",
    body: {
      intro: "Let a Tasker handle your daily errands while you focus on what matters. From the bank to the post office — we've got you covered.",
      introTr: "Günlük ayak işlerini bir usta halletsin, siz önemli şeylere odaklanın. Bankadan posta ofisine — her şey sizin için halledilebilir.",
      sections: [
        {
          heading: "Errand services available",
          headingTr: "Mevcut ayak işi hizmetleri",
          paragraphs: ["Complete errand running including banking, postal services, and shopping tasks."],
          paragraphsTr: ["Bankacılık, posta hizmetleri ve alışveriş görevleri dahil tam ayak işi hizmetleri."],
        },
      ],
    },
  },

  "Wait in Line": {
    id: "wait-in-line",
    emoji: "⏳",
    title: "Wait in Line",
    titleTr: "Kuyrukta Bekle",
    category: "Wait in Line",
    categoryTr: "Kuyrukta Bekle",
    tagline: "Don't waste time in lines — a Tasker will wait for you at the DMV, store, or anywhere.",
    taglineTr: "Kuyrukta zaman harcamayın — bir usta sizin için DMV, mağaza veya başka yerde sırada bekleyecek.",
    heroGradient: "linear-gradient(150deg, #1a2a5a 0%, #2a508a 50%, #3a7abf 100%)",
    accentBg: "linear-gradient(135deg, #eaf0ff 0%, #c0d8ff 100%)",
    catId: "other",
    body: {
      intro: "No more wasting time in long queues. Send a Tasker to wait in line for you anywhere — DMV, post office, shops, events.",
      introTr: "Artık uzun kuyrukta zaman harcamayın. Bir ustayı DMV, posta ofisi, mağazalar, etkinlikler gibi her yerde sırada beklemek için gönderin.",
      sections: [
        {
          heading: "Waiting services",
          headingTr: "Bekleme hizmetleri",
          paragraphs: ["Taskers will wait in line for you at any venue, store, or service location."],
          paragraphsTr: ["Ustalar herhangi bir mekan, mağaza veya hizmet noktasında sizin için sırada bekleyecekler."],
        },
      ],
    },
  },

  "Install Shelves, Rods & Hooks": {
    id: "install-shelves",
    emoji: "🖼️",
    title: "Install Shelves, Rods & Hooks",
    titleTr: "Raf, Çubuk & Kanca Kurulumu",
    category: "Install Shelves",
    categoryTr: "Raf Kurulumu",
    tagline: "Secure shelving installation — floating shelves, rods, towel rails, hooks perfectly mounted.",
    taglineTr: "Güvenli raf kurulumu — duvara monte raflar, çubuklar, havlu askıları, kancalar mükemmel bir şekilde monte edilir.",
    heroGradient: "linear-gradient(150deg, #2a1a5a 0%, #4a2a9a 50%, #7a4ade 100%)",
    accentBg: "linear-gradient(135deg, #f4f0ff 0%, #d8c8ff 100%)",
    catId: "other",
    body: {
      intro: "Install shelves and storage solutions throughout your home — wall-mounted, floating, or bracket-based with perfect leveling every time.",
      introTr: "Evinizde raf ve depolama çözümleri kurun — duvar monte, duvara asılı veya braketli her seferinde mükemmel hizalama ile.",
      sections: [
        {
          heading: "Shelf installation services",
          headingTr: "Raf kurulumu hizmetleri",
          paragraphs: ["Professional installation of shelves, rods, and wall-mounted storage solutions."],
          paragraphsTr: ["Raf, çubuk ve duvar monte depolama çözümlerinin profesyonel kurulumu."],
        },
      ],
    },
  },

  "Hang Art, Mirror & Decor": {
    id: "hang-art-decor",
    emoji: "🖼️",
    title: "Hang Art, Mirror & Decor",
    titleTr: "Tablo, Ayna & Dekor Asma",
    category: "Hang Art & Decor",
    categoryTr: "Tablo & Dekor Asma",
    tagline: "Professional hanging of artwork, mirrors, and decorative pieces — perfectly level every time.",
    taglineTr: "Sanat eserleri, aynalar ve dekoratif parçaların profesyonel asılması — her seferinde mükemmel hizalama.",
    heroGradient: "linear-gradient(150deg, #2a1a5a 0%, #4a2a9a 50%, #7a4ade 100%)",
    accentBg: "linear-gradient(135deg, #f4f0ff 0%, #d8c8ff 100%)",
    catId: "other",
    body: {
      intro: "Get your artwork and decorative pieces hung at the perfect height and angle — creating a gallery-perfect display in your home.",
      introTr: "Sanat eserlerinizi ve dekoratif parçalarınızı mükemmel yükseklik ve açıda asın — evinizde galeri-mükemmel bir görüntü oluşturun.",
      sections: [
        {
          heading: "Art hanging services",
          headingTr: "Tablo asma hizmetleri",
          paragraphs: ["Perfect placement of artwork, mirrors, and decorative items on any wall type."],
          paragraphsTr: ["Sanat eserlerinin, aynaların ve dekoratif eşyaların herhangi bir duvar tipine mükemmel şekilde yerleştirilmesi."],
        },
      ],
    },
  },

  "General Mounting": {
    id: "general-mounting",
    emoji: "🔨",
    title: "General Mounting",
    titleTr: "Genel Montaj",
    category: "General Mounting",
    categoryTr: "Genel Montaj",
    tagline: "Wall mounting for anything — quick, level, and secure installation.",
    taglineTr: "Her şey için duvar montajı — hızlı, düzgün ve güvenli kurulum.",
    heroGradient: "linear-gradient(150deg, #2a1a5a 0%, #4a2a9a 50%, #7a4ade 100%)",
    accentBg: "linear-gradient(135deg, #f4f0ff 0%, #d8c8ff 100%)",
    catId: "other",
    body: {
      intro: "Any mounting project — shelves, rails, brackets, or decorative items — our Taskers handle it all with precision and care.",
      introTr: "Herhangi bir montaj projesi — raflar, raylar, braketler veya dekoratif eşyalar — ustalarımız hepsi duyarlılık ve özeni ile halleder.",
      sections: [
        {
          heading: "Mounting services",
          headingTr: "Montaj hizmetleri",
          paragraphs: ["Professional mounting of any item on walls with proper anchors and leveling."],
          paragraphsTr: ["Uygun dingillerle ve hizalama ile herhangi bir eşyanın duvarlara profesyonel montajı."],
        },
      ],
    },
  },

  "Lawn Mowing Services": {
    id: "lawn-mowing",
    emoji: "🌱",
    title: "Lawn Mowing Services",
    titleTr: "Çim Biçme Hizmetleri",
    category: "Lawn Mowing",
    categoryTr: "Çim Biçme",
    tagline: "Regular lawn mowing and edging — keep your grass looking neat all season.",
    taglineTr: "Düzenli çim biçme ve kenar düzeltme — çiminizi mevsimboyunca tertip tutun.",
    heroGradient: "linear-gradient(150deg, #1a3a0a 0%, #2a6a1a 50%, #4aaa2a 100%)",
    accentBg: "linear-gradient(135deg, #f0ffe8 0%, #c0f090 100%)",
    catId: "other",
    body: {
      intro: "Keep your lawn looking its best with regular mowing. Book a one-off service or a regular weekly schedule.",
      introTr: "Çiminizi düzenli biçme ile en iyi durumda tutun. Tek seferlik bir hizmet veya haftalık düzenli bir program rezervasyonu yapın.",
      sections: [
        {
          heading: "Lawn mowing services",
          headingTr: "Çim biçme hizmetleri",
          paragraphs: ["Professional lawn mowing, edging, and garden tidying for regular maintenance."],
          paragraphsTr: ["Düzenli bakım için profesyonel çim biçme, kenar düzeltme ve bahçe temizliği."],
        },
      ],
    },
  },

  "Gardening Services": {
    id: "gardening-services",
    emoji: "🌱",
    title: "Gardening Services",
    titleTr: "Bahçeleme Hizmetleri",
    category: "Gardening",
    categoryTr: "Bahçeleme",
    tagline: "Professional gardening from planting to maintenance — beautify your outdoor space.",
    taglineTr: "Dikim ve bakımdan profesyonel bahçeleme — dış mekanınızı güzelleştirin.",
    heroGradient: "linear-gradient(150deg, #1a3a0a 0%, #2a6a1a 50%, #4aaa2a 100%)",
    accentBg: "linear-gradient(135deg, #f0ffe8 0%, #c0f090 100%)",
    catId: "other",
    body: {
      intro: "Create a beautiful garden with help from our gardening experts — design, planting, and ongoing maintenance all handled by skilled Taskers.",
      introTr: "Bahçeleme uzmanlarımızın yardımıyla güzel bir bahçe oluşturun — tasarım, dikim ve devam eden bakım tamamı yetenekli ustalar tarafından yapılır.",
      sections: [
        {
          heading: "Gardening services available",
          headingTr: "Mevcut bahçeleme hizmetleri",
          paragraphs: ["Garden design, planting, seasonal maintenance, and long-term care."],
          paragraphsTr: ["Bahçe tasarımı, dikim, mevsimsel bakım ve uzun vadeli bakım."],
        },
      ],
    },
  },

  "Tree Trimming Service": {
    id: "tree-trimming",
    emoji: "🌳",
    title: "Tree Trimming Service",
    titleTr: "Ağaç Budama Hizmetleri",
    category: "Tree Trimming",
    categoryTr: "Ağaç Budama",
    tagline: "Safe and professional tree trimming — keep your trees healthy and your space safe.",
    taglineTr: "Güvenli ve profesyonel ağaç budama — ağaçlarınızı sağlıklı ve alanınızı güvenli tutun.",
    heroGradient: "linear-gradient(150deg, #1a3a0a 0%, #2a6a1a 50%, #4aaa2a 100%)",
    accentBg: "linear-gradient(135deg, #f0ffe8 0%, #c0f090 100%)",
    catId: "other",
    body: {
      intro: "Professional tree care keeps your garden looking great and ensures safety. Our Taskers trim branches, shape trees, and remove dead wood.",
      introTr: "Profesyonel ağaç bakımı bahçenizi harika tutar ve güvenliği sağlar. Ustalarımız dalları kesiyor, ağaçları şekillendiriyor ve ölü ağacı kaldırıyor.",
      sections: [
        {
          heading: "Tree trimming services",
          headingTr: "Ağaç budama hizmetleri",
          paragraphs: ["Professional tree trimming, branch removal, and tree shaping services."],
          paragraphsTr: ["Profesyonel ağaç budama, dal kaldırma ve ağaç şekillendirme hizmetleri."],
        },
      ],
    },
  },

  "Weed Removal": {
    id: "weed-removal",
    emoji: "🌿",
    title: "Weed Removal",
    titleTr: "Yabani Ot Kaldırma",
    category: "Weed Removal",
    categoryTr: "Yabani Ot Kaldırma",
    tagline: "Remove weeds from gardens, patios, and driveways — restore your outdoor space.",
    taglineTr: "Bahçeler, teraslar ve yollardan yabani otları kaldırın — dış mekanınızı eski haline getirin.",
    heroGradient: "linear-gradient(150deg, #1a3a0a 0%, #2a6a1a 50%, #4aaa2a 100%)",
    accentBg: "linear-gradient(135deg, #f0ffe8 0%, #c0f090 100%)",
    catId: "other",
    body: {
      intro: "Keep your garden weed-free and looking neat. Our Taskers remove weeds safely and can set up regular maintenance to keep your space pristine.",
      introTr: "Bahçenizi yabani otlardan temiz ve düzenli tutun. Ustalarımız yabani otları güvenle kaldırır ve alanınızı pristine tutmak için düzenli bakım ayarlayabilir.",
      sections: [
        {
          heading: "Weed removal services",
          headingTr: "Yabani ot kaldırma hizmetleri",
          paragraphs: ["Safe and effective weed removal from gardens, driveways, and outdoor areas."],
          paragraphsTr: ["Bahçeler, yollar ve dış mekan alanlarından güvenli ve etkili yabani ot kaldırma."],
        },
      ],
    },
  },

  "Hedge Trimming Service": {
    id: "hedge-trimming",
    emoji: "🌳",
    title: "Hedge Trimming Service",
    titleTr: "Çit Budama Hizmetleri",
    category: "Hedge Trimming",
    categoryTr: "Çit Budama",
    tagline: "Professional hedge trimming — neat, shaped, and well-maintained hedges.",
    taglineTr: "Profesyonel çit budama — düzenli, şekilli ve bakımlı çitler.",
    heroGradient: "linear-gradient(150deg, #1a3a0a 0%, #2a6a1a 50%, #4aaa2a 100%)",
    accentBg: "linear-gradient(135deg, #f0ffe8 0%, #c0f090 100%)",
    catId: "other",
    body: {
      intro: "Keep your hedges looking neat and well-maintained. Our skilled Taskers trim and shape hedges to perfection.",
      introTr: "Çitlerinizi düzenli ve bakımlı tutun. Yetenekli ustalarımız çitleri trim ve şekil vererek mükemmelleştirir.",
      sections: [
        {
          heading: "Hedge trimming services",
          headingTr: "Çit budama hizmetleri",
          paragraphs: ["Professional hedge trimming and shaping for a well-manicured garden."],
          paragraphsTr: ["İyi bakım yapılmış bir bahçe için profesyonel çit kesme ve şekillendirme."],
        },
      ],
    },
  },
};
