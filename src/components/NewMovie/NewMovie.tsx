import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isButtonDisabled = !(
    title.trim()
    && imdbId.trim()
    && imdbUrl.trim()
    && imgUrl.trim()
  );

  const handleSubmit = () => {
    setCount(state => state + 1);
    setTitle('');
    setDescription('');
    setImdbUrl('');
    setImgUrl('');
    setImdbId('');
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={() => handleSubmit()}
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
          {
            isButtonDisabled
              ? (
                <button
                  type="submit"
                  data-cy="submit-button"
                  className="button is-link"
                  disabled
                >
                  Add
                </button>
              )
              : (
                <button
                  type="submit"
                  data-cy="submit-button"
                  className="button is-link"
                >
                  Add
                </button>
              )
          }
        </div>
      </div>
    </form>
  );
};
