import './Checkbox.scss';

type CheckboxProps = {
  checked: boolean;

  onChange: () => void;
};

export const Checkbox = ({ checked, onChange }: CheckboxProps) => (
  <div className="checkbox-container">
    <input type="checkbox" className="checkbox" checked={checked} onChange={onChange} />
  </div>
);
