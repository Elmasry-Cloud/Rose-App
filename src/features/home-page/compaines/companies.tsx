import Image from 'next/image';
import Company_1 from '@/assets/images/Companies/Companie-1.png';
import Company_2 from '@/assets/images/Companies/Companie-2.png';
import Company_3 from '@/assets/images/Companies/Companie-3.png';
import Company_4 from '@/assets/images/Companies/Companie-4.png';
import Company_5 from '@/assets/images/Companies/Companie-5.png';
import Company_6 from '@/assets/images/Companies/Companie-6.png';

const companies = [
  { name: 'Company 1', logo: Company_1 },
  { name: 'Company 2', logo: Company_2 },
  { name: 'Company 3', logo: Company_3 },
  { name: 'Company 4', logo: Company_4 },
  { name: 'Company 5', logo: Company_5 },
  { name: 'Company 6', logo: Company_6 },
];

export default function Companies() {
  return (
    <section className="mt-35 mb-85 w-4/5 mx-auto py-10 px-6 rounded-2xl bg-ds-bg-primary-fade flex flex-col gap-10 items-center justify-center text-center">
      <h3 className="font-bold text-2xl sm:text-4xl">
        Trusted by over <span className="text-ds-text-secondary">4.5k+</span> companies
      </h3>

      <div className="images flex flex-wrap items-center justify-center gap-10">
        {companies.map((company) => (
          <Image key={company.name} src={company.logo} alt={company.name} width={146} height={51} />
        ))}
      </div>
    </section>
  );
}
