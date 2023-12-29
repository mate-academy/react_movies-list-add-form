import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onSubmit: (post: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [switchButton, setSwitchButton] = useState(true);

  const handleInputChange = () => {
    if (title && imgUrl && imdbUrl && imdbId) {
      setSwitchButton(false);
      title.trim();
      description.trim();
      imgUrl.trim();
      imdbUrl.trim();
      imdbId.trim();
    } else {
      setSwitchButton(true);
    }
  };

  const handleBlur = () => {
    if (!title || !imgUrl || !imdbUrl || !imdbId || !description) {
      setSwitchButton(true);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);
  };

  useEffect(() => {
    if (count > 0) {
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  }, [count]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue) => {
          setTitle(newValue);
          handleInputChange();
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => {
          setImgUrl(newValue);
          handleInputChange();
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => {
          setImdbUrl(newValue);
          handleInputChange();
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => {
          setImdbId(newValue);
          handleInputChange();
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={switchButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
