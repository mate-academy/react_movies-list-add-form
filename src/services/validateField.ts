import { validateUrl } from './validUrl';
import { validateInput } from './validtext';

type SaveObject = {
  title: boolean;
  imgUrl: boolean;
  imdbUrl: boolean;
  imdbId: boolean;
};

export const validateField = (
  fieldName: string,
  fieldValue: string,
  // saveObject: SaveObject,
  setfunction: React.Dispatch<React.SetStateAction<SaveObject>>,
) => {
  switch (fieldName) {
    case 'title':
      setfunction((prevSaveObject) => ({
        ...prevSaveObject,
        [fieldName]: !validateInput(fieldValue),
      }));
      break;
    case 'imgUrl':
      setfunction((prevSaveObject) => ({
        ...prevSaveObject,
        [fieldName]: !validateUrl(fieldValue),
      }));
      break;
    case 'imdbUrl':
      setfunction((prevSaveObject) => ({
        ...prevSaveObject,
        [fieldName]: !validateUrl(fieldValue),
      }));
      break;
    case 'imdbId':
      setfunction((prevSaveObject) => ({
        ...prevSaveObject,
        [fieldName]: !validateInput(fieldValue),
      }));
      break;
    default:
      setfunction((prevSaveObject) => ({
        ...prevSaveObject,
        [fieldName]: false,
      }));
  }
};
