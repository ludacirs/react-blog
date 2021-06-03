import React from 'react';
import styled from 'styled-components';
import Responsive from "../common/Responsive";
import palette from "../../lib/styles/palette";
import Tags from "../common/Tags";
import SubInfo from "../common/SubInfo";
import {Helmet} from "react-helmet-async";

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;
const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`;

const PostViewer = ({post, error, loading, actionButtons}) => {
    if(error) {
        if( error.response && error.response.status ===404) {
            return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
        }
        return <PostViewerBlock>에러 발생!</PostViewerBlock>
    }
    if(loading || !post){
        return null;
    }
    const {title, body, tags, user, publishedDate} = post;
    return (
        <PostViewerBlock>
            <PostHead>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                <h1>{title}</h1>
                <SubInfo username={user.username} hasMarginTop publishedDate={publishedDate}/>
                <Tags tags={tags}/>
            </PostHead>
            {actionButtons}
            <PostContent dangerouslySetInnerHTML={{__html: body}}/>
        </PostViewerBlock>
    );
};

export default PostViewer;
