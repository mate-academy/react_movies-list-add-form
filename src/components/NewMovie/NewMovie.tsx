import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { getFormInputs } from '../../helpers/form';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = props => {
  const { onAdd } = props;

  const [formKey, setFormKey] = useState<number>(0);

  const [titleValue, setTitleValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [imgUrlValue, setImgUrlValue] = useState<string>('');
  const [imdbUrlValue, setImdbUrlValue] = useState<string>('');
  const [imdbIdValue, setImdbIdValue] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const newFilm: Movie = {
      title: titleValue.trim(),
      description: descriptionValue.trim(),
      imgUrl: imgUrlValue.trim(),
      imdbUrl: imdbUrlValue.trim(),
      imdbId: imdbIdValue.trim(),
    };

    onAdd(newFilm);

    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');

    setFormKey(prev => prev + 1);
  };

  const isFormValid =
    titleValue.trim() &&
    imgUrlValue.trim() &&
    imdbUrlValue.trim() &&
    imdbIdValue.trim();

  const formInputs = getFormInputs({
    titleValue,
    setTitleValue,
    descriptionValue,
    setDescriptionValue,
    imgUrlValue,
    setImgUrlValue,
    imdbUrlValue,
    setImdbUrlValue,
    imdbIdValue,
    setImdbIdValue,
  });

  return (
    <form
      className="NewMovie"
      key={formKey}
      onSubmit={(event: React.FormEvent<HTMLFormElement>): void =>
        handleSubmit(event)
      }
    >
      <h2 className="title">Add a movie</h2>
      {formInputs.map(item => {
        return (
          <TextField
            key={item.name}
            name={item.name}
            label={item.label}
            value={item.value}
            onChange={item.onChange}
            required={item.required}
          />
        );
      })}

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isFormValid}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
