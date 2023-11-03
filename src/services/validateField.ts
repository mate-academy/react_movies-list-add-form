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
  saveObject: SaveObject,
  setfunction: React.Dispatch<React.SetStateAction<any>>,
) => {
  switch (fieldName) {
    case 'title':
      setfunction({
        ...saveObject,
        [fieldName]: !validateInput(fieldValue),
      });
      break;
    case 'imgUrl':
      setfunction({
        ...saveObject,
        [fieldName]: !validateUrl(fieldValue),
      });
      break;
    case 'imdbUrl':
      setfunction({
        ...saveObject,
        [fieldName]: !validateUrl(fieldValue),
      });
      break;
    case 'imdbId':
      setfunction({
        ...saveObject,
        [fieldName]: !validateInput(fieldValue),
      });
      break;
    default:
      setfunction(false);
  }
};
