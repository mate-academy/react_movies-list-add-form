import {
  FC, useState, memo, useCallback,
} from 'react';
import './NewMovie.scss';
import Input from '../Input/Input';

type Props = {
  onAdd: (movie: Movie) => void,
};

interface Errors {
  title: string,
  imdbId: string,
  imdbUrl: string,
  imgUrl: string,
}

interface LinkedSetter {
  [key: string]: React.Dispatch<React.SetStateAction<string>>
}

const NewMovie: FC<Props> = memo(({ onAdd }) => {
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

  const formFieldSetters: LinkedSetter = {
    title: setTitle,
    description: setDescription,
    imdbId: setImdbId,
    imdbUrl: setImdbUrl,
    imgUrl: setImgUrl,
  };

  const changeFieldError = (name: string, rawValue: string, getConditionOnly = false): boolean => {
    const value = rawValue.trim();
    const validateUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const isUrl = (name === 'imdbUrl' || name === 'imgUrl');

    const condition = isUrl
      ? !validateUrl.test(value) || value.length === 0
      : value.length === 0;

    if (getConditionOnly) {
      return condition;
    }

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

  const resetForm = useCallback(() => {
    Object.keys(formFieldSetters).forEach((name) => formFieldSetters[name](''));
  }, []);

  const handleOnBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    changeFieldError(name, value);
  };

  const fieldsHasError = useCallback((getConditionOnly = false) => {
    const checkedFields: { [key: string]: string } = {
      title,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    return Object.entries(checkedFields)
      .some(([name, value]) => changeFieldError(name, value, getConditionOnly));
  }, [errors]);

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
          <Input
            name="title"
            onBlur={handleOnBlur}
            onChange={handleChange}
            valid={!!errors.title}
            value={title}
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
          <Input
            name="imgUrl"
            onBlur={handleOnBlur}
            onChange={handleChange}
            valid={!!errors.imgUrl}
            value={imgUrl}
          />
        </label>

        <label htmlFor="imdbUrl" className="form__label">
          ImdbUrl
          {errors.imdbUrl && <span className="errorText">{`  ${errors.imdbUrl}!`}</span>}
          <Input
            name="imdbUrl"
            onBlur={handleOnBlur}
            onChange={handleChange}
            valid={!!errors.imdbUrl}
            value={imdbUrl}
          />
        </label>

        <label htmlFor="imdbId" className="form__label">
          ImdbId
          {errors.imdbId && <span className="errorText">{`  ${errors.imdbId}!`}</span>}
          <Input
            name="imdbId"
            onBlur={handleOnBlur}
            onChange={handleChange}
            valid={!!errors.imdbId}
            value={imdbId}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={fieldsHasError(true)}
        className="button button--size--full"
      >
        Add
      </button>
    </form>
  );
});

export { NewMovie };
