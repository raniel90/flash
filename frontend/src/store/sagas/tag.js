import api from '../../services/api';
import { Creators } from '../ducks/tag';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';


export function* getTags() {
  try {
    yield put(Creators.tagRequest());
    const response = yield call(api.get, 'tags');

    yield put(Creators.tagSuccess(response.data));
  } catch (err) {
    yield put(Creators.tagError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar tags'
    }));
  }
}

export function* postTag({ data }) {
  try {
    yield put(Creators.tagRequest());
    const response = yield call(api.post, 'tags', data);

    yield put(Creators.tagSuccess(response.data));
  } catch (err) {
    yield put(Creators.tagError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao criar tag'
    }));
  }
}