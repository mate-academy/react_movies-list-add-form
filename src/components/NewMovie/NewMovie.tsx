import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie: React.FC<{
  formData: Movie;
  add: string;
  setFormData: React.Dispatch<React.SetStateAction<Movie>>,
  setAdd: React.Dispatch<React.SetStateAction<string>>,
}> = ({
  formData,
  add,
  setFormData,
  setAdd,
}) => {
  const [count, setCount] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddMovie = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (
      formData.title &&
      formData.imgUrl &&
      formData.imdbUrl &&
      formData.imdbId
    ) {
      setAdd('add');
      setCount(() => count + 1);
    } else {
      alert("Some of your field wasn't entered");
    }
  };

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }, [add, setFormData]);

  const handleDisabled = (): boolean => {
    if (
      formData.title &&
      formData.imgUrl &&
      formData.imdbUrl &&
      formData.imdbId
    ) {
      return false;
    } else {
      return true;
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
        count={count}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        count={count}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleChange}
        count={count}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleChange}
        count={count}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleChange}
        count={count}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAddMovie}
            disabled={handleDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
