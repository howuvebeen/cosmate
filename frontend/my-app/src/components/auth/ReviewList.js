
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getTokenUser } from "../../actions/authActions";
import { getProduct } from "../../actions/authActions";
import { getReviewList } from "../../actions/authActions";

class ReviewList extends Component {
    static propTypes = {
      getProduct: PropTypes.func.isRequired,
      product: PropTypes.object,
  
      getReviewList: PropTypes.func.isRequired,
      review: PropTypes.object,
  
      getTokenUser: PropTypes.func.isRequired,
      user: PropTypes.object,
  
      authenticated: PropTypes.bool
    };
  
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: false};
    }

    componentWillMount() {
        this.props.getProduct(this.props.UR);
        this.props.getReviewList(this.props.UR);
    
        const token = localStorage.getItem("token");
        this.props.getTokenUser(token);
      }
  
      
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
  
    LikeButton(props) {
      return (
        <button onClick={props.onClick}>
          Like
        </button>
      );
    }
    
    UnlikeButton(props) {
      return (
        <button onClick={props.onClick}>
          Unlike
        </button>
      );
    }

    Tag(type) {
      if (type != null){
        var arrayLength = type.length;
        var result = "";
        for (var i = 0; i < arrayLength; i++) {
          if (type[i] == "O") {
            var result = result.concat("Oily");
          } else if (type[i] == "D") {
            var result = result.concat("Dry");
          } else {
            var result = result.concat("Combinational");
          }
          var result = result.concat(" ");
        }
        return result;
      };  
    }
  
    List(type) {
      if (type != null){
        var arrayLength = type.length;
        var result = "";
        for (var i = 0; i < arrayLength; i++) {
          if (type[i] == "T") {
            var result = result.concat("Trouble");
          } else if (type[i] == "A") {
            var result = result.concat("Acne");
          } else if (type[i] == "SS") {
            var result = result.concat("Sensitive Skin");
          } else {
            var result = result.concat("None");
          }
          var result = result.concat(" ");
        }
        return result;
      } 
    };
    
    Star(star){
      if (star != null){
        if (star < 1){
          return "☆☆☆☆☆";
        } else if (star >= 1 && star < 2) {
          return "★☆☆☆☆";
        } else if (star >= 2 && star < 3) {
          return "★★☆☆☆";
        } else if (star >= 3 && star < 4) {
          return "★★★☆☆";
        } else if (star >= 4 && star < 5) {
          return "★★★★☆";
        } else {
          return "★★★★★";
        }
      }
    };

    renderInfluencerA(review) {
      const product = this.props.product;

      return (
        <div>
          <div class="row p-3 ml-3">
            <div class="col-md-6">
              <h4>{review.author}✅</h4>
              <p>{review.pub_date}</p>
              <p>Skin Type: {this.Tag(review.skintype)}</p>
              <p>Skin Issue: {this.List(review.skinissue)}</p>
              <p>Age: {review.age}</p>
            </div>
            <div class="col-md-5 pt-2">
              <p>{this.Star(review.star)}</p>
              <h5>{review.title}</h5>
              <p>{review.review}</p>
              <Link to={`/skincare/${product.category[0].toLowerCase()}/${product.pk}/review/edit`} class="text-md-left mr-4">Edit</Link>
              <Link to={`/skincare/moisturizers/${product.pk}/review/delete`} class="text-md-left">Delete</Link>
            </div>
            <div class="pr-auto pt-2">
              <button action="submit" className="btn btn-light">Like</button>
            </div>
          </div>
          <hr/>
        </div>
      )
    };

    renderInfluencerN(review) {
      return (
        <div>
          <div class="row p-3 ml-3">
            <div class="col-md-6">
              <h4>{review.author}✅</h4>
              <p>{review.pub_date}</p>
              <p>Skin Type: {this.Tag(review.skintype)}</p>
              <p>Skin Issue: {this.List(review.skinissue)}</p>
              <p>Age: {review.age}</p>
            </div>
            <div class="col-md-5 pt-2">
              <p>{this.Star(review.star)}</p>
              <h5>{review.title}</h5>
              <p>{review.review}</p>
            </div>
            <div class="pr-auto pt-2">
              <button action="submit" className="btn btn-light">Like</button>
            </div>
          </div>
          <hr />
        </div>
      )
    };

    renderNoninfluencerA(review) {
      const product = this.props.product;

      return (
        <div>
          <div class="row p-3 ml-3">
            <div class="col-md-6">
              <h4>{review.author}</h4>
              <p>{review.pub_date}</p>
              <p>Skin Type: {this.Tag(review.skintype)}</p>
              <p>Skin Issue: {this.List(review.skinissue)}</p>
              <p>Age: {review.age}</p>
            </div>
            <div class="col-md-5 pt-2">
              <p>{this.Star(review.star)}</p>
              <h5>{review.title}</h5>
              <p>{review.review}</p>
              <Link to={`/skincare/${product.category[0].toLowerCase()}/${product.pk}/review/edit`} class="text-md-left mr-4">Edit</Link>
              <Link to={`/skincare/moisturizers/${product.pk}/review/delete`} class="text-md-left">Delete</Link>
            </div>
            <div class="pr-auto pt-2">
              <button action="submit" className="btn btn-light">Like</button>
            </div>
          </div>
          <hr />
        </div>
      )
    };

    renderNoninfluencerN(review) {
      return (
        <div>
          <div class="row p-3 ml-3">
            <div class="col-md-6">
              <h4>{review.author}</h4>
              <p>{review.pub_date}</p>
              <p>Skin Type: {this.Tag(review.skintype)}</p>
              <p>Skin Issue: {this.List(review.skinissue)}</p>
              <p>Age: {review.age}</p>
            </div>
            <div class="col-md-5 pt-2">
              <p>{this.Star(review.star)}</p>
              <h5>{review.title}</h5>
              <p>{review.review}</p>
            </div>
            <div class="pr-auto pt-2">
              <button action="submit" className="btn btn-light">Like</button>
            </div>
          </div>
          <hr />
        </div>
      )
    };

    renderTitleI(){
      return(
        <div>
          <h4 class="card p-2">Influencer Reviews</h4>
        </div>
      )
    }

    renderTitleNI(){
      return(
        <div>
          <h4 class="card p-2">Reviews</h4>
        </div>
      )
    }

    renderReviewList() {
      const user = this.props.user;

      const reviews = this.props.review;
      const reviewI = [];
      const reviewNI = [];

      let result = []; 

      if (reviews != null){
        let review;
        let mine = 0;
        let i;
        for (i = 0; i < reviews.length; i++) {
          review = reviews[i];
          if (review.influencer == "Y"){
            if (mine != 0 || user.username != review.author){
              reviewI.push(i);
            } else {
              mine = 1;
              reviewI.unshift(i)
            }
          } else if (review.influencer == "N"){
            if (mine != 0 || user.username != review.author){
              reviewNI.push(i)
            } else {
              mine = -1;
              reviewNI.unshift(i)
            } 
          }
        }

        result.push(this.renderTitleI());
        if (reviewI.length > 0) {
          for (i = 0; i < reviewI.length; i++) {
            review = reviews[reviewI[i]];
            if (mine == 1) {
              result.push(this.renderInfluencerA(review));
            } else {
              result.push(this.renderInfluencerN(review));
            }
          }
        }

        result.push(this.renderTitleNI());
        if (reviewNI.length > 0) {
          for (i = 0; i < reviewNI.length; i++) {
            review = reviews[reviewNI[i]];
            if (mine == -1) {
              result.push(this.renderNoninfluencerA(review));
            } else {
              result.push(this.renderNoninfluencerN(review));
            }
          }
        }
      } return result;
    }

    
    render() {
      return (
        <div>
          {this.renderReviewList()}
        </div>
      );
    }
  }
  
  function mapStateToProps(state) {
    return {
      product: state.auth.product,
      review: state.auth.review,
      authenticated: state.auth.authenticated,
      user: state.auth.user
    };
  }
  
  export default connect(mapStateToProps, { getProduct, getReviewList, getTokenUser})(ReviewList);
  