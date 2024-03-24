import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isFormValidation = Boolean(
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim(),
  );

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCount(count + 1);
    reset();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const fields = [
    {
      name: 'title',
      label: 'Title',
      required: true,
      onChange: setTitle,
      value: title,
    },
    {
      name: 'description',
      label: 'Description',
      onChange: setDescription,
      value: description,
    },
    {
      name: 'imgUrl',
      label: 'Image URL',
      required: true,
      onChange: setImgUrl,
      value: imgUrl,
    },
    {
      name: 'imdbUrl',
      label: 'Imdb URL',
      required: true,
      onChange: setImdbUrl,
      value: imdbUrl,
    },
    {
      name: 'imdbId',
      label: 'Imdb ID',
      required: true,
      onChange: setImdbId,
      value: imdbId,
    },
  ];

  const textFields = fields.map(field => (
    <TextField
      key={field.name}
      name={field.name}
      label={field.label}
      value={field.value}
      onChange={field.onChange}
      required={field.required}
    />
  ));

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>
      {textFields}
      <div className="field is-grouped">
        <div className="control">
          <button
            onClick={handleSubmit}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValidation}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
