import { useState, useRef, type FormEvent, useCallback } from 'react';
import { TextField } from '../TextField';

interface NewMovieProp {
  onAdd(data: MovieFormType): void;
}

type InputTypes = 'title' | 'description' | 'imgUrl' | 'imdbUrl' | 'imdbId';

type MovieFormType = Record<InputTypes, string>;

const trimStr = (value: string) => value.trim();
const fallbackFormData: MovieFormType = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: NewMovieProp) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const formRef = useRef<HTMLFormElement>(null);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState<MovieFormType>(fallbackFormData);

  const isDisabled =
    !trimStr(formData.title) ||
    !trimStr(formData.imgUrl) ||
    !trimStr(formData.imdbUrl) ||
    !trimStr(formData.imdbId);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCount(preveCount => preveCount + 1);
    onAdd(formData);
    setFormData(() => ({ ...fallbackFormData }));
  };

  const handleOnChange = (type: InputTypes, value: string) => {
    setFormData(state => {
      const copyState = { ...state };

      copyState[type] = value;

      return copyState;
    });
  };

  const imgValidationHelper = useCallback((value: string): boolean => {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(value);
  }, []);

  return (
    <form
      ref={formRef}
      className="NewMovie"
      key={count}
      onSubmit={handleOnSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        required
        value={formData.title}
        onChange={value => handleOnChange('title', value)}
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleOnChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        validationCB={imgValidationHelper}
        value={formData.imgUrl}
        onChange={value => handleOnChange('imgUrl', value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        validationCB={imgValidationHelper}
        value={formData.imdbUrl}
        onChange={value => handleOnChange('imdbUrl', value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={formData.imdbId}
        onChange={value => handleOnChange('imdbId', value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={isDisabled}
            aria-disabled={isDisabled}
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
