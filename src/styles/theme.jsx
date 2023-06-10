import { extendTheme } from '@chakra-ui/react'


const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}


const colors = {
    black: {
      900: "#000000",
      700: "#121212",
    },
    blue:{
        900: "#0288df",
        700:"#0d3855"
    },
    gray: {
      700: "#535353",
      600: "#8b8b8b",
      100: "#878787b6",
    },
    white: {
      900: "#fafafa",
      500: "#ffffff",
    },
  };

  const fonts = {
    heading: "Lora, serif",
    body: "'Lora', serif",
  };

  const styles = {
    global: (props) => ({
      "html, body": {
        bg: props.colorMode === "dark" ? "black.700" : "white.900",
        color: props.colorMode === "dark" ? "white.900" : "black.900",
      },
      Button: {
        color: "blue.500",
        bg: "transparent",
        _hover: {
            color: props.colorMode === "dark" ? "white.500": "blue.700",
          bg: "transparent",
        },
        _disabled_hover: {
          bg: "unset",
        },
        borderColor: "transparent",
      },
  
      h2: {
        color: props.colorMode === "light" ? "black.700" : "black.200",
      },
      "*::placeholder": {
        color: "gray.600",
      },
    }),
  };


  export const components = {
    Button: {
      baseStyle: {
        p: "0.3rem",
        minW: 5,
        fontSize: "xs",
        borderRadius: "none",
        bg: 'transparent',
        color: "blue.900",
        _focus: {
          boxShadow: "transparent",
        },
      },
      variants: {
        'link-button' : {
        bg: 'transparent',
        color:"blue.900",
        fontSize: "xs",
        minW: 5,
        h:"1.5rem",
        },
    },
    IconButton: {
          as: "span",
          color: "white.500",
          fontSize: "1.2rem",
          background: "transparent",
          borderColor: "transparent",
          _hover: {
            background: "transparent",
          },
        },
        outline: {
          background: "none",
        },
        link: {
          background: "transparent",
          _hover: {
            background: "transparent",
            textDecoration: "none",
          },
      },
    },
  };

const theme = extendTheme({ config, colors, fonts, styles, components });

export default theme