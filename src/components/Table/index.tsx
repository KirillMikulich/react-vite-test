import type { FC } from 'react';
import { App as AntApp, Button, Empty, Popconfirm, Table as AntTable, Flex } from 'antd';
import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';

import { useRecordModalStore } from '@components/RecordModal/store';
import { selectFilteredRecords } from '@/models/selectors';
import type { RecordItem } from '@/models/types';
import { formatRecordDate } from '@/models/utils';
import { useRecordsStore } from '@state/records-store';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

type TableProps = {
  searchQuery: string;
};

export const Table: FC<TableProps> = ({ searchQuery }) => {
  const { message } = AntApp.useApp();
  const records = useRecordsStore(state => state.records);
  const deleteRecord = useRecordsStore(state => state.deleteRecord);
  const openEdit = useRecordModalStore(state => state.openEdit);
  const filteredRecords = selectFilteredRecords(records, searchQuery);

  const handleDelete = (id: string) => {
    deleteRecord(id);
    message.success('Запись удалена');
  };

  const columns: TableColumnsType<RecordItem> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (left, right) => left.name.localeCompare(right.name, 'ru'),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (value: string) => formatRecordDate(value),
      sorter: (left, right) => dayjs(left.date).valueOf() - dayjs(right.date).valueOf(),
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
      sorter: (left, right) => left.value - right.value,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 90,
      render: (_, record) => (
        <Flex>
          <Button type="link" onClick={() => openEdit(record)}>
            <EditOutlined />
          </Button>

          <Popconfirm
            title="Удалить запись?"
            okText="Удалить"
            cancelText="Отмена"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <AntTable<RecordItem>
      rowKey="id"
      columns={columns}
      dataSource={filteredRecords}
      pagination={{ pageSize: 5, showSizeChanger: false }}
      scroll={{ x: 760 }}
      locale={{
        emptyText: <Empty description="Нет данных для отображения" />,
      }}
    />
  );
};

export default Table;
