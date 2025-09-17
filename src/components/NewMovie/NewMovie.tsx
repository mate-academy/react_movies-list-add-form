import { useState } from 'react';
import { TextField } from '../TextField';

type MovieForm = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

const initialForm: MovieForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type NewMovieProps = {
  onAdd: (movie: MovieForm) => void;
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [form, setForm] = useState<MovieForm>(initialForm);
  const [formVersion, setFormVersion] = useState(0); // используется для сброса TextField

  const requiredKeys: (keyof MovieForm)[] = [
    'title',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ];

  const isFormValid = () =>
    requiredKeys.every(requiredKey => form[requiredKey].trim() !== '');

  const handleChange = (field: keyof MovieForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    onAdd({ ...form }); // передаём копию
    setForm(initialForm);
    setFormVersion(prev => prev + 1);
  };

  const fields: {
    name: keyof MovieForm;
    label?: string;
    required?: boolean;
  }[] = [
    { name: 'title', required: true, label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'imgUrl', required: true, label: 'Image URL' },
    { name: 'imdbUrl', required: true, label: 'IMDB URL' },
    { name: 'imdbId', required: true, label: 'IMDB ID' },
  ];

  return (
    <form className="NewMovie" key={formVersion} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {fields.map(({ name, label, required }) => (
        <TextField
          key={name}
          name={name}
          label={label}
          value={form[name]}
          required={required}
          onChange={value => handleChange(name, value)}
        />
      ))}

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
