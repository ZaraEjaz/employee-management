'use client';

import React, { useState } from 'react';
import { Button, Layout, Typography, Input, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEmployees } from '@/hooks/useEmployees';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { EmployeeFormModal } from '@/components/employees/EmployeeFormModal';
import { Employee } from '@/types/employee';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default function EmployeesPage() {
  const { employees, loading, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleAdd = () => {
    setEditingEmployee(null);
    setIsModalVisible(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalVisible(true);
  };

  const handleModalSubmit = (values: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, values);
    } else {
      addEmployee(values);
    }
    setIsModalVisible(false);
  };

  const filteredData = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchText(value);
    setCurrentPage(1); 
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ 
        background: '#fff', 
        padding: '16px 24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap', 
        height: 'auto',
        lineHeight: 'normal'
      }}>
        <Title level={3} style={{ margin: 0 }}>Employee Management</Title>
      </Header>
      
      <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }} justify="space-between" align="middle">
          <Col xs={24} sm={12} md={10} lg={8}>
            <Search 
              placeholder="Search by name or email" 
              allowClear 
              onSearch={handleSearch} // Use the helper
              onChange={(e) => handleSearch(e.target.value)} // Use the helper
              style={{ width: '100%' }}
            />
          </Col>

          <Col xs={24} sm={12} md={6} style={{ textAlign: 'right' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAdd} 
              block={true}
              style={{ width: 'auto', minWidth: '100%' }}
            >
              Add Employee
            </Button>
          </Col>
        </Row>

        <EmployeeTable 
          data={filteredData} 
          loading={loading} 
          onEdit={handleEdit} 
          onDelete={deleteEmployee}
          pagination={{
            current: currentPage,
            onChange: (page: number) => setCurrentPage(page),
            pageSize: 5, 
          }}
        />

        <EmployeeFormModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onSubmit={handleModalSubmit}
          initialValues={editingEmployee}
        />
      </Content>
    </Layout>
  );
}