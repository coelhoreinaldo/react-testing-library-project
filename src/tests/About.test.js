import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('About.js', () => {
  it('should contain pokedex title', () => {
    renderWithRouter(<About />);
    const pokedexTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });
  it('should contain pokedex info', () => {
    renderWithRouter(<About />);
    const aboutPokedex1 = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    const aboutPokedex2 = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(aboutPokedex1).toBeInTheDocument();
    expect(aboutPokedex2).toBeInTheDocument();
  });
});
