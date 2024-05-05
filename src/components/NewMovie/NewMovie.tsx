import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (arg0: Movie) => void;
};

const defaultValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const pattern = new RegExp(
  [
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|',
    '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)',
    '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
  ].join(''),
);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formFields, setFormFields] = useState(defaultValues);

  const handleInputChange = (value: string, name: keyof Movie) => {
    setFormFields(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(formFields);
    setFormFields(defaultValues);
    setCount(count + 1);
  };

  const isValid = () => {
    const { title, imdbId, imgUrl, imdbUrl } = formFields;

    return (
      title.trim() &&
      imdbId.trim() &&
      imgUrl.trim() &&
      imdbUrl.trim() &&
      pattern.test(imgUrl) &&
      pattern.test(imdbUrl)
    );
  };

  return (
    <form
      method="POST"
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formFields.title}
        onChange={text => handleInputChange(text, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formFields.description}
        onChange={text => handleInputChange(text, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formFields.imgUrl}
        onChange={text => handleInputChange(text, 'imgUrl')}
        required
        pattern={pattern}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formFields.imdbUrl}
        onChange={text => handleInputChange(text, 'imdbUrl')}
        required
        pattern={pattern}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formFields.imdbId}
        onChange={text => handleInputChange(text, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
