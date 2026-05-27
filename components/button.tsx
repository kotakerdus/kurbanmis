type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`border-ctp-text/20 hover:text-ctp-base hover:bg-accent cursor-pointer rounded-md border px-2 py-1 ${props.className}`}
    >
      {children}
    </button>
  );
}
