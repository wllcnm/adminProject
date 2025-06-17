import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Modal, Form, Input, Select, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// 定义数据类型
interface TableListItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
  createTime: string;
}

// 模拟数据
const mockData: TableListItem[] = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13812345678',
    department: '技术部',
    position: '前端工程师',
    status: 'active',
    createTime: '2024-01-15',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    phone: '13987654321',
    department: '产品部',
    position: '产品经理',
    status: 'active',
    createTime: '2024-02-20',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    phone: '13611111111',
    department: '设计部',
    position: 'UI设计师',
    status: 'inactive',
    createTime: '2024-03-10',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    phone: '13722222222',
    department: '技术部',
    position: '后端工程师',
    status: 'active',
    createTime: '2024-04-05',
  },
  {
    id: 5,
    name: '钱七',
    email: 'qianqi@example.com',
    phone: '13833333333',
    department: '运营部',
    position: '运营专员',
    status: 'active',
    createTime: '2024-05-12',
  },
];

const TableList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TableListItem | null>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<TableListItem[]>(mockData);

  // 模拟异步请求数据
  const fetchData = async (params: any) => {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredData = [...dataSource];
    
    // 搜索过滤
    if (params.name) {
      filteredData = filteredData.filter(item => 
        item.name.includes(params.name)
      );
    }
    if (params.department) {
      filteredData = filteredData.filter(item => 
        item.department === params.department
      );
    }
    if (params.status) {
      filteredData = filteredData.filter(item => 
        item.status === params.status
      );
    }

    // 分页
    const { current = 1, pageSize = 10 } = params;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filteredData.slice(start, end);

    return {
      data: pageData,
      success: true,
      total: filteredData.length,
    };
  };

  // 表格列定义
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      search: false,
      sorter: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      ellipsis: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
      search: false,
      ellipsis: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 140,
      search: false,
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 120,
      valueType: 'select',
      valueEnum: {
        '技术部': { text: '技术部' },
        '产品部': { text: '产品部' },
        '设计部': { text: '设计部' },
        '运营部': { text: '运营部' },
      },
    },
    {
      title: '职位',
      dataIndex: 'position',
      width: 150,
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueType: 'select',
      valueEnum: {
        active: { text: '激活', status: 'Success' },
        inactive: { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 120,
      valueType: 'date',
      search: false,
      sorter: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Popconfirm
          key="delete"
          title="确定要删除这条记录吗？"
          onConfirm={() => handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
          >
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  // 添加/编辑操作
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: TableListItem) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    const newData = dataSource.filter(item => item.id !== id);
    setDataSource(newData);
    message.success('删除成功');
    actionRef.current?.reload();
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingRecord) {
        // 编辑
        const newData = dataSource.map(item => 
          item.id === editingRecord.id ? { ...item, ...values } : item
        );
        setDataSource(newData);
        message.success('编辑成功');
      } else {
        // 新增
        const newRecord: TableListItem = {
          ...values,
          id: Math.max(...dataSource.map(item => item.id)) + 1,
          createTime: new Date().toISOString().split('T')[0],
        };
        setDataSource([...dataSource, newRecord]);
        message.success('添加成功');
      }
      
      setIsModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <PageContainer
      header={{
        title: '表格管理',
        breadcrumb: {
          items: [
            { title: '首页' },
            { title: '表格' },
          ],
        },
      }}
    >
      <ProTable<TableListItem>
        headerTitle="员工列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          collapsed: false,
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新建
          </Button>,
        ]}
        request={fetchData}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
        }}
        scroll={{ x: 1200 }}
      />

      <Modal
        title={editingRecord ? '编辑员工' : '新增员工'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: 'active' }}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          
          <Form.Item
            name="phone"
            label="电话"
            rules={[{ required: true, message: '请输入电话' }]}
          >
            <Input placeholder="请输入电话" />
          </Form.Item>
          
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              <Select.Option value="技术部">技术部</Select.Option>
              <Select.Option value="产品部">产品部</Select.Option>
              <Select.Option value="设计部">设计部</Select.Option>
              <Select.Option value="运营部">运营部</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="position"
            label="职位"
            rules={[{ required: true, message: '请输入职位' }]}
          >
            <Input placeholder="请输入职位" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="active">激活</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default TableList; 