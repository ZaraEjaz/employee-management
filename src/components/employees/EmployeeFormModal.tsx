'use client';

import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Switch } from 'antd';
import { Employee, EmployeeRole } from '@/types/employee';

interface EmployeeFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Omit<Employee, 'id'>) => void;
  initialValues?: Employee | null;
  loading?: boolean;
}

const { Option } = Select;

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          status: initialValues.status === 'Active',
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ status: true }); 
      }
    }
  }, [visible, initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formattedValues = {
        ...values,
        status: values.status ? 'Active' : 'Inactive',
      };
      onSubmit(formattedValues);
    });
  };

  return (
    <Modal
      title={initialValues ? 'Edit Employee' : 'Add Employee'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnHidden={true}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter the email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="john@example.com" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select placeholder="Select a role">
            <Option value="Developer">Developer</Option>
            <Option value="Lead">Lead</Option>
            <Option value="Designer">Designer</Option>
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>
      </Form>
    </Modal>
  );
};