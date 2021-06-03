import React from 'react';
import TagBox from "../../components/write/TagBox";
import {useDispatch, useSelector} from "react-redux";
import {changeField} from "../../modules/write";

const TagBoxContainer = () => {
    const {tags} = useSelector(({write})=>({
        tags: write.tags
    }));
    const dispatch = useDispatch();
    const onChangeTags = nextTags=>{
        dispatch(changeField({key: 'tags',value: nextTags}));
    };

    return <TagBox tags={tags} onChangeTags={onChangeTags}/>;
};

export default TagBoxContainer;
