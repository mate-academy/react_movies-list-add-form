import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd(movie: Movie): void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isImdbUrlWrong, setIsImdbUrlWrong] = useState(false);
  const [isImgUrlWrong, setIsImgUrlWrong] = useState(false);

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    let isThereWrongUrls = false;

    if (!pattern.test(imdbUrl.trim())) {
      setIsImdbUrlWrong(true);
      isThereWrongUrls = true;
    }

    if (!pattern.test(imgUrl.trim())) {
      setIsImgUrlWrong(true);
      isThereWrongUrls = true;
    }

    if (isThereWrongUrls) {
      return;
    }

    setCount(count + 1);

    onAdd({
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    });

    resetForm();
  };

  useEffect(() => {
    if (title.trim() && imdbId.trim() && imdbUrl.trim() && imgUrl.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [title, imdbId, imdbUrl, imgUrl]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => setImgUrl(value)}
        urlChecker={{
          isUrlWrong: isImgUrlWrong,
          setIsUrlWrong: setIsImgUrlWrong,
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => setImdbUrl(value)}
        urlChecker={{
          isUrlWrong: isImdbUrlWrong,
          setIsUrlWrong: setIsImdbUrlWrong,
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId.toString()}
        onChange={(value) => setImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
