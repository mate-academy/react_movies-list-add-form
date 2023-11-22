import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { validUrlPattern } from '../../vars/vars';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const formReset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    formReset();

    setCount((pervCount) => pervCount + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlerSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue) => setTitle(newValue)}
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
        onChange={(newValue) => setImgUrl(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => setImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => setImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !(title
                && imgUrl
                && imdbUrl
                && validUrlPattern.test(imgUrl)
                && validUrlPattern.test(imdbUrl)
                && imdbId
              )
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
