import React from 'react';
import { render } from '@testing-library/react';
import JApp from './JApp';

test('renders learn react link', () => {
  const { getByText } = render(<JApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
