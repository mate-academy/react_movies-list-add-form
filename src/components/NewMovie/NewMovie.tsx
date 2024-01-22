import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  let count = 0;

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((prevMovie: Movie) => ({
      ...prevMovie,
      [name]: value,
    }));

    const trimmedTitle = name === 'title' ? value.trim() : title.trim();
    const trimmedImgUrl = name === 'imgUrl' ? value.trim() : imgUrl.trim();
    const trimmedImdbUrl = name === 'imdbUrl' ? value.trim() : imdbUrl.trim();
    const trimmedImdbId = name === 'imdbId' ? value.trim() : imdbId.trim();

    setSubmitDisabled(
      !trimmedTitle || !trimmedImgUrl || !trimmedImdbUrl || !trimmedImdbId,
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setSubmitDisabled(true);
    count += 1;
  };

  return (
    <form key={count} className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        required
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        required
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
      />

      <TextField
        required
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
      />

      <TextField
        required
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
