import { FC, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setIncrementCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdGetUrlValidation, setImdGetUrlValidation] = useState(false);
  const [imgValidation, setImgValidation] = useState(false);

  const addNewFilm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie: Movie = {
      title,
      description,
      imgUrl: img,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setTitle('');
    setDescription('');
    setImg('');
    setImdbUrl('');
    setImdbId('');
    setIncrementCount((prevcount) => prevcount + 1);
  };

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const handleImdGetUrlChange = (value: string) => {
    setImdbUrl(value);
    setImdGetUrlValidation(pattern.test(value));
  };

  const handleImgGetUrlChange = (value: string) => {
    setImg(value);
    setImgValidation(pattern.test(value));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addNewFilm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={img}
        onChange={handleImgGetUrlChange}
        pattern={pattern.source}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdGetUrlChange}
        pattern={pattern.source}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title
              || !img
              || !imdbUrl
              || !setImdbId
              || imdGetUrlValidation
              || imgValidation
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
