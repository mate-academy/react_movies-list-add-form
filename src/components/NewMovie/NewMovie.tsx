import { useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const NewMovie = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);
  const [touched, setTouched] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const resetForm = () => {
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
    setCount(prevCount => prevCount + 1);
    setTouched({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  const validatedField = (value: string, field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true,
    }));

    return value.trim() !== '';
  };

  const isFormValid =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      const newMovie: Movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      onAdd(newMovie);
      resetForm();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
        onBlur={() => validatedField(title, 'title')}
        hasError={touched.title && !title}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        onBlur={() => validatedField(imgUrl, 'imgUrl')}
        hasError={touched.imgUrl && !imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="IMDb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        onBlur={() => validatedField(imdbUrl, 'imdbUrl')}
        hasError={touched.imdbUrl && !imdbUrl}
      />

      <TextField
        name="imdbId"
        label="IMDb ID"
        value={imdbId}
        onChange={setImdbId}
        required
        onBlur={() => validatedField(imdbId, 'imdbId')}
        hasError={touched.imdbId && !imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link"
            data-cy="submit-button"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
