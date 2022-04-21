import React, { Component, useEffect, useState } from 'react';
import SweetAlert from 'sweetalert2-react';
import DatePicker from "react-datepicker";
import ToolTip from "../../common/toolTip";
import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem, } from "reactstrap";
import classnames from 'classnames';
import Gridviewcomponent from '../../common/gridviewcomponent';
import Profilecomponent from '../../common/profilecomponent';
import Dropzone from '../../common/DropzoneExample';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input/Input';
import ImagePicker from '../../common/ImagePicker';
import { Avatar, Button, message, Table, } from 'antd';
import { addDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { firebaseStorage, trainCollection } from '../../../config/firebaseConfig';
import * as uuid from 'uuid';
import photoUploader from '../../util/photoUploader';
import { getDownloadURL, ref } from 'firebase/storage';
const Train = () => {

	const [activeTab, setActiveTab] = useState(1);
	const [show, setShow] = useState(false);


	const [form] = useForm();
	const onSave = async (e) => {
		const key = Math.random();
		try {
			const id = uuid.v4();


			message.loading({ content: "Saving Train", key });

			// Generate ID
			// create folder in storage /trains/{id}/file.jpg
			const profilePicture = e?.image?.fileList;

			let image = null;
			if (profilePicture && profilePicture?.length) {
				if (profilePicture?.[0].originFileObj)
					image = await photoUploader.uploadFile(
						profilePicture?.[0].originFileObj,
						`/trains/${id}`
					);
			}
			message.success({ content: "Saved Train", key });
			setDoc(doc(trainCollection, id), { ...e, image });
			form.resetFields();
		} catch (e) {
			console.error(e);
			message.error({ content: e.message, key });
		}
	}

	const [items, setItems] = useState();

	useEffect(()=>{
		onSnapshot(trainCollection,  async (d)=> {
			const {docs} = d;
			const data = await Promise.all(docs.map(async (val)=> {
				const data = val.data();
				let {image} = data;
				
				image = await getDownloadURL(ref(firebaseStorage, image));
				const id = val.id;
				return {...data, image, id};
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
							<h1 className="page-title">Trains</h1>
							<ol className="breadcrumb page-breadcrumb">
								<li className="breadcrumb-item"><a href>TRAIN BOOKING APP</a></li>
								<li className="breadcrumb-item active" aria-current="page">Trains</li>
							</ol>
						</div>
						<Nav tabs className="page-header-tab">
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === 1 })}
									onClick={() => setActiveTab(1)}
								>
									List View
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === 4 })}
									onClick={() => setActiveTab(4)}
								>
									Add
								</NavLink>
								<NavItem>
								</NavItem>
								<NavItem>
								</NavItem>

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
										title: '',
										render: (_, r)=> <Avatar src={r.image} />
									},
									{
										title: "Train Name",
										key: 'name',
										dataIndex: 'name'
									},
									{
										title: "Train Number",
										key: 'number',
										dataIndex: 'number'
									},
								]} />
							</div>
						</TabPane>
						<TabPane tabId={2} className={classnames(['fade show'])}>
							<Gridviewcomponent />
						</TabPane>
						<TabPane tabId={3} className={classnames(['fade show'])}>
							<Profilecomponent />
						</TabPane>
						<TabPane tabId={4} className={classnames(['fade show'])}>
							<div className="row clearfix">
								<div className="col-lg-8 col-md-12 col-sm-12">
									<div className="card">
										<div className="card-header">
											<h3 className="card-title">Basic Information</h3>
											<div className="card-options ">
												<a href className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
												<a href className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
											</div>
										</div>
										<Form form={form} layout="vertical" className="m-4" onFinish={onSave}>
											<FormItem name="name" required label="Train Name" rules={[{ required: true }]}>
												<Input />
											</FormItem>
											<FormItem name="number" required label="Train Number" rules={[{ required: true }]}>
												<Input />
											</FormItem>
											<FormItem name="image"  required label="Train Image" rules={[{ required: true }]}>
												<ImagePicker />
											</FormItem>
											<Button type="primary" htmlType="submit">Save</Button>
										</Form>
									</div>
								</div>
							</div>
						</TabPane>
					</TabContent>
				</div>
			</div>
		</>
	);
}

export default Train;