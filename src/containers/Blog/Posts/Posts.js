import React, {Component} from 'react'
import axios from '../../../axios' //using my custom instances of axios
import Post from '../../../components/Post/Post'
import './Posts.css'

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId:null,
        error:false //error to show when errors appear
    }
    componentDidMount(){
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
                return <Post key={post.id} title={post.title} author = {post.author} clicked = {()=>this.postSelectedHandler(post.id)}/>
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

