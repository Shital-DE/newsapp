import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

   constructor() {
      super();
     this.state = {
       articles: [],
       loading: true,
       page: 1,
     }
  }
  
  async componentDidMount()  { 
    let url = 'https://newsapi.org/v2/everything?q=from=2025-01-03&to=2025-01-03&apiKey=7200102f1f7440c48a9d8b88cacef6c7&pageSize=9&page=1';
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, loading: false,  page:1, totalResults: parsedData.totalResults});
  }

  handlePreviousClick = async () => {
     let url = `https://newsapi.org/v2/everything?q=from=2025-01-03&to=2025-01-03&apiKey=7200102f1f7440c48a9d8b88cacef6c7&pageSize=9&page=${this.state.page-1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, loading: false, page: this.state.page-1,});
   }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.totalResults / 12)) {
      
    } else {
      let url = `https://newsapi.org/v2/everything?q=from=2025-01-03&to=2025-01-03&apiKey=7200102f1f7440c48a9d8b88cacef6c7&pageSize=9&page=${this.state.page + 1}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ articles: parsedData.articles, loading: false, page: this.state.page + 1, });
    }
   }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">Top Headlines</h1>
        
        <div className="row">
          
         {this.state.articles !== undefined ? (
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title == null ? '' : element.title.slice(0, 45)}
                    description={element.description == null ? '' : element.description.slice(0, 88)}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })
          ) : (
            <p>No articles available</p> // Fallback when articles are empty
          )}

        </div>  
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Revious</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.totalResults / 12)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
