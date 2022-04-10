/* eslint-disable no-console */
import { FC, useState } from 'react';
import { Button } from '../UI/Button/Button';
import { Input } from '../UI/Input/Input';
import './NewMovie.scss';

const urlRegexp = RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

type Props = {
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

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);
  const [isImdbIdValid, setIsImdbIdValid] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsTitleValid(!title);
    setIsDescriptionValid(!description);
    setIsImdbIdValid(!imdbId);

    setIsImgUrlValid(!imgUrl);
    setIsImdbUrlValid(!imdbId);

    if (!title || !description || !imdbId || !imgUrl || !imdbUrl) {
      return;
    }

    if (!urlRegexp.test(imdbId)) {
      setIsImdbUrlValid(true);
    }

    if (!urlRegexp.test(imgUrl)) {
      setIsImgUrlValid(true);
    }

    onAddMovie(title, description, imgUrl, imdbUrl, imdbId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        placeholder="Title"
        className={!isTitleValid ? 'input' : 'input input__error'}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
      />

      {isTitleValid && <small>Title is required</small>}

      <Input
        type="text"
        name="description"
        placeholder="Description"
        className="input"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(e.target.value);
        }}
      />

      {isDescriptionValid && <small>description is required</small>}

      <Input
        type="text"
        placeholder="Image Url"
        name="imgUrl"
        className="input"
        value={imgUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setImgUrl(e.target.value);
        }}
      />

      {isImgUrlValid && <small>Invalid url address</small>}

      <Input
        type="text"
        placeholder="Imbd  Url"
        name="imdbUrl"
        className="input"
        value={imdbUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setImdbUrl(e.target.value);
        }}
      />

      {isImdbUrlValid && <small>Invalid url address</small>}

      <Input
        type="text"
        placeholder="Imbd Id"
        name="imdbId"
        className="input"
        value={imdbId}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setImdbId(e.target.value);
        }}
      />

      {isImdbIdValid && <small>Id is required</small>}

      <Button type="submit" onSubmit={handleSubmit}>Add</Button>
    </form>
  );
};
