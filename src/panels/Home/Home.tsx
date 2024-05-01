import { Panel, PanelHeader } from "@vkontakte/vkui";
import { FC, ReactElement } from "react";
import { NewsList } from "../../components/NewsList";

interface IHomeProps {
    id: string
}

export const Home: FC<IHomeProps> = ({ id }): ReactElement => {
    return (
        <Panel id={id}>
            <PanelHeader
                fixed={true}
            >
                Laba News - Home
            </PanelHeader>
            <NewsList />
        </Panel>
    );
}