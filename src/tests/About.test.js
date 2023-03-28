import { screen } from '@testing-library/react';
import React from 'react';
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

  it('should contain a pokedex image', () => {
    renderWithRouter(<About />);
    const imagePokedex = screen.getByRole('img', { name: /pokédex/i });
    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
