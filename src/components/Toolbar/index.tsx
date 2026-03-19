import type { FC } from 'react';
import { Button, Flex, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRecordModalStore } from '../RecordModal/store';

import styles from './toolbar.module.scss';

type ToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export const Toolbar: FC<ToolbarProps> = ({ searchValue, onSearchChange }) => {
  const openCreateModal = useRecordModalStore(state => state.openCreate);

  return (
    <Flex className={styles.toolbar}>
      <Input
        allowClear
        placeholder="Поиск по вхождению"
        value={searchValue}
        onChange={({ target: { value } }) => onSearchChange(value)}
      />

      <Button type="primary" onClick={openCreateModal} icon={<PlusOutlined />}>
        Добавить
      </Button>
    </Flex>
  );
};

export default Toolbar;
