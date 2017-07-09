import React, { Component } from 'react';
import '../App.css';
import PersonCard from './PersonCard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      crawlText: '',
      fetchedInfo: null,
      fetchedInfoType: '',
      fetching: false,
      fetchError: '',
    };
  }

  componentDidMount() {
    this.fetchCrawl();
  }

  fetchInfoFromApi(param) {
    this.setState({fetching: true, fetchedInfoType: param});
    return fetch(`http://swapi.co/api/${param}`)
      .then(response => response.json())
      .catch(err => this.setState({fetchError: err}))
      .then(json => this.setState({
        fetching: false,
        fetchedInfo: json.results,
      }));
  }

  fetchCrawl() {
    const episode = Math.ceil(Math.random() * 7);
    this.setState({fetching: true});
    return fetch(`http://swapi.co/api/films/${episode}`)
      .then(response => response.json())
      .catch(err => this.setState({fetchError: err}))
      .then(jsonResponse => this.setState({fetching: false, crawlText: jsonResponse.opening_crawl}));
  }

  fetchPlanets() {
    console.log('Fetch Planets Called!');
    this.fetchInfoFromApi('planets');
  }

  planetCard(planet) {
    return (
      <article
      className="planetCard"
      key={planet.created}>
        <p>{planet.name}</p>
      </article>
    )
  }
  vehicleCard(vehicle) {
    debugger;
    return (
      <article
      className="vehicleCard"
      key={vehicle.created}>
        <p>{vehicle.name}</p>
      </article>
    )
  }

  render() {
    const planetCard = this.planetCard;
    const vehicleCard = this.vehicleCard;
    return (
      <div className="App">
        <section className="crawl-text">
          <p>
            {this.state.crawlText}
          </p>
      {this.state.fetching && <p>fetching data!</p>}
        </section>
        <section>
          <article>
            <button
              onClick={()=>this.fetchInfoFromApi('people')}
              children='people'
            />
            <button
              onClick={() => this.fetchInfoFromApi('planets')}
              children='planets'
            />
            <button
              onClick={() => this.fetchInfoFromApi('vehicles')}
              children='vehicles'
            />
          </article>
          {this.state.fetchedInfo && this.state.fetchedInfo.map((result) => {
            return (
              <section key={result.created}>
                {this.state.fetchedInfoType === 'people' && <PersonCard person={result} />}
                {this.state.fetchedInfoType === 'planets' && planetCard(result)}
                {this.state.fetchedInfoType === 'vehicles' && vehicleCard(result)}
              </section>
            )
          })}
        </section>
      </div>
    );
  }
}

export default App;
