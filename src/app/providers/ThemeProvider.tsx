import { useEffect } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { App as AntApp, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import { getAntdThemeConfig } from '@/models/theme';
import { useAppSettingsStore } from '@state/app-settings-store';

type ThemeProviderProps = PropsWithChildren & {};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const themeMode = useAppSettingsStore(state => state.themeMode);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  return (
    <ConfigProvider locale={ruRU} theme={getAntdThemeConfig(themeMode)}>
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
};

export default ThemeProvider;
