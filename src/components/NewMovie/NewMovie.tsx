import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  // const [count, setCount] = useState(0);

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [imgUrl, setImgUrl] = useState('');
  // const [imdbUrl, setImdbUrl] = useState('');
  // const [imdbId, setImdbId] = useState('');

  const [movieData, setMovieData] = useState({
    count: 0,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    count,
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movieData;

  const reset = () => {
    setMovieData((prevData) => ({
      ...prevData,
      count: prevData.count + 1,
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    reset();
  };

  const checkCorrect = !title.trim()
    || !imgUrl.trim()
    || !imdbUrl.trim()
    || !imdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAdd}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue) => setMovieData(
          {
            ...movieData,
            title: newValue,
          },
        )}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => setMovieData(
          {
            ...movieData,
            description: newValue,
          },
        )}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => setMovieData(
          {
            ...movieData,
            imgUrl: newValue,
          },
        )}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => setMovieData(
          {
            ...movieData,
            imdbUrl: newValue,
          },
        )}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => setMovieData(
          {
            ...movieData,
            imdbId: newValue,
          },
        )}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkCorrect}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
