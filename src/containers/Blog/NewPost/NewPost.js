import React, { Component } from 'react';
import axios from'axios'
import './NewPost.css';
import {Redirect} from 'react-router-dom'

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted:false
    }

    componentDidMount(){
        console.log(this.props)
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        //sending post requests by simply using post method from axios and 
        //passing the data as a second argument.
        axios.post('/posts',data) // /post because of global axios default baseurl
        .then(response => {
            console.log(response)
            this.setState({submitted:true})
        })
    }

    render () {
        let redirect = this.state.submitted === true ? <Redirect to="/posts"/> :null 
        /**Making CONDITIONAL REDIRECTING
         * By placing redirect into JSX code we can't place "from: '..." */
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick= {this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;