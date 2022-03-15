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

const initialValidation: Validation = {
  title: true,
  description: true,
  imgUrl: true,
  imdbUrl: true,
  imdbId: true,
};

const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isInputValid, setIsInputValid] = useState(initialValidation);

  const enterTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const enterDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const enterImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
  };

  const enterImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
  };

  const enterImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
  };

  const checkText = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsInputValid({
      ...isInputValid,
      [event.target.name]: event.target.value.length !== 0,
    });
  };

  const checkUrl = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsInputValid({
      ...isInputValid,
      [event.target.name]: regex.test(event.target.value),
    });
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
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (Object.values(isInputValid).every((item: boolean) => item === true)) {
      addMovie(movie);
      resetForm();
      setIsInputValid(initialValidation);
    }
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
            value={title}
            className={setInputClass('title')}
            onChange={enterTitle}
            onBlur={checkText}
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
            value={description}
            className={setInputClass('description')}
            onChange={enterDescription}
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
            value={imgUrl}
            className={setInputClass('imgUrl')}
            onBlur={checkUrl}
            onChange={enterImgUrl}
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
            value={imdbUrl}
            className={setInputClass('imdbUrl')}
            onBlur={checkUrl}
            onChange={enterImdbUrl}
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
            value={imdbId}
            className={setInputClass('imdbId')}
            onBlur={checkText}
            onChange={enterImdbId}
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
