/* eslint-disable max-len */
import { useState } from 'react';
import { TextField } from '../TextField';

const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

type Props = {
  onAdd: (title: string, description: string, imgUrl: string,
    imdbUrl: string, imdbId: string) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [id, setId] = useState('');
  const [checkImageUrl, setCheckImageUrl] = useState(true);
  const [checkImdbUrl, setCheckImdbUrl] = useState(true);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!image.match(pattern)) {
      setCheckImageUrl(false);
    }

    if (!url.match(pattern)) {
      setCheckImdbUrl(false);
    }

    if (!url.match(pattern) || !image.match(pattern)) {
      return;
    }

    setCheckImageUrl(true);
    setCheckImdbUrl(true);
    onAdd(title, description, image, url, id);
    setTitle('');
    setDescription('');
    setImage('');
    setUrl('');
    setId('');
    setCount(current => current + 1);
  };

  const toTitle = (name: string) => {
    setTitle(name);
  };

  const toDescription = (about: string) => {
    setDescription(about);
  };

  const toImage = (picture: string) => {
    setCheckImageUrl(true);
    setImage(picture);
  };

  const toUrl = (link: string) => {
    setCheckImdbUrl(true);
    setUrl(link);
  };

  const toId = (idImdb: string) => {
    setId(idImdb);
  };

  const checkForm = !(title && image && url && id);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={toTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={toDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={image}
        onChange={toImage}
        checkImageUrl={checkImageUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={url}
        onChange={toUrl}
        checkImdbUrl={checkImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={id}
        onChange={toId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
