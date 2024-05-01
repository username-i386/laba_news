import { FC, ReactElement, useEffect, useState } from "react";
import styles from '../styles/NewList.module.scss';
import { useGetLastNewsQuery } from "../../../store/api/hackerNewApi";
import { NewsListItem } from "../../NewsListItem";
import { FixedLayout, Header, List, ScreenSpinner, Separator, SplitCol, SplitLayout, Title } from "@vkontakte/vkui";
import { UpdateButton } from "../../UpdateButton";

export const NewsList: FC = (): ReactElement => {

    const [update, setUpdate] = useState<boolean>(false);
    const [popout, setPopout] = useState<ReactElement | null>(null);
    const { data: lastNewsId, isError, isLoading, refetch } = useGetLastNewsQuery();

    useEffect(() => {
        if (isLoading) {
            setPopout(<ScreenSpinner state='loading' />);
        } else if (isError) {
            setPopout(<ScreenSpinner state='error'>Произошла ошибка</ScreenSpinner>);
        } else {
            setPopout(null);
        }
    }, [isLoading, isError]);

    useEffect(() => {
        const refetchTimer = setTimeout(() => {
            refetch();
            setUpdate(!update)
        }, 60000);

        return () => {
            clearTimeout(refetchTimer);
        }
    }, [update]);

    if(!lastNewsId) return <></>;

    function updateNews() {
        refetch();
        setUpdate(!update)
    }

    return (
        <SplitLayout popout={popout}>
            <SplitCol>
                <FixedLayout
                    vertical="top" 
                    filled
                >
                    <Separator wide />
                    <Header
                        Component={'header'}
                        aside={
                            <UpdateButton handler={updateNews} />
                        }
                    >
                        <Title
                            Component={'h1'}
                            level='1'
                            className={styles.news__header__title}
                        >
                            News
                        </Title>
                        
                    </Header>
                    <Separator wide />
                </FixedLayout>
                <List
                    className={styles.newsList}
                >
                    {lastNewsId.map((newsId, index) => {
                        return (
                            <NewsListItem 
                                key={newsId}
                                newsId={newsId}
                                panel='home'
                                index={index}
                            />
                        );
                    })}
                </List>
            </SplitCol>
        </SplitLayout>
    );
}