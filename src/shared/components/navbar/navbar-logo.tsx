import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';

export default function NavbarLogo() {
  return (
    <Link href="/" className="logo w-20 h-20 order-1">
      <Image
        src={Logo}
        alt="Rose App – Home"
        width={85}
        height={85}
        priority
        className="object-cover hue-rotate-150 saturate-75"
      />
    </Link>
  );
}
