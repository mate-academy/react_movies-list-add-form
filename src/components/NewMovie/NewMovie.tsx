import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovieObject: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState<Movie>(initialMovieObject);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const [invalidInputs, setInvalidInputs] = useState<string[]>([]);
  const [validInputs, setValidInputs] = useState<string[]>([]);

  // eslint-disable-next-line max-len
  const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    let newValidInputs: string[] = validInputs;

    switch (true) {
      case name === 'imgUrl' && !regexp.test(value):
      case name === 'imdbUrl' && !regexp.test(value):
      case value.length === 0: {
        setInvalidInputs([
          ...invalidInputs,
          name,
        ]);
        newValidInputs = newValidInputs.filter(inputName => inputName !== name);
        break;
      }

      default: {
        setInvalidInputs(
          invalidInputs.filter(inputName => inputName !== name),
        );
        newValidInputs = [...newValidInputs, name];
        break;
      }
    }

    const isNewMovieValid = Object.keys(newMovie).every(key => {
      if (key === 'description') {
        return true;
      }

      return newValidInputs.includes(key);
    });

    if (isNewMovieValid) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }

    setValidInputs(newValidInputs);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();

    onAdd(newMovie);

    setNewMovie(initialMovieObject);
    setIsSubmitDisabled(true);
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleFormSubmit}
    >
      <div className="form-floating mb-3">
        <input
          type="text"
          name="title"
          id="formTitle"
          className={classNames({
            'form-control': true,
            'is-invalid': invalidInputs.includes('title'),
          })}
          placeholder="Title"
          data-cy="form-title"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <label htmlFor="formTitle" className="form-label">Title</label>

        <div className="invalid-feedback">
          This field is required
        </div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          name="description"
          id="formDescription"
          className="form-control"
          placeholder="Description"
          data-cy="form-description"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <label
          htmlFor="formDescription"
          className="form-label"
        >
          Description
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          name="imgUrl"
          id="formImgUrl"
          className={classNames({
            'form-control': true,
            'is-invalid': invalidInputs.includes('imgUrl'),
          })}
          placeholder="Image URL"
          data-cy="form-imgUrl"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <label
          htmlFor="formImgUrl"
          className="form-label"
        >
          Image URL
        </label>

        <div className="invalid-feedback">
          This field is required
        </div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          name="imdbUrl"
          id="formImdbUrl"
          className={classNames({
            'form-control': true,
            'is-invalid': invalidInputs.includes('imdbUrl'),
          })}
          placeholder="IMDb URL"
          data-cy="form-imdbUrl"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <label
          htmlFor="formImdbUrl"
          className="form-label"
        >
          IMDb URL
        </label>

        <div className="invalid-feedback">
          This field is required
        </div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          name="imdbId"
          id="formImdbId"
          className={classNames({
            'form-control': true,
            'is-invalid': invalidInputs.includes('imdbId'),
          })}
          placeholder="IMDb ID"
          data-cy="form-imdbId"
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <label
          htmlFor="formImdbId"
          className="form-label"
        >
          IMDb ID
        </label>

        <div className="invalid-feedback">
          This field is required
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={isSubmitDisabled}
        data-cy="form-submit-button"
      >
        Submit
      </button>
    </form>
  );
};
