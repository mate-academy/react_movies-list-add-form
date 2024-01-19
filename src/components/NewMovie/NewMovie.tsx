import { useState } from 'react';
import { TextField } from '../TextField';

interface Props {
  onAdd: (
    movie: {
      title: string,
      description: string,
      imgUrl: string,
      imdbUrl: string,
      imdbId: string,
    }
  ) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const urlValidator = (urlString: string): boolean => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!urlString.match(pattern)) {
      return false;
    }

    return true;
  };

  function addMovie(event: React.FormEvent) {
    event.preventDefault();
    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setimdbUrl('');
    setImdbId('');

    setCount(prev => prev + 1);
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addMovie}
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
        checkUrl={urlValidator}
        required
      />

      <TextField
        name="imdbUrl"
        value={imdbUrl}
        onChange={setimdbUrl}
        checkUrl={urlValidator}
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
            disabled={!title
              || !urlValidator(imgUrl)
              || !urlValidator(imdbUrl)
              || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
