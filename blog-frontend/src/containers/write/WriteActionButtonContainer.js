import React, { useEffect} from 'react';
import WriteActionButton from "../../components/write/WriteActionButton";
import {useDispatch, useSelector} from "react-redux";
import {updatePost, writePost} from "../../modules/write";
import {withRouter} from "react-router-dom";

const WriteActionButtonContainer = ({history}) => {
    const dispatch = useDispatch();
    const {title,body,tags,post,postError,originalPostId} = useSelector(({write})=>({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId: write.originalPostId
    }));

    const onPublish = (!originalPostId) ? ()=>dispatch(writePost({title,body,tags})) : ()=>dispatch(updatePost({id: originalPostId, title, body, tags}));
    const onCancel = ()=>history.goBack();

    useEffect(()=>{
        if(post){
            console.log('post success');
            console.log(post);
            const {_id, user} = post;
            history.push(`/@${user.username}/${_id}`);
            return ;
        }
        if(postError){
            console.log('post failure');
            console.log(postError);
        }
    },[history, post, postError])

    return <WriteActionButton onPublish={onPublish} onCancel={onCancel}/>;
};

export default withRouter(WriteActionButtonContainer);
