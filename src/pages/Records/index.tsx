import { useState, type FC } from 'react';
import { Card, Flex } from 'antd';

import { useDebounce } from '@/hooks/useDebounce';
import ThemeToggle from '@/components/ThemeToggle';
import Toolbar from '@/components/Toolbar';
import RecordModal from '@/components/RecordModal';
import Table from '@/components/Table';

import styles from './records.module.scss';

export const Records: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  return (
    <main className={styles.page}>
      <Card className={styles.card}>
        <Flex className={styles.header}>
          <ThemeToggle />
        </Flex>

        <Toolbar searchValue={searchQuery} onSearchChange={setSearchQuery} />

        <Table searchQuery={debouncedSearchQuery} />
      </Card>

      <RecordModal />
    </main>
  );
};

export default Records;
