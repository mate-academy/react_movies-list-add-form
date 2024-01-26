import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieCard, setMovieCard] = useState<Movie>(
    {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  );

  const hendleInputChange = (key: keyof Movie, newValue: string) => {
    setMovieCard(currentCard => ({
      ...currentCard,
      [key]: newValue,
    }));
  };

  const hendleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movieCard);
    setCount(count + 1);
    setMovieCard({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const hasError = !movieCard.title.trim()
    || !movieCard.imgUrl.trim()
    || !movieCard.imdbUrl.trim()
    || !movieCard.imdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={hendleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieCard.title}
        onChange={event => hendleInputChange('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieCard.description}
        onChange={event => hendleInputChange('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieCard.imgUrl}
        onChange={event => hendleInputChange('imgUrl', event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieCard.imdbUrl}
        onChange={event => hendleInputChange('imdbUrl', event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieCard.imdbId}
        required
        onChange={event => hendleInputChange('imdbId', event)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
