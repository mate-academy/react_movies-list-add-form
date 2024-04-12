import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie: React.FC<{
  formData: Movie;
  setFormData: React.Dispatch<React.SetStateAction<Movie>>,
  setAdd: React.Dispatch<React.SetStateAction<string>>,
}> = ({
  formData,
  setFormData,
  setAdd,
}) => {
  const [count] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;
    console.log(`🚀 ~ handleChange ~ ${name}:`, value)
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddMovie = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (formData.title && formData.imgUrl && formData.imdbUrl && formData.imdbId && formData.description) {
      setAdd('add');
      setFormData({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    } else {
      alert("Some of your field wasn't entered");
    }
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAddMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
