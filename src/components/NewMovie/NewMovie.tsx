import { useState } from 'react';
import { TextField } from '../TextField';
import moviesFromServer from '../../api/movies.json';

export const movie = [...moviesFromServer];

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const cleanFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const areFieldsFilled = () => {
    return Boolean(title) && Boolean(imgUrl)
    && Boolean(imdbUrl) && Boolean(imdbId);
  };

  const addNewFilm = () => {
    const newFilm = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    movie.push(newFilm);
    cleanFields();

    return movie;
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => {
          setImgUrl(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setImdbUrl(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => {
          setImdbId(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!areFieldsFilled()}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(event) => {
              addNewFilm();
              event.preventDefault();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
