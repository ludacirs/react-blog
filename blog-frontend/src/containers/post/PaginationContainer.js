import React from 'react';
import Pagination from "../../components/post/Pagination";
import {useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import qs from "qs";

const PaginationContainer = ({match, location}) => {
    const {lastPage, posts, loading} = useSelector(({posts, loading})=>({
        lastPage: posts.lastPage,
        posts: posts.posts,
        loading: loading['posts/LIST_POST']
    }));
    if(!posts|| loading) return null;
    const {username} = match.params;
    const {tag,page=1} = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    return (
        <Pagination
            tag={tag}
            page={Number(page)}
            username={username}
            lastPage={lastPage}
        />)
};

export default withRouter(PaginationContainer);
