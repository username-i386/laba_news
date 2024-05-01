import { FC, ReactElement } from "react";
import styles from '../styles/CommentsList.module.scss';
import { List } from "@vkontakte/vkui";
import { CommentsListItem } from "../../CommentsListItem";


interface ICommentsListProps {
    commentsIds: number[]
}

export const CommentsList: FC<ICommentsListProps> = ({ commentsIds }): ReactElement => {
    return (
        <List
            className={styles.commentsList}
        >
            {commentsIds.map(commentId => {
                return (
                    <CommentsListItem 
                        key={commentId} 
                        commentId={commentId} 
                    />
                );
            })}
        </List>
    );
}