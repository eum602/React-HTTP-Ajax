import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch,Redirect} from 'react-router-dom'
import NewPost from './NewPost/NewPost'

class Blog extends Component {
    state = {
        auth:false
    }
    
    render () {
        
        return (
            <div className="Blog">
                <div>
                    <header>
                        <nav>
                            <ul>
                                <li>
                                    <NavLink 
                                        to="/posts" 
                                        exact //exact makes sure this links is active only If 
                                        //path matches the value for "to": "/"
                                        activeClassName="my-active" //setting a custom class name
                                        //for this anchor when this is active, otherwise react-router-dom
                                        //assigns automatic "active" name for such class.
                                        activeStyle={{/*Setting style for when this anchor is active (this is
                                            optional, because we are setting a special properties for when this 
                                            anchor is active) */
                                            color:'#aab',
                                            textDecoration:'underline'
                                        }}
                                        >
                                        Posts
                                    </NavLink></li>{/*By using
                                    NavLink a new class called active is AUTOMATICALLY assigned
                                    Also by using exact we tell react that the full path
                                    should match with "/" in order to render this and so to set the anchor tag
                                    with a class "active" by default*/}
                                <li><NavLink to={{/*Similar to Link, NavLink allows for complex options
                                    also there is no need to specify "exact" keyword because
                                    here we do not have nested links which should not trigger the active class*/
                                    pathname:"/new-post",
                                    hash:"#submit",//a hash
                                    search:'?quick-submit=true'
                                }}>New Post</NavLink></li>{/*http://localhost:3000/new-post?quick-submit=true#submit */}
                                                               
                            </ul>
                        </nav>
                    </header>
                </div>

                <Switch>
                    {this.state.auth?<Route path="/new-post" component = {NewPost}/>:null}{/**Simple routes must go FIRST */}
                    <Route path="/posts" component = {Posts}/> {/**NESTED ROUTES MUST GO AFTER SIMPLE ROUTES
                    This is the ROOT route for Posts component.
                    */}
                    <Redirect from="/" to="/posts"/> {/**Redirecting to URL /posts path="/posts" handle this*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;

/*
Absolute path is always appended to your domain, so if you use: “/new-post” it means it is 
attached to your ROOT domain www.example.com => www.example.com/new-post .
Even if your base path is www.example.com/posts and you use “/new-post” the you wouldn’t 
be redirected to www.example.com/posts/new-post instead you will be redirected to
 your ROOT PATH => www.example.com/new-post  and posts will be ommited.

When using "to" (<Link to={{//...}}) it is always threatened as an absolute path, so no matter if you put
 “/new-post” or simply “new-post” it will be always redirected to your root path.

To turn to a relative path you must use your path in a dynamyc way to set the final url:
pathname:${this.props.match.url}`/new-post`,

so we append the current full path to the direction we want to go. So if this.props,match.url is “www.example.com/posts” 
then the final pathname will be: “www.example.com/posts/new-post”
*/