import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type MovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: MovieProps) => {
  const [count, setCount] = useState(0);

  const [titleAvailable, setTitleAvailable] = useState('');
  const [descriptionAvailable, setDescriptionAvailable] = useState('');
  const [imageUrlAvailable, setImageUrlAvailable] = useState('');
  const [imdbUrlAvailable, setImdbUrlAvailable] = useState('');
  const [imdbIdAvailable, setImdbIdAvailable] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (
      titleAvailable.trim() &&
      imageUrlAvailable.trim() &&
      imdbIdAvailable.trim() &&
      imdbUrlAvailable.trim()
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [imageUrlAvailable, imdbIdAvailable, imdbUrlAvailable, titleAvailable]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();

        const movie = {
          title: titleAvailable,
          description: descriptionAvailable,
          imgUrl: imageUrlAvailable,
          imdbUrl: imdbUrlAvailable,
          imdbId: imdbIdAvailable,
        };

        onAdd(movie);

        setTitleAvailable('');
        setDescriptionAvailable('');
        setImageUrlAvailable('');
        setImdbUrlAvailable('');
        setImdbIdAvailable('');
        setIsDisabled(true);

        setCount(prev => prev + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleAvailable}
        onChange={event => {
          setTitleAvailable(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionAvailable}
        onChange={event => {
          setDescriptionAvailable(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrlAvailable}
        onChange={event => {
          setImageUrlAvailable(event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlAvailable}
        onChange={event => {
          setImdbUrlAvailable(event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdAvailable}
        onChange={event => {
          setImdbIdAvailable(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
