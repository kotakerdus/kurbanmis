type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`border-ctp-text/20 hover:text-ctp-base disabled:text-ctp-text/80 not-disabled:hover:bg-accent disabled:hover:bg-ctp-base w-full cursor-pointer rounded-md border px-2 py-1 disabled:border-dashed ${props.className}`}
    >
      {children}
    </button>
  );
}
