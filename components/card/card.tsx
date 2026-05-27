export type CardProps = React.PropsWithChildren & {
  title?: string;
  coverNode?: React.ReactNode;
  className?: string;
};

export function Card({ title, coverNode, className, children }: CardProps) {
  const flexOpt = 'flex flex-col';

  return (
    <div
      className={`card-border border-ctp-text/20 overflow-clip border font-sans select-none ${coverNode ? flexOpt : ''} ${className}`}
    >
      {coverNode}
      <div
        className={`w-full gap-2 px-3 pb-3 sm:px-4 sm:pb-4 ${!coverNode ? 'pt-3 sm:pt-4' : 'pt-3 sm:pt-4'} ${flexOpt}`}
      >
        {title && (
          <h2 className={`card-title ${children ? 'mb-4' : ''}`}>{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
