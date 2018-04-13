import React, { Component } from 'react';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: props.data,
      loading: props.data.length ? false : true,
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }

  componentDidMount () {
    if (!this.state.repos.length) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  
  fetchRepos (lang) {
    this.setState(() => ({
      loading: true
    }))

    this.props.fetchInitialData(lang)
      .then((repos) => this.setState(() => ({
        repos,
        loading: false,
      })))
  }

  render() {
    const { repos, loading } = this.state;

    if (loading === true) {
      return <p>LOADING</p>
    }

    return (
      <div>
        <h1>Grid page</h1>
        <ul style={{display: 'flex', flexWrap: 'wrap'}}>
          {repos.map(({ name, owner, stargazers_count, html_url }) => (
            <li key={name} style={{margin: 30}}>
              <ul>
                <li><a href={html_url}>{name}</a></li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Grid;