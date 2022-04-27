import { useState } from 'react';

type Props = {
  onAdd: (movies:Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, newTitle] = useState('');
  const [description, newDescription] = useState('');
  const [imgUrl, newImgUrl] = useState('');
  const [imdbUrl, newImdbUrl] = useState('');
  const [imdbId, newImdbId] = useState('');

  const reset = () => {
    newTitle('');
    newDescription('');
    newImgUrl('');
    newImdbUrl('');
    newImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    reset();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'newTitle':
        newTitle(value);
        break;
      case 'newDescription':
        newDescription(value);
        break;
      case 'newImgUrl':
        newImgUrl(value);
        break;
      case 'newImdbUrl':
        newImdbUrl(value);
        break;
      case 'newImdbId':
        newImdbId(value);
        break;
      default:
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="newTitle"
        placeholder="Type title here"
        value={title}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="newDescription"
        placeholder="Type description here"
        value={description}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="newImgUrl"
        placeholder="Enter image Url"
        value={imgUrl}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="newImdbUrl"
        placeholder="Enter Imdb Url"
        value={imdbUrl}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="newImdbId"
        placeholder="Enter Imdb Id"
        value={imdbId}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Add new film</button>
    </form>
  );
};
