import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general'
  }

  static propTypes  = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

   constructor() {
      super();
     this.state = {
       articles: [],
       loading: true,
       page: 1,
     }
  }
  
  async componentDidMount()  { 
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7200102f1f7440c48a9d8b88cacef6c7&pageSize=${this.props.pageSize}&page=1`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, loading: false,  page:1, totalResults: parsedData.totalResults});
  }

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7200102f1f7440c48a9d8b88cacef6c7&pageSize=${this.props.pageSize}&page=${this.state.page-1}`;
     this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, loading: false, page: this.state.page-1,});
   }

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7200102f1f7440c48a9d8b88cacef6c7&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
       this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ articles: parsedData.articles, loading: false, page: this.state.page + 1, });
    }
   }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin:'15px 0px'}}>Top Headlines</h1>
       {this.state.loading && <Spinner />}
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
                    author={ element.author == null ? 'Unknown' : element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })
          ) : (
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              height: "100vh", 
              width:"150vh"
            }}>
              <p style={{ 
                width: "700px", 
                height: "700px", 
                textAlign: "center", 
                lineHeight: "700px", 
                border: "1px solid black" 
              }}>
                No articles available
              </p>
            </div>
          )}

        </div>  
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Revious</button>
          <button disabled={(this.state.page > 1 && this.state.articles === undefined)? true :  this.state.page + 1 > Math.ceil(this.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
