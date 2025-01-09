import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLeading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `News - ${this.capitalizaString(props.category)}`;

  const capitalizaString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updatedNews = async (page) => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7200102f1f7440c48a9d8b88cacef6c7&pageSize=${props.pageSize}&page=${page}`;
    props.setProgress(25);
    setLeading(true);
    props.setProgress(50);
    let data = await fetch(url);
    props.setProgress(75);
    let parsedData = await data.json();
    props.setProgress(90);
    setArticles(parsedData.articles);
    setLeading(false);
    setPage(page);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    updatedNews(1);
  }, []);

  // handlePreviousClick = async () => {
  //   this.updatedNews(this.state.page - 1 );
  //  }

  // handleNextClick = async () => {
  //   this.updatedNews(this.state.page + 1);
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&pageSize=${
      props.pageSize
    }&page=${page + 1}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setLeading(false);
    setPage(page);
    setTotalResults(parsedData.totalResults);
    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   loading: false,
    //   page: this.state.page + 1,
    //   totalResults: parsedData.totalResults,
    // });
  };

  // render() {
  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "15px 0px" }}>
        Top {capitalizaString(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles === undefined ? 0 : articles.length}
        next={fetchMoreData}
        hasMore={
          articles !== undefined ? articles.length !== totalResults : false
        }
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles && articles.length > 0 ? (
              articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={
                        element.title == null ? "" : element.title.slice(0, 45)
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
          <button disabled={(this.state.page > 1 && this.state.articles === undefined)? true :  this.state.page + 1 > Math.ceil(this.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
        </div> */}
    </div>
  );
  // }
};

News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
