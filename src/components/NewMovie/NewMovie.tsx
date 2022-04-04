import React, { FC, useState, useMemo } from 'react';
import { TextareaInput } from '../TextareaInput/TextareaInput';
import { TextInput } from '../TextInput/TextInput';

interface Props {
  onAdd: (movie: Movie) => void
}

interface Errors {
  title: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string
}

interface FormFieldSetter {
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

  const setFormField: FormFieldSetter = useMemo(() => ({
    title: setTitle,
    description: setDescription,
    imdbId: setImdbId,
    imdbUrl: setImdbUrl,
    imgUrl: setImgUrl,
  }), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (Object.prototype.hasOwnProperty.call(setFormField, name)) {
      setFormField[name](value);
    }

    setErrors(state => ({
      ...state,
      [name]: '',
    }));
  };

  const resetForm = () => {
    Object.keys(setFormField).forEach(key => setFormField[key](''));
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
      <TextInput
        name="title"
        label="Title"
        inputValue={title}
        errorMessage={errors.title}
        placeholder="Set the title"
        onChange={handleChange}
      />

      <TextareaInput
        name="description"
        label="Description"
        inputValue={description}
        placeholder="Set the description"
        onChange={handleChange}
      />

      <TextInput
        name="imgUrl"
        label="Image url"
        inputValue={imgUrl}
        errorMessage={errors.imgUrl}
        placeholder="Set the image url"
        onChange={handleChange}
      />

      <TextInput
        name="imdbUrl"
        label="Imdb Url"
        inputValue={imdbUrl}
        errorMessage={errors.imdbUrl}
        placeholder="Set the imdb url"
        onChange={handleChange}
      />

      <TextInput
        name="imdbId"
        label="Imdb Id"
        inputValue={imdbId}
        errorMessage={errors.imdbId}
        placeholder="Set the imdb id"
        onChange={handleChange}
      />

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
