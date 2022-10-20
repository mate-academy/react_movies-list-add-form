import { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieDescription, setNewMovieDescription] = useState('');
  const [newMovieImgUrl, setNewMovieImgUrl] = useState('');
  const [newMovieImdbUrl, setNewMovieImdbUrl] = useState('');
  const [newMovieImdbId, setNewMovieImdbId] = useState('');

  const isSubmitActive = newMovieTitle !== ''
    && newMovieImgUrl !== ''
    && newMovieImdbUrl !== ''
    && newMovieImdbId !== '';

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(prevCount => prevCount + 1);

    const newMovie: Movie = {
      title: newMovieTitle,
      description: newMovieDescription,
      imgUrl: newMovieImgUrl,
      imdbUrl: newMovieImdbUrl,
      imdbId: newMovieImdbId,
    };

    onAdd(newMovie);

    setNewMovieTitle('');
    setNewMovieDescription('');
    setNewMovieImgUrl('');
    setNewMovieImdbUrl('');
    setNewMovieImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => submitHandler(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovieTitle}
        onChange={(event) => {
          setNewMovieTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovieDescription}
        onChange={(event) => {
          setNewMovieDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovieImgUrl}
        onChange={(event) => {
          setNewMovieImgUrl(event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovieImdbUrl}
        onChange={(event) => {
          setNewMovieImdbUrl(event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovieImdbId}
        onChange={(event) => {
          setNewMovieImdbId(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isSubmitActive}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
