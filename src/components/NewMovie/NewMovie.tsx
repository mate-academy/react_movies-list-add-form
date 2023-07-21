import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

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
  const [validImg, setValidImg] = useState(true);
  const [validImdb, setValidImdb] = useState(true);

  function handleTextField(setText: (value: string) => void) {
    const handleText = (value: string) => {
      setText(value);
    };

    return handleText;
  }

  const isDiabled = () => {
    if (title && imgUrl && imdbUrl && imdbId && validImg === true
      && validImdb === true) {
      return false;
    }

    return true;
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

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setValidImg(true);
    setValidImdb(true);
    setCount((countPrev) => countPrev + 1);
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
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField(setTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField(setDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField(setImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField(setImdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField(setImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDiabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
