import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
const rootReducer = combineSlices();
export const makeStore = (preloadedState) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware();
        },
        preloadedState,
    });
    setupListeners(store.dispatch);
    return store;
};
export const store = makeStore();
