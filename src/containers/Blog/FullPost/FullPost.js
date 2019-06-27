import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state={
        loadedPost:null
    }
    componentDidMount(){
        console.log('[FullPost] ... componentDidMount',this.props)
        this.loadData()
    }

    componentDidUpdate(){
        console.log('[FullPost]...componentDidUpdate', this.props.match.params.id)
        this.loadData() //calling loadData to update the state, while it is true that the props
        //updates because we clicked some post and that updated the url and thus the props that came to
        //this FullPost component were updated; that do not guarantee that our state is updateed,
        //to solve this, we use componentDidUpdate so that when updated porps come here then we call loadData to 
        //use the updated id and request the correspondent post to the server and then update the state
        //and thus show updated post
    }

    loadData=()=>{
        if(this.props.match.params.id){//passing the id that comes because of the ROUTING.
            if(!this.state.loadedPost||(this.state.loadedPost && this.state.loadedPost.id!==+this.props.match.params.id)){
                //using "+" to convert string to number, that is because loadedPost comest from a server, and in that
                //loaded post the id is a number
                //another way to verify is to simply use "!=" which only verifies value.
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
/**
 * Parsing Query Parameters & the Fragment
You learned how to extract route parameters (=> :id  etc). 

But how do you extract search (also referred to as "query") parameters (=> ?something=somevalue  at the end of the URL)? How do you extract the fragment (=> #something  at the end of the URL)?

Query Params:
You can pass them easily like this:

<Link to="/my-path?start=5">Go to Start</Link> 

or

<Link 
    to={‌{
        pathname: '/my-path',
        search: '?start=5'
    }}
    >Go to Start</Link>
React router makes it easy to get access to the search string: props.location.search .

But that will only give you something like ?start=5 

You probably want to get the key-value pair, without the ?  and the = . Here's a snippet which allows you to easily extract that information:

componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
        console.log(param); // yields ['start', '5']
    }
}
URLSearchParams  is a built-in object, shipping with vanilla JavaScript. It returns an object, which exposes the entries()  method. entries()  returns an Iterator - basically a construct which can be used in a for...of...  loop (as shown above).

When looping through query.entries() , you get arrays where the first element is the key name (e.g. start ) and the second element is the assigned value (e.g. 5 ).

Fragment:
You can pass it easily like this:

<Link to="/my-path#start-position">Go to Start</Link> 

or

<Link 
    to={‌{
        pathname: '/my-path',
        hash: 'start-position'
    }}
    >Go to Start</Link>
React router makes it easy to extract the fragment. You can simply access props.location.hash
 */