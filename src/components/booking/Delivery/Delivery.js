import SweetAlert from 'sweetalert2-react';
import ToolTip from "../../common/toolTip";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';
import Dropzone from '../../common/DropzoneExample';
import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input/Input';
import Form, { useForm } from 'antd/lib/form/Form';
import { Avatar, Select, Button, InputNumber, message, Table, DatePicker,Space } from 'antd';
import { doc, onSnapshot, getDocs, setDoc } from 'firebase/firestore';
import * as uuid from 'uuid';
import { categoryCollection, routerCollection,stationCollection } from '../../../config/firebaseConfig';
import React, { useCallback, useEffect, useState } from 'react';


const Delivery = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [show, setShow] = useState(false);
	const [categorys, setCategorys] = useState([]);
	const [routers, setRouters] = useState([]);



	const [form] = useForm();

	const key = Math.random();

	const getCategorys = useCallback(
		() => {
			return categorys.map((v) => <Select.Option value={v.id}>{v.name}</Select.Option>);
		},
		[categorys],
	)

	const getRouters = useCallback(
		() => {
			return routers.map((v) => <Select.Option value={v.id}>{v.stop}</Select.Option>);
		},
		[routers],
	)


	const onSave = (e) => {
		try {
			const id = uuid.v4();
			message.loading({ content: "Saving Station", key });

			message.success({ content: "Saved Station", key });
			setDoc(doc(stationCollection, id), e);
			form.resetFields();
		} catch (e) {
			console.error(e);
			message.error({ content: e.message, key });
		}
	}


	const [items, setItems] = useState();

	useEffect(() => {
		// onSnapshot(stationCollection, async (d) => {
		// 	const { docs } = d;
		// 	const data = await Promise.all(docs.map(async (val) => {
		// 		const data = val.data();
		// 		const id = val.id;
		// 		return { ...data, id };
		// 	}));
		// 	setItems(data);
		getDocs(categoryCollection).then((d) => {
			const docs = d.docs;
			setCategorys(docs.map((val) => ({ ...val.data(), id: val.id })));
		});

		getDocs(routerCollection).then((d) => {
			const docs = d.docs;
			setRouters(docs.map((val) => ({ ...val.data(), id: val.id })));
		});

	},
		[]);

	return (
		<>
			<div className="section-body">
				<div className="container-fluid">
					<div className="d-flex justify-content-between align-items-center ">
						<div className="header-action">
							<h1 className="page-title">Station</h1>
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
										title: "Station Name",
										key: 'name',
										dataIndex: 'name'
									},
									{
										title: "Category",
										key: 'lat',
										dataIndex: 'lat'
									},
									{
										title: "Price",
										key: 'lon',
										dataIndex: 'lon'
									},
								]} />
							</div>

						</TabPane>
						<TabPane tabId={3} className={classnames(['fade show'])}>
							<div className="card">
								<div className="card-body">
									<Form form={form} layout="vertical" className="m-4" onFinish={onSave}>
									<FormItem name="start" required label="Start Staion" rules={[{ required: true }]}>
											<Select className="w-100">
												{getRouters()}
											</Select>
										</FormItem>
										<FormItem name="ename" required label="End Station" rules={[{ required: true }]}>
											<Input width />
										</FormItem>
										<FormItem name="date" required label="Date" rules={[{ required: true }]}>
										<DatePicker className="w-100"/>
										</FormItem>
										<FormItem name="start" required label="Start Point" rules={[{ required: true }]}>
											<Select className="w-100">
												{getCategorys()}
											</Select>
										</FormItem>
										<FormItem name="price" required label="Price" rules={[{ required: true }]}>
											<InputNumber className="w-100"/>
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

export default Delivery;