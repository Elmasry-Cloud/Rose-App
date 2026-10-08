export default function HeaderSection({
  sectionTitle,
  sectionText,
  id,
  style,
}: {
  sectionTitle?: string;
  sectionText?: string;
  id?: string;
  style?: string;
}) {
  return (
    <div id={id} className="flex flex-col sm:items-center justify-center gap-2">
      {sectionTitle && (
        <h2 className="font-bold w-fit text-base text-ds-text-secondary uppercase tracking-[25%]">
          {sectionTitle}
        </h2>
      )}
      {sectionText && (
        <p
          className={`header-description w-fit relative font-bold text-ds-text-primary ${style ? style : 'text-2xl md:text-4xl'}`}
        >
          {sectionText}
        </p>
      )}
    </div>
  );
}
