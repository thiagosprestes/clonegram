import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { CustomThemeProvider } from "./src/hooks/useTheme";
import Routes from "./src/routes";
import { store } from "./src/redux/store";

export default function App() {
  let persistor = persistStore(store);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CustomThemeProvider>
            <Routes />
          </CustomThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}
