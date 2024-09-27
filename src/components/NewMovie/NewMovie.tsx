import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [imgUrl, setImgUrl] = useState('');
  // const [imdbUrl, setImdbUrl] = useState('');
  // const [imdbId, setImdbId] = useState('');
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const { title, description, imgUrl, imdbUrl, imdbId } = movie;

  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(c => c + 1);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            title: newValue,
          }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            description: newValue,
          }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            imgUrl: newValue,
          }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            imdbUrl: newValue,
          }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => {
          setMovie(prevMovie => ({
            ...prevMovie,
            imdbId: newValue,
          }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title.trim() ||
              !imgUrl.trim() ||
              !imdbUrl.trim() ||
              !imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
