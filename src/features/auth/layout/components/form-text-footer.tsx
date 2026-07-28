import { Link } from '@/i18n/navigation';

interface IProps {
  text: string;
  link: string;
  href: string;
}

export default function FormTextFooter({ text, link, href }: IProps) {
  return (
    <p className="flex items-center justify-center gap-1 font-medium text-sm pt-5">
      {text}
      <Link href={href} className="font-bold text-ds-text-primary">
        {link}
      </Link>
    </p>
  );
}
