import { FC, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

enum URL {
  ImgUrl = 'img',
  Imdb = 'imdb',
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const [isValidImg, setIsValidImg] = useState<boolean>(true);
  const [isValidImdb, setIsValidImdb] = useState<boolean>(true);

  // eslint-disable-next-line max-len
  const validUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const isUrlValid = (url: string) => {
    return validUrl.test(url);
  };

  const isEmptyField = (text: string) => {
    return text.trim().length === 0;
  };

  const handleChangeUrl = (newValue: string, urlType: URL) => {
    switch (urlType) {
      case 'img':
        setImgUrl(newValue);
        setIsValidImg(true);
        break;

      case 'imdb':
        setImdbUrl(newValue);
        setIsValidImdb(true);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!isUrlValid(imgUrl) || !isUrlValid(imdbUrl)) {
      setIsValidImg(isUrlValid(imgUrl));
      setIsValidImdb(isUrlValid(imdbUrl));

      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setCount(prevCount => prevCount + 1);
    resetForm();
  };

  const isSomeEmptyField = isEmptyField(title)
    || isEmptyField(imgUrl)
    || isEmptyField(imdbUrl)
    || isEmptyField(imdbId);

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
        isValid={isValidImg}
        onChange={(newValue) => handleChangeUrl(newValue, URL.ImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        isValid={isValidImdb}
        onChange={(newValue) => handleChangeUrl(newValue, URL.Imdb)}
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
            disabled={isSomeEmptyField}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
