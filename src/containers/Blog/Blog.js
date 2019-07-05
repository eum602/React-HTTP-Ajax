import React, { Component, Suspense } from 'react';//importing suspense to make it work together to React.lazy
import './Blog.css';
import {Route, NavLink, Switch} from 'react-router-dom'
//import NewPost from './NewPost/NewPost'
import asyncComponent from '../../hoc/asyncComponent' //importing the hoc which will help us load lazily
//imports must go first and then const variable
const asyncNewPost = asyncComponent(()=>{//this arrow function will only be executed when asuncNewPost will be executed.
    return import('./NewPost/NewPost') //import() is a special syntax used for dynamic imports
})
/********************************* */
//import Posts from './Posts/Posts';
const Posts = React.lazy(() => import('./Posts/Posts'))//using the built in method that is available from react 16.6 or higher
//so it allows us to import in the same way we did before but using React.lazy instead of a custom asyncComponent
/********************************* */

class Blog extends Component {
    state = {
        auth:true
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
                    {this.state.auth?<Route path="/new-post" component = {asyncNewPost}/>:null}{/**executing asyncNewPost
                    only when auth and path="/new-post" conditions are met*/}
                    <Route path="/posts" 
                    render= {() => (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Posts/> {/**in this route we use render instead to component = {Posts}, also suspense 
                                        is important in order to load our lazy Post component */}
                        </Suspense>
                    )}
                    /> 
                    <Route render={()=><h1>NOT FOUND</h1>}/> {/**If no authenticated or 
                    none of routes matches the we show not found, NOTICE WE ARE NOT USING ANY PATH because
                    this is the default if nothing matches*/}
                    {/*<Redirect from="/" to="/posts"/>*/} {/**Redirecting to URL /posts path="/posts" handle this*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;
/**You can use that not only with Router but anywhere when you want to upload content conditionally and thus load content gradually */

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