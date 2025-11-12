interface Props {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: boolean;
}

export const TextField: React.FC<Props> = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  required = false,
  error = false,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>
        {label}
      </label>

      <div className="control">
        <input
          id={name}
          data-cy={`movie-${name}`}
          className={`input ${error ? 'is-danger' : ''}`}
          type="text"
          placeholder={`Enter ${label.toLowerCase()}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      </div>

      {error && (
        <p className="help is-danger" data-cy="error">
          {required ? 'This field is required' : 'Please enter a valid URL'}
        </p>
      )}
    </div>
  );
};
