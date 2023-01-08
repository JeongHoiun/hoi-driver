import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MuiTheme } from '../styles/MuiTheme';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={MuiTheme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
