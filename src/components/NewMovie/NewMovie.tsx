import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  addMovie: (movie: Movie) => void
};

type Validation = {
  title: boolean,
  description: boolean
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean,
};

const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const initialValidation: Validation = {
    title: true,
    description: true,
    imgUrl: true,
    imdbUrl: true,
    imdbId: true,
  };

  const initialMovieState: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const initialInputWasChanged: Validation = {
    title: false,
    description: true,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  };

  const [isInputValid, setIsInputValid] = useState(initialValidation);
  const [newMovie, setNewMovie] = useState(initialMovieState);
  const [inputWasChanged, setInputWasChanged] = useState(initialInputWasChanged);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie({
      ...newMovie,
      [name]: value,
    });

    setInputWasChanged({
      ...inputWasChanged,
      [name]: true,
    });
  };

  const checkText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsInputValid({
      ...isInputValid,
      [event.target.name]: event.target.value.length !== 0,
    });
  };

  const checkUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsInputValid({
      ...isInputValid,
      [event.target.name]: regex.test(event.target.value),
    });
  };

  const handleValidation = () => {
    const dataValidation = Object.values(isInputValid)
      .every((item: boolean) => item === true);
    const wasChangedValidation = Object.values(inputWasChanged)
      .every((item: boolean) => item === true);

    return dataValidation && wasChangedValidation;
  };

  const setInputClass = (name: keyof Validation) => {
    return (
      classNames(
        'form__input',
        { 'form__input--valid': isInputValid[name] },
      )
    );
  };

  const resetForm = () => {
    setNewMovie(initialMovieState);
    setInputWasChanged(initialInputWasChanged);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (handleValidation()) {
      addMovie(newMovie);
      resetForm();
      setIsInputValid(initialValidation);
    }
  };

  const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name.toLowerCase().includes('url')) {
      checkUrl(event);
    } else {
      checkText(event);
    }

    handleChange(event);
  };

  return (
    <form
      action="get"
      className="form"
      onSubmit={handleSubmit}
    >
      <div className="input__item">
        <label htmlFor="title" className="form__lable">
          Title
          <input
            type="text"
            name="title"
            placeholder="Title"
            id="title"
            value={newMovie.title}
            className={setInputClass('title')}
            onChange={handleEvent}
          />
        </label>

        <div className="input__validation-text">
          {!isInputValid.title && <span>Please enter some text</span>}
        </div>
      </div>

      <div className="input__item">
        <label htmlFor="description" className="form__lable">
          Description
          <input
            type="text"
            name="description"
            placeholder="description"
            id="description"
            value={newMovie.description}
            className={setInputClass('description')}
            onChange={handleChange}
          />
        </label>

        <div className="input__validation-text">
          {!isInputValid.description && 'Please enter some text'}
        </div>

      </div>

      <div className="input__item">
        <label htmlFor="imgUrl" className="form__lable">
          imgUrl
          <input
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
            id="imgUrl"
            value={newMovie.imgUrl}
            className={setInputClass('imgUrl')}
            onChange={handleEvent}
          />
        </label>

        <div className="input__validation-text">
          {!isInputValid.imgUrl && 'please enter valid URL'}
        </div>
      </div>

      <div className="input__item">

        <label htmlFor="imdbUrl" className="form__lable">
          imdbUrl
          <input
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            id="imdbUrl"
            value={newMovie.imdbUrl}
            className={setInputClass('imdbUrl')}
            onChange={handleEvent}
          />
        </label>

        <div className="input__validation-text">
          {!isInputValid.imdbUrl && 'please enter valid URL'}
        </div>

      </div>

      <div className="input__item">
        <label htmlFor="imdbId" className="form__lable">
          imdbId
          <input
            type="text"
            name="imdbId"
            placeholder="imdbId"
            id="imdbId"
            value={newMovie.imdbId}
            className={setInputClass('imdbId')}
            onChange={handleEvent}
          />
        </label>

        <div className="input__validation-text">
          {!isInputValid.imdbId && 'please enter valid URL'}
        </div>

      </div>

      <button
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
