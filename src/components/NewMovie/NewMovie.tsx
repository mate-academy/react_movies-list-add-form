import { useState } from 'react';
import { TextField } from '../TextField';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isImgValid, setIsImgValid] = useState(false);
  const [isImdbValid, setIsImdbValid] = useState(false);

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isImgValid || !isImdbValid) {
      return;
    }

    if (!isFormValid) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setCount(prev => prev + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setIsImgValid(false);
    setIsImdbValid(false);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue: string) => {
          setTitle(newValue);
        }}
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
        onValidation={setIsImgValid}
        isValid={isImgValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue: string) => {
          setImdbUrl(newValue);
        }}
        onValidation={setIsImdbValid}
        isValid={isImdbValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue: string) => {
          setImdbId(newValue);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid || !isImgValid || !isImdbValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
