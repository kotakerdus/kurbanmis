import { Card, CardProps } from '.';

type CardNumberProps = CardProps & {
  title: string;
  value: number;
  prefix?: string;
};

export function CardNumber({
  title,
  value,
  prefix,
  ...props
}: CardNumberProps) {
  return (
    <Card title={title} className={`justify-between ${props.className}`}>
      <div className='flex items-baseline gap-1'>
        <p className='text-5xl sm:text-6xl'>{value}</p>
        {prefix && <p className='sm:text-xl'>{prefix}</p>}
      </div>
    </Card>
  );
}
