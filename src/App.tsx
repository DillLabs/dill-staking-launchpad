import React, { useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import { Grommet } from 'grommet';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { grommetTheme } from './styles/grommetTheme';
import { styledComponentsTheme } from './styles/styledComponentsTheme';
import { Routes as RoutedContent } from './Routes';
import { GlobalStyles } from './styles/GlobalStyles';
import { reducers } from './store/reducers';
import { LocalizedRouter } from './components/LocalizedRouter';
import { Footer } from './components/Footer';

export const store = createStore(
  reducers,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const history = createBrowserHistory();

let providers: EIP6939.EIP6963ProviderDetail[] = [];

export const App: React.FC = () => {
  useEffect(() => {
    function onAnnouncement(event: EIP6939.EIP6963AnnounceProviderEvent) {
      if (providers.map(p => p.info.uuid).includes(event.detail.info.uuid))
        return;
      providers = [...providers, event.detail];
      (window as any).providers = providers;
    }
    window.addEventListener('eip6963:announceProvider', onAnnouncement);
    window.dispatchEvent(new Event('eip6963:requestProvider'));
    return window.removeEventListener(
      'eip6963:announceProvider',
      onAnnouncement
    );
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <LocalizedRouter history={history}>
        <Provider store={store}>
          <Grommet theme={grommetTheme}>
            <ThemeProvider theme={styledComponentsTheme}>
              <GlobalStyles />
              <RoutedContent />
              {/* <Footer /> */}
            </ThemeProvider>
          </Grommet>
        </Provider>
      </LocalizedRouter>
    </Web3ReactProvider>
  );
};
