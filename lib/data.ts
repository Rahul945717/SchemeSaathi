// Central mock data for the SchemeSaathi frontend prototype.
// No backend — everything here is illustrative demo data that powers the UI.

export type Category =
  | "Business"
  | "Housing"
  | "Education"
  | "Agriculture"
  | "Employment"
  | "Welfare"

export type Scheme = {
  id: string
  name: string
  shortName?: string
  category: Category
  ministry: string
  summary: string
  minAmount: number
  maxAmount: number
  interestRate: number // annual %
  maxTenureMonths: number
  match?: number // 0-100 match score for the demo citizen
  eligibility: { label: string; met: boolean; detail: string }[]
  documents: string[]
  benefits: string
  active: boolean
  applicants: number
}

export const schemes: Scheme[] = [
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme",
    shortName: "PMEGP",
    category: "Business",
    ministry: "Ministry of MSME",
    summary:
      "Credit-linked subsidy for setting up new micro-enterprises in manufacturing and services.",
    minAmount: 50000,
    maxAmount: 2500000,
    interestRate: 11,
    maxTenureMonths: 84,
    match: 94,
    eligibility: [
      { label: "Age 18+", met: true, detail: "You are 29 years old." },
      { label: "New enterprise", met: true, detail: "No existing subsidy availed." },
      { label: "Income ceiling", met: true, detail: "Household income within limit." },
      { label: "Project cost cap", met: true, detail: "₹5,00,000 is within the ₹25L cap." },
    ],
    documents: ["Aadhaar Card", "Project Report", "Caste Certificate", "Bank Passbook"],
    benefits: "Up to 35% margin money subsidy for special category beneficiaries.",
    active: true,
    applicants: 2846,
  },
  {
    id: "mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    shortName: "MUDRA",
    category: "Business",
    ministry: "Dept. of Financial Services",
    summary:
      "Collateral-free loans up to ₹10 lakh for non-corporate, non-farm small enterprises.",
    minAmount: 50000,
    maxAmount: 1000000,
    interestRate: 10.5,
    maxTenureMonths: 60,
    match: 90,
    eligibility: [
      { label: "Small business owner", met: true, detail: "Eligible business activity." },
      { label: "No loan default", met: true, detail: "Clean credit record." },
      { label: "Age 18–65", met: true, detail: "Within permitted range." },
    ],
    documents: ["Aadhaar Card", "PAN Card", "Business Proof", "Bank Statement"],
    benefits: "Shishu / Kishore / Tarun categories with no processing fee for Shishu.",
    active: true,
    applicants: 1982,
  },
  {
    id: "standup",
    name: "Stand-Up India Scheme",
    shortName: "Stand-Up India",
    category: "Business",
    ministry: "Dept. of Financial Services",
    summary:
      "Bank loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs.",
    minAmount: 1000000,
    maxAmount: 10000000,
    interestRate: 9.5,
    maxTenureMonths: 84,
    match: 76,
    eligibility: [
      { label: "SC/ST or Woman", met: true, detail: "Category verified." },
      { label: "Greenfield project", met: true, detail: "First-time venture." },
      { label: "Loan ≥ ₹10L", met: false, detail: "Your requirement of ₹5L is below the minimum." },
    ],
    documents: ["Aadhaar Card", "Category Certificate", "Project Report", "Address Proof"],
    benefits: "Composite loan (term + working capital) with handholding support.",
    active: true,
    applicants: 1426,
  },
  {
    id: "svanidhi",
    name: "PM Street Vendor's AtmaNirbhar Nidhi",
    shortName: "PM SVANidhi",
    category: "Welfare",
    ministry: "Ministry of Housing & Urban Affairs",
    summary: "Working capital loans for street vendors to resume livelihoods.",
    minAmount: 10000,
    maxAmount: 50000,
    interestRate: 8,
    maxTenureMonths: 12,
    match: 71,
    eligibility: [
      { label: "Street vendor", met: false, detail: "Profile lists non-vending business." },
      { label: "Urban local body", met: true, detail: "Registered urban address." },
    ],
    documents: ["Vending Certificate", "Aadhaar Card", "Bank Passbook"],
    benefits: "7% interest subsidy on timely repayment plus cashback on digital transactions.",
    active: true,
    applicants: 984,
  },
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana",
    shortName: "PM Awas Yojana",
    category: "Housing",
    ministry: "Ministry of Housing & Urban Affairs",
    summary: "Interest subsidy on home loans for affordable housing for all.",
    minAmount: 100000,
    maxAmount: 1200000,
    interestRate: 6.5,
    maxTenureMonths: 240,
    match: 88,
    eligibility: [
      { label: "No pucca house", met: true, detail: "No household owns a pucca house." },
      { label: "Income group", met: true, detail: "Falls under LIG category." },
      { label: "First home loan", met: true, detail: "No prior housing subsidy." },
    ],
    documents: ["Aadhaar Card", "Income Certificate", "Property Papers", "Bank Statement"],
    benefits: "Credit-linked subsidy up to ₹2.67 lakh on the home loan interest.",
    active: true,
    applicants: 824,
  },
  {
    id: "scholarship",
    name: "Post-Matric Scholarship",
    shortName: "Post-Matric Scholarship",
    category: "Education",
    ministry: "Ministry of Social Justice",
    summary: "Financial assistance for students pursuing post-matriculation studies.",
    minAmount: 5000,
    maxAmount: 60000,
    interestRate: 0,
    maxTenureMonths: 0,
    match: 82,
    eligibility: [
      { label: "Enrolled student", met: true, detail: "Currently in a recognised course." },
      { label: "Family income", met: true, detail: "Within income ceiling." },
    ],
    documents: ["Aadhaar Card", "Marksheet", "Income Certificate", "Bonafide Certificate"],
    benefits: "Maintenance allowance plus full tuition reimbursement.",
    active: true,
    applicants: 612,
  },
  {
    id: "pmkisan",
    name: "PM Kisan Samman Nidhi",
    shortName: "PM-KISAN",
    category: "Agriculture",
    ministry: "Ministry of Agriculture",
    summary: "Income support of ₹6,000 per year to all landholding farmer families.",
    minAmount: 6000,
    maxAmount: 6000,
    interestRate: 0,
    maxTenureMonths: 0,
    match: 68,
    eligibility: [
      { label: "Landholding farmer", met: false, detail: "No land records on file." },
      { label: "Aadhaar linked", met: true, detail: "Bank account seeded with Aadhaar." },
    ],
    documents: ["Aadhaar Card", "Land Records", "Bank Passbook"],
    benefits: "₹6,000 per year in three equal instalments directly to the bank account.",
    active: true,
    applicants: 487,
  },
]

export type ApplicationStatus = "Approved" | "Pending" | "Under Review" | "Rejected"

export type Application = {
  id: string
  schemeId: string
  schemeName: string
  applicant: string
  partner: string
  date: string
  status: ApplicationStatus
  amount: number
}

export const applications: Application[] = [
  { id: "APP-10482", schemeId: "pmay", schemeName: "PM Awas Yojana", applicant: "Rahul Kumar", partner: "State Bank Partner", date: "01 Sep 2026", status: "Approved", amount: 267000 },
  { id: "APP-10479", schemeId: "scholarship", schemeName: "Post-Matric Scholarship", applicant: "Priya Kumari", partner: "District Welfare Office", date: "31 Aug 2026", status: "Pending", amount: 42000 },
  { id: "APP-10472", schemeId: "pmkisan", schemeName: "PM-KISAN", applicant: "Amit Mishra", partner: "Agri Cooperative", date: "30 Aug 2026", status: "Under Review", amount: 6000 },
  { id: "APP-10465", schemeId: "pmegp", schemeName: "PMEGP", applicant: "Sunita Namdeo", partner: "Canara Bank", date: "29 Aug 2026", status: "Under Review", amount: 500000 },
  { id: "APP-10461", schemeId: "mudra", schemeName: "MUDRA", applicant: "Anjali Sharma", partner: "Canara Bank", date: "28 Aug 2026", status: "Approved", amount: 300000 },
  { id: "APP-10455", schemeId: "standup", schemeName: "Stand-Up India", applicant: "Mohit Kumar", partner: "Bank of Baroda", date: "27 Aug 2026", status: "Rejected", amount: 1500000 },
]

export type Partner = {
  id: string
  name: string
  type: "Bank" | "NBFC" | "Cooperative" | "Agency"
  distanceKm: number
  rating: number
  status: "Available" | "Busy" | "Offline"
  schemes: string[]
  processed: number
}

export const partners: Partner[] = [
  { id: "sbi", name: "State Bank Partner — MG Road", type: "Bank", distanceKm: 2.4, rating: 4.7, status: "Available", schemes: ["pmegp", "mudra", "pmay"], processed: 1240 },
  { id: "canara", name: "Canara Bank — Civil Lines", type: "Bank", distanceKm: 3.1, rating: 4.5, status: "Available", schemes: ["mudra", "standup", "pmegp"], processed: 980 },
  { id: "muthoot", name: "Muthoot FinCorp", type: "NBFC", distanceKm: 1.8, rating: 4.2, status: "Busy", schemes: ["mudra", "svanidhi"], processed: 610 },
  { id: "agricoop", name: "District Agri Cooperative", type: "Cooperative", distanceKm: 5.6, rating: 4.0, status: "Available", schemes: ["pmkisan"], processed: 420 },
  { id: "welfare", name: "District Welfare Office", type: "Agency", distanceKm: 4.2, rating: 4.4, status: "Offline", schemes: ["scholarship", "pmay"], processed: 350 },
]

export const users = [
  { id: "u1", name: "Rahul Kumar", email: "rahul.k@example.com", role: "Citizen", location: "Bhopal, MP", joined: "12 Jul 2026", status: "Active" },
  { id: "u2", name: "Priya Kumari", email: "priya.k@example.com", role: "Citizen", location: "Indore, MP", joined: "03 Aug 2026", status: "Active" },
  { id: "u3", name: "Amit Mishra", email: "amit.m@example.com", role: "Citizen", location: "Jabalpur, MP", joined: "21 Jun 2026", status: "Active" },
  { id: "u4", name: "State Bank Partner", email: "partner.sbi@example.com", role: "Partner", location: "Bhopal, MP", joined: "01 Jan 2026", status: "Active" },
  { id: "u5", name: "Sunita Namdeo", email: "sunita.n@example.com", role: "Citizen", location: "Gwalior, MP", joined: "15 Aug 2026", status: "Suspended" },
]

export const monthlyApplications = [
  { month: "Mar", value: 48 },
  { month: "Apr", value: 62 },
  { month: "May", value: 54 },
  { month: "Jun", value: 72 },
  { month: "Jul", value: 66 },
  { month: "Aug", value: 82 },
  { month: "Sep", value: 91 },
]

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN")
}

// Simple EMI calculation: P * r * (1+r)^n / ((1+r)^n - 1)
export function calcEmi(principal: number, annualRate: number, months: number) {
  if (months <= 0) return { emi: principal, total: principal, interest: 0 }
  if (annualRate === 0) {
    const emi = principal / months
    return { emi, total: principal, interest: 0 }
  }
  const r = annualRate / 12 / 100
  const pow = Math.pow(1 + r, months)
  const emi = (principal * r * pow) / (pow - 1)
  const total = emi * months
  return { emi, total, interest: total - principal }
}

export const categoryList: Category[] = [
  "Business",
  "Housing",
  "Education",
  "Agriculture",
  "Employment",
  "Welfare",
]
