# Approved property photography

Ten approved photography slots are active; preventiveMaintenance is reserved but
inactive because no equipment-maintenance photograph was supplied. Its service
remains text-only, without adding a visible placeholder. The homepage hero uses homeHero;
the Services introduction uses servicesHero, with propertyInspection and
propertyHealth beside their relevant service content. Overseas Owners, Arrival
Ready and About use their corresponding slots in the page introduction.
The homepage Property Health report remains a content demonstration.

New illustrative photography is shown with Vendor Coordination, Vehicle Readiness
and Care with a Clear Scope on Services. Vendor and vehicle rows reverse the
image/text columns on tablet and desktop; mobile keeps the heading first.
Arrival Ready now uses the new arrival-assistance scene in its page introduction.
People and properties are illustrative, not identified as actual clients, staff,
vendors or managed properties. All four new images are 1536x1024 (3:2), use centered
positioning without substantive cropping, and load lazily.

New filename normalization:

| Supplied filename | Production filename |
| --- | --- |
| Luxury Home Service Consultation.png | care-clear-scope.png |
| Luxury Home Contractor Coordination.png | vendor-coordination.png |
| Luxury SUV Wheel Inspection.png | vehicle-readiness.png |
| Golden-Hour Villa Arrival.png | arrival-ready.png |

The former arrival-ready.png is retained as arrival-ready-interior.png. No images
were deleted. Unused copies retained: about.png.png, home-hero.png.png,
overseas-owners.png.png, property-health.png.png, property-inspection.png.png,
Modern Villa at Golden Hour.png, arrival-ready.png.png and arrival-ready-interior.png.
The first six are duplicates of active files; the last two are identical copies
of the previous interior image. These remain preserved as source assets.

The slot inventory, purposes, recommended dimensions, alt-text directions and path
conventions live in `content/photography.ts`. Use approved, licensed imagery with permission to publish; avoid exposing
private property information.

To activate the homepage hero:

1. Add the approved file here (WebP, JPEG or PNG).
2. Statically import the actual file in `content/photography.ts`, for example
   `import homeHeroImage from "@/public/images/property/home-hero.png";`.
3. Set `homeHero.asset` to `{ src: homeHeroImage, alt: "..." }`, describing the actual
   photograph. The recommended dimensions are export guidance, not an instruction
   to upscale a smaller original.
4. Rebuild and check the crop on mobile, tablet and desktop. Keep important subjects
   away from crop edges. `object-fit: cover` fills the reserved frame without
   stretching the image. The existing homepage frame remains 4:5, capped at 38rem.

`PropertyPhotography` uses Next.js Image and the centralized slot. Only `homeHero`
is preloaded; other placements load lazily. Frames reserve space before loading,
and static imports provide actual source dimensions. An absent asset or blank alt
keeps the existing placeholder. Static imports fail the build if a referenced
file is missing, rather than publishing a broken image.

Adding a file alone does not activate it: the central asset entry must also be set.
New slots need an explicitly approved placement before being added to pages.
Their `sizes` values assume an editorial half-width placement; adjust centrally
to match the actual layout if a different placement is approved.

Suggested slots: homeHero, servicesHero, propertyInspection, propertyHealth,
overseasOwners, arrivalReady, about. No image paths belong in page components.

The supplied originals had doubled `.png.png` extensions except the wide villa
image, `Modern Villa at Golden Hour.png`. They remain unchanged. Byte-identical
copies provide the seven canonical filenames requested for production use.
The wide villa image is used for servicesHero. Original dimensions are preserved;
object-fit and centrally configured object-position control display cropping.
