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
  const [img, setImg] = useState('');
  const [url, setUrl] = useState('');
  const [id, setId] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);

  const checkIfAllFieldsFilled = () => {
    if (title && img && url && id) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
    checkIfAllFieldsFilled();
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
    checkIfAllFieldsFilled();
  };

  const handleUrlChange = (newValue: string) => {
    setUrl(newValue);
    checkIfAllFieldsFilled();
  };

  const handleImgChange = (newValue: string) => {
    setImg(newValue);
    checkIfAllFieldsFilled();
  };

  const handleIdChange = (newValue: string) => {
    setId(newValue);
    checkIfAllFieldsFilled();
  };

  const setNewValue = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: img.trim(),
      imdbUrl: url.trim(),
      imdbId: id.trim(),
    });

    setTitle('');
    setDescription('');
    setUrl('');
    setId('');
    setImg('');
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={setNewValue}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => handleTitleChange(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => handleDescriptionChange(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={img}
        onChange={event => handleImgChange(event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={url}
        onChange={event => handleUrlChange(event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={id}
        onChange={event => handleIdChange(event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
