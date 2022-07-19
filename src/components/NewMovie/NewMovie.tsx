import React, { useReducer } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

const formInitialState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type FormValidityState = {
  titleError: boolean
  descriptionError: boolean
  imgUrlError: boolean
  imdbUrlError: boolean
  imdbIdError: boolean
  isFormValid: boolean
};
const initialValidityState: FormValidityState = {
  titleError: false,
  descriptionError: false,
  imgUrlError: false,
  imdbUrlError: false,
  imdbIdError: false,
  isFormValid: false,
};

type FormAction = {
  type: string
  payLoad: string
};
type FormValidityAction = {
  type: string
  payLoad: Movie
};

const formReducer = (state: Movie, action: FormAction): Movie => {
  const { payLoad, type } = action;

  switch (type) {
    case 'UPDATE_TITLE': return {
      ...state, title: payLoad,
    };
    case 'UPDATE_description': return {
      ...state, description: payLoad,
    };
    case 'UPDATE_imgUrl': return {
      ...state, imgUrl: payLoad,
    };
    case 'UPDATE_imdbUrl': return {
      ...state, imdbUrl: payLoad,
    };
    case 'UPDATE_imdbId': return {
      ...state, imdbId: payLoad,
    };
    case 'reset': return {
      ...formInitialState,
    };
    default:
      return state;
  }
};

const formValidityReducer = (state: FormValidityState,
  action: FormValidityAction): FormValidityState => {
  let isValid = false;

  const {
    descriptionError, imgUrlError, imdbIdError, imdbUrlError, titleError,
  } = state;

  switch (action.type) {
    case 'VALIDATE_title':
      isValid = action.payLoad.title.length > 0;

      return {
        ...state,
        ...({
          titleError:
          !isValid,
          isFormValid: isValid
            && !descriptionError
            && !imgUrlError
            && !imdbUrlError
            && !imdbIdError,
        }),
      };
    case 'VALIDATE_description':
      isValid = action.payLoad.description.length > 0;

      return {
        ...state,
        ...({
          descriptionError:
          !isValid,
          isFormValid: isValid
            && !titleError
            && !imgUrlError
            && imdbUrlError
            && imdbIdError,
        }),
      };
    case 'VALIDATE_imgUrl':
      isValid = action.payLoad.imgUrl.length > 0;

      return {
        ...state,
        ...({
          imgUrlError:
          !isValid,
          isFormValid: isValid
            && !titleError
            && !descriptionError
            && !imdbUrlError
            && !imdbIdError,
        }),
      };
    case 'VALIDATE_imdbUrl':
      isValid = ((action.payLoad.imdbUrl.length > 0));

      return {
        ...state,
        ...({
          imdbUrlError:
          !isValid,
          isFormValid: isValid
            && !titleError
            && !descriptionError
            && !imgUrlError
            && !imdbIdError,
        }),
      };
    case 'VALIDATE_imdbId':
      isValid = action.payLoad.imdbId.length > 0;

      return {
        ...state,
        ...({
          imdbIdError:
          !isValid,
          isFormValid: isValid
            && !titleError
            && !descriptionError
            && !imdbUrlError
            && !imgUrlError,
        }),
      };
    default:
      return state;
  }
};

export const NewMovie : React.FC<Props> = ({ addMovie }) => {
  const [inputValues, setFormData] = useReducer(
    formReducer,
    formInitialState,
  );

  const [formValidityData, setFormValidityData] = useReducer(
    formValidityReducer,
    initialValidityState,
  );

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = inputValues;

  return (
    <form>
      <input
        name="title"
        type="text"
        style={formValidityData.isFormValid
          ? { background: 'none' }
          : { background: 'none' }}
        value={title}
        placeholder="Title"
        onChange={(e) => {
          setFormData({ type: 'UPDATE_TITLE', payLoad: e.target.value });
        }}
        onBlur={() => {
          setFormValidityData({
            type: 'VALIDATE_title',
            payLoad: inputValues,
          });
        }}
      />
      <input
        name="description"
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => {
          setFormData({ type: 'UPDATE_description', payLoad: e.target.value });
        }}
        onBlur={() => {
          setFormValidityData({
            type: 'VALIDATE_description',
            payLoad: inputValues,
          });
        }}
      />
      <input
        name="imgUrl"
        type="text"
        value={imgUrl}
        placeholder="imgUrl"
        onChange={(e) => {
          setFormData({ type: 'UPDATE_imgUrl', payLoad: e.target.value });
        }}
        onBlur={() => {
          setFormValidityData({
            type: 'VALIDATE_imgUrl',
            payLoad: inputValues,
          });
        }}
      />
      <input
        name="imdbUrl"
        type="text"
        value={imdbUrl}
        placeholder="imdbUrl"
        onChange={(e) => {
          setFormData({ type: 'UPDATE_imdbUrl', payLoad: e.target.value });
        }}
        onBlur={() => {
          setFormValidityData({
            type: 'VALIDATE_imdbUrl',
            payLoad: inputValues,
          });
        }}
      />
      <input
        name="imdbId"
        type="text"
        value={imdbId}
        placeholder="imdbId"
        onChange={(e) => {
          setFormData({ type: 'UPDATE_imdbId', payLoad: e.target.value });
        }}
        onBlur={() => {
          setFormValidityData({
            type: 'VALIDATE_imdbId',
            payLoad: inputValues,
          });
        }}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          addMovie(inputValues);
          setFormData({ type: 'reset', payLoad: '' });
        }}
      >
        Add Movie
      </button>
    </form>
  );
};
