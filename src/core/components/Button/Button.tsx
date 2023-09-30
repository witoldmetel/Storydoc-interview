import './Button.scss';

type ButtonProps = {
  children?: React.ReactNode;

  onClick: VoidFunction;
};

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
