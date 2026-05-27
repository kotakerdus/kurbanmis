type CardWrapperProps = React.PropsWithChildren & { className?: string };

export default function WrapperCard({ children, className }: CardWrapperProps) {
  return <div className={`card-layout-gap ${className}`}>{children}</div>;
}
