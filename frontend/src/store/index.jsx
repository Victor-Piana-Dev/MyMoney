import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage
import { combineReducers } from "redux";
import userSlice from "./reducers/userSlice"; 
import mostrarAlterarSlice from './reducers/HandleChangeSlice'
import listarIncluirSlice from './reducers/HandleTabsListIncludeSlice'
import activeTabSlice from './reducers/ActiveTabSlice'
import creditsSlice from './reducers/HandleCreditsList'
import debtsSlice from './reducers/HandleDebtsList'
import messageSlice from './reducers/MessageSlice'
import messageTypeSlice from './reducers/MessageTypeSlice'
import globalDataChangeTabSlice from './reducers/GlobalDataChangeTabSlice'
import billingCycleSlice from './reducers/BillingCycleSlice'

// Configuração do Redux Persist
const persistConfig = {
    key: "root",
    storage, // LocalStorage
    whitelist: ["user"], // Apenas o `user`será persistido por enquanto
};

// Combina os reducers(por enquanto estamos usando apenas o user)
const rootReducer = combineReducers({
    user: userSlice, 
    mostrarAlterar: mostrarAlterarSlice,
    listarIncluir: listarIncluirSlice,
    activeTab: activeTabSlice,
    credits: creditsSlice,
    debts: debtsSlice,
    message: messageSlice,
    messageType: messageTypeSlice,
    globalDataChange: globalDataChangeTabSlice,
    billingCycles: billingCycleSlice
});

// Aplica persistência ao reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuração da Store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Desativa erro de "non-serializable value"
        }),
});

const persistor = persistStore(store);

export { store, persistor };