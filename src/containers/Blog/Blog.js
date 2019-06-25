import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, Link} from 'react-router-dom' //importing link to render instead of reloading
import NewPost from './NewPost/NewPost'

class Blog extends Component {   
    
    render () {        
        
        return (            
            <div className="Blog">
                <div>
                    <header>
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>{/*simple Link optio */}
                                <li><Link to={{//complex link options
                                    pathname:"/new-post",
                                    hash:"#submit",//a hash
                                    search:'?quick-submit=true'
                                }}>New Post</Link></li>{/*http://localhost:3000/new-post?quick-submit=true#submit */}
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