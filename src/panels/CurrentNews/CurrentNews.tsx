import { Div, Panel, PanelHeader, PanelHeaderButton, Text, Title } from "@vkontakte/vkui";
import { FC, ReactElement } from "react";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NewsListItem } from "../../components/NewsListItem";
import { useGetNewsItemQuery } from "../../store/api/hackerNewApi";
import { CommentsList } from "../../components/CommentsList";
import { UpdateButton } from "../../components/UpdateButton";


interface ICurrentNewsProps {
    id: string
}

export const CurrentNews: FC<ICurrentNewsProps> = ({ id }): ReactElement => {

    const routeNavigator = useRouteNavigator();

    const params = useParams<'id'>();

    // @ts-ignore
    const { data: news, isLoading, isError, refetch} = useGetNewsItemQuery(+params.id);


    if(isLoading) return <Text>Loading</Text>
    if(isError) return <Text>Fetch Error</Text>
    if (!news) {
        routeNavigator.replace('/');
    }
    if (!news) return <></>
    
    function updateNews() {
        refetch();
    }
    
    return (
        <Panel id={id}>
            <PanelHeader
                before={
                    <PanelHeaderButton
                        onClick={() => routeNavigator.replace('/')}
                    >
                        Back
                    </PanelHeaderButton>
                }
            >
                Laba News #{news.id}
            </PanelHeader>
            <Div>
                <NewsListItem 
                    newsId={news.id} 
                    panel='currentNews'
                />
                <Div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Title
                        level='1'
                        Component={'h2'}
                    >
                        {news.kids ?
                            `Comments (${news.kids.length})`
                            : 'No comments'
                        }
                    </Title>
                    <UpdateButton handler={updateNews} />
                </Div>
                {news.kids ? 
                    <CommentsList commentsIds={news.kids} /> 
                    : <></>
                }
            </Div>
        </Panel>
    );
}