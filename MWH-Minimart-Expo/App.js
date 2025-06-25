import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './gluestack-ui.config';
import Catalogue from './src/components/Catalogue';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Catalogue />
    </GluestackUIProvider>
  );
}
