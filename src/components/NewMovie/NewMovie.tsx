import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { urlTestRegExp } from '../../utils/constants';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isUrlValid = (urlString: string) => {
    return urlString.match(urlTestRegExp);
  };

  const isValidTitle = (titleString: string) => {
    return titleString.trim() !== '' && titleString.replace(/\s/g, '') !== '';
  };

  const resetAllFields = () => {
    setTitle('');
    setImgUrl('');
    setDescription('');
    setImdbUrl('');
    setImdbId('');
  };

  const areAllRequirmentsMet
  = isValidTitle(title)
  && isUrlValid(imgUrl)
  && isUrlValid(imdbUrl)
  && imdbId !== '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (areAllRequirmentsMet) {
      const movie = ({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      onAdd(movie);

      setCount((prevCount) => prevCount + 1);

      resetAllFields();
    }
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
        required
        onChange={setTitle}
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
        required
        onChange={setImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={setImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={setImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            // disabled={!areAllRequirmentsMet}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
