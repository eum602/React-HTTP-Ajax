import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route} from 'react-router-dom'
import NewPost from './NewPost/NewPost'

class Blog extends Component {   
    
    render () {        
        
        return (            
            <div className="Blog">
                <div>
                    <header>
                        <nav>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/new-post">New Post</a></li>
                            </ul>
                        </nav>
                    </header>
                </div>
                <Route path="/" exact component = {Posts}/> {/*Component => renders react components ,strictly seen on "/" and no one else  */}
                <Route path="/new-post" component = {NewPost}/> {/*seen in all pages because lacks of "exact" word */}
            </div>
        );
    }
}

export default Blog;