import { FC, useState } from 'react';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import './NewMovie.scss';

// interface Form {
//   title: string;
//   description: string;
//   imgUrl: string;
//   imdbUrl: string;
//   imdbId: string;
// }

type Props = {
  // [key: string]: string;
  onAddMovie: (
    title: string,
    description:
    string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string
  ) => void;
};

export const NewMovie: FC<Props> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onAddMovie(title, description, imgUrl, imdbUrl, imdbId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Image Url"
        value={imgUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImgUrl(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Imbd  Url"
        value={imdbUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImdbUrl(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Imbd Id"
        value={imdbId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImdbId(e.target.value)}
      />

      <Button type="submit" onSubmit={handleSubmit}>Add</Button>
    </form>
  );
};
