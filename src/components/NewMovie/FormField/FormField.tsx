import { HtmlPropsForMovieForm } from '../../../types/types';

type Props = {
  fieldProps: (extraClass?: (string | null)) => HtmlPropsForMovieForm;
  hasFieldError: boolean;
};

export const FormField: React.FC<Props> = ({ fieldProps, hasFieldError }) => {
  const { name } = fieldProps();

  return (
    <label className="form__item" htmlFor={name}>
      <span className="form__title">{name}</span>

      {name === 'description' ? (
        <textarea
          {...fieldProps('form__field--textarea')}
        />
      ) : (
        <input
          {...fieldProps()}
          type="text"
        />
      )}

      {hasFieldError && (
        <span className="form__warning">Incorrect URL</span>
      )}
    </label>
  );
};
