import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import palette from "../../lib/styles/palette";

const TagBoxBlock = styled.div`
  width: 100%;;
  border-top: 1px solid ${palette.gray[2]};
  padding: 2rem;
  
  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 256px;
  border: 1px solid ${palette.gray[9]};
  input,button {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  input {
      padding: 0.5rem;
      flex: 1;
      min-width: 0;
  }
  button {
      cursor: pointer;
      padding-right: 1rem;
      padding-left: 1rem;
      border: none;
      background: ${palette.gray[8]};
      color: white;
      font-weight: bold;
      &:hover{
        background: ${palette.gray[6]};
      }
  }
`;
const Tag = styled.div`
  margin-top: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;
const TagItem = React.memo(({tag,onRemove})=><Tag onClick={()=>onRemove(tag)}>#{tag}</Tag>);



const TagList = React.memo(({tags,onRemove})=> (
    <TagListBlock>
        {tags.map(tag=>(
            <TagItem onRemove={onRemove} key={tag} tag={tag} />
        ))}
    </TagListBlock>
));



const TagBox = ({tags, onChangeTags}) => {
    const [input, setInput] = useState('');
    const [localTags, setLocalTags] = useState(tags);

    const onChange = useCallback(e => {
        console.log(e.target.value);
        return setInput(e.target.value);
    },[]);

    const insertTag = useCallback(tag=>{
        if(localTags.includes(tag)) return ;
        if(!tag) return ;

        const nextTags = localTags.concat(tag);
        setLocalTags(nextTags);
        onChangeTags(nextTags);
    }, [localTags, onChangeTags]);

    const onRemove = useCallback(targetTag=>{
        const nextTags = localTags.filter(tag=> tag!==targetTag);
        setLocalTags(nextTags);
        onChangeTags(nextTags);
    },[localTags, onChangeTags]);

    const onSubmit = useCallback(e => {
        e.preventDefault();
        insertTag(input.trim());
        setInput('');
    },[input, insertTag]);

    useEffect(()=>{
        setLocalTags(tags)
    },[tags]);

    return (
        <TagBoxBlock>
            <h4>태그</h4>
            <TagForm onSubmit={onSubmit}>
                <input onChange={onChange} value={input} placeholder={'태그를 입력하세요'}/>
                <button type={"submit"}>추가</button>
            </TagForm>
            <TagList tags={localTags} onRemove={onRemove}/>
        </TagBoxBlock>
    );
};

export default TagBox;
