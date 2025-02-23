import storage from 'redux-persist/lib/storage';
import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { authApi } from './api/authApi';

//persist : 지속하다. //redux의 state 즉 상태값들을 지속적으로 유지시켜준다.
const persistConfig = {
  key: 'root', //key이름
  storage, //localStorage에 저장합니다.
  whitelist: [], //여러 reducer중에 해당 reducer만 localStorage에 저장
  //blacklist: [] 그것만 제외
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        //serializable == 직렬화 : OBJECT -> STRING 으로 변환
        //리덕스는 직렬화 되지 않은 값들은 에러로 처리하기 때문에 serializableCheck를 ignored 한다.(false)
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
});

export const persistor = persistStore(store);
export default store;
