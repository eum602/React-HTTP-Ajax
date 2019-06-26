import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state={
        loadedPost:null
    }
    componentDidMount(){
        //console.log(this.props)
        if(this.props.match.params.id){//passing the id that comes because of the ROUTING.
            if(!this.state.loadedPost||(this.state.loadedPost && this.state.loadedPost.id!==this.props.match.params.id)){
                //this condition is to make sure setState does not enter in an infinite loop
                axios.get(`/posts/${this.props.match.params.id}`)//posts because of global axios default baseurl
                .then(response=>{
                    this.setState({loadedPost:response.data})
                })
            }            
            
        }
    }

    deletePostHandler = () => {
        axios.delete(`/posts/${this.props.match.params.id}`)//posts because of global axios default baseurl
        .then(response=>{
            console.log(response)
        })
    }

    render () {
        let post = <p style= {{textAlign:"center"}}>Please select a Post!</p>;
        if(this.props.match.params.id){
            post = <p style= {{textAlign:"center"}}>Loading...!</p>;
        }
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;