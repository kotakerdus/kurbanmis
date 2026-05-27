type ChartProgressProps = {
  title: string;
  value: number;
  total: number;
  counter?: { enable: boolean; suffix: string };
};

export function ChartProgress({
  title,
  value,
  total,
  counter = { enable: true, suffix: '' },
}: ChartProgressProps) {
  const percentage = ((value / total) * 100).toFixed(0);

  return (
    <div className='flex flex-col'>
      {title && <h6 className='text-md'>{title}</h6>}
      <div className='mt-1 mb-2 flex items-center gap-4'>
        <div className='relative flex-1'>
          <div
            className='bg-ctp-surface1 grid h-2 overflow-hidden rounded-full lg:h-4'
            style={{
              gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`,
            }}
          >
            {value > 0 && (
              <div
                className='bg-accent rounded-l-full'
                style={{ gridColumn: `span ${value} / span ${value}` }}
              />
            )}
          </div>

          <div
            className='pointer-events-none absolute inset-0 grid'
            style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: total }).map((_, index) => {
              const isEdge = index === 0 || index === total;
              if (isEdge) return null;
              return (
                <div key={index} className='relative'>
                  <div className='bg-background absolute top-0 right-0 h-full w-0.5 lg:w-1' />
                </div>
              );
            })}
          </div>
        </div>

        {counter.enable && (
          <span className='font-sans text-sm'>
            {`${value} / ${total} ${counter.suffix} (${percentage}%)`}
          </span>
        )}
      </div>
    </div>
  );
}
