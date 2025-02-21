import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { getFormInputs } from '../../helpers/form';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState<number>(0);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const resetFormFields = (): void => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const newFilm: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newFilm);
    resetFormFields();
    setFormKey(prev => prev + 1);
  };

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const formInputs = getFormInputs({
    title,
    setTitle,
    description,
    setDescription,
    imgUrl,
    setImgUrl,
    imdbUrl,
    setImdbUrl,
    imdbId,
    setImdbId,
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
