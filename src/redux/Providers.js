'use client'
import { Provider } from "react-redux";
// import { store } from "./store";
//import store from "./store";
import { store } from "./store";

export function ProvidersCustomization({children})
{
    return <Provider store={store}>
        {children}
    </Provider>
}