import classNames from 'classnames';
import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (obj: Movie) => void;
};

const initialMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

// eslint-disable-next-line
 const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

type NewMovieError = {
  [key in keyof Omit<Movie, 'description'>]: null | string;
};

const initialMovieErrors: NewMovieError = {
  title: null,
  imgUrl: null,
  imdbUrl: null,
  imdbId: null,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState<Movie>(initialMovie);
  const [newMovieErrors, setNewMovieErrors] = useState<NewMovieError>(
    initialMovieErrors,
  );

  const handleNewMovieChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setNewMovie((prev) => ({
        ...prev,
        [name]: value,
      }));

      setNewMovieErrors({
        ...newMovieErrors,
        [name]: null,
      });
    },
    [],
  );

  const handleNewMovieBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      switch (name) {
        case 'title':
        case 'imdbId':
          if (!value.trim()) {
            setNewMovieErrors((prev) => ({
              ...prev,
              [name]: `${name} is required`,
            }));
          } else {
            setNewMovieErrors((prev) => ({
              ...prev,
              [name]: null,
            }));
          }

          break;
        default:
      }
    },
    [],
  );

  const formIsValid = useMemo(() => {
    return Object.values(newMovieErrors)
      .every((error) => error === null);
  }, [newMovieErrors]);

  const validateUrl = (key: keyof Movie) => {
    let errorMessage = initialMovieErrors.imgUrl;

    if (!newMovie[key].trim()) {
      errorMessage = `${key} is required!`;
    } else if (!urlRegex.test(newMovie[key])) {
      errorMessage = 'Please enter valid URL!';
    }

    setNewMovieErrors({
      ...newMovieErrors,
      [key]: errorMessage,
    });
  };

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();

        if (!formIsValid) {
          return;
        }

        if (newMovie.title === '') {
          setNewMovieErrors({
            ...newMovieErrors,
            title: 'title is required!',
          });

          return;
        }

        if (newMovie.imgUrl === '') {
          setNewMovieErrors({
            ...newMovieErrors,
            imgUrl: 'imgUrl is required!',
          });

          return;
        }

        if (newMovie.imdbUrl === '') {
          setNewMovieErrors({
            ...newMovieErrors,
            imdbUrl: 'imdbUrl is required!',
          });

          return;
        }

        if (newMovie.imdbId === '') {
          setNewMovieErrors({
            ...newMovieErrors,
            imdbId: 'imdbId is required!',
          });

          return;
        }

        onAdd(newMovie);
        setNewMovie(initialMovie);
        setNewMovieErrors(initialMovieErrors);
      }}
    >
      <input
        type="text"
        className={
          classNames(
            'form__input',
            { 'form__input--error': newMovieErrors.title },
          )
        }
        name="title"
        placeholder="Title"
        value={newMovie.title}
        onBlur={handleNewMovieBlur}
        onChange={handleNewMovieChange}
      />
      <p className="form__error">
        {newMovieErrors.title}
      </p>

      <input
        type="text"
        className="form__input"
        name="description"
        placeholder="Description"
        value={newMovie.description}
        onChange={handleNewMovieChange}
      />

      <input
        type="text"
        className={
          classNames(
            'form__input',
            { 'form__input--error': newMovieErrors.imgUrl },
          )
        }
        name="imgUrl"
        placeholder="ImgUrl"
        value={newMovie.imgUrl}
        onBlur={() => validateUrl('imgUrl')}
        onChange={handleNewMovieChange}
      />
      <p className="form__error">
        {newMovieErrors.imgUrl}
      </p>

      <input
        type="text"
        className={
          classNames(
            'form__input',
            { 'form__input--error': newMovieErrors.imdbUrl },
          )
        }
        name="imdbUrl"
        placeholder="ImdbUrl"
        value={newMovie.imdbUrl}
        onBlur={() => validateUrl('imdbUrl')}
        onChange={handleNewMovieChange}
      />
      <p className="form__error">
        {newMovieErrors.imdbUrl}
      </p>

      <input
        type="text"
        className={
          classNames(
            'form__input',
            { 'form__input--error': newMovieErrors.imdbId },
          )
        }
        name="imdbId"
        placeholder="ImdbId"
        value={newMovie.imdbId}
        onBlur={handleNewMovieBlur}
        onChange={handleNewMovieChange}
      />
      <p className="form__error">
        {newMovieErrors.imdbId}
      </p>

      <button
        type="submit"
        disabled={!formIsValid}
      >
        Add
      </button>
    </form>
  );
};
