import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isStrFilled, isURLValid } from '../../utils';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const emptyMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(emptyMovie);
  const isFormValid
    = isStrFilled(movie.title.trim())
    && isURLValid(movie.imgUrl.trim())
    && isURLValid(movie.imdbUrl.trim())
    && isStrFilled(movie.imdbId.trim());

  const movieFildsValidator = (
    val: string,
    field: keyof Movie,
    validFn: (val: string) => boolean,
  ): boolean => {
    const trimedVal = val.trim();

    setMovie((prev) => ({ ...prev, [field]: trimedVal }));

    return validFn(trimedVal);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovie((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd({
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    setMovie(emptyMovie);

    setCount(prev => prev + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        required
        onChange={handleChange}
        validator={val => movieFildsValidator(val, 'title', isStrFilled)}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        required
        onChange={handleChange}
        validator={val => movieFildsValidator(val, 'imgUrl', isURLValid)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        required
        onChange={handleChange}
        validator={val => movieFildsValidator(val, 'imdbUrl', isURLValid)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        required
        onChange={handleChange}
        validator={val => movieFildsValidator(val, 'imdbId', isStrFilled)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
