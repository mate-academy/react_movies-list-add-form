import classNames from 'classnames';
import React, { FC, useState, useMemo } from 'react';

interface Props {
  onAdd: (movie: Movie) => void
}

interface Errors {
  title: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string
}

interface LinkedSetter {
  [key: string]: React.Dispatch<React.SetStateAction<string>>
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [errors, setErrors] = useState((): Errors => ({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }));

  const formFieldSetters: LinkedSetter = useMemo(() => ({
    title: setTitle,
    description: setDescription,
    imdbId: setImdbId,
    imdbUrl: setImdbUrl,
    imgUrl: setImgUrl,
  }), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (Object.prototype.hasOwnProperty.call(formFieldSetters, name)) {
      formFieldSetters[name](value);
    }
  };

  const resetForm = () => {
    Object.keys(formFieldSetters).forEach(key => formFieldSetters[key](''));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!title) {
      setErrors(state => ({
        ...state,
        title: 'Please, set the correct title',
      }));

      return;
    }

    if (!imgUrl || !pattern.test(imgUrl)) {
      setErrors(state => ({
        ...state,
        imgUrl: 'Please, set the correct image url',
      }));

      return;
    }

    if (!imdbUrl || !pattern.test(imdbUrl)) {
      setErrors(state => ({
        ...state,
        imdbUrl: 'Please, set the correct imdb url',
      }));

      return;
    }

    if (!imdbId) {
      setErrors(state => ({
        ...state,
        imdbId: 'Please, set the correct imdb id',
      }));

      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title" className="label">
          Title
          <div className="control">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Set the title"
              className={classNames('input', { 'is-danger': errors.title })}
              value={title}
              onChange={handleChange}
            />
          </div>
        </label>
        {errors.title && (<p className="help is-danger">{errors.title}</p>)}
      </div>

      <div className="field">
        <label htmlFor="description" className="label">
          Description
          <div className="control">
            <textarea
              name="description"
              id="description"
              placeholder="Put the description of the movie"
              className="textarea"
              value={description}
              onChange={handleChange}
            />
          </div>
        </label>
      </div>

      <div className="field">
        <label htmlFor="imgUrl" className="label">
          Image Url
          <div className="control">
            <input
              type="text"
              name="imgUrl"
              id="imgUrl"
              placeholder="Set the image url"
              className={classNames('input', { 'is-danger': errors.imgUrl })}
              value={imgUrl}
              onChange={handleChange}
            />
          </div>
        </label>
        {errors.imgUrl && (<p className="help is-danger">{errors.imgUrl}</p>)}
      </div>

      <div className="field">
        <label htmlFor="imdbUrl" className="label">
          Imdb Url
          <div className="control">
            <input
              type="text"
              name="imdbUrl"
              id="imdbUrl"
              placeholder="Set the imdb url"
              className={classNames('input', { 'is-danger': errors.imdbUrl })}
              value={imdbUrl}
              onChange={handleChange}
            />
          </div>
        </label>
        {errors.imdbUrl && (<p className="help is-danger">{errors.imdbUrl}</p>)}
      </div>

      <div className="field">
        <label htmlFor="imdbId" className="label">
          Imdb Id
          <div className="control">
            <input
              type="text"
              name="imdbId"
              id="imdbId"
              placeholder="Set the imdb id"
              className={classNames('input', { 'is-danger': errors.imdbId })}
              value={imdbId}
              onChange={handleChange}
            />
          </div>
        </label>
        {errors.imdbId && (<p className="help is-danger">{errors.imdbId}</p>)}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">Add</button>
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
