import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  const disabledButton = [title, imgUrl, imdbUrl, imdbId]
    .some(element => element.trim() === '');

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={setImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={setImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
