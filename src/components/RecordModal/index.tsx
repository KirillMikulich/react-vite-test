import { useEffect, type FC } from 'react';
import { App as AntApp, DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import ruDatePickerLocale from 'antd/es/date-picker/locale/ru_RU';
import dayjs from 'dayjs';
import type { RecordFormValues, RecordPayload } from '@/models/types';

import { useRecordsStore } from '@state/records-store';
import { useRecordModalStore } from './store';

import styles from './recordModal.module.scss';

export const RecordModal: FC = () => {
  const { message } = AntApp.useApp();
  const [form] = Form.useForm<RecordFormValues>();
  const isOpen = useRecordModalStore(state => state.isOpen);
  const mode = useRecordModalStore(state => state.mode);
  const record = useRecordModalStore(state => state.record);
  const close = useRecordModalStore(state => state.close);
  const addRecord = useRecordsStore(state => state.addRecord);
  const updateRecord = useRecordsStore(state => state.updateRecord);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (mode === 'edit' && record) {
      form.setFieldsValue({
        name: record.name,
        date: dayjs(record.date).locale('ru'),
        value: record.value,
      });

      return;
    }

    form.setFieldsValue({
      name: '',
      date: dayjs().locale('ru'),
      value: null,
    });
  }, [form, isOpen, mode, record]);

  const handleCancel = () => {
    close();
    form.resetFields();
  };

  const handleFinish = (values: RecordFormValues) => {
    const payload: RecordPayload = {
      name: values.name.trim(),
      date: values.date.startOf('day').toISOString(),
      value: Number(values.value),
    };

    if (mode === 'edit' && record) {
      updateRecord(record.id, payload);
      message.success('Запись обновлена');
    } else {
      addRecord(payload);
      message.success('Запись успешно добавлена');
    }

    close();
    form.resetFields();
  };

  return (
    <Modal
      destroyOnHidden
      open={isOpen}
      title={mode === 'edit' ? 'Редактировать запись' : 'Добавить запись'}
      okText={mode === 'edit' ? 'Сохранить' : 'Добавить'}
      cancelText="Отмена"
      onCancel={handleCancel}
      onOk={() => form.submit()}
    >
      <Form<RecordFormValues> form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            { required: true, message: 'Введите имя' },
            {
              validator: async (_, value: string | undefined) => {
                if (value?.trim()) {
                  return;
                }

                throw new Error('Имя не должно быть пустым');
              },
            },
          ]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>

        <Form.Item label="Дата" name="date" rules={[{ required: true, message: 'Выберите дату' }]}>
          <DatePicker
            className={styles.fullWidth}
            format="DD.MM.YYYY"
            locale={ruDatePickerLocale}
          />
        </Form.Item>

        <Form.Item
          label="Числовое значение"
          name="value"
          rules={[{ required: true, message: 'Введите число' }]}
        >
          <InputNumber className={styles.fullWidth} placeholder="Введите значение" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RecordModal;
