import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

enum MovieField {
  Title = 'title',
  Description = 'description',
  ImgUrl = 'imgUrl',
  ImdbUrl = 'imdbUrl',
  ImdbId = 'imdbId',
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleChange = (name: MovieField, newValue: string) => {
    switch (name) {
      case MovieField.Title:
        setTitle(newValue);
        break;
      case MovieField.Description:
        setDescription(newValue);
        break;
      case MovieField.ImgUrl:
        setImgUrl(newValue);
        break;
      case MovieField.ImdbUrl:
        setImdbUrl(newValue);
        break;
      case MovieField.ImdbId:
        setImdbId(newValue);
        break;
    }
  };

  const isValid = () => {
    return title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isValid()) {
      const newMovie: Movie = {
        title: title.trim(),
        description: description.trim(),
        imgUrl: imgUrl.trim(),
        imdbUrl: imdbUrl.trim(),
        imdbId: imdbId.trim(),
      };

      onAdd(newMovie);
      resetForm();
      setCount(prevCount => prevCount + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => handleChange(MovieField.Title, value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => handleChange(MovieField.Description, value)}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => handleChange(MovieField.ImgUrl, value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => handleChange(MovieField.ImdbUrl, value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => handleChange(MovieField.ImdbId, value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
