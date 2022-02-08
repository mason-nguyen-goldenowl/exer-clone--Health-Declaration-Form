import { ADD_FACTOR, ADD_ILL, SUBMIT } from "../type/FormType";

const stateDefaut = {
  factor: [],
  ill: [],
  values: {},
};
export const FormReducer = (state = stateDefaut, action) => {
  switch (action.type) {
    case ADD_FACTOR: {
      state.factor = action.factor;
      state.values = { ...state.values, factor: state.factor };

      return { ...state };
    }

    case ADD_ILL: {
      state.ill = action.ill;
      state.values = { ...state.values, ill: state.ill };

      return { ...state };
    }

    case SUBMIT: {
      state.values = action.values;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
