export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* Image */}
      <div className="h-68 rounded-xl bg-gray-200" />

      {/* Content */}
      <div className="flex flex-col gap-3">
        {/* Title (2 lines) */}
        <div className="min-h-14 flex flex-col gap-2">
          <div className="h-5 w-full rounded bg-gray-200" />
          <div className="h-5 w-2/3 rounded bg-gray-200" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            {/* Stars */}
            <div className="h-4 w-24 rounded bg-gray-200" />
            {/* Price */}
            <div className="h-5 w-28 rounded bg-gray-200" />
          </div>

          {/* Cart button */}
          <div className="w-10.5 h-10.5 shrink-0 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
