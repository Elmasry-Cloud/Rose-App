export default function HeaderSection({
  sectionTitle,
  sectionText,
}: {
  sectionTitle: string;
  sectionText: string;
}) {
  return (
    <header className="flex flex-col sm:items-center justify-center gap-2 mb-11.25 w-4/5 mx-auto">
      <h2 className="font-bold text-base text-ds-text-secondary uppercase tracking-[25%]">
        {sectionTitle}
      </h2>
      <p className="header-description relative font-bold text-4xl text-ds-text-primary">
        {sectionText}
      </p>
    </header>
  );
}
