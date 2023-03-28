import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const favoritesLink = screen.getByRole('link', { name: /favorite/i });
    expect(favoritesLink).toBeInTheDocument();
  });

  it('should redirect to / on home link click', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('should redirect to /about on about link click', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('should redirect to /favorites on favorite link click', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(favoritesLink);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('should redirect to Not Found page when trying to access unavailable pathname', () => {
    const { history } = renderWithRouter(<App />);
    const UNAVAILABLE_URL = '/greymon';

    act(() => {
      history.push(UNAVAILABLE_URL);
    });

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
