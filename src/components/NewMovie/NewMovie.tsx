import { useState } from 'react';
import { TextField } from '../TextField';

interface Field {
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

interface NewMovieProps {
  onAdd: (formData: Record<string, string>) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState<Record<string, string>>({
    title: '',
    imgUrl: '',
    description: '',
    imdbUrl: '',
    imdbId: '',
  });

  const fields: Field[] = [
    {
      name: 'title',
      value: formData.title,
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      value: formData.description,
      label: 'Description',
      required: false,
    },
    {
      name: 'imgUrl',
      value: formData.imgUrl,
      label: 'Image URL',
      required: true,
    },
    {
      name: 'imdbUrl',
      value: formData.imdbUrl,
      label: 'Imdb URL',
      required: true,
    },
    {
      name: 'imdbId',
      value: formData.imdbId,
      label: 'Imdb ID',
      required: true,
    },
  ];

  const handleChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    onAdd(formData);

    // Reset the form data
    setFormData({
      title: '',
      imgUrl: '',
      description: '',
      imdbUrl: '',
      imdbId: '',
    });

    // Increase the count to reset touched status of all fields
    setCount(currentCount => currentCount + 1);
  }

  // Find out if there is any field that is required but empty
  const hasError = fields.some(field => field.required && !field.value);

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {fields.map(field => (
        <TextField
          key={field.name}
          name={field.name}
          label={field.label}
          value={field.value}
          onChange={(newValue: string) => handleChange(field.name, newValue)}
          required={field.required}
        />
      ))}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
