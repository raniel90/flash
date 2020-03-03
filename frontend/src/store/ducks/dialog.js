import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

export const { Types, Creators } = createActions({
  setDialog: ['field']
});

/* Initial State */

export const INITIAL_STATE = Immutable({
  tag: false
});

/* Reducers */

export const set = (state, { field }) => state.merge({ [field]: !state[field] });

/* Reducers to types */

export default createReducer(INITIAL_STATE, {
  [Types.SET_DIALOG]: set
});
