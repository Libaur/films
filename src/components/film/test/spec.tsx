import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShortDescription } from '../short-desc';
import { Preview } from '../preview';
import { shortDescProps, shortDescChildren, previewProps } from './mock-data';

test('loads and displays children', async () => {
  render(<ShortDescription props={shortDescProps}>{shortDescChildren}</ShortDescription>);
  const element = await screen.findByRole('paragraph');

  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(shortDescChildren);
});

test('loads and click on', async () => {
  render(<Preview {...previewProps} />);
  const element = await screen.findByTitle(previewProps.title);

  expect(element).toBeInTheDocument();
  expect(userEvent.click(element));
});
