import React, {useEffect} from 'react';
import PostViewer from "../../components/post/PostViewer";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {readPost, unloadPost} from "../../modules/post";
import PostActionButtons from "../../components/post/PostActionButtons";
import {setOriginalPost} from "../../modules/write";
import {removePost} from "../../lib/api/post";

const PostViewerContainer = ({match,history}) => {
    const {postId} = match.params;
    const dispatch = useDispatch();
    const {post,error,loading, user} = useSelector(({user, post,loading})=>({
        post: post.post,
        error: post.error,
        loading: loading['post/READ_POST'],
        user: user.user
    }));

    const onRemove = async () =>{
        try{
            const result = await removePost(post._id);
            console.log(result);
            history.push('/');
        } catch (e) {
            console.log(e)
        }

    }
    const onEdit = ()=>{
        dispatch(setOriginalPost(post));
        history.push('/write');
    };
    const ownPost = (user && user._id) === (post && post.user._id);
    useEffect(()=>{
        dispatch(readPost(postId));
        return ()=> {
            dispatch(unloadPost());
        };
    },[dispatch, postId]);

    return <PostViewer post={post} error={error} loading={loading} actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove}/>}/>;
};

export default withRouter(PostViewerContainer);
