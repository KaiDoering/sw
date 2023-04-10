import React from 'react';

import { render } from '@testing-library/react';

import Spinner from './Spinner';

describe('<Spinner />', () => {
  test('renders correctly', () => {
    const page = render(<Spinner />);

    expect(page.asFragment()).toMatchSnapshot();
  });
});
