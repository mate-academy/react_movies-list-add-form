import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

//import moviesFromServer from '../../api/movies.json';
type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [touched, setTouched] = useState(false);
  const hasError: boolean = !title || !imgUrl || !imdbUrl || !imdbId;
  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
        touched={touched}
        setTouched={setTouched}
        hasError={hasError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        touched={touched}
        setTouched={setTouched}
        hasError={hasError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        touched={touched}
        setTouched={setTouched}
        hasError={hasError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        touched={touched}
        setTouched={setTouched}
        hasError={hasError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
        touched={touched}
        setTouched={setTouched}
        hasError={hasError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={() => {
              const movie = {
                title,
                description,
                imgUrl,
                imdbUrl,
                imdbId,
              };

              onAdd(movie);
              reset();
            }}
            disabled={hasError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
