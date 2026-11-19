import Image from 'next/image';
import Gallery_1 from '@/assets/images/gallery/gallery-1.png';
import Gallery_2 from '@/assets/images/gallery/gallery-2.png';
import Gallery_3 from '@/assets/images/gallery/gallery-3.png';
import Gallery_4 from '@/assets/images/gallery/gallery-4.png';
import Gallery_5 from '@/assets/images/gallery/gallery-5.png';
import Gallery_6 from '@/assets/images/gallery/gallery-6.png';
import HeaderSection from '@/shared/components/header-section';
import { useTranslations } from 'next-intl';

const GALLERY_ITEMS = [
  { src: Gallery_1, alt: 'Describe gallery image 1' },
  { src: Gallery_2, alt: 'Describe gallery image 2' },
  { src: Gallery_3, alt: 'Describe gallery image 3' },
  { src: Gallery_4, alt: 'Describe gallery image 4' },
  { src: Gallery_5, alt: 'Describe gallery image 5' },
  { src: Gallery_6, alt: 'Describe gallery image 6' },
];

export default function GallerySection() {
  // Translations
  const t = useTranslations('home-page.gallery');

  return (
    <section aria-labelledby="gallery-heading" className="my-34.75">
      <HeaderSection sectionTitle={t('title')} sectionText={t('subtitle')} id="gallery-heading" />

      <ul role="list" className="parent mt-10">
        {GALLERY_ITEMS.map(({ src, alt }, index) => (
          <li key={index} className={`div${index + 1}`}>
            <Image src={src} alt={alt} sizes="27vw" className="h-full w-full object-cover" />
          </li>
        ))}
      </ul>
    </section>
  );
}
