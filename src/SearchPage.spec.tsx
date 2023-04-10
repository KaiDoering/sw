import React from 'react';

import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import SearchPage from './SearchPage';
import Store from './redux/Store';

describe('<SearchPage />', () => {
  test('renders correctly', () => {
    const page = render(
      <Provider store={Store}>
        <SearchPage />
      </Provider>,
    );

    expect(page.asFragment()).toMatchSnapshot();
  });
});
