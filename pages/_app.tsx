import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MuiTheme } from '../styles/MuiTheme';
import '../aws/connect';

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={MuiTheme}>
                <SnackbarProvider maxSnack={3}>
                    <Component {...pageProps} />
                </SnackbarProvider>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
