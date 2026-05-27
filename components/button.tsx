type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};
export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`border-ctp-surface1 hover:text-ctp-base disabled:text-ctp-overlay0 not-disabled:hover:bg-accent disabled:hover:bg-ctp-base cursor-pointer rounded-md border px-4 py-1 disabled:border-dashed ${props.className}`}
    >
      {children}
    </button>
  );
}
