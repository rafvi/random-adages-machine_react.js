import React from 'react';
import { render } from '@testing-library/react';
import RandomAdagesMachine from './RandomAdagesMachine';

test('renders learn react link', () => {
  const { getByText } = render(<RandomAdagesMachine />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
