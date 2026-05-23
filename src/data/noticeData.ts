import { noticeColumns } from "@/data/lpsVidhyawadiDatabase";

export interface NoticeDetail {
  slug: string;
  category: string;
  item: string;
  subject: string;
  refNo: string;
  date: string;
  body: string;
  signatory: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function buildNotice(
  item: string,
  category: string,
  index: number
): NoticeDetail {
  const cleanItem = item.replace(/\.+$/, "").trim();
  const slug = slugify(`${category}-${index}-${cleanItem}`);
  const refNo = `LPS/2026-27/CIRCULAR/${String(index + 10).padStart(3, "0")}`;
  const date = "May 18, 2026";
  const signatory = "Dr. Preeti Sharma\nPrincipal, LPS Vidyawadi";

  // ── News & Circulars ──
  if (category === "News & Circulars") {
    if (cleanItem.includes("Happy Saturday")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "GLIMPSES OF HAPPY SATURDAY - BAGLESS INITIATIVE",
        body: "We are extremely delighted to share the vibrant glimpses of our recent 'Happy Saturday' event. Under the 'No Bag Day' initiative mandated by the state educational department, our students engaged in creative arts, music, soft skills development, and community bonding activities.\n\nThis program aims to eliminate academic pressure and stimulate joy in learning. We invite all parents, guardians, and well-wishers to visit our official school gallery to see their smiling faces and brilliant artistic creations!\n\nThe school management believes that experiential learning through art, craft, music, and sport cultivates a well-rounded personality and fosters lifelong curiosity in every young learner.",
      };
    }
    if (cleanItem.includes("No Bag Day")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "IMPLEMENTATION OF WEEKLY NO BAG DAY (CLASSES NURSERY TO VIII)",
        body: "In alignment with modern pedagogical guidelines and board regulations, Saturdays are officially designated as 'No Bag Days' for Classes Nursery to VIII.\n\nStudents are encouraged to leave their academic textbooks at home on this day. The school has structured Saturdays to feature active physical training, aeromodelling, robotics, music, drama, and debating clubs.\n\nThis holistic curriculum is designed to nurture their inherent creativity, collaboration, and critical thinking skills. Parents are requested to ensure their wards attend school on Saturdays in the prescribed uniform without carrying any academic bags.",
      };
    }
    if (cleanItem.includes("Step in for the adventures")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "WELCOME TO THE NEW ACADEMIC SESSION 2026-27",
        body: "We extend a warm and hearty welcome to all new and returning students as we embark on the adventures of the Academic Session 2026-27.\n\nThis year, the school is introducing advanced academic curriculum pathways, digital classroom interfaces with modern IFPs (Interactive Flat Panels), and upgraded professional coaching in sports like soft-ball, aerobics, and gymnastics.\n\nLet us work together to make this year a journey of discovery, character building, and academic excellence. Parents are requested to ensure timely submission of all required documents and fee payments to complete the registration process.",
      };
    }
  }

  // ── Announcements ──
  if (category === "Announcements") {
    if (cleanItem.includes("New Cabinet")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "INVESTITURE CEREMONY AND OATH OF THE STUDENT CABINET",
        body: "The school is proud to introduce our newly elected Student Cabinet for the Session 2026-27. These student leaders officially took their oath of office during our formal Investiture Ceremony, pledging to uphold the school values of truth, responsibility, and discipline.\n\nThe cabinet members will spearhead student activities, coordinate house events, and serve as the official bridge between the student body and the administration.\n\nWe wish the Head Girl, Prefects, and House Captains the absolute best in leading the campus with dedication and honor. Their exemplary conduct shall serve as a beacon of inspiration for every student in our institution.",
      };
    }
    if (cleanItem.includes("better change")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "COMMUNITY ENGAGEMENT & SUSTAINABILITY INITIATIVES",
        body: "A call to action for all our students to embrace active leadership and constructive growth. Our upcoming Saturday sessions will focus on community services and sustainability.\n\nStudents will participate in workshops covering environmental preservation, plastic waste reduction, and civic responsibilities. We believe that small steps taken by our girls today will lead to massive transformations in society tomorrow.\n\nActive participation is mandatory for all students. The school encourages every learner to take ownership of their environment and contribute meaningfully to making Vidyawadi a greener, cleaner, and more responsible campus.",
      };
    }
    if (cleanItem.includes("Bhavya Sharma")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "FELICITATION OF STATE BOARD ACADEMIC TOPPER - BHAVYA SHARMA",
        body: "It is a moment of immense pride and celebration for the entire Vidyawadi family. Our brilliant student, Bhavya Sharma, has been officially awarded a high-performance laptop by the Honorable Chief Minister of Rajasthan at a grand ceremony in Jaipur.\n\nBhavya was recognized for her outstanding performance and exceptional marks in the State Board Examinations. Her achievement reflects the high standards of academic dedication, discipline, and teaching excellence that define our institution.\n\nThe management, staff, and students congratulate Bhavya on this remarkable accomplishment and wish her continued success in all future endeavours.",
      };
    }
    if (cleanItem.includes("meritorious board students")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "DISTRICT ADMINISTRATIVE HONORS FOR BOARD TOPPERS",
        body: "We celebrate the stellar accomplishments of our meritorious board students — Rajbala, Samridhi, and Tanisha — who were officially felicitated by the SDM of Bali Block at the state-level academic achievers meet.\n\nTheir relentless hard work, coupled with the rigorous guidance of our well-qualified academic faculty, has culminated in this prestigious recognition. They have set a shining example for their peers.\n\nThe management and staff congratulate them on this landmark success and are confident that these students will continue to excel in all spheres of life.",
      };
    }
  }

  // ── Admission ──
  if (category === "Admission") {
    if (cleanItem.includes("availability of seats")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "ADMISSION RULES AND MULTICULTURAL POLICY",
        body: "Admission to Leeladevi Parasmal Sancheti Sr. Sec. School is open to all girl children from Nursery to XI Std, subject to the availability of vacant seats.\n\nAs a premier residential institution, we treat every candidate with equal opportunity and complete equity, irrespective of caste, creed, or religious beliefs, ensuring a diverse and rich multicultural learning community.\n\nParents are requested to apply early to secure a seat, as registration operates strictly on a first-come, first-served basis. The school also provides admissions under the Right to Education Act for BPL families, disadvantaged groups, and students with disabilities.",
      };
    }
    if (cleanItem.includes("underage or overage")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "AGE ELIGIBILITY GUIDELINES FOR ACADEMIC REGISTRATION",
        body: "Parents are advised to carefully check the age criteria for admission to respective classes. Girls who are underage or overage beyond the reasonable limits set by the CBSE Board regulations and state guidelines will not be eligible for consideration.\n\nPlease verify the official age eligibility tables available at the school registration desk before submitting the formal application form to avoid disqualification during document verification.\n\nThe school management reserves the right to verify all age-related documents and may request additional proof of date of birth if discrepancies are identified.",
      };
    }
    if (cleanItem.includes("prospectus")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "RELEASE OF OFFICIAL ADMISSION FORM AND E-PROSPECTUS",
        body: "The official Admission Form and E-Prospectus for the academic session are available for collection. You may obtain physical copies from the School Reception desk upon payment of the registration fee, or download the digital version online.\n\nThe prospectus contains comprehensive details on our 65-acre campus, 7 residential hostels, modern kitchen facilities, peripheral transport system, streams offered (Science, Commerce, Arts), and detailed fee schedules.\n\nParents and guardians are encouraged to review all sections of the prospectus carefully and contact our admission counselors for any clarifications before completing the admission process.",
      };
    }
    if (cleanItem.includes("queries contact")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "ESTABLISHMENT OF DEDICATED ADMISSION HELPDESK LINES",
        body: "To ensure a smooth admission process for outstation parents, the school has established dedicated counseling helpdesk lines.\n\nFor any questions regarding hostel accommodation, admission procedures, fee structures, subjects offered, or document submissions, please contact our admission counselors at 6377203204 or 6377204209.\n\nOfficers are available between 10:00 AM and 4:00 PM on all working days to assist you. Walk-in consultations are also welcome at the school reception during the same hours.",
      };
    }
  }

  // ── School Rules ──
  if (category === "School Rules") {
    if (cleanItem.includes("concern regarding")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "PROTOCOL FOR SUBMITTING ACADEMIC AND PERSONAL CONCERNS",
        body: "To ensure effective communication and timely, structured resolution of issues, parents are requested to submit any concerns, grievances, or feedback in writing addressed to the Principal.\n\nPlease ensure the communication includes complete student details such as full name, class, section, roll number, and hostel name (if boarding).\n\nThis will help the school administration address and resolve the matter systematically and efficiently. Anonymous or verbal complaints will not be entertained. The school is committed to resolving all genuine concerns within a reasonable timeframe.",
      };
    }
    if (cleanItem.includes("Office enquiry")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "ADMINISTRATIVE OFFICE WORKING HOURS AND ENQUIRIES",
        body: "This is to inform all parents and visitors that the school administrative office is open for general inquiries, fee deposits, and document verification on weekdays between 11:00 AM and 3:00 PM only.\n\nWe request all visitors to strictly adhere to these timings to maintain administrative efficiency and school security. The office remains closed on Sundays and gazetted holidays.\n\nFor urgent matters outside office hours, parents may contact the school helpline numbers available on the official website.",
      };
    }
    if (cleanItem.includes("Principal meeting")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "VISITING HOURS FOR MEETINGS WITH THE PRINCIPAL",
        body: "Parents wishing to discuss their ward's academic progress, discipline, or personal welfare directly with the Principal are welcome to do so between 10:00 AM and 11:00 AM on weekdays.\n\nTo avoid waiting and ensure dedicated attention, we strongly recommend scheduling an appointment in advance through the office administrative helpdesk or writing an email to the official school ID.\n\nWalk-in meetings may be subject to availability. The school is committed to maintaining open and transparent communication with all parents and guardians.",
      };
    }
    if (cleanItem.includes("Changes in address")) {
      return {
        slug, category, item, refNo, date, signatory,
        subject: "MANDATORY REGISTRATION OF UPDATED CONTACT INFORMATION",
        body: "In order to maintain uninterrupted and prompt communication, especially during emergencies, any change in home address, primary email ID, or active mobile phone numbers must be registered with the school office immediately.\n\nA written request along with a valid proof of the new address or contact details must be submitted to the administration office within 7 days of the change taking effect.\n\nFailure to update contact information may result in delayed communication regarding important school events, examinations, and emergency notifications.",
      };
    }
  }

  // ── Fallback ──
  return {
    slug, category, item, refNo, date, signatory,
    subject: cleanItem.toUpperCase(),
    body: `This official communication concerns: "${cleanItem}".\n\nLeeladevi Parasmal Sancheti English Medium Sr. Sec. School is committed to maintaining transparent records and providing high-quality support to all students, parents, and administrative staff.\n\nFor detailed queries regarding this notice, please consult the school front desk or refer to the annual handbook. The school office is available during working hours (11:00 AM to 3:00 PM) on all weekdays for any clarifications.`,
  };
}

// Build all notices once at module level
let globalIndex = 0;
export const allNotices: NoticeDetail[] = noticeColumns.flatMap((col) =>
  col.items.map((item) => buildNotice(item, col.title, globalIndex++))
);

export function getNoticeBySlug(slug: string): NoticeDetail | undefined {
  return allNotices.find((n) => n.slug === slug);
}

export function getNoticeSlug(item: string, category: string): string {
  const notice = allNotices.find(
    (n) => n.item === item && n.category === category
  );
  return notice?.slug ?? "";
}

// Re-export for convenience
export { noticeColumns } from "@/data/lpsVidhyawadiDatabase";
