import Image from 'next/image';
import { Star } from 'lucide-react';
import { ITestimonial } from './testimonial-data';

const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

export function TestimonialCard({ name, isoDate, rating, text, image }: ITestimonial) {
  return (
    <figure className="relative mx-4 flex min-h-80 w-85 shrink-0 flex-col items-center justify-center gap-3 rounded-3xl bg-ds-bg-plain px-5 pb-5 pt-13.75 shadow-[0_0_10px_0_#741C211A]">
      <Image
        src={image}
        alt=""
        width={120}
        height={120}
        className="absolute -top-15 left-1/2 size-30 -translate-x-1/2 rounded-full object-cover"
      />

      <figcaption className="mt-2.5 text-base font-semibold text-ds-text-plain">{name}</figcaption>

      <div className="py-6.25">
        <div
          role="img"
          aria-label={`Rated ${rating} out of 5 stars`}
          className="mb-2.5 flex items-center justify-center gap-1"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={`size-4 text-orange-600 ${i < rating ? 'fill-orange-600' : ''}`}
            />
          ))}
        </div>

        <blockquote>
          <p className="text-base font-medium text-ds-text-plain">{text}</p>
        </blockquote>
      </div>

      <time dateTime={isoDate} className="text-sm font-medium text-ds-text-muted">
        {dateFormatter.format(new Date(isoDate))}
      </time>
    </figure>
  );
}
