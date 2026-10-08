import { Button } from '@/shared/components/ui/button';
import { MoveRight, Check } from 'lucide-react';
import About_1 from '@/assets/images/about/about-1.png';
import About_2 from '@/assets/images/about/about-2.png';
import About_3 from '@/assets/images/about/about-3.png';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FEATURE_KEYS = ['prices', 'quality', 'occasion', 'delivery'] as const;

const BLOB_LG = 'rounded-ss-[50px] rounded-se-[120px] rounded-bl-[120px] rounded-br-[120px]';
const BLOB_SM = 'rounded-ss-[50px] rounded-se-[100px] rounded-bl-[50px] rounded-br-[100px]';

export default function AboutSection() {
  // Translations
  const t = useTranslations('home-page.about');

  return (
    <section className="flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-20">
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
        <h2 className="mb-6 text-base font-bold tracking-[0.25em] text-ds-text-secondary">
          {t('title')}
        </h2>

        <h3 className="mb-2 text-3xl font-bold text-ds-text-primary">{t('subtitle')}</h3>

        <p className="text-base text-ds-text-soft">{t('description')}</p>

        <Button variant="primary" className="my-6 w-30 group">
          {t('discover')}
          <MoveRight className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
        </Button>

        <ul role="list" className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          {FEATURE_KEYS.map((key) => (
            <li key={key} className="flex items-center gap-2">
              <span className="flex size-10 items-center justify-center">
                <Check aria-hidden="true" className="size-5 shrink-0 text-ds-text-primary" />
              </span>
              <span className="text-sm text-ds-text-plain">{t(`features.${key}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
