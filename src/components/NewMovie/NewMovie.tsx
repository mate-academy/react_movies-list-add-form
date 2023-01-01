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
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isImgUrlValid, setImgUrlValid] = useState(true);
  const [imdbUrl, setImdbUrl] = useState('');
  const [isImdbUrlValid, setImdbUrlValid] = useState(true);
  const [imdbId, setImdbId] = useState('');
  const isRequiredFieldsFilled = title !== ''
    && imgUrl !== ''
    && isImgUrlValid
    && imdbUrl !== ''
    && isImdbUrlValid
    && imdbId !== '';

  const handlerOnAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setCount(prevCount => prevCount + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlerOnAdd}
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
        needPatternValidation
        onPatternValidation={setImgUrlValid}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        needPatternValidation
        onPatternValidation={setImdbUrlValid}
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
            disabled={!isRequiredFieldsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
