import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch} from 'react-router-dom' //Using NavLink instead of Link,
//because it allows us to manage styling classes
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'

class Blog extends Component {   
    
    render () {
        
        return (
            <div className="Blog">
                <div>
                    <header>
                        <nav>
                            <ul>
                                <li>
                                    <NavLink 
                                        to="/" 
                                        exact
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
                                        Home
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
                <Route path="/" exact component = {Posts}/> {/*As this component is outside theSwitch then
                this route is ALWAYS analyzed */}
                <Switch> {/**By using switch we make sure ONLY THE FIRST ROUTE that matches the STRUCTURE
                pathname OF THE CLICKED LINK is which is rendered, after that Switch STOPS analizing the remaining routes*/}
                    <Route path="/new-post" component = {NewPost}/> {/*seen in all pages because lacks of "exact" word */}
                    {/*routing order is important so it MUST go after NewPost routing*/}
                    <Route path="/:id" exact component = {FullPost} /> {/*If we put
                    this route before /new-post route then this(/:id is rendered which is incorrect
                    SO ORDER ROUTES IS VERY IMPORTANT especially when working with SWITCH)*/}
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