import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type PropsNewMovie = {
  onAdd: (movie: Movie) => void;
};

export enum Naming {
  title = 'title',
  description = 'description',
  imgUrl = 'imgUrl',
  imdbUrl = 'imdbUrl',
  imdbId = 'imdbId',
}

export const NewMovie: React.FC<PropsNewMovie> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const reset = () => {
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const notReadyToSubmit =
    !formData.title ||
    !formData.imgUrl ||
    !formData.imdbUrl ||
    !formData.imdbId;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: Naming,
  ) => {
    const { value } = event.target;

    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (notReadyToSubmit) {
      return;
    }

    onAdd({
      title: formData.title,
      description: formData.description,
      imgUrl: formData.imgUrl,
      imdbUrl: formData.imdbUrl,
      imdbId: formData.imdbId,
    });

    setCount(currentCount => currentCount + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name={Naming.title}
        label="Title"
        value={formData.title}
        onChange={event => handleChange(event, Naming.title)}
        required
      />

      <TextField
        name={Naming.description}
        label="Description"
        value={formData.description}
        onChange={event => handleChange(event, Naming.description)}
      />

      <TextField
        name={Naming.imgUrl}
        label="Image URL"
        value={formData.imgUrl}
        onChange={event => handleChange(event, Naming.imgUrl)}
        required
      />

      <TextField
        name={Naming.imdbUrl}
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={event => handleChange(event, Naming.imdbUrl)}
        required
      />

      <TextField
        name={Naming.imdbId}
        label="Imdb ID"
        value={formData.imdbId}
        onChange={event => handleChange(event, Naming.imdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={notReadyToSubmit}
            type="submit"
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
