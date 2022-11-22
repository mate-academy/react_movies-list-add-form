import { BaseSyntheticEvent, useState, FC } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const movie = {
      title, description, imgUrl, imdbUrl, imdbId,
    };

    onAdd(movie);

    setCount(state => state + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const areInputsFilled = (
    title
    && imgUrl
    && imdbUrl
    && imdbId
  );

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
        onChange={titleText => setTitle(titleText)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={descriptionText => setDescription(descriptionText)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={imgUrlText => setImgUrl(imgUrlText)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={imdbUrlText => setImdbUrl(imdbUrlText)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={imdbIdText => setImdbId(imdbIdText)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!areInputsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
