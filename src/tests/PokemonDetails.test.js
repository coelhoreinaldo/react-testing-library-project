import React from 'react';
import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
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
});

// Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido;

// Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;

// Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização;

// A imagem da localização deve ter um atributo src com a URL da localização;

// A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon.
