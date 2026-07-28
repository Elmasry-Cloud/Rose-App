export default function HeaderAuthText({ textInfo }: { textInfo: string }) {
  return (
    <>
      {/* Text Header */}
      <h1 className="text-center font-normal text-5xl text-ds-text-primary pb-4">{textInfo}</h1>
    </>
  );
}
