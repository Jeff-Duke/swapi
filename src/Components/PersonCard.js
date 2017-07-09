import React, { Component } from 'react';

export default class PersonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.person,
      homeworld: this.fetchPlanetInfo(),
      species: this.fetchSpeciesInfo(),
    }
  }

  fetchPlanetInfo() {
    const planet = this.props.person.homeworld;
    return fetch(planet)
      .then(planet => planet.json())
      .catch(err => console.error(err))
      .then(planetInfo => planetInfo);
  }

  fetchSpeciesInfo() {
    const species = this.props.person.species[0];
    return fetch(species)
      .then(species => species.json())
      .catch(err => console.error(err))
      .then(speciesInfo => speciesInfo);
  }

  render() {
    const person = this.state.person;
    const homeworld = this.state.homeworld;
    const species = this.state.species;
    return (
      this.state.homeworld && this.state.species && <article key={person.created}>
        <p>Name: {person.name}</p>
        <p>Homeworld: {homeworld.name}</p>
        <p>Language: {species.language}</p>
        <p>Population: {homeworld.population}</p>
      </article>
    )
  }
}
