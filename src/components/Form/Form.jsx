import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

export const Form = ({
  values,
  errors,
  onChange,
  onAdd,
  setErrors,
  clearForm,
}) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const currentErrors = {
      buttonDisabled: true,
    };

    if (!values.title) {
      currentErrors.title = true;
    }

    // eslint-disable-next-line
    const imageUrlCheck = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(values.imgUrl);

    if (!values.imgUrl || !imageUrlCheck) {
      currentErrors.imgUrl = true;
    }

    // eslint-disable-next-line
    const imdbUrlCheck = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(values.imdbUrl);

    if (!values.imdbUrl || !imdbUrlCheck) {
      currentErrors.imdbUrl = true;
    }

    if (!values.imdbId) {
      currentErrors.imdbId = true;
    }

    if (Object.keys(currentErrors).length > 1) {
      setErrors(currentErrors);

      return;
    }

    clearForm();
    onAdd({
      title: values.title,
      description: values.description,
      imgUrl: values.imgUrl,
      imdbUrl: values.imdbUrl,
      imdbId: values.imdbId,
    });
  };

  return (
    <form
      action=""
      method="post"
      onSubmit={onSubmit}
    >
      {errors.title && (
        <span className="error">
          Please enter a film title
        </span>
      )}

      <label className="label">
        Film Title:
        <input
          className={`${errors.title ? 'is-danger' : ''} input`}
          name="title"
          type="text"
          value={values.title}
          placeholder="Title"
          onChange={onChange}
        />
      </label>

      <label className="label">
        Film Description:
        <input
          className="input"
          name="description"
          type="text"
          placeholder="Description"
          value={values.description}
          onChange={onChange}
        />
      </label>

      {errors.imgUrl && (
        <span className="error">
          Please enter an image link
        </span>
      )}

      <label className="label">
        Image link:
        <input
          className={`${errors.imgUrl ? 'is-danger' : ''} input`}
          name="imgUrl"
          type="text"
          placeholder="Image Url"
          value={values.imgUrl}
          onChange={onChange}
        />
      </label>

      {errors.imdbUrl && (
        <span className="error">
          Please enter an IMDB link
        </span>
      )}

      <label className="label">
        IMDB link:
        <input
          className={`${errors.imdbUrl ? 'is-danger' : ''} input`}
          name="imdbUrl"
          type="text"
          placeholder="IMDB Url"
          value={values.imdbUrl}
          onChange={onChange}
        />
      </label>

      {errors.imdbId && (
        <span className="error">
          Please enter an IMDB id
        </span>
      )}

      <label className="label">
        IMDB ID:
        <input
          className={`${errors.imdbId ? 'is-danger' : ''} input`}
          name="imdbId"
          type="text"
          placeholder="IMDB Id"
          value={values.imdbId}
          onChange={onChange}
        />
      </label>

      <button
        className="button is-warning"
        type="submit"
        disabled={errors.buttonDisabled}
      >
        Add new movie
      </button>
    </form>
  );
};

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imgUrl: PropTypes.string.isRequired,
    imdbUrl: PropTypes.string.isRequired,
    imdbId: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    title: PropTypes.bool,
    imgUrl: PropTypes.bool,
    imdbUrl: PropTypes.bool,
    imdbId: PropTypes.bool,
    buttonDisabled: PropTypes.bool,
  }),
};

Form.defaultProps = {
  errors: PropTypes.shape({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
    buttonDisabled: false,
  }),
};
