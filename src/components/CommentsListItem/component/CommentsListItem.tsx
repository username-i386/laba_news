import { FC, ReactElement, useState } from "react";
import styles from '../styles/CommentsListItem.module.scss';
import { useGetNewsItemQuery } from "../../../store/api/hackerNewApi";
import { Paragraph, Footnote, Title, Group, Div } from "@vkontakte/vkui";
import { transformUnixTime } from "../../../utils";
import { CommentsList } from "../../CommentsList";
import { DeletedComment } from "./DeletedComment";

interface ICommentsListItemProps {
    commentId: number
}

export const CommentsListItem: FC<ICommentsListItemProps> = ({ commentId }): ReactElement => {

    const { data: comment } = useGetNewsItemQuery(commentId);
    
    const [toggleNestedComments, setToggleNestedComments] = useState<boolean>(false);

    if(!comment) return <></>
    if(comment.deleted) return <DeletedComment comment={comment} />

    const { minutes, hours, day, month, year } = transformUnixTime(comment.time);
    
    return (
        <>
            <Group
                padding={'m'}
                mode='card'
                separator='hide'
            >
                <Div
                    className={
                        comment.kids ?
                            [styles.comment, styles.comment_hasChild].join(' ')
                            : styles.comment
                    }
                    onClick={() => setToggleNestedComments(prev => !prev)}
                >
                    <Title
                        level='2'
                        Component={'h3'}
                    >
                        {comment.by} 
                    </Title>
                    <Paragraph
                        className={styles.comment__text}
                    >
                        {comment.text}
                    </Paragraph>
                    <Footnote>
                        {`${hours}:${minutes} ${day}.${month}.${year}`}
                    </Footnote>
                    <Footnote>
                        comments {comment.kids ? comment.kids.length : '0'}
                    </Footnote>
                </Div>
                {(toggleNestedComments && comment.kids) ? 
                    <CommentsList
                        commentsIds={comment.kids}
                    />
                    : <></>
                }
            </Group>
            
        </>
    );
}