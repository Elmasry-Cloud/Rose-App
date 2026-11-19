import type { StaticImageData } from 'next/image';
import Testimonial_1 from '@/assets/images/testimonials/testimonials-1.png';
import Testimonial_2 from '@/assets/images/testimonials/testimonials-2.png';
import Testimonial_3 from '@/assets/images/testimonials/testimonials-3.png';

export interface ITestimonial {
  id: string;
  name: string;
  /** ISO 8601 date (YYYY-MM-DD) */
  isoDate: string;
  /** 0-5 */
  rating: number;
  text: string;
  image: StaticImageData;
}

export const testimonialsData: ITestimonial[] = [
  {
    id: 'jake-miller',
    name: 'Jake Miller',
    isoDate: '2025-01-12',
    rating: 4,
    text: "I've been ordering from this flower shop for years and they never disappoint. The quality and service are exceptional!",
    image: Testimonial_1,
  },
  {
    id: 'tyler-brooks',
    name: 'Tyler Brooks',
    isoDate: '2025-01-12',
    rating: 4,
    text: "Customer service is top-notch and the flowers last longer than any others I've bought. Highly recommend!",
    image: Testimonial_2,
  },
  {
    id: 'max-turner',
    name: 'Max Turner',
    isoDate: '2025-01-12',
    rating: 4,
    text: 'The team truly cares about every order. I always feel confident when I buy flowers from here.',
    image: Testimonial_3,
  },
];
