import React from 'react';

import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Store from './redux/Store';
import PreviewPanel from './PreviewPanel';
import Filters from './Filters';

describe('<PreviewPanel />', () => {
  test('renders correctly', () => {
    const page = render(
      <Provider store={Store}>
        <HashRouter>
          <PreviewPanel name="testName" url="testUrl" type={Filters.PLANETS} />
        </HashRouter>
      </Provider>,
    );

    expect(page.asFragment()).toMatchSnapshot();
  });
});
