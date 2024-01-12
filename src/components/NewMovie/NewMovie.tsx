import { useEffect, useState } from 'react';
import { TextField } from '../TextField';

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    setAllFieldsFilled(
      formData.title.trim() !== ''
      && formData.imgUrl.trim() !== ''
      && formData.imdbUrl.trim() !== ''
      && formData.imdbId.trim() !== '',
    );
  }, [formData]);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });

    setAllFieldsFilled(
      formData.title.trim() !== ''
      && formData.imgUrl.trim() !== ''
      && formData.imdbUrl.trim() !== ''
      && formData.imdbId.trim() !== '',
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (allFieldsFilled) {
      onAdd(formData);

      setFormData({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });

      setAllFieldsFilled(false);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={(value) => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={(value) => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={(value) => handleChange('imdbId', value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allFieldsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
