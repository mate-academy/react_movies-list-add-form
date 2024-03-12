import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import { event } from 'cypress/types/jquery';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);
  const [imgUrlTouched, setImgUrlTouched] = useState(false);
  const [imdbUrlTouched, setImdbUrlTouched] = useState(false);
  const [imdbIdTouched, setImdbIdTouched] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setTitleTouched(false);
    setImgUrlTouched(false);
    setImdbUrlTouched(false);
    setImdbIdTouched(false);
    setCount(c => c + 1);
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

    reset();
  };

  const isFormValid = () => {
    return title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue: string) => {
          setTitle(newValue);
        }}
        touched={titleTouched}
        setTouched={setTitleTouched}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue: string) => {
          setDescription(newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue: string) => {
          setImgUrl(newValue);
        }}
        touched={imgUrlTouched}
        setTouched={setImgUrlTouched}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue: string) => {
          setImdbUrl(newValue);
        }}
        touched={imdbUrlTouched}
        setTouched={setImdbUrlTouched}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue: string) => {
          setImdbId(newValue);
        }}
        touched={imdbIdTouched}
        setTouched={setImdbIdTouched}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
