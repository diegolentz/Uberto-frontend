import { SxProps, Theme } from '@mui/system';

export const appBarStyles: SxProps<Theme> = {
    borderBottomRightRadius: '1rem',
    borderBottomLeftRadius: '1rem',
    boxShadow: 0,
    height: '3.5rem',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    left: '1rem',
    zIndex: 10,
};

export const typographyStyles: SxProps<Theme> = {
    fontFamily: 'monospace',
    fontWeight: 700,
    color: 'white',
    textDecoration: 'none',
    padding: '1rem',
};