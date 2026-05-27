type CardWrapperProps = React.PropsWithChildren & { className?: string };

export function WrapperCard({ children, className }: CardWrapperProps) {
  return <div className={`card-layout-gap ${className}`}>{children}</div>;
}
