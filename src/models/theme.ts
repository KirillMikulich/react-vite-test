import { theme } from 'antd'
import type { ThemeConfig } from 'antd'

export type AppThemeMode = 'light' | 'dark'

const baseToken = {
  borderRadius: 14,
  fontFamily: "'Segoe UI', sans-serif",
}

export const getAntdThemeConfig = (themeMode: AppThemeMode): ThemeConfig =>
  themeMode === 'dark'
    ? {
        algorithm: theme.darkAlgorithm,
        token: {
          ...baseToken,
          colorPrimary: '#f5f5f5',
          colorTextLightSolid: '#111111',
          colorBgBase: '#0d0d0d',
          colorBgContainer: '#141414',
          colorText: '#f5f5f5',
          colorTextSecondary: 'rgba(255, 255, 255, 0.68)',
          colorBorder: '#2a2a2a',
        },
      }
    : {
        algorithm: theme.defaultAlgorithm,
        token: {
          ...baseToken,
          colorPrimary: '#111111',
          colorTextLightSolid: '#ffffff',
          colorBgBase: '#ffffff',
          colorBgContainer: '#ffffff',
          colorText: '#111111',
          colorTextSecondary: 'rgba(17, 17, 17, 0.62)',
          colorBorder: '#d9d9d9',
        },
      }
