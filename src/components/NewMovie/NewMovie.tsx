import { useState } from 'react';
import { TextField } from '../TextField';

export interface Fields {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface Errors {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface NewMovieProps {
  onAdd: (movie: Fields) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [count, setCount] = useState(0);
  const [fields, setField] = useState<Fields>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState<Errors>({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (name: string, value: string) => {
    setField(prevFields => {
      return { ...prevFields, [name]: value };
    });
  };

  const handleBlur = (field: keyof Fields) => {
    if (fields[field] === '') {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: 'Це поле обов’язкове.',
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: '',
      }));
    }
  };

  const isSubmitDisabled = (): boolean => {
    return (
      fields.title.trim() === '' ||
      fields.imgUrl.trim() === '' ||
      fields.imdbUrl.trim() === '' ||
      fields.imdbId.trim() === ''
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled()) {
      return;
    }

    onAdd(fields);

    setField({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setErrors({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Додати фільм</h2>

      <TextField
        name="title"
        label="Назва"
        value={fields.title}
        onChange={value => handleChange('title', value)}
        onBlur={() => handleBlur('title')}
        required
        error={errors.title}
      />

      <TextField
        name="description"
        label="Опис"
        value={fields.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="URL зображення"
        value={fields.imgUrl}
        required
        onChange={value => handleChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl')}
        error={errors.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="URL на IMDB"
        value={fields.imdbUrl}
        required
        onChange={value => handleChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl')}
        error={errors.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="ID на IMDB"
        value={fields.imdbId}
        required
        onChange={value => handleChange('imdbId', value)}
        onBlur={() => handleBlur('imdbId')}
        error={errors.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled()}
          >
            Додати
          </button>
        </div>
      </div>
    </form>
  );
};
