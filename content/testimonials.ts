/** Add only genuine customer quotes with explicit permission to publish. */
export type Testimonial = {
  id: string;
  quote: string;
  displayName: string;
  publicationConsent: true;
  approvedAt: string;
  image?: { src: string; alt: string };
};

// Future UI: render the section only when testimonials.length > 0.
export const testimonials: readonly Testimonial[] = [];

/** Homepage customer reviews supplied and approved for publication by the site owner. */
export type HomepageTestimonial = {
  id: string;
  name: string;
  quote: string;
  image: { src: string; alt: string; objectPosition?: string } | null;
  relationshipLabel: string;
  isPlaceholder: boolean;
};

export const testimonialSection = {
  heading: ["Real experiences.", "Trusted support."],
  introduction: "A few words from people who have trusted Puraitmaad to help get things handled.",
  placeholderNotice: "Development placeholders — customer reviews pending.",
};

// Preserve the supplied customer wording. Add only owner-approved quotes and labels.
export const homepageTestimonialEntries: readonly HomepageTestimonial[] = [
  {
    id: "zeeshan",
    name: "Zeeshan",
    quote: "“We were away from home for a few weeks, and Pur Aitmaad took care of everything. From regular home checks to handling maintenance issues, everything was managed smoothly. It was such a relief knowing our home was in safe hands while we were away. Really happy with their service!”",
    image: { src: "/images/testimonials/zeeshan.webp", alt: "Man wearing maroon traditional clothing", objectPosition: "50% 50%" },
    relationshipLabel: "Property Care",
    isPlaceholder: false,
  },
  {
    id: "sara-khan",
    name: "Sara Khan",
    quote: "“Pur Aitmaad helped us arrange our Nikkah and find reliable vendors. The whole experience was wonderful! From coordinating everything to taking care of the little details, their team made the process so easy for our family. We were able to enjoy our special day without worrying about the arrangements. Truly grateful for their support!”",
    image: { src: "/images/testimonials/sara-khan.webp", alt: "Woman wearing teal traditional clothing", objectPosition: "50% 50%" },
    relationshipLabel: "Personal Assistance",
    isPlaceholder: false,
  },
];
