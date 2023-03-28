import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('NotFound.js', () => {
  it('should have an h2 with the text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  it('should contain a specific image', () => {
    renderWithRouter(<NotFound />);

    const pikachuCryingImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(pikachuCryingImg).toBeInTheDocument();
    expect(pikachuCryingImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
