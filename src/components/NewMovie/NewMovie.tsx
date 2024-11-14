import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');
  const noErrors = title && imdbUrl && imgUrl && imdbId;
  const newForm: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (noErrors) {
      newForm.title = title.trim();
      newForm.description = description.trim();
      newForm.imgUrl = imgUrl.trim();
      newForm.imdbUrl = imdbUrl.trim();
      newForm.imdbId = imdbId.trim();

      onAdd(newForm);
      setCount(count + 1);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setimdbId('');
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={e => handleSubmit(e)}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => {
          setImgUrl(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => {
          setImdbUrl(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => {
          setimdbId(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!noErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
