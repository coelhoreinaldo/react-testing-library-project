import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';
// import pokemonList from '../data';

const isPokemonFavorite = {
  4: true,
  10: false,
  25: true,
};

// const isPokemonFavorite = {
//   4: true,
//   10: false,
//   23: false,
//   25: true,
//   65: false,
//   78: false,
//   143: false,
//   148: false,
//   151: false,
// };

const pokemonList = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
  },
];

describe('Pokedex.js', () => {
  it('should have an h2 with the text "Encountered Pokémon"', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
    const encounteredPokemonTitle = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(encounteredPokemonTitle).toBeInTheDocument();
  });

  it('should show the next pokemon on "Próximo Pokémon" click', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(nextBtn);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(nextBtn);

    const pikachu1 = screen.getByText(/pikachu/i);
    expect(pikachu1).toBeVisible();
  });
});
