import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
      let  { title, description, imageUrl, newsUrl, author, date, source} = this.props;
      return (
       
          <div className='my-3'>
          <div className="card" >
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {source}
            </span>
            <img
              className="card-img-top"
              src={imageUrl == null ? 'https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D' : imageUrl}
              alt="News card"
            />
            <div className="card-body">
              <h5 className="card-title">{title} </h5>
               
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}</small></p>
                <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
              </div>
            </div>
          </div>
      
    )
  }
}

export default NewsItem
