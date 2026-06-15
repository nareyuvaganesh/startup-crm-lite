// Base leads template specifying relative offsets (daysAgo), lead values (revenue), sources, and average response times.
const baseLeads = [
  { id: "1", name: "Rahul Sharma", company: "TechNova", email: "rahul@technova.com", phone: "9876543210", status: "New", source: "Website", value: 5000, responseTime: 1.5, daysAgo: 0 },
  { id: "2", name: "Priya Reddy", company: "CloudSoft", email: "priya@cloudsoft.com", phone: "9876543211", status: "Contacted", source: "Referral", value: 8500, responseTime: 2.2, daysAgo: 2 },
  { id: "3", name: "Arjun Kumar", company: "InfoSys Labs", email: "arjun@infosyslabs.com", phone: "9876543212", status: "Meeting Scheduled", source: "LinkedIn", value: 12000, responseTime: 5.0, daysAgo: 4 },
  { id: "4", name: "Sneha Patel", company: "GrowthHub", email: "sneha@growthhub.com", phone: "9876543213", status: "Proposal Sent", source: "Email Campaign", value: 6500, responseTime: 0.8, daysAgo: 6 },
  { id: "5", name: "Vikram Singh", company: "DigitalEdge", email: "vikram@digitaledge.com", phone: "9876543214", status: "Won", source: "Website", value: 15000, responseTime: 3.4, daysAgo: 10 },
  { id: "6", name: "Anjali Verma", company: "FutureWorks", email: "anjali@futureworks.com", phone: "9876543215", status: "Lost", source: "Cold Call", value: 3000, responseTime: 12.5, daysAgo: 12 },
  { id: "7", name: "Sanjay Gupta", company: "Cyberdyne", email: "sanjay@cyberdyne.com", phone: "9876543216", status: "Won", source: "LinkedIn", value: 22000, responseTime: 1.2, daysAgo: 15 },
  { id: "8", name: "Rohan Das", company: "Vantage Inc", email: "rohan@vantage.com", phone: "9876543217", status: "Meeting Scheduled", source: "Website", value: 4500, responseTime: 4.5, daysAgo: 20 },
  { id: "9", name: "Kiran Rao", company: "OmniCorp", email: "kiran@omnicorp.com", phone: "9876543218", status: "Proposal Sent", source: "Referral", value: 9800, responseTime: 2.8, daysAgo: 28 },
  { id: "10", name: "Deepak Joshi", company: "Helius Tech", email: "deepak@helius.com", phone: "9876543219", status: "Won", source: "Email Campaign", value: 11000, responseTime: 1.1, daysAgo: 35 },
  { id: "11", name: "Meera Nair", company: "Incite", email: "meera@incite.com", phone: "9876543220", status: "Lost", source: "LinkedIn", value: 7500, responseTime: 8.4, daysAgo: 42 },
  { id: "12", name: "Aditya Mehta", company: "Synergy Ltd", email: "aditya@synergy.com", phone: "9876543221", status: "Won", source: "Website", value: 13500, responseTime: 2.0, daysAgo: 50 },
  { id: "13", name: "Riya Sen", company: "Apex Media", email: "riya@apexmedia.com", phone: "9876543222", status: "Contacted", source: "Cold Call", value: 2500, responseTime: 15.0, daysAgo: 58 },
  { id: "14", name: "Varun Gill", company: "Starlight", email: "varun@starlight.com", phone: "9876543223", status: "Won", source: "LinkedIn", value: 17000, responseTime: 0.9, daysAgo: 65 },
  { id: "15", name: "Aishwarya Rai", company: "Elite Brand", email: "aishwarya@elite.com", phone: "9876543224", status: "Proposal Sent", source: "Referral", value: 14000, responseTime: 3.1, daysAgo: 72 },
  { id: "16", name: "Karan Johar", company: "Dharma Ent", email: "karan@dharma.com", phone: "9876543225", status: "Won", source: "Email Campaign", value: 8000, responseTime: 1.8, daysAgo: 85 },
  { id: "17", name: "Pooja Hegde", company: "Creative Minds", email: "pooja@creative.com", phone: "9876543226", status: "Lost", source: "Website", value: 5500, responseTime: 9.2, daysAgo: 95 },
  { id: "18", name: "Siddharth Malhotra", company: "Duo Tech", email: "sid@duotech.com", phone: "9876543227", status: "Won", source: "LinkedIn", value: 19500, responseTime: 1.4, daysAgo: 110 },
  { id: "19", name: "Neha Kakkar", company: "Melody Group", email: "neha@melody.com", phone: "9876543228", status: "Contacted", source: "Cold Call", value: 4000, responseTime: 10.0, daysAgo: 130 },
  { id: "20", name: "Amitabh Bachchan", company: "AB Corp", email: "amitabh@abcorp.com", phone: "9876543229", status: "Won", source: "Referral", value: 25000, responseTime: 2.5, daysAgo: 150 },
  { id: "21", name: "Sushant Rajput", company: "Skyline Labs", email: "sushant@skyline.com", phone: "9876543230", status: "Lost", source: "LinkedIn", value: 9000, responseTime: 7.0, daysAgo: 180 },
  { id: "22", name: "Shraddha Kapoor", company: "Aura Style", email: "shraddha@aurastyle.com", phone: "9876543231", status: "Won", source: "Website", value: 10500, responseTime: 1.6, daysAgo: 210 },
  { id: "23", name: "Rajkummar Rao", company: "Real Acting", email: "raj@realacting.com", phone: "9876543232", status: "Proposal Sent", source: "Email Campaign", value: 12500, responseTime: 2.1, daysAgo: 240 },
  { id: "24", name: "Ayushmann Khurrana", company: "Social Dev", email: "ayush@socialdev.com", phone: "9876543233", status: "Won", source: "Cold Call", value: 6000, responseTime: 5.4, daysAgo: 270 },
  { id: "25", name: "Ranveer Singh", company: "Energetic Inc", email: "ranveer@energetic.com", phone: "9876543234", status: "Lost", source: "Website", value: 15000, responseTime: 11.2, daysAgo: 300 },
  { id: "26", name: "Deepika Padukone", company: "Global Style", email: "deepika@globalstyle.com", phone: "9876543235", status: "Won", source: "LinkedIn", value: 28000, responseTime: 1.0, daysAgo: 330 },
  { id: "27", name: "Alia Bhatt", company: "Eternal Sunshine", email: "alia@eternal.com", phone: "9876543236", status: "Won", source: "Referral", value: 16500, responseTime: 1.3, daysAgo: 360 }
];

// Map base templates into dynamic records containing ISO string timestamps relative to current runtime context.
const sampleLeads = baseLeads.map(lead => {
  // Extract number of days ago this record was created.
  const { daysAgo, ...rest } = lead;
  // Compute date object offset backwards by daysAgo.
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return {
    ...rest,
    // Store creation timestamp as ISO string.
    createdAt: date.toISOString()
  };
});

export default sampleLeads;