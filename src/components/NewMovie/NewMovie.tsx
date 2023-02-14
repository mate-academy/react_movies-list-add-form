import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [inputId, setInputId] = useState('');

  const isValid = inputTitle && inputImage && inputUrl && inputId;

  const resetFields = () => {
    setInputTitle('');
    setInputDescription('');
    setInputImage('');
    setInputUrl('');
    setInputId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const movie = {
      title: inputTitle,
      description: inputDescription,
      imgUrl: inputImage,
      imdbUrl: inputUrl,
      imdbId: inputId,
    };

    event.preventDefault();
    onAdd(movie);
    setCount(currCount => currCount + 1);
    resetFields();
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
        value={inputTitle}
        onChange={setInputTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputDescription}
        onChange={setInputDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputImage}
        onChange={setInputImage}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputUrl}
        onChange={setInputUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputId}
        onChange={setInputId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
