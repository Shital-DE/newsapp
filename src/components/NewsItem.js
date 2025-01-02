import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
      let  { title, description } = this.props;
    return (
        <div>
            <div className="card" style={{ width: "18rem"}}>
                <img className="card-img-top" src=".../100px180/" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href="/newsdetail" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
         </div>
    )
  }
}

export default NewsItem
