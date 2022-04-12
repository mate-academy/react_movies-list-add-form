import { FC, useState } from 'react';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import './NewMovie.scss';

const urlRegexp = RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

type Props = {
  onAddMovie: (
    movie: Movie,
  ) => void;
};

export const NewMovie: FC<Props> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);
  const [isImdbIdValid, setIsImdbIdValid] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsTitleValid(!title);
    setIsDescriptionValid(!description);
    setIsImdbIdValid(!imdbId);
    setIsImgUrlValid(!imgUrl);
    setIsImdbUrlValid(!imdbId);

    if (!title || !description || !imdbId || !imgUrl || !imdbUrl) {
      return;
    }

    if (!urlRegexp.test(imdbId) || !urlRegexp.test(imgUrl)) {
      setIsImdbUrlValid(false);
      setIsImgUrlValid(false);
    }

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAddMovie(movie);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <Input
        type="text"
        name="title"
        placeholder="Title"
        className={!isTitleValid ? 'input' : 'input input__error'}
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
      />

      {isTitleValid && <small className="small">Title is required</small>}

      <Input
        type="text"
        name="description"
        placeholder="Description"
        className={!isTitleValid ? 'input' : 'input input__error'}
        value={description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(event.target.value);
        }}
      />

      {isDescriptionValid && <small className="small">description is required</small>}

      <Input
        type="text"
        placeholder="Image Url"
        name="imgUrl"
        className={!isTitleValid ? 'input' : 'input input__error'}
        value={imgUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setImgUrl(event.target.value);
        }}
      />

      {isImgUrlValid && <small className="small">Invalid url address</small>}

      <Input
        type="text"
        placeholder="Imbd  Url"
        name="imdbUrl"
        className={!isTitleValid ? 'input' : 'input input__error'}
        value={imdbUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setImdbUrl(event.target.value);
        }}
      />

      {isImdbUrlValid && <small className="small">Invalid url address</small>}

      <Input
        type="text"
        placeholder="Imbd Id"
        name="imdbId"
        className={!isTitleValid ? 'input' : 'input input__error'}
        value={imdbId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setImdbId(event.target.value);
        }}
      />

      {isImdbIdValid && <small className="small">Id is required</small>}

      <Button type="submit" onSubmit={handleSubmit}>Add</Button>
    </form>
  );
};
