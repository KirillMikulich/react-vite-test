import type { FC } from 'react';
import ThemeProvider from '@app/providers/ThemeProvider';
import Records from '@/pages/Records';

export const App: FC = () => {
  return (
    <ThemeProvider>
      <Records />
    </ThemeProvider>
  );
};

export default App;
