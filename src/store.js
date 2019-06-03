import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";

import sagaMiddleware, { runSaga } from "./middleware/sagaMiddleware";
import rootSaga from "./sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, enhancer);

runSaga(rootSaga);
