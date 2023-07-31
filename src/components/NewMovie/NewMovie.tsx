import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movieInfo, setMovieInfo] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [isValidImgUrl, setIsValidImgUrl] = useState(false);
  const [isValidImdbUrl, setIsValidImdbUrl] = useState(false);

  const isEmptyField = !movieInfo.title
    || !movieInfo.imgUrl
    || !movieInfo.imdbUrl
    || !movieInfo.imdbId;

  const handleMovieInfoSet = (
    name: string,
    value: string,
  ) => {
    setMovieInfo(prevInfo => (
      { ...prevInfo, [name]: value }
    ));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movieInfo);

    setMovieInfo({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const urlValidation = (
    url: string,
    setValidity: (value: boolean) => void,
  ): boolean => {
    // eslint-disable-next-line max-len
    const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (urlPattern.test(url)) {
      setValidity(true);

      return true;
    }

    setValidity(false);

    return false;
  };

  const imgUrlValidation = (url: string) => {
    return urlValidation(url, setIsValidImgUrl);
  };

  const imdbUrlValidation = (url: string) => {
    return urlValidation(url, setIsValidImdbUrl);
  };

  return (
    <form
      className="NewMovie"
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieInfo.title}
        onChange={handleMovieInfoSet}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieInfo.description}
        onChange={handleMovieInfoSet}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieInfo.imgUrl}
        onChange={handleMovieInfoSet}
        required
        validation={imgUrlValidation}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieInfo.imdbUrl}
        onChange={handleMovieInfoSet}
        required
        validation={imdbUrlValidation}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieInfo.imdbId}
        onChange={handleMovieInfoSet}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isEmptyField || !isValidImgUrl || !isValidImdbUrl}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
