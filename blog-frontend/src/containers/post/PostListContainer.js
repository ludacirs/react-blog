import React, {useEffect} from 'react';
import PostList from "../../components/post/PostList";
import {useDispatch, useSelector} from "react-redux";
import {listPosts} from "../../modules/posts";
import {withRouter} from "react-router-dom";
import {parse} from "qs";

const PostListContainer = ({location,match}) => {
    const {posts, error, user, loading} = useSelector(({posts,user,loading})=>({
        loading: loading['posts/LIST_POST'],
        user: user.user,
        posts: posts.posts,
        error: posts.error,
    }));
    const dispatch = useDispatch();

    useEffect(()=>{
        const {tag, page,username} = parse(location.search,{
            ignoreQueryPrefix: true,
        });
        dispatch(listPosts({username, page, tag}));
    },[dispatch, location.search]);


    return <PostList loading={loading} error={error} posts={posts} showWriteButton={user}/>
};

export default withRouter(PostListContainer);
