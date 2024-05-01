import { Footnote, Group, Title } from "@vkontakte/vkui";
import styles from '../styles/CommentsListItem.module.scss';
import { FC, ReactElement } from "react";
import { IGetNewsItemResponse } from "../../../store/types/apiResponseTypes";
import { transformUnixTime } from "../../../utils";

interface IDeletedCommentProps {
    comment: IGetNewsItemResponse
}

export const DeletedComment: FC<IDeletedCommentProps> = ({ comment }): ReactElement => {

    const { minutes, hours, day, month, year } = transformUnixTime(comment.time);

    return (
        <Group
            separator='hide'
            className={
                [styles.comment, styles.comment_deleted].join(' ')
            }
        >
            <Title
                level='2'
                Component={'h3'}
            >
                Deleted comment
            </Title>
            <Footnote>
                {`${hours}:${minutes} ${day}.${month}.${year}`}
            </Footnote>
        </Group>
    );
}