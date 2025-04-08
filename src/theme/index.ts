import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Primary brand colors
const colors = {
  primary: {
    50: '#e6f0ff',
    100: '#b8d4ff',
    200: '#8ab9ff',
    300: '#5c9eff',
    400: '#2e82ff',
    500: '#0068ff', // primary brand color
    600: '#0051cc',
    700: '#003b99',
    800: '#002466',
    900: '#000d33',
  },
  secondary: {
    50: '#f2f0fe',
    100: '#d8d1fc',
    200: '#bdb2fa',
    300: '#a393f8',
    400: '#8874f6',
    500: '#6d55f4', // secondary brand color
    600: '#5744c3',
    700: '#413392',
    800: '#2b2262',
    900: '#151131',
  },
  success: {
    500: '#38b2ac',
  },
  warning: {
    500: '#ecc94b',
  },
  error: {
    500: '#e53e3e',
  },
  gray: {
    50: '#f7fafc',
    100: '#edf2f7',
    200: '#e2e8f0',
    300: '#cbd5e0',
    400: '#a0aec0',
    500: '#718096',
    600: '#4a5568',
    700: '#2d3748',
    800: '#1a202c',
    900: '#171923',
  },
};

// Component styles
const components = {
  Button: {
    baseStyle: {
      borderRadius: 'md',
      fontWeight: 'medium',
    },
    variants: {
      solid: {
        bg: 'primary.500',
        color: 'white',
        _hover: {
          bg: 'primary.600',
        },
      },
      outline: {
        border: '1px solid',
        borderColor: 'primary.500',
        color: 'primary.500',
      },
      ghost: {
        color: 'primary.500',
        _hover: {
          bg: 'primary.50',
        },
      },
    },
    defaultProps: {
      variant: 'solid',
      size: 'md',
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'lg',
        boxShadow: 'md',
        p: 4,
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'semibold',
    },
  },
};

// Typography
const fonts = {
  heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

// Radii 
const radii = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
};

// Spacing
const space = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

// Sizes for heights and widths
const sizes = {
  max: 'max-content',
  min: 'min-content',
  full: '100%',
  '3xs': '14rem',
  '2xs': '16rem',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
};

// Custom theme properties
const customTheme = extendTheme({
  config,
  colors,
  fonts,
  components,
  radii,
  space,
  sizes,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
});

export default customTheme;