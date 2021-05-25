import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { observer } from 'mobx-react-lite'
import 'antd/dist/antd.css';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
          children
        )}
    </td>
  );
};

const ContactsTable = observer(({ contact }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  // const [data, setData] = useState(contact.contacts)
  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
  }, [contact.contacts])

  const edit = (record) => {
    form.setFieldsValue({
      name: record.name,
      lastName: record.lastName,
      email: record.email,
      phoneNumbers: record.phoneNumbers
    });
    setEditingKey(record.key);
  };


  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const rowData = await form.validateFields();
      const row = { ...rowData, phoneNumbers: Array.isArray(rowData.phoneNumbers) ? rowData.phoneNumbers : rowData.phoneNumbers.split(',') };
      const newData = [...contact.contacts];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row });
        contact.setContacts(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        contact.setContacts(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const handleDelete = (key) => {
    contact.removeContact(key)
  }
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      width: '15%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '40%',
      editable: true,
    },
    {
      title: ' Телефон',
      dataIndex: 'phoneNumbers',
      width: '40%',
      editable: true,
      render: phoneNumbers => {
        const numbers = Array.isArray(phoneNumbers) ? phoneNumbers : phoneNumbers.split(',')
        return (
          <>
            {numbers.map(phone => {
              return (
                <div key={phone}>
                  {phone}
                </div>
              );
            })}
          </>
        )
      },
    },
    {
      title: 'Действие',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Сохранить
            </a>
            <Popconfirm title="Точно отменить?" onConfirm={cancel}>
              <a>Отменить</a>
            </Popconfirm>
          </span>
        ) : (
            <span>
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                Редактировать/
            </Typography.Link>

              <Popconfirm title="Точно удалить?" onConfirm={() => handleDelete(record.key)}>
                <a>Удалить</a>
              </Popconfirm>
            </span>
          );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={contact.contacts}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          showSizeChanger: false,
          pageSize: 5
        }}
      />
    </Form>
  );
});

export default ContactsTable