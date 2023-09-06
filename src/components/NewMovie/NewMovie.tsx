import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [movie, setMovie] = useState({
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  });

  const onClickHandler = () => (
    setMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    })
  );

  const onChangeHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(count + 1);
    onAdd(movie);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const fieldsFilled = (
    title.length === 0
    || imgUrl.length === 0
    || imdbUrl.length === 0
    || imdbId.length === 0
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => onChangeHandler(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => {
          setTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => {
          setDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={(event) => {
          setImgUrl(event);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={(event) => {
          setImdbUrl(event);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(event) => {
          setImdbId(event);
        }}
      />

      <div className="field is-grouped">
        <div className="control">

          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={fieldsFilled}
            onClick={onClickHandler}
          >
            Add
          </button>

        </div>
      </div>
    </form>
  );
};
