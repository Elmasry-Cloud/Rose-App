import { Button } from '@/shared/components/ui/button';
import { MoveRight, Check } from 'lucide-react';
import About_1 from '@/assets/images/about/about-1.png';
import About_2 from '@/assets/images/about/about-2.png';
import About_3 from '@/assets/images/about/about-3.png';
import Image from 'next/image';

const FEATURES = [
  'Competitive Prices & Easy Shopping',
  'Premium Quality & Elegant Packaging',
  'Perfect for Every Occasion',
  'Fast & Reliable Delivery',
];

const BLOB_LG = 'rounded-ss-[50px] rounded-se-[120px] rounded-bl-[120px] rounded-br-[120px]';
const BLOB_SM = 'rounded-ss-[50px] rounded-se-[100px] rounded-bl-[50px] rounded-br-[100px]';

export default function AboutSection() {
  return (
    <section className="mx-auto flex w-4/5 flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-20">
      {/* Image Section */}
      <div className="flex gap-4 lg:flex-1">
        {/* Big image + frame */}
        <div className="relative flex-3">
          <span
            aria-hidden="true"
            className={`absolute inset-0 -translate-x-4 -translate-y-2 rotate-3 border-4 border-ds-text-primary rtl:translate-x-4 rtl:-rotate-3 ${BLOB_LG}`}
          />
          <div className={`relative h-full overflow-hidden ${BLOB_LG}`}>
            <Image
              src={About_1}
              alt="Hand pulling the ribbon of a purple gift box"
              sizes="(min-width: 1024px) 16vw, 50vw"
              placeholder="blur"
              className="size-full object-cover"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-2 flex-col gap-4">
          <div className="aspect-square overflow-hidden rounded-full">
            <Image
              src={About_2}
              alt="Wrapped gift with orange ribbon and confetti"
              sizes="(min-width: 1024px) 11vw, 35vw"
              placeholder="blur"
              className="size-full object-cover"
            />
          </div>

          <div className={`aspect-square overflow-hidden ${BLOB_SM}`}>
            <Image
              src={About_3}
              alt="Balloons lifting a small gift box above a gift card"
              sizes="(min-width: 1024px) 11vw, 35vw"
              placeholder="blur"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="lg:flex-2">
        <h2 className="mb-6 text-base font-bold tracking-[0.25em] text-ds-text-secondary">About</h2>

        <h3 className="mb-2 text-3xl font-bold text-ds-text-primary">
          Delivering the <span className="text-ds-text-secondary">Finest</span> Gift Boxes for Your{' '}
          <span className="text-ds-text-secondary">Special</span> Moments
        </h3>

        <p className="text-base text-ds-text-soft">
          Make every moment memorable with our premium gift boxes. Carefully curated and beautifully
          packaged, each box is filled with handpicked items designed to impress. Whether it&apos;s
          for a birthday, wedding, or a simple &ldquo;thank you,&rdquo; our gift boxes are crafted
          to leave a lasting impression &mdash; because thoughtful gifting starts here.
        </p>

        <Button variant="primary" className="my-6 w-30">
          Discover
          <MoveRight className="rtl:rotate-180" />
        </Button>

        <ul role="list" className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="flex size-10 items-center justify-center">
                <Check aria-hidden="true" className="size-5 shrink-0 text-ds-text-primary" />
              </span>
              <span className="text-sm text-ds-text-plain">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
