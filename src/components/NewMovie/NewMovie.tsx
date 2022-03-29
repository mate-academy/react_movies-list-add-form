import { FC, useState } from 'react';
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

  const [, setErrors] = useState((): Errors => ({
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

  const changeFieldError = (name: string, value: string): boolean => {
    const condition = (name === 'imdbUrl' || name === 'imgUrl')
      ? !(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
        .test(value)) || value.length === 0
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

    return Object.entries(checkedFields).some(([name, value]) => changeFieldError(name, value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fieldsHasError()) {
      onAdd({
        title,
        description,
        imdbId,
        imdbUrl,
        imgUrl,
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
          <input
            onBlur={handleOnBlur}
            value={title}
            name="title"
            onChange={handleChange}
            id="title"
            type="text"
            className="input input--outline"
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
          <input
            onBlur={handleOnBlur}
            value={imgUrl}
            name="imgUrl"
            onChange={handleChange}
            id="imgUrl"
            type="text"
            className="input input--outline"
            placeholder="imgUrl"
          />
        </label>

        <label htmlFor="imdbUrl" className="form__label">
          ImdbUrl
          <input
            onBlur={handleOnBlur}
            value={imdbUrl}
            onChange={handleChange}
            name="imdbUrl"
            id="imdbUrl"
            type="text"
            className="input input--outline"
            placeholder="imdbUrl"
          />
        </label>

        <label htmlFor="imdbId" className="form__label">
          ImdbId
          <input
            onBlur={handleOnBlur}
            onChange={handleChange}
            value={imdbId}
            name="imdbId"
            id="imdbId"
            type="text"
            className="input input--outline"
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
