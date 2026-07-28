import HeaderImage from '@/assets/images/auth/separator-light.png';
import Image from 'next/image';

export default function HeaderAuthImage() {
  return (
    <div>
      <Image className="w-70 h-11.25" src={HeaderImage} alt="header-image" />
    </div>
  );
}

export function FooterAuthImage() {
  return (
    <div>
      <Image className="w-70 h-11.25 rotate-180" src={HeaderImage} alt="header-image" />
    </div>
  );
}
