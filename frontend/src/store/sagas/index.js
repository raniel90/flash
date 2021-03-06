import { all, takeLatest } from 'redux-saga/effects';
import { Types as AuthTypes } from '../ducks/auth';
import { Types as TagTypes } from '../ducks/tag';

import { signInRequest, signOutRequest } from './auth';
import { getTags, postTag } from './tag';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signInRequest),
    takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOutRequest),
    takeLatest(TagTypes.GET_TAGS, getTags),
    takeLatest(TagTypes.POST_TAG, postTag)
  ])
}