import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = props => {
  const { onAdd } = props;
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  // const [count] = useState<number>(0);
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

    // setMovies((prev: Movie[]):Movie[] => [...prev, newFilm]);
    onAdd(newFilm);

    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');

    // form refresh
    setFormKey(prev => prev + 1);
  };

  // check validation
  const isFormValid =
    titleValue.trim() &&
    imgUrlValue.trim() &&
    imdbUrlValue.trim() &&
    imdbIdValue.trim();

  return (
    <form
      className="NewMovie"
      key={formKey}
      onSubmit={(event: React.FormEvent<HTMLFormElement>): void =>
        handleSubmit(event)
      }
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={setTitleValue}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={setDescriptionValue}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={setImgUrlValue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={setImdbUrlValue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={setImdbIdValue}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            // disabled={
            //   !titleValue && !imgUrlValue && !imdbUrlValue && !imdbIdValue
            // }
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
