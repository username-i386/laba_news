import { FC, ReactElement } from "react";
import styles from '../styles/UpdateButton.module.scss';
import { Button } from "@vkontakte/vkui";


interface IUpdateButtonProps {
    handler: () => void
}

export const UpdateButton: FC<IUpdateButtonProps> = ({ handler }): ReactElement => {
    return (
        <Button
            className={styles.updateBtn}
            appearance={'accent-invariable'}
            mode={'outline'}
            align='center'
            size={'l'}
            onClick={handler}
        >
            Update
        </Button>
    );
}