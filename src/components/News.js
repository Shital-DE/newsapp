import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `News - ${this.capitalizaString(this.props.category)}`;
  }

  capitalizaString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updatedNews(page) {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7200102f1f7440c48a9d8b88cacef6c7&pageSize=${this.props.pageSize}&page=${page}`;
    this.props.setProgress(25);
    this.setState({ loading: true });
    this.props.setProgress(50);
    let data = await fetch(url);
    this.props.setProgress(75);
    let parsedData = await data.json();
    this.props.setProgress(90);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      page: page,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updatedNews(1);
  }

  // handlePreviousClick = async () => {
  //   this.updatedNews(this.state.page - 1 );
  //  }

  // handleNextClick = async () => {
  //   this.updatedNews(this.state.page + 1);
  // }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${
      this.props.pageSize
    }&page=${this.state.page + 1}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      page: this.state.page + 1,
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "15px 0px" }}>
          Top {this.capitalizaString(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={
            this.state.articles === undefined ? 0 : this.state.articles.length
          }
          next={this.fetchMoreData}
          hasMore={
            this.state.articles !== undefined
              ? this.state.articles.length !== this.state.totalResults
              : false
          }
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles && this.state.articles.length > 0 ? (
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={
                          element.title == null
                            ? ""
                            : element.title.slice(0, 45)
                        }
                        description={
                          element.description == null
                            ? ""
                            : element.description.slice(0, 88)
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={
                          element.author == null ? "Unknown" : element.author
                        }
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    height: "10vh",
                    width: "100vw",
                  }}
                >
                  <p style={{ textAlign: "center" }}>No articles available</p>
                </div>
              )}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Revious</button>
          <button disabled={(this.state.page > 1 && this.state.articles === undefined)? true :  this.state.page + 1 > Math.ceil(this.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div> */}
      </div>
    );
  }
}

export default News;
