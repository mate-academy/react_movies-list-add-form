import React from 'react';
import './NewMovie.scss';
import classnames from 'classnames';

interface NewMovieProps {
  handleChange(event: React.ChangeEvent): void,
  onAdd(event: React.MouseEvent<HTMLFormElement>): void,
  // eslint-disable-next-line
  movie: any,
  // eslint-disable-next-line
  checkForm: any,
  checkUrl: string,
}

export const NewMovie: React.FC<NewMovieProps> = ({
  handleChange,
  onAdd,
  movie,
  checkForm,
  checkUrl,
}) => {
  const keys = Object.keys(movie);
  const fieldStrings = Object.values(movie);
  const fieldBooleans = Object.values(checkForm);

  fieldStrings.splice(1, 1);
  const checkFilled = fieldStrings
    .every((field) => String(field).length);

  fieldBooleans.splice(1, 1);
  const checkCorrect = fieldBooleans.every(field => field === true);

  const shouldSubmit = checkCorrect === true && checkFilled === true;

  return (
    <form className="newMovie" onSubmit={onAdd}>
      {keys.map(key => {
        let validation = checkForm[key];

        if (key === 'description') {
          validation = true;
        }

        const invalidClass = classnames({
          'newMovie__input--invalid': !validation,
        });

        return (
          <>
            <input
              type="text"
              name={key}
              key={key}
              className={`newMovie__input ${invalidClass}`}
              placeholder={`Add ${key}`}
              value={movie[key]}
              onChange={handleChange}
              onBlur={handleChange}
              data-cy={`form-${key}`}
            />
            <div className="newMovie__input-validation">
              {!validation && (
                <span className="newMovie__input-verdict">
                  This field is required
                </span>
              )}
              {!validation && key.includes('Url') && (
                <span className="newMovie__input-verdict">
                  {checkUrl}
                </span>
              )}
            </div>
          </>
        );
      })}

      <button
        className="newMovie__button"
        type="submit"
        data-cy="form-submit-button"
        disabled={!shouldSubmit}
      >
        ADD MOVIE
      </button>
    </form>
  );
};
