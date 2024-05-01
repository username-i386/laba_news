import { FC, ReactElement } from "react";
import styles from '../styles/NewListItem.module.scss';
import { useGetNewsItemQuery } from "../../../store/api/hackerNewApi";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { transformUnixTime } from "../../../utils";
import { Paragraph, SimpleCell, Text, Title } from "@vkontakte/vkui";
import { IGetNewsItemResponse } from "../../../store/types/apiResponseTypes";

interface INewsListItemProps {
    newsId: number
    panel: 'home' | 'currentNews'
    index?: number
}

export const NewsListItem: FC<INewsListItemProps> = ({ newsId, index, panel }): ReactElement => {

    const { data: news} = useGetNewsItemQuery(newsId);

    const routeNavigator = useRouteNavigator();

    if(!news) return <></>;

    function openNews(newsId: number, news: IGetNewsItemResponse ) {
        if (panel === 'home') {
            routeNavigator.push(`/currentNews/${newsId}`);
        } else if (panel === 'currentNews') {
            window.open(news.url);
        }
    }

    const { minutes, hours, day, month, year } = transformUnixTime(news.time);

    return (
        <SimpleCell
            Component={'article'}
            className={styles.newsListItem}
            onClick={() => openNews(newsId, news)}
        >
            <Title
                className={styles.newsListItem__title}
                level='2'
                Component={'h2'}
            >
                {(typeof index === 'number') ? index + 1 + '. ' : ''} 
                {news.title}
            </Title>
            <Text
                className={styles.newsListItem__subtitle}
            >
                <Paragraph>
                    athor: {news.by}
                </Paragraph>
                <Paragraph>
                    rating: {news.score}
                </Paragraph>
                <Paragraph>
                    date: {`${hours}:${minutes} ${day}.${month}.${year}`}
                </Paragraph>
            </Text>
        </SimpleCell>
    );
}