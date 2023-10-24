import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../patterns/Pattern';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [incorrectimgUrl, setIncorrectimgUrl] = useState('');
  const [incorrectimdbUrl, setIncorrectimdbUrl] = useState('');

  const hasDisabled = !title || !imgUrl || !imdbUrl || !imdbId;

  const reset = () => {
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setImdbId('');

    setIncorrectimgUrl('');
    setIncorrectimdbUrl('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!pattern.test(imgUrl) && !pattern.test(imdbUrl)) {
      setIncorrectimgUrl('Error');
      setIncorrectimdbUrl('Error');

      return;
    }

    if (!pattern.test(imgUrl)) {
      setIncorrectimgUrl('Error');

      return;
    }

    if (!pattern.test(imdbUrl)) {
      setIncorrectimdbUrl('Error');

      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);

    reset();
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
        value={title}
        onChange={(newValue) => {
          setTitle(newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => {
          setDescription(newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => {
          setimgUrl(newValue);
          setIncorrectimgUrl('');
        }}
        required
        incorrectimgUrl={incorrectimgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => {
          setimdbUrl(newValue);
          setIncorrectimdbUrl('');
        }}
        required
        incorrectimdbUrl={incorrectimdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => {
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
            disabled={hasDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
