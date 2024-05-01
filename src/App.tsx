import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { DEFAULT_VIEW_PANELS } from './routes';
import { CurrentNews, Home } from './panels';

export const App = () => {

  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();

  return (
    <SplitLayout>
      <SplitCol>
        <View
          activePanel={activePanel}
        >
          <Home id='home' />
          <CurrentNews id='currentNews/:id' />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
