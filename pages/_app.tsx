import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { MuiTheme } from '../styles/MuiTheme';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={MuiTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
