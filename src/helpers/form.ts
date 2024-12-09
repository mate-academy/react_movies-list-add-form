import { Props } from '../components/TextField/TextField';

interface FormInputsProps {
  titleValue: string;
  setTitleValue: (value: string) => void;
  descriptionValue: string;
  setDescriptionValue: (value: string) => void;
  imgUrlValue: string;
  setImgUrlValue: (value: string) => void;
  imdbUrlValue: string;
  setImdbUrlValue: (value: string) => void;
  imdbIdValue: string;
  setImdbIdValue: (value: string) => void;
}

export const getFormInputs = (props: FormInputsProps): Props[] => {
  const {
    titleValue,
    setTitleValue,
    descriptionValue,
    setDescriptionValue,
    imgUrlValue,
    setImgUrlValue,
    imdbUrlValue,
    setImdbUrlValue,
    imdbIdValue,
    setImdbIdValue,
  } = props;

  return [
    {
      name: 'title',
      label: 'Title',
      value: titleValue,
      onChange: setTitleValue,
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      value: descriptionValue,
      onChange: setDescriptionValue,
      required: true,
    },
    {
      name: 'imgUrl',
      label: 'Image URL',
      value: imgUrlValue,
      onChange: setImgUrlValue,
      required: true,
    },
    {
      name: 'imdbUrl',
      label: 'Imdb URL',
      value: imdbUrlValue,
      onChange: setImdbUrlValue,
      required: true,
    },
    {
      name: 'imdbId',
      label: 'Imdb ID',
      value: imdbIdValue,
      onChange: setImdbIdValue,
      required: true,
    },
  ];
};
