import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {AppWrapper} from "./components/common/PageMeta.tsx";
import {HelmetProvider} from "react-helmet-async";

createRoot(document.getElementById('root')!).render(
    <>
        <HelmetProvider>
          <ThemeProvider>
            <AppWrapper>
                <Provider store={store}>
                    <App />
                </Provider>
            </AppWrapper>
          </ThemeProvider>
        </HelmetProvider>
    </>
)
