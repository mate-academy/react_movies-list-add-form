import { FC, useState } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

interface Errors {
  title: string,
  imdbId: string,
  imdbUrl: string,
  imgUrl: string,
}

const NewMovie: FC<Props> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [title, setTitle] = useState('');

  const [errors, setErrors] = useState((): Errors => ({
    title: '',
    imdbId: '',
    imdbUrl: '',
    imgUrl: '',
  }));

  const formFieldSetters: { [key: string]: React.Dispatch<React.SetStateAction<string>> } = {
    title: setTitle,
    description: setDescription,
    imdbId: setImdbId,
    imdbUrl: setImdbUrl,
    imgUrl: setImgUrl,
  };

  const changeFieldError = (name: string, rawValue: string): boolean => {
    const value = rawValue.trim();

    const condition = (name === 'imdbUrl' || name === 'imgUrl')
      ? !(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
        .test(value.trim())) || value.length === 0
      : value.length === 0;

    switch (name) {
      case 'title':
      case 'imdbId':
        setErrors((state) => ({
          ...state,
          [name]: condition ? 'This field is required' : '',
        }));
        break;

      case 'imdbUrl':
      case 'imgUrl':
        setErrors((state) => ({
          ...state,
          [name]: condition ? 'Incorrect URL' : '',
        }));
        break;

      default:
        break;
    }

    return condition;
  };

  const resetForm = () => {
    Object.keys(formFieldSetters).forEach((name) => formFieldSetters[name](''));
  };

  const handleOnBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    changeFieldError(name, value);
  };

  const fieldsHasError = () => {
    const checkedFields: { [key: string]: string } = {
      title,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    return Object.entries(checkedFields)
      .reduce((acc, [name, value]) => changeFieldError(name, value) || acc, false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fieldsHasError()) {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        imdbId: imdbId.trim(),
        imdbUrl: imdbUrl.trim(),
        imgUrl: imgUrl.trim(),
      });

      resetForm();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (Object.prototype.hasOwnProperty.call(formFieldSetters, name)) {
      formFieldSetters[name](value);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="form__label">
          Title
          {errors.title && <span className="errorText">{`  ${errors.title}!`}</span>}
          <input
            onBlur={handleOnBlur}
            value={title}
            name="title"
            onChange={handleChange}
            id="title"
            type="text"
            className={classNames('input', 'input--outline', {
              'input--error': !!errors.title,
            })}
            placeholder="title"
          />
        </label>

        <label htmlFor="description" className="form__label">
          Description
          <textarea
            onBlur={handleOnBlur}
            value={description}
            onChange={handleChange}
            name="description"
            id="description"
            className="input input--outline input--textarea"
            placeholder="description"
          />
        </label>

        <label htmlFor="imgUrl" className="form__label">
          ImgUrl
          {errors.imgUrl && <span className="errorText">{`  ${errors.imgUrl}!`}</span>}
          <input
            onBlur={handleOnBlur}
            value={imgUrl}
            name="imgUrl"
            onChange={handleChange}
            id="imgUrl"
            type="text"
            className={classNames('input', 'input--outline', {
              'input--error': !!errors.imgUrl,
            })}
            placeholder="imgUrl"
          />
        </label>

        <label htmlFor="imdbUrl" className="form__label">
          ImdbUrl
          {errors.imdbUrl && <span className="errorText">{`  ${errors.imdbUrl}!`}</span>}
          <input
            onBlur={handleOnBlur}
            value={imdbUrl}
            onChange={handleChange}
            name="imdbUrl"
            id="imdbUrl"
            type="text"
            className={classNames('input', 'input--outline', {
              'input--error': !!errors.imdbUrl,
            })}
            placeholder="imdbUrl"
          />
        </label>

        <label htmlFor="imdbId" className="form__label">
          ImdbId
          {errors.imdbId && <span className="errorText">{`  ${errors.imdbId}!`}</span>}
          <input
            onBlur={handleOnBlur}
            onChange={handleChange}
            value={imdbId}
            name="imdbId"
            id="imdbId"
            type="text"
            className={classNames('input', 'input--outline', {
              'input--error': !!errors.imdbId,
            })}
            placeholder="imdbId"
          />
        </label>
      </div>

      <button
        type="submit"
        className="button button--size--full"
      >
        Add
      </button>
    </form>
  );
};

export { NewMovie };
