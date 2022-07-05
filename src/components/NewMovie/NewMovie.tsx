import { useEffect, useState } from 'react';
import './NewMovie.scss';

// eslint-disable-next-line
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

type Props = {
  onAdd: (movie: Movie) => void;
  allMoviesTitle: string[];
};

export const NewMovie: React.FC<Props> = ({ onAdd, allMoviesTitle }) => {
  const [validForm, setValidForm] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: 'Description',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  useEffect(() => {
    setValidForm(Object.values(errors).every(error => error === '')
    && Object.values(newMovie).every(val => val !== ''));
  }, [newMovie, errors]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.currentTarget;

    setNewMovie(prev => (
      {
        ...prev,
        [name]: value,
      }
    ));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onAdd(newMovie);
    setNewMovie({
      title: '',
      description: 'Description',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setValidForm(true);
  }

  function validateTitle() {
    if (!newMovie.title.trim()) {
      setErrors({ ...errors, title: 'Enter Title!' });
    } else if (allMoviesTitle.includes(newMovie.title)) {
      setErrors({ ...errors, title: 'Movie is already exist!' });
    } else {
      setErrors({ ...errors, title: '' });
    }
  }

  function validateImgUrl() {
    if (!newMovie.imgUrl.trim()) {
      setErrors({ ...errors, imgUrl: 'Enter imgUrl!' });
    } else if (!newMovie.imgUrl.match(regex)) {
      setErrors({ ...errors, imgUrl: 'Enter valid URL address!' });
    } else {
      setErrors({ ...errors, imgUrl: '' });
    }
  }

  function validateimdbUrl() {
    if (!newMovie.imdbUrl.trim()) {
      setErrors({ ...errors, imdbUrl: 'Enter imdbUrl!' });
    } else if (!newMovie.imdbUrl.match(regex)) {
      setErrors({ ...errors, imdbUrl: 'Enter valid URL address!' });
    } else {
      setErrors({ ...errors, imdbUrl: '' });
    }
  }

  function validateimdbId() {
    if (!newMovie.imdbId.trim()) {
      setErrors({ ...errors, imdbId: 'Enter imdbId!' });
    } else {
      setErrors({ ...errors, imdbId: '' });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`input-group ${errors.title && 'input-group--error'}`}>
        <label
          className={`input-group__label ${errors.title && 'input-group__label--error'}`}
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="input-group__input"
          type="text"
          name="title"
          id="title"
          value={newMovie.title}
          onChange={handleChange}
          onBlur={validateTitle}
        />
        <p className="input-group__errorText">{errors.title}</p>
      </div>
      <div className="input-group">
        <label
          className="input-group__label"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="input-group__input input-group__input--textarea"
          name="description"
          id="description"
          value={newMovie.description}
          onChange={handleChange}
        />
      </div>
      <div className={`input-group ${errors.imgUrl && 'input-group--error'}`}>
        <label
          className={`input-group__label ${errors.imgUrl && 'input-group__label--error'}`}
          htmlFor="imgUrl"
        >
          ImgUrl
        </label>
        <input
          className="input-group__input"
          type="text"
          name="imgUrl"
          id="imgUrl"
          value={newMovie.imgUrl}
          onChange={handleChange}
          onBlur={validateImgUrl}
        />
        <p className="input-group__errorText">{errors.imgUrl}</p>
      </div>
      <div className={`input-group ${errors.imdbUrl && 'input-group--error'}`}>
        <label
          className={`input-group__label ${errors.imdbUrl && 'input-group__label--error'}`}
          htmlFor="imdbUrl"
        >
          imdbUrl
        </label>
        <input
          className="input-group__input"
          type="text"
          name="imdbUrl"
          id="imdbUrl"
          value={newMovie.imdbUrl}
          onChange={handleChange}
          onBlur={validateimdbUrl}
        />
        <p className="input-group__errorText">{errors.imdbUrl}</p>
      </div>
      <div className={`input-group ${errors.imdbId && 'input-group--error'}`}>
        <label
          className={`input-group__label ${errors.imdbId && 'input-group__label--error'}`}
          htmlFor="imdbId"
        >
          imdbId
        </label>
        <input
          className="input-group__input"
          type="text"
          name="imdbId"
          id="imdbId"
          value={newMovie.imdbId}
          onChange={handleChange}
          onBlur={validateimdbId}
        />
        <p className="input-group__errorText">{errors.imdbId}</p>
      </div>
      <button
        type="submit"
        className="submit-button"
        disabled={!validForm}
      >
        Add new Movie
      </button>
    </form>
  );
};
