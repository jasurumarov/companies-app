import React, { useState } from 'react'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { logout } from '../../context/slices/authSlice'
import { useDispatch } from 'react-redux'
import { Button, Form, Input, Modal } from 'antd'
import { useCreateCompanyMutation } from '../../context/api/companiesApi'

const Header: React.FC = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
    const [createCompany, { isLoading: isCreateLoading }] = useCreateCompanyMutation()

    const handleLogout = () => {
        if (window.confirm('Вы уверены?')) {
            dispatch(logout())
        }
    }

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const handleAddOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                await createCompany(values);
                setIsAddModalVisible(false);
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleAddCancel = () => {
        setIsAddModalVisible(false);
        form.resetFields();
    };
    return (
        <header className='p-4 bg-[#313131] flex items-center justify-between'>
            <Link to={'/admin'} className='font-bold text-white text-xl'>Компании</Link>
            <div className='flex items-center justify-center gap-4'>
                <button onClick={handleLogout}><RiLogoutCircleLine className='text-white text-2xl' /></button>
                <button className='py-1 px-4 rounded-sm bg-[#08979C] text-white' onClick={showAddModal}>Добавить компания</button>
            </div>

            {/* Add Company Modal */}
            <Modal
                title="Добавить компания"
                open={isAddModalVisible}
                onOk={handleAddOk}
                onCancel={handleAddCancel}
                confirmLoading={isCreateLoading}
                footer={[
                    <Button key="back" onClick={handleAddCancel}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleAddOk} loading={isCreateLoading}>
                        Добавить
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Названия компании"
                        rules={[{ required: true, message: 'Пожалуйста, введите название компании!' }]}
                    >
                        <Input placeholder="Введите названия" />
                    </Form.Item>
                    <Form.Item
                        name="count"
                        label="Количество сотрудников"
                        rules={[{ required: true, message: 'Пожалуйста, введите количество сотрудников!' }]}
                    >
                        <Input type="number" placeholder="Введите количество" />
                    </Form.Item>
                </Form>
            </Modal>
        </header>
    )
}

export default Header
