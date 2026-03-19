import type { FC } from 'react';
import { Flex, Switch } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useAppSettingsStore } from '@/state/app-settings-store';

import styles from './themeToggle.module.scss';

export const ThemeToggle: FC = () => {
  const themeMode = useAppSettingsStore(state => state.themeMode);
  const toggleTheme = useAppSettingsStore(state => state.toggleTheme);

  return (
    <Flex className={styles.container}>
      <SunOutlined />
      <Switch checked={themeMode === 'dark'} onChange={toggleTheme} />
      <MoonOutlined />
    </Flex>
  );
};
export default ThemeToggle;
