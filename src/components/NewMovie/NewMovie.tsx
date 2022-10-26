import { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { pattern } from './ComponentStaticPattern.variable';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [formValid, setFormValid] = useState(false);

  const resetInputs = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount(currentCount => (
      currentCount + 1
    ));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    resetInputs();
  };

  useEffect(() => {
    setFormValid(
      Boolean(title.trim()
      && pattern.test(imgUrl.trim())
      && pattern.test(imdbUrl.trim())
      && imdbId.trim()),
    );
  }, [title, imgUrl, imdbUrl, imdbId]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={e => handleSubmit(e)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
