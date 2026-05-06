// Site-wide search index with all pages and their content
export interface SiteContent {
  title: string;
  url: string;
  category: string;
  content: string[];
  keywords: string[];
}

export const siteSearchIndex: SiteContent[] = [
  // Admissions
  {
    title: "B.Tech Admissions",
    url: "/admissions/btech",
    category: "Admissions",
    content: [
      "Regular Admissions through KEAM",
      "Merit and Management Quotas by CEE", 
      "KEAM CODE: UCK",
      "Document submission requirements",
      "Data Sheet of KEAM",
      "Allotment Memo",
      "Transfer Certificate", 
      "Higher Secondary Marksheet",
      "Migration Certificate",
      "Physical Fitness Certificate",
      "NRI Admissions without entrance test",
      "45% marks in Mathematics, Physics and Chemistry",
      "Tuition Fee ₹1,05,000/- per year for NRI",
      "Closing Ranks based on KEAM",
      "Rank details for all categories",
      "State Merit ranks",
      "Management quota ranks", 
      "SM MG EW EZ MU BH LA DV VK BX KU KN SC ST categories",
      "Computer Science Engineering rank 23713",
      "Electronics Communication Engineering rank 48812",
      "Information Technology rank 49152",
      "Fee Structure details",
      "Merit fee ₹36,750 per year",
      "Management fee ₹68,250 per year", 
      "NRI fee ₹1,05,000 per year",
      "Tuition fee Office fee PTA fee Placement fee",
      "Refundable deposit ₹1,25,000",
      "University Cash Counter Kariavattom",
      "Registration Form NRI quota",
      "Download Application Form",
      "Finance Officer University of Kerala",
      "Demand Draft payment method"
    ],
    keywords: ["admission", "btech", "keam", "entrance", "fee", "nri", "documents", "eligibility", "engineering", "rank", "ranks", "closing", "cutoff", "merit", "management", "quota", "sm", "mg", "categories", "cse", "ece", "it", "structure", "tuition", "office", "pta", "placement", "refundable", "deposit", "registration", "application", "form"]
  },

  // About Pages
  {
    title: "About College",
    url: "/about/college",
    category: "About",
    content: [
      "University College of Engineering Kariavattom",
      "Established under University of Kerala",
      "Premier engineering institution",
      "Academic excellence",
      "Research and development"
    ],
    keywords: ["college", "university", "kerala", "engineering", "kariavattom", "about", "institution"]
  },
  {
    title: "Principal",
    url: "/about/principal",
    category: "About",
    content: [
      "Principal message",
      "Leadership",
      "Vision and mission",
      "Academic guidance"
    ],
    keywords: ["principal", "leadership", "message", "vision", "mission"]
  },
  {
    title: "Achievements",
    url: "/about/achievements",
    category: "About",
    content: [
      "College achievements",
      "Awards and recognitions",
      "Academic excellence",
      "Student achievements",
      "Faculty achievements"
    ],
    keywords: ["achievements", "awards", "recognition", "excellence", "success"]
  },
  {
    title: "Contact Us",
    url: "/about/contact",
    category: "About",
    content: [
      "Contact information",
      "Address: Kariavattom, Thiruvananthapuram",
      "Phone numbers",
      "Email addresses",
      "Office hours"
    ],
    keywords: ["contact", "address", "phone", "email", "location", "kariavattom", "thiruvananthapuram"]
  },

  // Departments
  {
    title: "Computer Science & Engineering",
    url: "/departments/cse",
    category: "Departments",
    content: [
      "Computer Science and Engineering Department",
      "Started in year 2000 with 60 students intake",
      "UG program B.Tech Computer Science",
      "Software development programming languages",
      "Data structures and algorithms",
      "Machine learning artificial intelligence",
      "Web development database systems",
      "Professional career development",
      "MOUs with technology domain industries", 
      "Students placed in multinational companies",
      "Technical and cultural talents",
      "University examination results",
      "High class percentage steady performance",
      "Seminars workshops contemporary computing",
      "Multidimensional skillsets graduate attributes",
      "Practical training emphasis",
      "Well qualified experienced faculty",
      "Technical lab staff members",
      "Webinars recent technologies",
      "Vision: frontier Computer Science Engineering",
      "Globally competent professionals moral values",
      "Industry research organizations national international",
      "Mission: qualified motivated graduates",
      "Rigorous curriculum theory application",
      "Problem solving individually teams",
      "Strong theoretical practical background",
      "Software development emphasis",
      "Professional behaviour ethical values",
      "Innovative research capabilities leadership",
      "Fundamental principles innovative technologies",
      "Core areas computer science interdisciplinary",
      "B.Tech Full-time 4 years duration"
    ],
    keywords: ["computer", "science", "engineering", "cse", "programming", "software", "ai", "ml", "web", "database", "2000", "intake", "ug", "btech", "professional", "career", "mou", "industry", "multinational", "companies", "placement", "technical", "cultural", "university", "examination", "results", "percentage", "seminars", "workshops", "computing", "skillsets", "practical", "training", "faculty", "qualified", "experienced", "lab", "staff", "webinars", "technologies", "vision", "mission", "graduates", "curriculum", "theory", "application", "problem", "solving", "teams", "theoretical", "behaviour", "ethical", "values", "research", "leadership", "principles", "innovation", "core", "interdisciplinary", "fulltime", "duration", "years"]
  },
  {
    title: "Electronics & Communication Engineering",
    url: "/departments/ece",
    category: "Departments",
    content: [
      "Electronics and Communication Engineering",
      "Digital electronics",
      "Communication systems",
      "Signal processing",
      "Embedded systems",
      "VLSI design",
      "Microprocessors"
    ],
    keywords: ["electronics", "communication", "ece", "digital", "signal", "embedded", "vlsi", "microprocessor"]
  },
  {
    title: "Information Technology",
    url: "/departments/it",
    category: "Departments",
    content: [
      "Information Technology Department",
      "IT infrastructure",
      "Network systems",
      "Database management",
      "Software engineering",
      "System administration"
    ],
    keywords: ["information", "technology", "it", "network", "database", "software", "system", "infrastructure"]
  },
  {
    title: "General Departments",
    url: "/departments/gen",
    category: "Departments",
    content: [
      "General Department started 2000",
      "Mathematics Physics Chemistry subjects",
      "Civil Engineering Electrical Engineering",
      "Mechanical Engineering basic branches",
      "First year engineering students",
      "Strong fundamentals basic courses",
      "Professional career beginning development",
      "Teaching learning process results",
      "Remedial classes difficult studies",
      "Overall development students orientation",
      "Bridge courses personality development",
      "Well qualified experienced faculty",
      "Highly motivated team members",
      "Supporting department curricular activities",
      "Extracurricular activities cooperation",
      "Core engineering branches study",
      "Basic sciences essential engineering"
    ],
    keywords: ["general", "department", "departments", "2000", "mathematics", "physics", "chemistry", "civil", "engineering", "electrical", "mechanical", "first", "year", "students", "fundamentals", "basic", "courses", "professional", "career", "beginning", "development", "teaching", "learning", "process", "results", "remedial", "classes", "difficult", "studies", "overall", "orientation", "bridge", "personality", "qualified", "experienced", "faculty", "motivated", "team", "members", "supporting", "curricular", "extracurricular", "activities", "cooperation", "core", "branches", "study", "sciences", "essential"]
  },

  // Academics
  {
    title: "Academic Calendar",
    url: "/academics/accalendar.php",
    category: "Academics",
    content: [
      "Academic calendar",
      "Semester dates",
      "Examination schedule",
      "Holiday calendar",
      "Important dates"
    ],
    keywords: ["academic", "calendar", "semester", "examination", "schedule", "dates", "holiday"]
  },
  {
    title: "Exam Schedule",
    url: "/academics/exam-schedule",
    category: "Academics",
    content: [
      "Examination schedule",
      "Exam timetable",
      "Internal assessments",
      "Semester exams",
      "Practical exams"
    ],
    keywords: ["exam", "examination", "schedule", "timetable", "assessment", "semester", "practical"]
  },
  {
    title: "Learning Resources",
    url: "/academics/learning-resources",
    category: "Academics",
    content: [
      "Learning resources",
      "Library facilities",
      "Digital resources",
      "Research materials",
      "Study materials"
    ],
    keywords: ["learning", "resources", "library", "digital", "research", "study", "materials"]
  },

  // Cells & Committees
  {
    title: "Placement Cell",
    url: "/cells/placement",
    category: "Cells", 
    content: [
      "Career Guidance and Placement Unit CGPU",
      "Campus recruitment process",
      "Job opportunities industry partnerships", 
      "Training programs interview preparation",
      "Coordinator Committee Members students",
      "Regular placements multinational companies",
      "TCS IBM INFOSYS UST GLOBAL WIPRO",
      "IBS SPERIDIAN CTS company placements",
      "College brochure selected companies",
      "Campus Recruitment invitation details",
      "Written tests group discussions interview",
      "Vacation training project work Industries",
      "Industry-Institute linkage personality development",
      "Technical seminars soft skill training",
      "Placement Officer ANU ANTONY",
      "Assistant Professor Electronics Communication Engineering",
      "Email uckplacement@yahoo.com mobile 9447930157",
      "Placed students details department wise",
      "QSPYDER Zolo SPERIDIAN placements 2023-2024",
      "Experion Technologies Quest Global placements",
      "Hornbill Labs Survey Sparrow TCS placements",
      "H & R Block Poornam Info Vision placements",
      "Department wise placement statistics",
      "Electronics Communication Computer Science Information Technology",
      "Period wise placement data 2021-2024",
      "Student names company details placement period",
      "Sarika Akshay Aravind Aswin Ajaighosh students",
      "ANISH ARCHA RESHMI ARJUN GRASHMA students",
      "MEGHA MERIN POORNIMA PRANAV SHAKEEL students",
      "SRUTHI VAISHNAVI AKASH ELMA KARTHIKA students",
      "Industry exposure training programs",
      "Pre-placement talks briefing sessions",
      "Personality development technical seminars"
    ],
    keywords: ["placement", "recruitment", "jobs", "career", "industry", "training", "interview", "cgpu", "guidance", "campus", "multinational", "companies", "tcs", "ibm", "infosys", "ust", "global", "wipro", "ibs", "speridian", "cts", "brochure", "written", "tests", "group", "discussions", "vacation", "project", "work", "linkage", "personality", "development", "seminars", "soft", "skill", "officer", "anu", "antony", "assistant", "professor", "electronics", "communication", "engineering", "email", "uckplacement", "yahoo", "mobile", "placed", "students", "details", "department", "qspyder", "zolo", "experion", "technologies", "quest", "hornbill", "labs", "survey", "sparrow", "hr", "block", "poornam", "info", "vision", "statistics", "computer", "science", "information", "technology", "period", "2021", "2022", "2023", "2024", "names", "sarika", "akshay", "aravind", "aswin", "ajaighosh", "anish", "archa", "reshmi", "arjun", "grashma", "megha", "merin", "poornima", "pranav", "shakeel", "sruthi", "vaishnavi", "elma", "karthika", "exposure", "briefing", "sessions"]
  },
  {
    title: "Grievance Redressal",
    url: "/cells/grievance",
    category: "Cells",
    content: [
      "Grievance redressal mechanism",
      "Student complaints",
      "Issue resolution",
      "Feedback system",
      "Student welfare"
    ],
    keywords: ["grievance", "complaints", "redressal", "feedback", "welfare", "issues", "resolution"]
  },
  {
    title: "Anti-Ragging Cell",
    url: "/cells/anti-ragging",
    category: "Cells",
    content: [
      "Anti-ragging committee",
      "Ragging prevention",
      "Student safety",
      "Complaint mechanism",
      "Zero tolerance policy"
    ],
    keywords: ["anti", "ragging", "safety", "prevention", "complaint", "policy", "tolerance"]
  },
  {
    title: "Women Cell",
    url: "/cells/womencell",
    category: "Cells",
    content: [
      "Women cell",
      "Women empowerment",
      "Gender equality",
      "Safety measures",
      "Support programs",
      "Awareness campaigns"
    ],
    keywords: ["women", "empowerment", "gender", "equality", "safety", "support", "awareness"]
  },
  {
    title: "IQAC",
    url: "/cells/iqac",
    category: "Cells",
    content: [
      "Internal Quality Assurance Cell",
      "Quality enhancement",
      "Academic standards",
      "Continuous improvement",
      "Assessment and accreditation"
    ],
    keywords: ["iqac", "quality", "assurance", "enhancement", "standards", "improvement", "accreditation"]
  },
  {
    title: "College Union",
    url: "/cells/union",
    category: "Cells",
    content: [
      "College Union student representatives",
      "Chairman General Secretary Vice Chairperson",
      "Arts Club Secretary Sports Secretary",
      "Student body governance",
      "Union activities and events",
      "Ajumal t Chairman position",
      "Alif Muhammed N General Secretary",
      "Sradha R Kurup Vice Chairperson",
      "Malavika Sreekumar Arts Secretary",
      "Student leadership development",
      "College union elections",
      "Student representation democracy"
    ],
    keywords: ["union", "college", "student", "chairman", "secretary", "vice", "chairperson", "arts", "sports", "governance", "activities", "events", "ajumal", "alif", "sradha", "malavika", "leadership", "elections", "representation", "democracy"]
  },
  {
    title: "Parent Teacher Association (PTA)",
    url: "/cells/pta",
    category: "Cells",
    content: [
      "Parent Teacher Association PTA",
      "Private organization parents students",
      "Teaching faculties common forum",
      "Academic excellence infrastructure improvement",
      "University College Engineering Kerala development",
      "Special essential services students",
      "Executive Committee guidance control",
      "University Kerala bye-law formulated",
      "Indusalini G Principal in-charge",
      "M.B Reghunadan Nair Vice President",
      "Sabeena A.S Secretary Assistant Professor",
      "Gee Vargeese Panicker Joint Secretary",
      "Drishya S S Treasurer Assistant Professor",
      "Executive Members department wise",
      "Information Technology CSE ECE departments",
      "Contact numbers executive members",
      "Parent teacher interaction forum"
    ],
    keywords: ["pta", "parent", "teacher", "association", "private", "organization", "parents", "students", "faculties", "forum", "academic", "excellence", "infrastructure", "improvement", "development", "services", "executive", "committee", "guidance", "control", "university", "kerala", "bylaw", "indusalini", "principal", "in-charge", "reghunadan", "nair", "vice", "president", "sabeena", "secretary", "assistant", "professor", "gee", "vargeese", "panicker", "joint", "drishya", "treasurer", "members", "department", "information", "technology", "cse", "ece", "contact", "numbers", "interaction"]
  },
  {
    title: "Institution Innovation Council (IIC)",
    url: "/cells/iic",
    category: "Cells",
    content: [
      "Institution Innovation Council IIC",
      "Ministry Human Resource Development MHRD",
      "Government India Innovation Cell MIC",
      "Foster culture innovation Higher Education",
      "Encourage inspire nurture students",
      "New ideas transform prototypes",
      "Rohini PS member contact",
      "Meera S member contact",
      "Shijida Shain member contact", 
      "Reshma R member contact",
      "Saju S D member contact",
      "Innovation ecosystem development",
      "Student entrepreneurship support"
    ],
    keywords: ["iic", "institution", "innovation", "council", "ministry", "human", "resource", "development", "mhrd", "government", "india", "mic", "foster", "culture", "higher", "education", "encourage", "inspire", "nurture", "students", "ideas", "transform", "prototypes", "rohini", "meera", "shijida", "reshma", "saju", "ecosystem", "entrepreneurship", "support"]
  },
  {
    title: "SC/ST Cell",
    url: "/cells/scst",
    category: "Cells",
    content: [
      "SC ST Cell committee",
      "Scheduled Caste Scheduled Tribe",
      "Student welfare support",
      "Reservation policy implementation",
      "Equal opportunities education",
      "Grievance redressal SC ST students",
      "Government schemes awareness",
      "Scholarship guidance assistance"
    ],
    keywords: ["scst", "sc", "st", "cell", "committee", "scheduled", "caste", "tribe", "student", "welfare", "support", "reservation", "policy", "implementation", "equal", "opportunities", "education", "grievance", "redressal", "government", "schemes", "awareness", "scholarship", "guidance", "assistance"]
  },
  {
    title: "Sports Cell",
    url: "/cells/sports",
    category: "Cells",
    content: [
      "Sports Cell committee",
      "Physical education sports activities",
      "Inter-college competitions tournaments",
      "Sports facilities infrastructure",
      "Student fitness health promotion",
      "Athletic training coaching",
      "Sports equipment management",
      "Annual sports meet events"
    ],
    keywords: ["sports", "cell", "committee", "physical", "education", "activities", "inter", "college", "competitions", "tournaments", "facilities", "infrastructure", "student", "fitness", "health", "promotion", "athletic", "training", "coaching", "equipment", "management", "annual", "meet", "events"]
  },
  {
    title: "Staff Advisory Committee",
    url: "/cells/staff-advisory",
    category: "Cells",
    content: [
      "Staff Advisory Committee",
      "Faculty guidance counseling",
      "Academic administrative matters",
      "Staff welfare policies",
      "Professional development support",
      "Grievance handling staff",
      "Committee decisions recommendations"
    ],
    keywords: ["staff", "advisory", "committee", "faculty", "guidance", "counseling", "academic", "administrative", "matters", "welfare", "policies", "professional", "development", "support", "grievance", "handling", "decisions", "recommendations"]
  },
  {
    title: "Ethics Committee",
    url: "/cells/ethics",
    category: "Cells",
    content: [
      "Ethics Committee institutional",
      "Moral values ethical conduct",
      "Research ethics guidelines",
      "Academic integrity policies",
      "Ethical decision making",
      "Code of conduct enforcement",
      "Ethics awareness programs"
    ],
    keywords: ["ethics", "committee", "institutional", "moral", "values", "ethical", "conduct", "research", "guidelines", "academic", "integrity", "policies", "decision", "making", "code", "enforcement", "awareness", "programs"]
  },
  {
    title: "R&D Cell",
    url: "/cells/rnd",
    category: "Cells",
    content: [
      "Research and Development R&D Cell",
      "Research projects promotion",
      "Innovation development support",
      "Faculty research guidance",
      "Student research opportunities",
      "Funding assistance grants",
      "Publication support journals",
      "Technology transfer initiatives"
    ],
    keywords: ["rnd", "research", "development", "cell", "projects", "promotion", "innovation", "support", "faculty", "guidance", "student", "opportunities", "funding", "assistance", "grants", "publication", "journals", "technology", "transfer", "initiatives"]
  },
  {
    title: "MOU Cell",
    url: "/cells/mou",
    category: "Cells",
    content: [
      "MOU Memorandum of Understanding",
      "Industry collaboration partnerships",
      "Academic institutional tie-ups",
      "Research collaborations agreements",
      "Student exchange programs",
      "International partnerships",
      "Corporate industry relations"
    ],
    keywords: ["mou", "memorandum", "understanding", "industry", "collaboration", "partnerships", "academic", "institutional", "tie", "ups", "research", "collaborations", "agreements", "student", "exchange", "programs", "international", "corporate", "relations"]
  },
  {
    title: "Purchase Committee",
    url: "/cells/purchase",
    category: "Cells",
    content: [
      "Purchase Committee procurement",
      "Equipment purchase decisions",
      "Vendor selection process",
      "Budget allocation management",
      "Tender evaluation procedures",
      "Quality assurance purchases",
      "Financial compliance guidelines"
    ],
    keywords: ["purchase", "committee", "procurement", "equipment", "decisions", "vendor", "selection", "process", "budget", "allocation", "management", "tender", "evaluation", "procedures", "quality", "assurance", "purchases", "financial", "compliance", "guidelines"]
  },
  {
    title: "Staff Club",
    url: "/cells/staffclub",
    category: "Cells",
    content: [
      "Staff Club recreational activities",
      "Faculty social gatherings",
      "Cultural events organization",
      "Staff welfare activities",
      "Community building initiatives",
      "Social interaction platform",
      "Entertainment programs"
    ],
    keywords: ["staff", "club", "recreational", "activities", "faculty", "social", "gatherings", "cultural", "events", "organization", "welfare", "community", "building", "initiatives", "interaction", "platform", "entertainment", "programs"]
  },
  {
    title: "General Purpose Committee (GPC)",
    url: "/cells/gpc",
    category: "Cells",
    content: [
      "General Purpose Committee GPC",
      "Administrative decisions support",
      "College governance assistance",
      "Policy implementation guidance",
      "Committee coordination activities",
      "Institutional development support"
    ],
    keywords: ["gpc", "general", "purpose", "committee", "administrative", "decisions", "support", "college", "governance", "assistance", "policy", "implementation", "guidance", "coordination", "activities", "institutional", "development"]
  },
  {
    title: "Complaints Committee",
    url: "/cells/complaints",
    category: "Cells",
    content: [
      "Complaints Committee grievance handling",
      "Student faculty complaint resolution",
      "Disciplinary action procedures",
      "Conflict resolution mechanisms",
      "Fair hearing processes",
      "Justice administration college"
    ],
    keywords: ["complaints", "committee", "grievance", "handling", "student", "faculty", "complaint", "resolution", "disciplinary", "action", "procedures", "conflict", "mechanisms", "fair", "hearing", "processes", "justice", "administration", "college"]
  },
  {
    title: "Academic Nigrni Committee (ANC)",
    url: "/cells/anc",
    category: "Cells",
    content: [
      "Academic Nigrni Committee ANC",
      "Academic monitoring supervision",
      "Quality assurance academics",
      "Curriculum implementation oversight",
      "Educational standards maintenance",
      "Academic performance evaluation"
    ],
    keywords: ["anc", "academic", "nigrni", "committee", "monitoring", "supervision", "quality", "assurance", "academics", "curriculum", "implementation", "oversight", "educational", "standards", "maintenance", "performance", "evaluation"]
  },
  {
    title: "IPR Cell",
    url: "/cells/ipr",
    category: "Cells",
    content: [
      "Intellectual Property Rights IPR",
      "Patent filing assistance",
      "Copyright protection guidance",
      "Innovation commercialization support",
      "IP awareness programs",
      "Technology licensing advice",
      "Research IP protection"
    ],
    keywords: ["ipr", "intellectual", "property", "rights", "patent", "filing", "assistance", "copyright", "protection", "guidance", "innovation", "commercialization", "support", "awareness", "programs", "technology", "licensing", "advice", "research"]
  },
  {
    title: "IRCC Cell",
    url: "/cells/ircc",
    category: "Cells",
    content: [
      "Industry Relations and Corporate Connect IRCC",
      "Industry partnerships development",
      "Corporate collaboration initiatives",
      "Placement assistance coordination",
      "Industry exposure programs",
      "Professional networking events"
    ],
    keywords: ["ircc", "industry", "relations", "corporate", "connect", "partnerships", "development", "collaboration", "initiatives", "placement", "assistance", "coordination", "exposure", "programs", "professional", "networking", "events"]
  },
  {
    title: "Teaching Learning Centre (TLC)",
    url: "/cells/TLC",
    category: "Cells",
    content: [
      "Teaching Learning Centre TLC",
      "Faculty development programs",
      "Pedagogical training workshops",
      "Teaching methodology improvement",
      "Learning enhancement initiatives",
      "Educational technology integration",
      "Academic skill development"
    ],
    keywords: ["tlc", "teaching", "learning", "centre", "faculty", "development", "programs", "pedagogical", "training", "workshops", "methodology", "improvement", "enhancement", "initiatives", "educational", "technology", "integration", "academic", "skill"]
  },
  {
    title: "III Cell",
    url: "/cells/iiic",
    category: "Cells",
    content: [
      "III Cell committee",
      "Innovation incubation initiatives",
      "Entrepreneurship development support",
      "Startup ecosystem promotion",
      "Technology commercialization",
      "Business development guidance"
    ],
    keywords: ["iiic", "iii", "cell", "committee", "innovation", "incubation", "initiatives", "entrepreneurship", "development", "support", "startup", "ecosystem", "promotion", "technology", "commercialization", "business", "guidance"]
  },

  // Clubs
  {
    title: "µLearn Club",
    url: "/clubs/mulearn",
    category: "Clubs",
    content: [
      "µLearn student community",
      "Peer learning",
      "Skill development",
      "Technology workshops",
      "Collaborative learning"
    ],
    keywords: ["mulearn", "community", "learning", "skill", "technology", "workshop", "collaborative"]
  },
  {
    title: "IEEE Student Branch",
    url: "/clubs/ieee",
    category: "Clubs",
    content: [
      "IEEE student branch",
      "Technical society",
      "Engineering excellence",
      "Professional development",
      "Technical events"
    ],
    keywords: ["ieee", "technical", "engineering", "professional", "development", "events", "society"]
  },
  {
    title: "FOSS Club",
    url: "/clubs/foss",
    category: "Clubs",
    content: [
      "Free and Open Source Software",
      "Open source development",
      "Linux",
      "Programming communities",
      "Software freedom"
    ],
    keywords: ["foss", "open", "source", "software", "linux", "programming", "freedom", "development"]
  },
  {
    title: "IEDC",
    url: "/clubs/iedc",
    category: "Clubs",
    content: [
      "Innovation and Entrepreneurship Development Cell",
      "Startup incubation",
      "Innovation projects",
      "Entrepreneurship training",
      "Business development"
    ],
    keywords: ["iedc", "innovation", "entrepreneurship", "startup", "incubation", "business", "training"]
  },
  {
    title: "NSS",
    url: "/clubs/nss",
    category: "Clubs",
    content: [
      "National Service Scheme",
      "Social service",
      "Community development",
      "Volunteer activities",
      "Social responsibility"
    ],
    keywords: ["nss", "service", "social", "community", "volunteer", "responsibility", "development"]
  },
  {
    title: "Hult Prize",
    url: "/clubs/hult",
    category: "Clubs",
    content: [
      "Hult Prize Foundation chapter",
      "Nobel Prize for Students",
      "Student changemakers",
      "Global challenges solutions",
      "Purpose-driven ventures",
      "High-impact startups",
      "Entrepreneurial talent",
      "Innovation and business development",
      "Startup ecosystem",
      "Vision meets venture"
    ],
    keywords: ["hult", "prize", "startup", "entrepreneurship", "innovation", "venture", "business", "changemakers", "nobel", "foundation"]
  },
  {
    title: "Tourism Club",
    url: "/clubs/tourism",
    category: "Clubs",
    content: [
      "Tourism and travel club",
      "Cultural exploration",
      "Travel experiences",
      "Tourism industry knowledge",
      "Adventure activities"
    ],
    keywords: ["tourism", "travel", "cultural", "exploration", "adventure", "industry"]
  },

  // Facilities
  {
    title: "Central Library",
    url: "/facilities/centrallibrary.php",
    category: "Facilities",
    content: [
      "Central Library vast collection technical books",
      "Leading journals magazines subscriptions",
      "National international journals access",
      "University Campus network Kariavattom",
      "Largest technical libraries state capital",
      "First engineering colleges Kerala automate",
      "Housekeeping operations automation",
      "Lending reference sections separate",
      "Engineering disciplines wide range titles",
      "Students staff working hours access",
      "Educational research missions support",
      "Printed digital resources access",
      "Library Sections book lending reference",
      "Students borrow 3 books 30 days",
      "Faculty borrow 8 books lending",
      "Reference Section encyclopedias dictionaries",
      "Handbooks exam guides GATE GRE",
      "Current Periodicals Section reading room",
      "Internet Facility E-Library high-speed",
      "Digital resources login required access",
      "Book Collection 15000+ volumes total",
      "Computer Science Electronics Communication",
      "Information Technology General Science books",
      "Journals 38 National International titles",
      "Non-Book Materials Magazines Newspapers",
      "10 titles magazines newspapers collection",
      "Technical books vast collection houses",
      "State capital largest technical library",
      "Kerala engineering colleges first automate",
      "Working hours open students staff",
      "Research missions educational support",
      "High-speed internet E-Library facility"
    ],
    keywords: ["library", "books", "journals", "digital", "research", "study", "reading", "central", "technical", "collection", "vast", "leading", "magazines", "subscriptions", "national", "international", "access", "university", "campus", "network", "kariavattom", "largest", "state", "capital", "engineering", "colleges", "kerala", "automate", "housekeeping", "operations", "automation", "lending", "reference", "sections", "separate", "disciplines", "wide", "range", "titles", "students", "staff", "working", "hours", "educational", "missions", "support", "printed", "resources", "borrow", "30", "days", "faculty", "encyclopedias", "dictionaries", "handbooks", "exam", "guides", "gate", "gre", "current", "periodicals", "room", "internet", "facility", "elibrary", "speed", "login", "required", "15000", "volumes", "total", "computer", "science", "electronics", "communication", "information", "technology", "general", "38", "materials", "newspapers", "10", "houses", "open"]
  },
  {
    title: "Canteen",
    url: "/facilities/canteen",
    category: "Facilities",
    content: [
      "College canteen",
      "Food services",
      "Meals and snacks",
      "Cafeteria facilities",
      "Student dining"
    ],
    keywords: ["canteen", "food", "meals", "snacks", "cafeteria", "dining", "services"]
  },
  {
    title: "College Bus",
    url: "/facilities/college-bus",
    category: "Facilities",
    content: [
      "College bus service",
      "Transportation",
      "Bus routes",
      "Student transport",
      "Daily commute"
    ],
    keywords: ["bus", "transport", "transportation", "routes", "commute", "service"]
  },
  {
    title: "Health Centre",
    url: "/facilities/health-centre",
    category: "Facilities",
    content: [
      "Health centre",
      "Medical facilities",
      "First aid",
      "Health services",
      "Medical care"
    ],
    keywords: ["health", "medical", "centre", "first", "aid", "care", "services"]
  },
  {
    title: "WiFi Facility",
    url: "/facilities/wifi-facility",
    category: "Facilities",
    content: [
      "WiFi internet facility",
      "Campus-wide internet",
      "Wireless connectivity",
      "High-speed internet",
      "Digital infrastructure"
    ],
    keywords: ["wifi", "internet", "wireless", "connectivity", "digital", "infrastructure", "speed"]
  },

  // Faculty
  {
    title: "Faculty Directory",
    url: "/faculties",
    category: "Faculty",
    content: [
      "Faculty members",
      "Teaching staff",
      "Professors and lecturers",
      "Academic staff",
      "Department faculty"
    ],
    keywords: ["faculty", "staff", "professors", "lecturers", "teachers", "academic", "department"]
  }
];

// Search function that matches patterns and returns relevant results with improved scoring
export function searchSiteContent(query: string): SiteContent[] {
  if (!query.trim()) return [];

  const queryLower = query.toLowerCase().trim();
  const results: Array<SiteContent & { score: number }> = [];

  siteSearchIndex.forEach(page => {
    let score = 0;
    const titleLower = page.title.toLowerCase();
    const categoryLower = page.category.toLowerCase();

    // HIGHEST PRIORITY: Exact title match or very close match
    if (titleLower === queryLower) {
      score += 100; // Perfect match
    } else if (titleLower.includes(queryLower) && queryLower.length > 2) {
      score += 50; // Title contains query
    }

    // SUPER HIGH PRIORITY: Department code exact matches (must be first)
    const departmentMappings: { [key: string]: string[] } = {
      'cse': ['computer science', 'computer science engineering', 'computer science & engineering'],
      'ece': ['electronics communication', 'electronics & communication', 'electronics communication engineering'],
      'it': ['information technology'],
      'gen': ['general', 'general engineering', 'general departments']
    };

    // Special handling for exact department code matches
    if (departmentMappings[queryLower]) {
      const matchingDept = departmentMappings[queryLower];
      if (categoryLower === 'departments' && (
        titleLower.includes(queryLower) || 
        matchingDept.some(name => titleLower.includes(name))
      )) {
        score += 150; // Massive boost for exact department code match
      }
    }

    // HIGH PRIORITY: Direct page/section name matches
    // Check if query matches department codes or full names
    Object.entries(departmentMappings).forEach(([code, fullNames]) => {
      if (queryLower === code) {
        // Perfect department code match (already handled above with higher score)
        if (categoryLower !== 'departments' && (titleLower.includes(code) || fullNames.some(name => titleLower.includes(name)))) {
          score += 60; // Lower score for non-department pages mentioning dept codes
        }
      } else if (fullNames.some(name => 
        queryLower === name || 
        queryLower.includes(name) || 
        name.includes(queryLower)
      )) {
        if (categoryLower === 'departments') {
          score += 75; // Department name match in departments category
        } else {
          score += 25; // Department mentioned elsewhere
        }
      }
    });

    // HIGH PRIORITY: Category-specific direct matches
    const categoryKeywords: { [key: string]: string[] } = {
      'admissions': ['admission', 'btech', 'keam', 'entrance', 'fee'],
      'departments': ['department', 'engineering', 'faculty', 'program'],
      'facilities': ['facility', 'library', 'canteen', 'bus', 'wifi', 'health'],
      'clubs': ['club', 'society', 'organization', 'ieee', 'nss', 'foss'],
      'cells': ['cell', 'committee', 'grievance', 'placement']
    };

    // Boost score if query matches category and is in that category
    Object.entries(categoryKeywords).forEach(([cat, keywords]) => {
      if (categoryLower === cat && keywords.some(kw => 
        queryLower === kw || queryLower.includes(kw) || kw.includes(queryLower)
      )) {
        score += 60;
      }
    });

    // MEDIUM-HIGH PRIORITY: URL path matching (direct routing)
    const urlParts = page.url.toLowerCase().split('/').filter(part => part);
    if (urlParts.some(part => part === queryLower || part.includes(queryLower))) {
      score += 45;
    }

    // MEDIUM PRIORITY: Keywords exact match
    const exactKeywordMatch = page.keywords.find(keyword => 
      keyword.toLowerCase() === queryLower
    );
    if (exactKeywordMatch) {
      score += 40;
    }

    // MEDIUM PRIORITY: Keywords partial match
    const partialKeywordMatches = page.keywords.filter(keyword => {
      const keywordLower = keyword.toLowerCase();
      return keywordLower.includes(queryLower) || queryLower.includes(keywordLower);
    });
    score += partialKeywordMatches.length * 15;

    // MEDIUM PRIORITY: Title word starts with query
    const titleWords = titleLower.split(/[\s&-]+/);
    titleWords.forEach(word => {
      if (word.startsWith(queryLower) && queryLower.length >= 2) {
        score += 30;
      }
    });

    // LOWER PRIORITY: Content matches (with special handling for common words)
    let contentMatches = 0;
    page.content.forEach(content => {
      const contentLower = content.toLowerCase();
      if (contentLower.includes(queryLower)) {
        contentMatches++;
        // Special penalty for "it" appearing in non-IT department contexts
        if (queryLower === 'it' && categoryLower !== 'departments') {
          // Much lower score for "it" in content when not IT department
          score += 1;
        } else if (contentLower.startsWith(queryLower)) {
          score += 8;
        } else {
          score += 3;
        }
      }
    });

    // Bonus for multiple content matches (relevance)
    if (contentMatches > 3) {
      score += 10;
    } else if (contentMatches > 1) {
      score += 5;
    }

    // SPECIAL CASES: Boost for specific high-value pages
    const importantPages = [
      'admissions', 'departments', 'computer science', 'electronics', 'information technology'
    ];
    
    if (importantPages.some(important => 
      titleLower.includes(important) && queryLower.includes(important)
    )) {
      score += 20;
    }

    // PENALTY: Reduce score for overly generic matches, but not for department codes
    const validDeptCodes = ['cse', 'ece', 'it', 'gen'];
    if (queryLower.length === 1 && !validDeptCodes.includes(queryLower)) {
      score = Math.max(0, score - 20);
    }
    
    // Additional penalty for very common short words (except department codes)
    if (queryLower.length === 2 && !validDeptCodes.includes(queryLower)) {
      const commonWords = ['is', 'in', 'of', 'to', 'or', 'be', 'we', 'he', 'me'];
      if (commonWords.includes(queryLower)) {
        score = Math.max(0, score - 15);
      }
    }

    // Only include results with meaningful scores
    if (score > 0) {
      results.push({ ...page, score });
    }
  });

  // Sort by score (highest first), then by title length (shorter = more specific)
  return results
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Secondary sort: prefer shorter, more specific titles
      return a.title.length - b.title.length;
    })
    .slice(0, 8)
    .map(({ score, ...page }) => page);
}
