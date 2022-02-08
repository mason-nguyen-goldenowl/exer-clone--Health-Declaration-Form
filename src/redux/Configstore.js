import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

import { FormReducer } from "./reducer/FormReducer";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  FormReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
