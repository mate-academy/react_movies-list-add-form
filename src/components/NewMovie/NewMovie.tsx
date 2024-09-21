import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};
export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  // const [title, setTitle] = useState('');
  // const [imgUrl, setImgUrl] = useState('');
  // const [imdbUrl, setImdbUrl] = useState('');
  // const [imdbId, setImdbId] = useState('');
  // const [description, setDescription] = useState('');

  const [newMovie, setNewMovie] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const isFormValid = () => {
    return (
      newMovie.title.trim() &&
      newMovie.imgUrl.trim() &&
      newMovie.imdbUrl.trim() &&
      newMovie.imdbId.trim()
    );
  };

  const handleChange = (name: string) => (newValue: string) => {
    setNewMovie(prevMovie => ({
      ...prevMovie,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      title: !newMovie.title.trim(),
      imgUrl: !newMovie.imgUrl.trim(),
      imdbUrl: !newMovie.imdbUrl.trim(),
      imdbId: !newMovie.imdbId.trim(),
    };

    if (isFormValid() && !Object.values(newErrors).includes(true)) {
      onAdd({
        title: newMovie.title.trim(),
        imgUrl: newMovie.imgUrl.trim(),
        imdbUrl: newMovie.imdbUrl.trim(),
        imdbId: newMovie.imdbId.trim(),
        description: newMovie.description.trim(),
      });
    }

    // if (isFormValid()) {
    //   setTitle('');
    //   setImgUrl('');
    //   setImdbUrl('');
    //   setImdbId('');
    // }

    // if (!Object.values(newErrors).includes(true) && isFormValid()) {
    //   const newMovie: Movie = {
    //     title: title.trim(),
    //     imgUrl: imgUrl.trim(),
    //     imdbUrl: imdbUrl.trim(),
    //     imdbId: imdbId.trim(),
    //     description: description.trim(),
    //   };

    setNewMovie({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });

    // setCount(prevCount => prevCount + 1);

    //   onAdd(newMovie);
    //   setTitle('');
    //   setImgUrl('');
    //   setImdbUrl('');
    //   setImdbId('');
    // }
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange('title')}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange('description')}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange('imdbId')}
        required
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
