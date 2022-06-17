import React, { Component, useEffect, useState } from 'react';
import SweetAlert from 'sweetalert2-react';
import ToolTip from "../../common/toolTip";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';
import Dropzone from '../../common/DropzoneExample';
import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input/Input';
import Form, { useForm } from 'antd/lib/form/Form';
import { Avatar, Button, InputNumber, message, Table,Space } from 'antd';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import * as uuid from 'uuid';
// import { categoryCollection } from '../../../config/firebaseConfig';

import { categoryCollection } from '../../../config/firebaseConfig';


const Category = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [show, setShow] = useState(false);

	const [form] = useForm();

	const key = Math.random();

	const onSave = (e) => {
		try {
			const id = uuid.v4();
			message.loading({ content: "Saving Category", key });

			message.success({ content: "Saved Category", key });
			setDoc(doc(categoryCollection, id), e);
			form.resetFields();
		} catch (e) {
			console.error(e);
			message.error({ content: e.message, key });
		}
	}


	const [items, setItems] = useState();

	useEffect(() => {
		onSnapshot(categoryCollection, async (d) => {
			const { docs } = d;
			const data = await Promise.all(docs.map(async (val) => {
				const data = val.data();
				const id = val.id;
				return { ...data, id };
			}));
			setItems(data);
		});

	},
		[]);

	return (
		<>
			<div className="section-body">
				<div className="container-fluid">
					<div className="d-flex justify-content-between align-items-center ">
						<div className="header-action">
							<h1 className="page-title">Category</h1>
							<ol className="breadcrumb page-breadcrumb">
							</ol>
						</div>

						<Nav tabs className="page-header-tab">
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === 1 })}
									onClick={() => setActiveTab(1)}
								>
									<i className="fa fa-list-ul"></i> List
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === 3 })}
									onClick={() => setActiveTab(3)}
								>
									<i className="fa fa-plus"></i> Add New
								</NavLink>
							</NavItem>
						</Nav>

					</div>
				</div>
			</div>
			<div className="section-body mt-4">
				<div className="container-fluid">
					<TabContent activeTab={activeTab}>
						<TabPane tabId={1} className={classnames(['fade show'])}>
							<div className="table-responsive">
								<Table dataSource={items} columns={[
									{
										title: "Category Name",
										key: 'name',
										dataIndex: 'name'
									},
									{
										title: "Price",
										key: 'price',
										dataIndex: 'price'
									},
								]} />
							</div>

						</TabPane>
						<TabPane tabId={3} className={classnames(['fade show'])}>
							<div className="card">
								<div className="card-body">
									<Form form={form} layout="vertical" className="m-4" onFinish={onSave}>
										<FormItem name="name" required label="Category Name" rules={[{ required: true }]}>
											<Input width />
										</FormItem>
										<FormItem name="price" required label="Price" rules={[{ required: true }]}>
											<InputNumber className="w-100" />
										</FormItem>
										<Space direction="horizontal">
										<Button type="primary" htmlType="submit" >Save</Button>  
										<Button type="primary" htmlType="submit">Update</Button>
										</Space>
									</Form>
								</div>
							</div>
						</TabPane>
					</TabContent>
				</div>
			</div>
		</>
	);

}

export default Category;