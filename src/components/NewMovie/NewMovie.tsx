import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const titleValidationIssues = (value: string) : boolean => {
    const pattern = /^[A-Z0-9].{1,}$/;

    return !pattern.test(value);
  };

  const urlsValidationIssues = (url: string) : boolean => {
    const pattern = new RegExp(
      '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|'
      + '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)'
      + '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?'
      + '(?:[,.!/\\\\\\w]*))?)$',
    );

    return !pattern.test(url);
  };

  const imdbIdValidationIssues = (id: string) : boolean => {
    const pattern = /[A-Za-z]{2}\d{5,}/;
    const match = imdbUrl.match(pattern);

    if (match && match[0]) {
      return id !== match[0];
    }

    return true;
  };

  const isEmptyFields = !title || !imgUrl || !imdbUrl || !imdbId;

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEmptyFields) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(currentCount => currentCount + 1);
    handleReset();
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
        onChange={setTitle}
        hasValidationIssues={titleValidationIssues}
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
        hasValidationIssues={urlsValidationIssues}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        hasValidationIssues={urlsValidationIssues}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        hasValidationIssues={imdbIdValidationIssues}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            {...{ disabled: isEmptyFields }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
