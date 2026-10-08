import Image from 'next/image';
import Company_1 from '@/assets/images/Companies/companie-1.png';
import Company_2 from '@/assets/images/Companies/companie-2.png';
import Company_3 from '@/assets/images/Companies/companie-3.png';
import Company_4 from '@/assets/images/Companies/companie-4.png';
import Company_5 from '@/assets/images/Companies/companie-5.png';
import Company_6 from '@/assets/images/Companies/companie-6.png';
import { useTranslations } from 'next-intl';

const companies = [
  { name: 'Company 1', logo: Company_1 },
  { name: 'Company 2', logo: Company_2 },
  { name: 'Company 3', logo: Company_3 },
  { name: 'Company 4', logo: Company_4 },
  { name: 'Company 5', logo: Company_5 },
  { name: 'Company 6', logo: Company_6 },
];

export default function CompaniesSection() {
  // Translation
  const t = useTranslations('home-page.companies');

  return (
    <section
      aria-labelledby="companies-title"
      className="w-11/12 mx-auto mt-35 mb-85 py-10 px-6 rounded-2xl bg-ds-bg-primary-fade flex flex-col gap-10 items-center justify-center text-center"
    >
      <h2 id="companies-title" className="font-bold text-2xl sm:text-4xl">
        {t.rich('title', {
          highlight: (chunks) => <span className="text-ds-text-secondary">{chunks}</span>,
        })}
      </h2>

      <ul className="flex flex-wrap items-center justify-center gap-10">
        {companies.map((company) => (
          <li key={company.name}>
            <Image
              src={company.logo}
              alt={company.name}
              width={146}
              height={51}
              className="h-auto w-auto max-h-12.75 object-contain"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
