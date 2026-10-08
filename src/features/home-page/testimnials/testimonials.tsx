import { TestimonialCard } from './testimonial-card';
import { testimonialsData } from './testimonial-data';
import { TestimonialsMarquee } from './testimonials-marquee';

export default function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative flex w-full items-center justify-center overflow-hidden bg-ds-bg-primary-fade py-20 mt-10"
    >
      <h2 id="testimonials-heading" className="sr-only">
        What our customers say
      </h2>

      <TestimonialsMarquee>
        {testimonialsData.map((t) => (
          <TestimonialCard key={t.id} {...t} />
        ))}
      </TestimonialsMarquee>

      <ul className="flex w-full flex-wrap justify-center gap-y-20 px-4 pb-4 pt-16 motion-safe:sr-only">
        {testimonialsData.map((t) => (
          <li key={t.id}>
            <TestimonialCard {...t} />
          </li>
        ))}
      </ul>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-ds-bg-primary-fade sm:w-1/4 motion-reduce:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-ds-bg-primary-fade sm:w-1/4 motion-reduce:hidden"
      />
    </section>
  );
}
