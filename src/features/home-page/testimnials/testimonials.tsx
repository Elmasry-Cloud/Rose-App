import { Star } from 'lucide-react';
import Testimonial_1 from '@/assets/images/testimonials/testimonials-1.png';
import Testimonial_2 from '@/assets/images/testimonials/testimonials-2.png';
import Testimonial_3 from '@/assets/images/testimonials/testimonials-3.png';
import Image from 'next/image';
import { Marquee } from '@/shared/components/ui/marquee';

const testimonials = [
  {
    name: 'Jake Miller',
    date: 'January 12, 2025',
    text: "I've been ordering from this flower shop for years and they never disappoint. The quality and service are exceptional!",
    image: Testimonial_1,
  },
  {
    name: 'Tyler Brooks',
    date: 'January 12, 2025',
    text: "Customer service is top-notch and the flowers last longer than any others I've bought. Highly recommend!",
    image: Testimonial_2,
  },
  {
    name: 'Max Turner',
    date: 'January 12, 2025',
    text: 'The team truly cares about every order. I always feel confident when I buy flowers from here. The checkout process was sup...',
    image: Testimonial_3,
  },
];

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ name, date, text, image }: Testimonial) {
  return (
    <div className="relative mx-4 flex h-80 w-85 shrink-0 flex-col items-center justify-center gap-3 rounded-3xl bg-ds-bg-plain px-5 pb-5 pt-13.75 shadow-[0_0_10px_0_#741C211A]">
      {/* Image */}
      <Image
        src={image}
        alt={name}
        width={120}
        height={120}
        className="absolute -top-15 left-1/2 size-30 -translate-x-1/2 rounded-full object-cover"
      />

      {/* Name */}
      <h2 className="mt-2.5 text-base font-semibold text-ds-text-plain">{name}</h2>

      {/* Review */}
      <div className="py-6.25">
        <div className="mb-2.5 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`size-4 text-orange-500 ${i < 4 ? 'fill-orange-500' : ''}`} />
          ))}
        </div>

        {/* Text */}
        <p className="text-base font-medium text-ds-text-plain">{text}</p>
      </div>

      {/* Date */}
      <span className="text-sm font-medium text-ds-text-muted">{date}</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-ds-bg-primary-fade py-20">
      <Marquee pauseOnHover repeat={4} className="py-16 [--duration:30s] [--gap:0rem]">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </Marquee>

      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-ds-bg-primary-fade" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-ds-bg-primary-fade" />
    </section>
  );
}
