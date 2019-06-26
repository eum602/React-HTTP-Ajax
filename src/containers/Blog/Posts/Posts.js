import React, {Component} from 'react'
import axios from '../../../axios' //using my custom instances of axios
import Post from '../../../components/Post/Post'
import './Posts.css'
import {Link} from 'react-router-dom' //using simple Link instead of NavLink because 
//I am not going to add any style yet.

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId:null,
        error:false //error to show when errors appear
    }
    componentDidMount(){
        //console.log("[Post.js] ComponentDidMount",this.props)
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
        this.setState({selectedPostId:id})
    }
    render(){
        let posts = <p style={{textAlign:'center'}}>Something went wrong</p>
        if(!this.state.error){
            posts = this.state.posts.map(post=>{
                return (
                <Link to={`/${post.id}`} key={post.id}> {/*key={post.id}  MUST go here because LINK is now the
                outer element for ach element in our array of elements, so it must have unique identifier  */}
                    <Post
                        title={post.title}
                        author = {post.author} 
                        clicked = {()=>this.postSelectedHandler(post.id)}
                    />
                </Link>
                )
            })
        }

        return(
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts

