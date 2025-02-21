import { useState } from 'react';
import { TextField } from '../TextField';

interface FormData {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description: string;
}

type Props = {
  onAdd: (
    movie: Omit<FormData, 'description'> & { description?: string },
  ) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const isValid = (field: keyof FormData): boolean =>
    formData[field].trim() !== '';

  const isFormValid = (): boolean =>
    ['title', 'imgUrl', 'imdbUrl', 'imdbId'].every(field =>
      isValid(field as keyof FormData),
    );

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (field: string): void => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const { title, imgUrl, imdbUrl, imdbId, description } = formData;

    const movieData = {
      title: title.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
      description: description.trim() || '',
    };

    onAdd(movieData);

    setFormData({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });

    setTouched({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value => handleInputChange('title', value)}
        onBlur={() => handleBlur('title')}
        required
        touched={touched.title}
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value => handleInputChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl')}
        required
        touched={touched.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={value => handleInputChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl')}
        required
        touched={touched.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={value => handleInputChange('imdbId', value)}
        onBlur={() => handleBlur('imdbId')}
        required
        touched={touched.imdbId}
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
