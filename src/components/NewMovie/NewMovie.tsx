import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface MovieForm {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description: string;
}

export const NewMovie = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
  const [form, setForm] = useState<Movie>({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

    return requiredFields.every(field => !!form[field as keyof MovieForm]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
    setTouched({});
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange}
        onBlur={() => handleBlur('title')}
        required
        touched={!!touched.title}
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={handleChange}
        onBlur={() => handleBlur('imgUrl')}
        required
        touched={!!touched.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={handleChange}
        onBlur={() => handleBlur('imdbUrl')}
        required
        touched={!!touched.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={handleChange}
        onBlur={() => handleBlur('imdbId')}
        required
        touched={!!touched.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
