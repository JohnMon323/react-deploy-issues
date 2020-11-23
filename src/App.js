import React from 'react'
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      issues: []
    };
  }
  componentDidMount() {
    this.getIssues()
  }


  getIssues = () =>{
    fetch("https://api.github.com/search/issues?q=repo:kamranahmedse/developer-roadmap/ type:issue")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            issues: result.items
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, issues } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div class="container">


          <>
            <h4>This is the list from Kamranahmedse USER and developer-roadmap REPO</h4>
            <p>Created by Jonathan Montiel</p>
            <p>React, Github API lack of pagination because I'm still exploring the API, trying to include the headers for the link parameter</p>
          </>

          <div class="list-group">
            {issues.map(issue => (
              <a class="list-group-item list-group-item-action flex-column align-items-start" key={issue.id}>
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{issue.title}</h5>
                  <small>Number: {issue.number} - State: {issue.state}</small>
                </div>
                <p>Id: {issue.id}</p>
                <p>URL: {issue.html_url}</p>
                <a href={issue.html_url} target="_blank" class="mb-1">{issue.body.substring(0,120)} " ... Read More"</a>
                <br/>
                <small>Created at: {issue.created_at}</small>
                <br />
                <small>Comments: <span class="badge badge-secondary">{issue.comments}</span></small>
              </a>
            ))}
          </div>

        </div>
        
      );
    }
  }
}


export default App;
