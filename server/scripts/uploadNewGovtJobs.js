require('dotenv').config({ path: 'C:/Users/SHAILESH/OneDrive/Desktop/jobopedia-mern/server/.env' });
const mongoose = require('mongoose');
const Job = require('../models/Job');

const newGovtJobs = [
  {
    title: "Assistant Section Officer (ASO) & Inspectors (SSC CGL 2026)",
    department: "Staff Selection Commission (SSC)",
    category: "govt",
    sector: "GOVERNMENT",
    state: "All India / Central",
    states: ["All India / Central", "Delhi NCR", "Gujarat", "Maharashtra"],
    qualification: "Graduate - Any Stream / Any Discipline",
    qualifications: [
      "Graduate - Any Stream / Any Discipline",
      "Graduate - B.Com (Bachelor of Commerce)",
      "Graduate - B.E. / B.Tech (Computer Science & IT)"
    ],
    salary: "₹44,900 - ₹1,42,400 / month (Level 7 Pay Matrix)",
    vacancies: 17727,
    ageLimit: "18 - 32 Years",
    lastDate: "2026-11-30",
    dayNumber: 1,
    applyUrl: "https://ssc.gov.in",
    notificationUrl: "https://ssc.gov.in/api-portal/notices",
    description: "Recruitment for Assistant Section Officers in MEA & CSS, Income Tax Inspectors, Central Excise Inspectors, and Sub-Inspectors in CBI across Central Ministries.",
    eligibility: "Bachelor's Degree in any discipline from a recognized University with computer typing proficiency.",
    selectionProcess: "Tier-1 Computer Based Objective Test -> Tier-2 Computer Based Objective & Typing Test -> Document Verification",
    tags: ["SSC CGL", "ASO", "MEA", "Central Govt", "Group B"],
    isNewJob: true
  },
  {
    title: "Civil Services Examination (IAS / IPS / IFS) 2026",
    department: "Union Public Service Commission (UPSC)",
    category: "govt",
    sector: "GOVERNMENT",
    state: "All India / Central",
    states: ["All India / Central", "Delhi NCR"],
    qualification: "Graduate - Any Stream / Any Discipline",
    qualifications: [
      "Graduate - Any Stream / Any Discipline",
      "Graduate - MBBS / Medical Degrees",
      "Graduate - B.E. / B.Tech (Engineering)"
    ],
    salary: "₹56,100 - ₹2,50,000 / month (Pay Level 10 to Level 18)",
    vacancies: 1056,
    ageLimit: "21 - 32 Years",
    lastDate: "2026-12-05",
    dayNumber: 2,
    applyUrl: "https://upsconline.nic.in",
    notificationUrl: "https://upsc.gov.in/examinations/active-exams",
    description: "Recruitment to All India Services (IAS, IPS, IFS) and Central Group 'A' Services (IRS, IAAS) to head district administration and central policy development.",
    eligibility: "Graduation in any discipline from an Indian recognized University.",
    selectionProcess: "Civil Services Preliminary Exam -> Mains Descriptive Exam (9 Papers) -> Personality Interview",
    tags: ["UPSC", "IAS", "IPS", "Civil Services", "Group A Gazetted"],
    isNewJob: true
  },
  {
    title: "Sub-Inspector (Executive & GD) in Delhi Police & CAPFs 2026",
    department: "Staff Selection Commission (SSC) / Ministry of Home Affairs",
    category: "govt",
    sector: "DEFENCE & POLICE",
    state: "All India / Central",
    states: ["All India / Central", "Delhi NCR", "Gujarat", "Maharashtra"],
    qualification: "Graduate - Any Stream / Any Discipline",
    qualifications: [
      "Graduate - Any Stream / Any Discipline",
      "Valid Driving License for LMV (Motorcycle and Car) for Delhi Police"
    ],
    salary: "₹35,400 - ₹1,12,400 / month (Pay Level 6 Matrix)",
    vacancies: 4187,
    ageLimit: "20 - 25 Years",
    lastDate: "2026-11-25",
    dayNumber: 3,
    applyUrl: "https://ssc.gov.in",
    notificationUrl: "https://ssc.gov.in/api-portal/notices",
    description: "Direct recruitment of Sub-Inspectors in Delhi Police, BSF, CRPF, CISF, and ITBP with executive policing authority.",
    eligibility: "Bachelor's degree in any discipline with mandatory physical endurance and medical fitness standards.",
    selectionProcess: "Paper-1 CBT -> Physical Endurance Test (PET/PST) -> Paper-2 English Comprehension -> Medical Exam",
    tags: ["SSC CPO", "Delhi Police", "Sub Inspector", "CAPF", "Police"],
    isNewJob: true
  },
  {
    title: "Assistant Commandant (General Duty & Technical) 2026",
    department: "Indian Coast Guard (Ministry of Defence)",
    category: "govt",
    sector: "DEFENCE & MARITIME",
    state: "All India / Central",
    states: ["All India / Central", "Gujarat", "Maharashtra", "Tamil Nadu", "Kerala"],
    qualification: "Graduate - Any Stream / B.E. / B.Tech",
    qualifications: [
      "Graduate - Any Stream with minimum 60% marks and 10+2 with Maths & Physics",
      "Graduate - B.E. / B.Tech (Mechanical / Electrical / Electronics / Naval Architecture)"
    ],
    salary: "₹56,100 - ₹1,77,500 / month (Level 10 Pay Matrix + Allowances)",
    vacancies: 70,
    ageLimit: "21 - 25 Years",
    lastDate: "2026-11-20",
    dayNumber: 4,
    applyUrl: "https://joinindiancoastguard.cdac.in",
    notificationUrl: "https://joinindiancoastguard.cdac.in/assets/img/news/AC_01_2026.pdf",
    description: "Recruitment of Commissioned Officers into Indian Coast Guard to command patrol vessels, conduct offshore surveillance, and defend national maritime frontiers.",
    eligibility: "Bachelor's degree with minimum 60% aggregate and 55% in 10+2 Maths/Physics, meeting medical fitness norms.",
    selectionProcess: "Stage-I CGCAT Screening -> Stage-II PSB -> Stage-III FSB Interview -> Medical Examination",
    tags: ["Indian Coast Guard", "Assistant Commandant", "Defence", "Group A Gazetted"],
    isNewJob: true
  },
  {
    title: "Probationary Officer / Management Trainee (CRP PO/MT XIV) 2026",
    department: "Institute of Banking Personnel Selection (IBPS)",
    category: "govt",
    sector: "BANKING & FINANCE",
    state: "All India / Central",
    states: ["All India / Central", "Maharashtra", "Gujarat", "Uttar Pradesh", "Delhi NCR"],
    qualification: "Graduate - Any Stream / Any Discipline",
    qualifications: [
      "Graduate - Any Stream / Any Discipline",
      "Graduate - B.Com (Bachelor of Commerce)",
      "Graduate - B.E. / B.Tech (Engineering)"
    ],
    salary: "₹52,000 - ₹58,000 / month (Basic Pay ₹36,000 + DA, HRA, CCA)",
    vacancies: 3955,
    ageLimit: "20 - 30 Years",
    lastDate: "2026-11-28",
    dayNumber: 5,
    applyUrl: "https://ibps.in",
    notificationUrl: "https://www.ibps.in/index.php/crp-po-mt/",
    description: "Common Recruitment Process for Probationary Officers and Management Trainees across 11 nationalized public sector banks in India.",
    eligibility: "Graduation in any discipline from a recognized University with operating knowledge in computer systems.",
    selectionProcess: "Preliminary Online Exam -> Mains Online Exam (Objective + Descriptive) -> Common Interview",
    tags: ["IBPS", "Bank PO", "Banking", "PSU Banks", "Central Govt"],
    isNewJob: true
  },
  {
    title: "Officers in Grade 'B' (General & Technical Cadres) 2026",
    department: "Reserve Bank of India (RBI)",
    category: "govt",
    sector: "BANKING & FINANCE",
    state: "All India / Central",
    states: ["All India / Central", "Maharashtra", "Delhi NCR", "Gujarat", "Tamil Nadu"],
    qualification: "Graduate / Post Graduate in any stream",
    qualifications: [
      "Graduate - Any Discipline with minimum 60% marks (50% for SC/ST/PwBD)",
      "Post Graduate - Any Discipline with minimum 55% marks",
      "Graduate - B.Com / Economics / Finance / Engineering"
    ],
    salary: "₹1,16,684 / month Gross Emoluments (Basic Pay ₹55,200 + Allowances)",
    vacancies: 291,
    ageLimit: "21 - 30 Years",
    lastDate: "2026-12-01",
    dayNumber: 6,
    applyUrl: "https://opportunities.rbi.org.in",
    notificationUrl: "https://opportunities.rbi.org.in/scripts/vacancies.aspx",
    description: "Direct recruitment of Officers in Grade 'B' in India's central bank to regulate financial markets, supervise commercial banks, and direct monetary policy.",
    eligibility: "Graduation with at least 60% marks or Post Graduation with 55% marks from an Indian or foreign recognized university.",
    selectionProcess: "Phase-I Online Exam -> Phase-II Detailed Objective & Descriptive Exam -> Phase-III Personal Interview",
    tags: ["RBI", "RBI Grade B", "Central Bank", "Banking", "Finance"],
    isNewJob: true
  },
  {
    title: "Assistant Manager Grade 'A' (RDBS) 2026",
    department: "National Bank for Agriculture and Rural Development (NABARD)",
    category: "govt",
    sector: "BANKING & FINANCE",
    state: "All India / Central",
    states: ["All India / Central", "Maharashtra", "Gujarat", "Delhi NCR", "Karnataka"],
    qualification: "Graduate / Post Graduate in any discipline",
    qualifications: [
      "Graduate - Any Stream with minimum 60% marks (55% for SC/ST/PWBD)",
      "Graduate - B.Sc / B.Tech (Agriculture / IT / Food Tech)",
      "Post Graduate - MBA / PGDM / CA / ICWA"
    ],
    salary: "₹1,00,000 / month Gross Emoluments (Basic Pay ₹44,500 + Allowances)",
    vacancies: 102,
    ageLimit: "21 - 30 Years",
    lastDate: "2026-11-26",
    dayNumber: 7,
    applyUrl: "https://www.nabard.org/careers-notices.aspx",
    notificationUrl: "https://www.nabard.org/auth/writereaddata/CareerNotices/NABARD_Grade_A_2026_Advt.pdf",
    description: "NABARD recruits Grade 'A' Assistant Managers to supervise rural credit, agriculture development funding, and micro-finance infrastructure across India.",
    eligibility: "Bachelor's Degree in any subject with 60% marks or Master's Degree with 55% marks from recognized universities.",
    selectionProcess: "Phase-I Online Prelims -> Phase-II Mains Online Exam -> Phase-III Personal Interview",
    tags: ["NABARD", "Grade A", "Banking", "Rural Development", "PSU"],
    isNewJob: true
  },
  {
    title: "Assistant Loco Pilot (ALP) Mega Recruitment 2026",
    department: "Railway Recruitment Boards (RRB - Ministry of Railways)",
    category: "govt",
    sector: "RAILWAYS",
    state: "All India / Central",
    states: ["All India / Central", "Gujarat", "Maharashtra", "Uttar Pradesh", "Bihar"],
    qualification: "Matriculation (10th Pass) + ITI / Diploma in Engineering",
    qualifications: [
      "10th Pass + ITI in Electrical / Mechanical / Electronics / Automobile Trades",
      "Diploma in Mechanical / Electrical / Electronics / Automobile Engineering",
      "B.E. / B.Tech in relevant Engineering Streams"
    ],
    salary: "₹19,900 - ₹63,200 / month (Level 2 Pay Matrix + Running Allowances)",
    vacancies: 18799,
    ageLimit: "18 - 33 Years",
    lastDate: "2026-12-15",
    dayNumber: 1,
    applyUrl: "https://www.rrbapply.gov.in",
    notificationUrl: "https://indianrailways.gov.in",
    description: "Indian Railways recruits Assistant Loco Pilots across all railway zones to pilot passenger, freight, and express locomotives with strict A-1 medical vision.",
    eligibility: "10th pass with ITI or Diploma/Degree in Engineering with A-1 medical eye fitness (6/6 without glasses).",
    selectionProcess: "CBT-1 Screening -> CBT-2 Core Technical Exam -> Computer Based Aptitude Test (CBAT) -> Document Verification",
    tags: ["RRB ALP", "Loco Pilot", "Railway Jobs", "Central Govt", "Technical"],
    isNewJob: true
  },
  {
    title: "Junior Engineer (JE - Civil, Electrical, Mechanical & S&T) 2026",
    department: "Railway Recruitment Boards (RRB - Ministry of Railways)",
    category: "govt",
    sector: "RAILWAYS",
    state: "All India / Central",
    states: ["All India / Central", "Gujarat", "Maharashtra", "Delhi NCR", "West Bengal"],
    qualification: "Diploma / Degree in Engineering",
    qualifications: [
      "Diploma in Civil / Mechanical / Electrical / Electronics Engineering",
      "B.E. / B.Tech in Civil / Mechanical / Electrical / Electronics / CS / IT",
      "B.Sc in Chemistry & Physics (for CMA posts)"
    ],
    salary: "₹35,400 - ₹1,12,400 / month (Pay Level 6 Matrix + Railway Allowances)",
    vacancies: 7951,
    ageLimit: "18 - 36 Years",
    lastDate: "2026-12-20",
    dayNumber: 2,
    applyUrl: "https://www.rrbapply.gov.in",
    notificationUrl: "https://indianrailways.gov.in",
    description: "Recruitment of Junior Engineers across 21 Railway Recruitment Boards to oversee track maintenance, rolling stock, locomotive sheds, and signal & telecom networks.",
    eligibility: "Three years diploma or degree in engineering from recognized AICTE/state technical boards.",
    selectionProcess: "1st Stage Computer Based Test (CBT-1) -> 2nd Stage CBT-2 Technical -> Document Verification & Medical Exam",
    tags: ["RRB JE", "Junior Engineer", "Railways", "Engineering Jobs", "Central Govt"],
    isNewJob: true
  },
  {
    title: "Graduate Trainees in Engineering & Geo-sciences through GATE 2026",
    department: "Oil and Natural Gas Corporation Limited (ONGC)",
    category: "govt",
    sector: "PUBLIC SECTOR UNDERTAKING (MAHARATNA PSU)",
    state: "All India / Central",
    states: ["All India / Central", "Gujarat", "Maharashtra", "Assam", "Andhra Pradesh"],
    qualification: "Graduate - B.E. / B.Tech / Post Graduate - M.Sc",
    qualifications: [
      "Graduate - B.E. / B.Tech (Mechanical / Petroleum / Chemical / Electrical / Civil / Instrumentation)",
      "Post Graduate - M.Sc (Geology / Geophysics / Chemistry)",
      "Valid GATE Examination Scorecard"
    ],
    salary: "₹60,000 - ₹1,80,000 / month (E-1 Level Pay Scale, Annual CTC ~₹21,00,000)",
    vacancies: 620,
    ageLimit: "21 - 30 Years",
    lastDate: "2026-12-10",
    dayNumber: 3,
    applyUrl: "https://www.ongcindia.com/wps/wcm/connect/en/career/",
    notificationUrl: "https://www.ongcindia.com/wps/wcm/connect/en/career/recruitment-notice/",
    description: "Maharatna PSU ONGC recruits Graduate Trainees (Class-1 Executives) for offshore drilling, reservoir engineering, subsea oil exploration, and refinery operations.",
    eligibility: "Engineering degree with minimum 60% aggregate or Master's in Geosciences with qualifying GATE score.",
    selectionProcess: "GATE Score Weightage (60%) -> Academic Evaluation (25%) -> In-person Interview (15%)",
    tags: ["ONGC", "GATE", "Maharatna PSU", "Engineering Jobs", "Executive"],
    isNewJob: true
  },
  {
    title: "Engineering Executive Trainees (EET - Electrical, Mech, Civil) 2026",
    department: "NTPC Limited (Ministry of Power)",
    category: "govt",
    sector: "PUBLIC SECTOR UNDERTAKING (MAHARATNA PSU)",
    state: "All India / Central",
    states: ["All India / Central", "Gujarat", "Maharashtra", "Uttar Pradesh", "Odisha"],
    qualification: "Graduate - B.E. / B.Tech in relevant Engineering stream",
    qualifications: [
      "Graduate - B.E. / B.Tech (Electrical / Mechanical / Civil / Instrumentation)",
      "Valid GATE Examination Score"
    ],
    salary: "₹40,000 - ₹1,40,000 / month (E-1 Grade on regularisation, CTC ~₹15,00,000/year)",
    vacancies: 495,
    ageLimit: "21 - 27 Years",
    lastDate: "2026-12-12",
    dayNumber: 4,
    applyUrl: "https://careers.ntpc.co.in",
    notificationUrl: "https://www.ntpc.co.in/en/careers/jobs-at-ntpc",
    description: "NTPC recruits Engineering Executive Trainees to operate super thermal power stations, solar farms, green hydrogen complexes, and transmission grids.",
    eligibility: "Full time Bachelor's Degree in Engineering or Technology with not less than 65% marks (55% for SC/ST/PwBD).",
    selectionProcess: "GATE Score Merit Shortlisting -> Personal Interview & Document Verification",
    tags: ["NTPC", "Maharatna PSU", "Power Sector", "GATE", "Engineering Trainee"],
    isNewJob: true
  },
  {
    title: "Scientific Officer / Executive Trainee 2026",
    department: "Nuclear Power Corporation of India Limited (NPCIL - Dept of Atomic Energy)",
    category: "govt",
    sector: "ATOMIC ENERGY & NUCLEAR RESEARCH",
    state: "All India / Central",
    states: ["All India / Central", "Maharashtra", "Gujarat", "Tamil Nadu", "Rajasthan", "Uttar Pradesh"],
    qualification: "Graduate - B.E. / B.Tech / B.Sc (Engineering)",
    qualifications: [
      "Graduate - B.E. / B.Tech / B.Sc (Engg) in Mechanical, Chemical, Electrical, Electronics, Instrumentation, Civil",
      "Valid GATE Score"
    ],
    salary: "Stipend ₹55,000/month -> ₹56,100 - ₹1,77,500 / month (Level 10 Pay Matrix)",
    vacancies: 400,
    ageLimit: "18 - 26 Years",
    lastDate: "2026-11-25",
    dayNumber: 5,
    applyUrl: "https://www.npcilcareers.co.in",
    notificationUrl: "https://www.npcilcareers.co.in/MainSite/default.aspx",
    description: "NPCIL recruits Executive Trainees to commission, operate, and maintain nuclear power reactors (PHWR & LWR) under the Department of Atomic Energy.",
    eligibility: "B.E./B.Tech with minimum 60% aggregate marks from AICTE/UGC recognized universities with valid GATE score.",
    selectionProcess: "GATE Score Shortlisting -> Technical Interview by BARC & NPCIL Expert Committee -> Medical Fitness",
    tags: ["NPCIL", "Atomic Energy", "Executive Trainee", "DAE", "PSU"],
    isNewJob: true
  },
  {
    title: "Gujarat Administrative Service & Police Service (Class 1 & 2) 2026",
    department: "Gujarat Public Service Commission (GPSC)",
    category: "govt",
    sector: "STATE CIVIL SERVICES",
    state: "Gujarat",
    states: ["Gujarat"],
    qualification: "Graduate - Any Stream / Any Discipline",
    qualifications: [
      "Graduate - Any Stream / Any Discipline",
      "Proficiency in Gujarati and Hindi Languages"
    ],
    salary: "₹56,100 - ₹1,77,500 / month (Class-1) & ₹44,900 - ₹1,42,400 (Class-2)",
    vacancies: 260,
    ageLimit: "20 - 36 Years",
    lastDate: "2026-11-22",
    dayNumber: 6,
    applyUrl: "https://gpsc-ojas.gujarat.gov.in",
    notificationUrl: "https://gpsc.gujarat.gov.in/Advertisements",
    description: "Recruitment for Deputy Collector (GAS Class-1), DySP (Police Class-1), Assistant Commissioner of State Tax, and Taluka Development Officers across Gujarat.",
    eligibility: "Bachelor's degree from any recognized University with basic computer literacy.",
    selectionProcess: "Preliminary Objective Exam (General Studies) -> Mains Written Descriptive (6 Papers) -> Personal Interview",
    tags: ["GPSC", "Gujarat Govt", "GAS", "DySP", "Class 1", "Class 2"],
    isNewJob: true
  },
  {
    title: "Combined Competitive Examination (CCE Group A & B) 2026",
    department: "Gujarat Secondary Service Selection Board (GSSSB)",
    category: "govt",
    sector: "STATE CIVIL SERVICES",
    state: "Gujarat",
    states: ["Gujarat"],
    qualification: "Graduate - Any Stream / Any Discipline",
    qualifications: [
      "Graduate - Any Stream / Any Discipline",
      "Basic Computer Application Certificate (CCC)"
    ],
    salary: "₹26,000 - ₹49,600 / month (Fixed Pay for initial years, then regular 7th CPC scale)",
    vacancies: 5554,
    ageLimit: "20 - 35 Years",
    lastDate: "2026-12-08",
    dayNumber: 7,
    applyUrl: "https://ojas.gujarat.gov.in",
    notificationUrl: "https://gsssb.gujarat.gov.in",
    description: "GSSSB mega recruitment for Head Clerk, Senior Clerk, Junior Clerk, and Office Assistants across government secretariats and district offices in Gujarat.",
    eligibility: "Bachelor's degree from recognized university with computer qualification (CCC) and knowledge of Gujarati/Hindi.",
    selectionProcess: "Preliminary Computer Based Recruitment Test (CBRT) -> Mains Descriptive Exam (Group A) / Objective Exam (Group B)",
    tags: ["GSSSB", "CCE", "Gujarat Govt", "Clerk", "Ojas Gujarat"],
    isNewJob: true
  },
  {
    title: "Assistant Central Intelligence Officer (ACIO Grade-II / Exec) 2026",
    department: "Intelligence Bureau (Ministry of Home Affairs - MHA)",
    category: "govt",
    sector: "SECURITY & INTELLIGENCE",
    state: "All India / Central",
    states: ["All India / Central", "Delhi NCR"],
    qualification: "Graduate - Any Stream / Any Discipline",
    qualifications: [
      "Graduate - Any Stream / Any Discipline",
      "Basic Computer Literacy & Typing Proficiency"
    ],
    salary: "₹44,900 - ₹1,42,400 / month (Level 7) + 20% Special Security Allowance",
    vacancies: 995,
    ageLimit: "18 - 27 Years",
    lastDate: "2026-12-15",
    dayNumber: 1,
    applyUrl: "https://www.mha.gov.in",
    notificationUrl: "https://www.mha.gov.in/en/commoncontent/vacancies",
    description: "Ministry of Home Affairs recruits ACIO-II/Executive officers for intelligence gathering, border security surveillance, and counter-espionage.",
    eligibility: "Graduation or equivalent from a recognized University with basic computer proficiency.",
    selectionProcess: "Tier-1 Computer Based Objective Test -> Tier-2 Descriptive Written Paper -> Tier-3 Personal Interview",
    tags: ["Intelligence Bureau", "MHA", "ACIO", "Security", "Central Govt"],
    isNewJob: true
  },
  {
    title: "Scientist / Engineer 'SC' (Civil, Mech, Electrical, CS) 2026",
    department: "ISRO Centralised Recruitment Board (ICRB)",
    category: "govt",
    sector: "GOVERNMENT",
    state: "All India / Central",
    states: ["All India / Central", "Karnataka", "Kerala", "Gujarat", "Andhra Pradesh"],
    qualification: "Graduate - B.E. / B.Tech in relevant Engineering branch",
    qualifications: [
      "Graduate - B.E. / B.Tech (Civil / Mechanical / Electrical / Computer Science)",
      "Minimum 65% aggregate marks or CGPA 6.84/10"
    ],
    salary: "₹56,100 - ₹1,77,500 / month (Pay Level 10 Matrix, Gross approx. ₹95,000/month)",
    vacancies: 303,
    ageLimit: "18 - 28 Years",
    lastDate: "2026-11-28",
    dayNumber: 2,
    applyUrl: "https://www.isro.gov.in/Careers.html",
    notificationUrl: "https://www.isro.gov.in/CurrentOpportunities.html",
    description: "Recruitment of Scientist/Engineer 'SC' Group 'A' Gazetted officers across ISRO research centres to engineer satellite launch vehicles and space payloads.",
    eligibility: "B.E./B.Tech or equivalent with minimum 65% marks or 6.84 CGPA from recognized institutes.",
    selectionProcess: "Written Screening Examination (ICRB) -> Personal Technical Interview (min 60% marks required)",
    tags: ["ISRO", "Scientist", "Engineer", "Space Research", "Group A Gazetted"],
    isNewJob: true
  },
  {
    title: "Senior Technical Assistant-B (STA-B - CEPTAM-11) 2026",
    department: "Defence Research & Development Organisation (DRDO)",
    category: "govt",
    sector: "DEFENCE & R&D",
    state: "All India / Central",
    states: ["All India / Central", "Delhi NCR", "Karnataka", "Telangana", "Maharashtra", "Gujarat"],
    qualification: "Diploma in Engineering / B.Sc in Science",
    qualifications: [
      "Diploma in Engineering (Mechanical / Electrical / Electronics / CS / Chemical / Civil)",
      "Graduate - B.Sc (Physics / Chemistry / Mathematics / Computer Science)"
    ],
    salary: "₹35,400 - ₹1,12,400 / month (Pay Level 6 under 7th CPC Matrix)",
    vacancies: 1900,
    ageLimit: "18 - 28 Years",
    lastDate: "2026-12-10",
    dayNumber: 3,
    applyUrl: "https://www.drdo.gov.in/drdo/careers",
    notificationUrl: "https://www.drdo.gov.in/drdo/whats_new",
    description: "DRDO CEPTAM recruits Senior Technical Assistants to support cutting-edge missile testing, aerospace radar development, and defence robotics.",
    eligibility: "Three-year diploma in engineering or B.Sc in designated subjects with first-class standing from recognized boards.",
    selectionProcess: "Tier-1 Computer Based Screening Test -> Tier-2 Subject-Specific Technical Test -> Document Verification",
    tags: ["DRDO", "CEPTAM", "Technical Assistant", "Diploma", "Defence R&D"],
    isNewJob: true
  }
];

async function uploadJobs() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found!");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
  console.log("Connected successfully to MongoDB.");

  let insertedCount = 0;
  let updatedCount = 0;

  for (const job of newGovtJobs) {
    const slug = Job.slugify(job.title);
    
    // Check if job exists by title or slug
    let existing = await Job.findOne({
      $or: [
        { title: job.title },
        { slug: slug }
      ]
    });

    if (existing) {
      Object.assign(existing, job);
      existing.slug = slug;
      await existing.save();
      updatedCount++;
      console.log(`[UPDATED] ${job.title} -> Slug: ${existing.slug}`);
    } else {
      job.slug = slug;
      const newJobDoc = new Job(job);
      await newJobDoc.save();
      insertedCount++;
      console.log(`[INSERTED] ${job.title} -> Slug: ${newJobDoc.slug}`);
    }
  }

  const totalCount = await Job.countDocuments();
  const totalGovtCount = await Job.countDocuments({ category: 'govt' });

  console.log("\n==========================================");
  console.log(`Successfully processed ${newGovtJobs.length} jobs.`);
  console.log(`Newly Inserted: ${insertedCount}`);
  console.log(`Updated Existing: ${updatedCount}`);
  console.log(`Total Jobs in Website DB: ${totalCount}`);
  console.log(`Total Government Jobs in Website DB: ${totalGovtCount}`);
  console.log("==========================================");

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

uploadJobs().catch(err => {
  console.error("Upload error:", err);
  process.exit(1);
});
