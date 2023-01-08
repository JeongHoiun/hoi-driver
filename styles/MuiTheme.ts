import { createTheme } from '@mui/material/styles';

export const MuiTheme = createTheme({
    palette: {
        primary: {
            main: '#8388ff'
        },
        secondary: {
            main: '#ff8e88'
        }
    },
    typography: {
        subtitle1: {
            fontSize: '14px',
            fontWeight: 500,
            color: '#333'
        },
        subtitle2: {
            fontSize: '12px',
            fontWeight: 500,
            color: '#333'
        },
        body1: {
            fontSize: '14px',
            color: '#666'
        },
        body2: {
            color: '#666',
            fontSize: '12px'
        },
        h6: {
            color: '#333',
            fontSize: '14px'
        },
        h5: {
            color: '#333',
            fontSize: '16px'
        },
        h4: {
            color: '#333',
            fontSize: '18px'
        },
        h3: {
            color: '#333',
            fontSize: '20px'
        },
        h2: {
            color: '#333',
            fontSize: '24px'
        },
        h1: {
            color: '#333',
            fontSize: '32px'
        }
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '8px 16px',
                    textTransform: 'none'
                }
            }
        }
    }
});
