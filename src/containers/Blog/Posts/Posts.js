import React, {Component} from 'react'
import axios from '../../../axios' //using my custom instances of axios
import Post from '../../../components/Post/Post'
import './Posts.css'
import {Route} from 'react-router-dom'
import FullPost from '../FullPost/FullPost'

//I am not going to add any style yet.

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId:null,
        error:false //error to show when errors appear
    }
    componentDidMount(){
        console.log("[Post.js] ComponentDidMount",this.props.match.url)
        axios.get('/posts') // /posts because of global axios default baseurl
            .then(response=>{
                const posts  =  response.data.slice(0,4) //taking only some of the fake data
                const updatedPosts = posts.map(post =>{
                    return {...post,author:"Erick"}
                })
                this.setState({posts:updatedPosts}) //getting data
            })
            .catch(e=>{
                //this.setState({error:true})
                console.log(e)
            })
    }
    postSelectedHandler = id => {
        //this.setState({selectedPostId:id})
        //Instead of using LINK in the render we are going to state PROGRAMATIC NAVIGATION
        this.props.history.push({pathname: `/posts/${id}`}) //attaching a new PAGE to the PAGES STACK HISTORY
        //this is thanks to ROUTE made in BLOGS WHICH passes here this HISTORY object
        //this.props.history.push(`/${id}`) //OPTIONALL AND WORKS IN THE SAME WAY
        //other options are goBack and goForward
    }
    render(){
        let posts = <p style={{textAlign:'center'}}>Something went wrong</p>
        if(!this.state.error){
            posts = this.state.posts.map(post=>{
                return (
                //<Link to={`/${post.id}`} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author = {post.author} 
                        clicked = {()=>this.postSelectedHandler(post.id)}
                    />
                //</Link>
                )
            })
        }

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/**This is a NESTED ROUTE */}
                <Route path ={`${this.props.match.url}/:id`} component={FullPost} />{/**
                 path ={`${this.props.match.url}:id`} => is for DYNAMIC ROUTE so it gets the URL automatic
                 */}
            </div>
        )
    }
}

export default Posts

