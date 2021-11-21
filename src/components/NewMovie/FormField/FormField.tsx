import { HtmlPropsForMovieForm } from '../../../types/types';

type Props = {
  fieldProps: (extraClass?: string) => HtmlPropsForMovieForm;
  hasFieldError: boolean;
};

export const FormField: React.FC<Props> = ({ fieldProps, hasFieldError }) => {
  const { name } = fieldProps();
  let field;

  switch (name) {
    case 'description':
      field = <textarea {...fieldProps('form__field--textarea')} />;
      break;
    default:
      field = <input {...fieldProps()} type="text" />;
      break;
  }

  return (
    <label className="form__item" htmlFor={name}>
      <span className="form__title">{name}</span>

      {field}

      {hasFieldError && (
        <span className="form__warning">Incorrect URL</span>
      )}
    </label>
  );
};
