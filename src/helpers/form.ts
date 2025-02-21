import { Props } from '../components/TextField/TextField';

interface FormInputsProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  imgUrl: string;
  setImgUrl: (value: string) => void;
  imdbUrl: string;
  setImdbUrl: (value: string) => void;
  imdbId: string;
  setImdbId: (value: string) => void;
}

export const getFormInputs = (props: FormInputsProps): Props[] => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    imgUrl,
    setImgUrl,
    imdbUrl,
    setImdbUrl,
    imdbId,
    setImdbId,
  } = props;

  return [
    {
      name: 'title',
      label: 'Title',
      value: title,
      onChange: setTitle,
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      value: description,
      onChange: setDescription,
      required: true,
    },
    {
      name: 'imgUrl',
      label: 'Image URL',
      value: imgUrl,
      onChange: setImgUrl,
      required: true,
    },
    {
      name: 'imdbUrl',
      label: 'Imdb URL',
      value: imdbUrl,
      onChange: setImdbUrl,
      required: true,
    },
    {
      name: 'imdbId',
      label: 'Imdb ID',
      value: imdbId,
      onChange: setImdbId,
      required: true,
    },
  ];
};
