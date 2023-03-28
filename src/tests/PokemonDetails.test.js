import React from 'react';
import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import pokemonList from '../data';
import App from '../App';

const pikachuDetails = '/pokemon/25';

describe('PokemonDetails.js', () => {
  it('should show detailed info of the selected pokemon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pikachuDetails);
    });
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
});
