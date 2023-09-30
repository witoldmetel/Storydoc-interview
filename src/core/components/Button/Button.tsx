import { clsx } from 'clsx';

import './Button.scss';

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;

  onClick: VoidFunction;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className = '', onClick, ...rest }: ButtonProps) => {
  return (
    <button className={clsx('button', className)} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
