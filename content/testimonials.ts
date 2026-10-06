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
