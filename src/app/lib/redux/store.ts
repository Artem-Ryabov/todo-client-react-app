import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoApi from '@/widgets/TodoList/lib/redux/service';

const rootReducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer
});

function initStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(todoApi.middleware)
  });
}

export default initStore;
