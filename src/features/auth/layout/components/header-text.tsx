import { cn } from '@/shared/lib/utils';

export default function HeaderAuthText({
  textInfo,
  description,
}: {
  textInfo: string;
  description?: string;
}) {
  return (
    <>
      {/* Text Header */}
      <h1
        className={cn(
          description
            ? 'font-semibold text-2xl text-ds-text-plain mb-1'
            : 'text-center font-normal text-5xl text-ds-text-primary pb-4'
        )}
      >
        {textInfo}
      </h1>
      {description && (
        <p className="font-normal text-base text-ds-text-plain pb-4">{description}</p>
      )}
    </>
  );
}
