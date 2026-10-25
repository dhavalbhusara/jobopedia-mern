// Master Database: All Indian Qualifications (A to Z) & All 28 States + 8 Union Territories

export const ALL_STATES = [
  "All India (Central / National)",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi NCR",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export const QUALIFICATION_CATEGORIES = [
  {
    category: "10th, 12th & School Certifications",
    degrees: [
      "10th Pass (Matriculation / SSC)",
      "12th Pass - Arts (HSC)",
      "12th Pass - Commerce (HSC)",
      "12th Pass - Science (PCB / PCM)",
      "ITI Certificate (Any Trade)",
      "Polytechnic Diploma (Engineering / Technical)"
    ]
  },
  {
    category: "Undergraduate / Bachelor's Degrees (A to Z)",
    degrees: [
      "Any Graduate (Any Bachelor's Degree)",
      "B.A. (Bachelor of Arts)",
      "B.Arch (Bachelor of Architecture)",
      "B.B.A. (Bachelor of Business Administration)",
      "B.C.A. (Bachelor of Computer Applications)",
      "B.Com (Bachelor of Commerce)",
      "B.Des (Bachelor of Design)",
      "B.E. / B.Tech (Computer Science & IT)",
      "B.E. / B.Tech (Civil Engineering)",
      "B.E. / B.Tech (Electrical & Electronics)",
      "B.E. / B.Tech (Mechanical Engineering)",
      "B.E. / B.Tech (Chemical / Biotechnology)",
      "B.Ed. (Bachelor of Education)",
      "B.P.Ed (Physical Education)",
      "B.Pharm (Bachelor of Pharmacy)",
      "B.Sc (Bachelor of Science - General)",
      "B.Sc (Agriculture / Forestry)",
      "B.Sc (Computer Science / IT)",
      "B.Sc (Nursing / Medical Tech)",
      "B.S.W. (Bachelor of Social Work)",
      "BAMS / BHMS (Ayurveda / Homeopathy)",
      "BDS (Bachelor of Dental Surgery)",
      "BHM (Hotel Management & Catering)",
      "BLIS (Library & Information Science)",
      "BPT (Bachelor of Physiotherapy)",
      "LLB (Bachelor of Legislative Law)",
      "MBBS (Bachelor of Medicine & Surgery)"
    ]
  },
  {
    category: "Postgraduate / Master's Degrees (A to Z)",
    degrees: [
      "LLM (Master of Laws)",
      "M.A. (Master of Arts)",
      "M.Arch (Master of Architecture)",
      "M.Com (Master of Commerce)",
      "M.E. / M.Tech (Engineering)",
      "M.Ed. (Master of Education)",
      "M.Pharm (Master of Pharmacy)",
      "M.Phil (Master of Philosophy)",
      "M.Sc (Master of Science)",
      "M.Sc (Agriculture / Biotech)",
      "M.Sc (Nursing / Healthcare)",
      "M.S.W. (Master of Social Work)",
      "MBA (Finance / Marketing / HR / Operations)",
      "MCA (Master of Computer Applications)",
      "MD / MS (Doctor of Medicine / Surgery)",
      "Ph.D. / Doctorate (Any Discipline)"
    ]
  },
  {
    category: "Professional & Chartered Certifications",
    degrees: [
      "CA (Chartered Accountant - ICAI)",
      "CS (Company Secretary - ICSI)",
      "CMA / ICWA (Cost & Management Accountant)",
      "CFA (Chartered Financial Analyst)",
      "Certified Full Stack / Cloud Engineer"
    ]
  }
];

// Flat list for easy dropdowns
export const FLAT_QUALIFICATIONS = QUALIFICATION_CATEGORIES.flatMap(c => c.degrees);
