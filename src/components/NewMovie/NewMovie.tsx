import { FormEvent, useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [showSubmit, setShowSubmit] = useState(true);
  const [count, setCount] = useState(0);
  const [formInfo, setFormInfo] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  useEffect(() => {
    const isFormComplete = () => {
      return (
        formInfo.title.trim() !== '' &&
        formInfo.imgUrl.trim() !== '' &&
        formInfo.imdbUrl.trim() !== '' &&
        formInfo.imdbId.trim() !== ''
      );
    };

    setShowSubmit(!isFormComplete());
  }, [formInfo]);

  const handleChange = (name: string, value: string) => {
    setFormInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newMovie: Movie = {
      title: formInfo.title,
      description: formInfo.description,
      imgUrl: formInfo.imgUrl,
      imdbUrl: formInfo.imdbUrl,
      imdbId: formInfo.imdbId,
    };

    onAdd(newMovie);

    setFormInfo({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(count + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        onChange={value => {
          handleChange('title', value);
        }}
        value={formInfo.title}
        required
      />

      <TextField
        onChange={value => {
          handleChange('description', value);
        }}
        name="description"
        label="Description"
        value={formInfo.description}
      />

      <TextField
        required
        onChange={value => {
          handleChange('imgUrl', value);
        }}
        name="imgUrl"
        label="Image URL"
        value={formInfo.imgUrl}
      />

      <TextField
        required
        onChange={value => {
          handleChange('imdbUrl', value);
        }}
        name="imdbUrl"
        label="Imdb URL"
        value={formInfo.imdbUrl}
      />

      <TextField
        required
        onChange={value => {
          handleChange('imdbId', value);
        }}
        name="imdbId"
        label="Imdb ID"
        value={formInfo.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={showSubmit}
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
