import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('App.js', () => {
  it('should have three links on the header', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: /favorite/i });
    expect(favoriteLink).toBeInTheDocument();
  });
});
