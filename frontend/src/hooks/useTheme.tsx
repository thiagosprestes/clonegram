import React, { createContext, useCallback, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeName } from '~/models/theme';
import { darkTheme } from '~/styleguide/themes/dark';
import { lightTheme } from '~/styleguide/themes/light';

interface ThemeContextData {
  toggleTheme: () => void;
  theme: Theme;
}

export interface Theme {
  name: ThemeName;
  colors: {
    primary: string;
    input: string;
    inputText: string;
    textPrimary: string;
  };
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const useTheme = () => useContext(ThemeContext);

export const CustomThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = useCallback(() => {
    const selectedTheme =
      theme.name === darkTheme.name ? lightTheme : darkTheme;

    setTheme(selectedTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
