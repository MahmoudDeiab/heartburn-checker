import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const runSaga = saga => sagaMiddleware.run(saga);

export default sagaMiddleware;
