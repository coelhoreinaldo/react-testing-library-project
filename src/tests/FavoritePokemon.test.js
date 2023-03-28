import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

const favoritedPokemons = [
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
];

describe('FavoritePokemon.js', () => {
  it('should return a message when there is no favorite pokémon', () => {
    const emptyFavorites = [];
    renderWithRouter(<FavoritePokemon pokemonList={ emptyFavorites } />);

    const noFavorites = screen.getByText(/no favorite pokémon found/i);
    expect(noFavorites).toBeInTheDocument();
  });

  it('should show only favorited pokémons', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ favoritedPokemons } />);

    const pikachuName = screen.getByText('Pikachu');
    expect(pikachuName).toBeInTheDocument();

    const pikachuImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuImg).toBeInTheDocument();

    const detailsPokemon = screen.getAllByRole('link', { name: /more details/i });
    expect(detailsPokemon).toHaveLength(2);

    const caterpieName = screen.queryByText('Caterpie');
    expect(caterpieName).not.toBeInTheDocument();
  });
});
