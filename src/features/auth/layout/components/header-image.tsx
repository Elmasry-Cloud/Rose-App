import Image from 'next/image';
import HeaderImage from '@/assets/images/auth/separator-light.png';

const separatorClass = 'h-11.25 w-70 hue-rotate-[150deg] saturate-75';

export default function HeaderAuthImage() {
  return (
    <div>
      <Image className={separatorClass} src={HeaderImage} alt="" aria-hidden="true" />
    </div>
  );
}

export function FooterAuthImage() {
  return (
    <div>
      <Image
        className={`${separatorClass} rotate-180`}
        src={HeaderImage}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
