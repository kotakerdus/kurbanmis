type ButtonProps = React.HtmlHTMLAttributes<HTMLButtonElement>;

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`border-ctp-text/20 hover:text-ctp-base hover:bg-accent cursor-pointer rounded-md border px-2 py-1 ${className}`}
    >
      {children}
    </button>
  );
}
