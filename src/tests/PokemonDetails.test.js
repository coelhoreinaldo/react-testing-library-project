import React from 'react';
import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

const pikachuDetails = '/pokemon/25';

describe('PokemonDetails.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pikachuDetails);
    });
  });

  it('should show detailed info of the selected pokemon', () => {
    const pikachuName = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(pikachuName).toBeInTheDocument();

    const detailsLink = screen.queryByText(/more details/i);
    expect(detailsLink).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryTitle).toBeInTheDocument();

    const pokemonDetails = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('should exist a section with the maps containing the locations of the pokemons', () => {
    const gameLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });

    expect(gameLocations).toBeInTheDocument();

    const locs = pokemonList[0].foundAt.map((location) => location);
    locs
      .forEach(({ location }) => expect(screen.getByText(location)).toBeInTheDocument());

    const locationImg1 = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(locationImg1[0].src).toBe(locs[0].map);
    expect(locationImg1[1].src).toBe(locs[1].map);
  });

  it('should be possible to favorite a pokemon', () => {
    const toFavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(toFavorite).toBeInTheDocument();

    userEvent.click(toFavorite);

    const favorites = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favorites);

    const pikachuName = screen.getByText(/pikachu/i);
    expect(pikachuName).toBeInTheDocument();
    const pikachuType = screen.getByText(/electric/i);
    expect(pikachuType).toBeInTheDocument();
    const pikachuImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuImg).toBeInTheDocument();

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const toUnfavorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(toUnfavorite);
    userEvent.click(favorites);

    const findPikachu = screen.queryByText(/pikachu/i);
    expect(findPikachu).not.toBeInTheDocument();
  });
});
