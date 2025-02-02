import { Button, Dropdown, Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useDeleteCompanyMutation, useGetAllCompaniesQuery, useUpdateCompanyMutation } from '../../context/api/companiesApi';

const Admin: React.FC = () => {
	const { data: allCompaniesData } = useGetAllCompaniesQuery({})
	const [deleteCompany, { isLoading: isDeleteLoading }] = useDeleteCompanyMutation()
	const [updateCompany, { isLoading: isUpdateLoading }] = useUpdateCompanyMutation()

	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
	const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
	const [form] = Form.useForm();

	// DELETE modal
	const showDeleteModal = (id: string) => {
		setSelectedCompany(id);
		setIsDeleteModalVisible(true);
	};
	const handleDeleteOk = async () => {
		if (selectedCompany) {
			await deleteCompany(JSON.stringify(selectedCompany));
		}
		setIsDeleteModalVisible(false);
		setSelectedCompany(null);
	};
	const handleDeleteCancel = () => {
		setIsDeleteModalVisible(false);
		setSelectedCompany(null);
	};

	// EDIT model
	const showEditModal = (id: string) => {
		const company = allCompaniesData?.find((comp: any) => comp.id === id);
		if (company) {
			form.setFieldsValue({
				name: company.name,
				count: company.count,
			});
		}
		setSelectedCompany(id);
		setIsEditModalVisible(true);
	};
	const handleEditOk = () => {
		form
			.validateFields()
			.then(async (values) => {
				if (selectedCompany) {
					await updateCompany({ id: selectedCompany, ...values });
				}
				setIsEditModalVisible(false);
				setSelectedCompany(null);
				form.resetFields();
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};
	const handleEditCancel = () => {
		setIsEditModalVisible(false);
		setSelectedCompany(null);
		form.resetFields();
	};

	// Action menu
	const menu = (id: string) => [
		{
			key: 'edit',
			label: 'Изменить',
			icon: <EditOutlined />,
			onClick: () => showEditModal(id),
		},
		{
			key: 'delete',
			label: 'Удалить',
			icon: <DeleteOutlined />,
			danger: true,
			onClick: () => showDeleteModal(id),
		},
	];
	const columns = [
		{
			title: 'Названия компании',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Количество сотрудников',
			dataIndex: 'count',
			key: 'count',
		},
		{
			title: ' ',
			key: 'actions',
			width: '0.1%',
			render: (record: { id: string }) => (
				<Dropdown menu={{ items: menu(record.id) }} trigger={['click']}>
					<Button type="text" icon={<EllipsisOutlined style={{ fontSize: '18px', transform: 'rotate(90deg)' }} />} />
				</Dropdown>
			),
		},
	];
	return (
		<main className='p-4'>
			<Table bordered dataSource={allCompaniesData} columns={columns} rowKey="id" />

			{/* Delete Modal */}
			<Modal
				title={
					<span className="flex items-center gap-2">
						<RiErrorWarningFill className="text-[20px] text-[#FAAD14] " />
						Вы хотите удалить?
					</span>
				}
				open={isDeleteModalVisible}
				onOk={handleDeleteOk}
				onCancel={handleDeleteCancel}
				confirmLoading={isDeleteLoading}
				footer={[
					<Button key="back" onClick={handleDeleteCancel}>
						Нет
					</Button>,
					<Button key="submit" type="primary" danger onClick={handleDeleteOk} loading={isDeleteLoading}>
						Да
					</Button>,
				]}
			>
			</Modal>

			{/* Edit Modal */}
			<Modal
				title="Изменить компания"
				open={isEditModalVisible}
				onOk={handleEditOk}
				onCancel={handleEditCancel}
				confirmLoading={isUpdateLoading}
				footer={[
					<Button key="back" onClick={handleEditCancel}>
						Отмена
					</Button>,
					<Button key="submit" type="primary" onClick={handleEditOk} loading={isUpdateLoading}>
						Сохранить
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
		</main>
	)
}

export default Admin