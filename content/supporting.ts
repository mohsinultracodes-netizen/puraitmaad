export const detailedProcess = [
  { title: "You tell us", description: "Tell us what needs to be handled. You don't need to identify the right service or professional.", connection: "You Ask" },
  { title: "We understand", description: "We clarify the requirement, location, timing and relevant details before arranging the next step.", connection: "You Ask → We Source" },
  { title: "We arrange", description: "We identify the appropriate professional, service or solution and discuss the scope and cost with you.", connection: "We Source" },
  { title: "We coordinate", description: "We manage communication, timing, access and progress where appropriate, keeping you informed.", connection: "We Coordinate" },
  { title: "We confirm", description: "Where appropriate, we confirm completion and share the relevant details with you.", connection: "We Verify → Done" },
] as const;
export const coordinationExample = {
  request: "My parents are arriving next week. Please have the house cleaned, the AC checked, groceries stocked and the garden looked after.",
  details: ["Clarify the home's needs, access and preferred arrival date.", "Arrange cleaning, an AC specialist, restocking and garden care as agreed.", "Coordinate the pieces and share relevant updates and completion details."],
};
export const operatingPhilosophy = [
  { title: "Responsibility", description: "Be clear about what we take on and follow through on the agreed scope." },
  { title: "Clear communication", description: "Keep you informed about the practical details and decisions that need your input." },
  { title: "Practical coordination", description: "Bring the right pieces together without making you manage every conversation." },
  { title: "Discretion", description: "Handle personal and property details thoughtfully, sharing what is needed for agreed work." },
  { title: "Appropriate follow-through", description: "Confirm outcomes where appropriate and explain what still needs attention." },
] as const;
