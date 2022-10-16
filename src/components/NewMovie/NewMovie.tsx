// import { Settings } from 'http2';
// import { strict } from 'assert';
import { useState } from 'react';
// import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

// type Movie = {
//   title: string;
//   description: string;
//   imgUrl: string;
//   imdbUrl: string;
//   imdbId: string;
// };

type Props = {
  // onAdd?: ((movie: Movie) => {}) | undefined
  onAdd?: (() => {}),
  // movies: Movie[],
};

export const NewMovie: React.FC<Props> = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const inputFilled = title && description && imgUrl && imdbUrl && imdbId;
  // const [disabled, setDisabled] = useState(true);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!inputFilled) {
      return;
    }

    // onAdd(movie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        onChange={(value) => setDescription(value)}
        value={description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        onChange={(value) => setImgUrl(value)}
        value={imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        onChange={(value) => setImdbUrl(value)}
        value={imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        onChange={(value) => setImdbId(value)}
        value={imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {inputFilled
            ? (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
              >
                Add
              </button>
            )

            : (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
                disabled
              >
                Add
              </button>
            )}
        </div>
      </div>
    </form>
  );
};
