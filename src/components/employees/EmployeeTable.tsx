'use client';
import React from 'react';
import { Table, Button, Space, Popconfirm, Tag, TablePaginationConfig } from 'antd'; 
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Employee } from '@/types/employee';

interface EmployeeTableProps {
  data: Employee[];
  loading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  pagination?: TablePaginationConfig; 
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
  pagination, 
}) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Developer', value: 'Developer' },
        { text: 'Lead', value: 'Lead' },
        { text: 'Designer', value: 'Designer' },
      ],
      onFilter: (value: any, record: Employee) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Employee) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            type="text"
          />
          <Popconfirm
            title="Delete Employee"
            description="Are you sure you want to delete this employee?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger type="text" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={pagination}
      scroll={{ x: 800 }}
    />
  );
};