import React,{useEffect} from 'react'
import {Paper,Typography, CircularProgress, Divider } from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import moment from "moment"
import {useParams, useHistory} from "react-router-dom"

import useStyles from "./styles"
import {getPost, getPostBySearch} from '../../actions/posts'

const PostDetails = () => {
    const {post,posts, isLoading} = useSelector((state)=> state.posts)
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const {id} = useParams()

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    useEffect(() => {
        if(post) {
            dispatch(getPostBySearch({search: 'none', tags: post?.tags.join(',')}))
        }
    }, [post])

    if(!post) return null

    if(isLoading) {
        return (<Paper elevation={6} className = {classes.loadingPaper} >
            <CircularProgress size = "7em" />
        </Paper>)
    }

    const openPost = (_id) => history.push(`/posts/${_id}`)

    const recommendedPosts = posts.filter(({_id}) => _id !== post._id)
    
    return (
        <Paper styles = {{padding:'20px', borderRadius:'15px'}} elevation = {6} >
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} /> */}
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {recommendedPosts.length && (
                <div className = {classes.section} >
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
                            <div style = {{margin:"20px", cursor:"pointer"}} onClick = {() => openPost(_id) } key = {_id} >
                                <Typography gutterBotton variant = "h6">{title}</Typography>
                                <Typography gutterBotton variant = "subtitle2">{name}</Typography>
                                <Typography gutterBotton variant = "subtitle2">{message}</Typography>
                                <Typography gutterBotton variant = "subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt="" width = "200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </Paper> 
    )
}

export default PostDetails
