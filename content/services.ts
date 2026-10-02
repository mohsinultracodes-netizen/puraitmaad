export const services = [
  {
    id: "inspections", title: "Property Inspections",
    description: "Scheduled physical checks designed to identify visible issues, maintenance needs and changes in property condition. Areas are agreed according to your property and service plan.",
    items: ["General property condition", "Plumbing and electrical systems", "Air conditioning", "Generator / backup power", "Solar systems where applicable", "Internet connectivity", "Doors, windows and lighting", "Garden and pool", "Selected appliances"],
    note: "These are property observations, not specialist engineering assessments or certifications. Where needed, an appropriate specialist can be coordinated.",
  },
  {
    id: "maintenance", title: "Preventive Maintenance",
    description: "Identify and coordinate routine maintenance before small issues become larger problems. We help keep servicing needs visible and arrange agreed work with appropriate providers.",
    items: ["AC and generator servicing", "Water tank cleaning and filters", "Pest control", "Plumbing and electrical checks", "Solar maintenance", "Garden and pool maintenance"],
  },
  {
    id: "vendors", title: "Vendor Coordination",
    description: "Pur Aitmaad coordinates appropriate third-party specialists. Specialist trade work is performed by those providers, with agreed work followed through and completion checked.",
    steps: ["Issue identified", "Estimate obtained", "Owner approval where required", "Vendor scheduled", "Work coordinated", "Completion checked", "Evidence documented", "Issue closed"],
  },
  {
    id: "property-health", title: "Property Health",
    description: "Organized reporting gives you a clear view of property condition and the care being coordinated. Observations and outcomes are documented so you can understand what needs a decision and what has been addressed.",
    items: ["Current condition", "Items requiring attention", "Upcoming maintenance", "Work in progress", "Resolved issues"],
  },
  {
    id: "arrival-ready", title: "Arrival Ready",
    description: "Our signature service coordinates agreed preparation before your return: property checks, cleaning coordination and the details that help make your arrival more comfortable.",
    link: { href: "/arrival-ready", label: "Explore Arrival Ready" },
  },
  {
    id: "vehicles", title: "Vehicle Readiness",
    description: "Where included in your agreed plan, basic readiness checks can cover visual condition, battery and tires, and starting checks. Approved cleaning or servicing can be coordinated, with reminders for upcoming servicing or registration.",
    note: "Pur Aitmaad is not a vehicle repair company. Vehicle repairs and specialist assessments are handled by appropriate providers.",
  },
];
