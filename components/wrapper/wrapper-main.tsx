type MainWrapperProps = React.PropsWithChildren;
export default function WrapperMain({ children }: MainWrapperProps) {
  return (
    <div className='card-layout-gap card-layout-padding flex h-full w-full flex-col overflow-auto'>
      {children}
    </div>
  );
}
