import React, { useCallback, useEffect, useState } from 'react';

import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem, } from "reactstrap";
import classnames from 'classnames';
import FormItem from 'antd/lib/form/FormItem';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Button, Select, TimePicker, message, Table, InputNumber, Row, Col, Divider,Space } from 'antd';
import { addDoc, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { routerCollection, stationCollection, trainCollection } from '../../../config/firebaseConfig';
import Form, { useForm } from 'antd/lib/form/Form';

import FormList from 'antd/lib/form/FormList';
import Title from 'antd/lib/typography/Title';




const Journeys = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isCardRemove, setIsCardRemove] = useState(false);

	const [trains, setTrains] = useState([]);
	const [stations, setStations] = useState([]);
	const [form] = useForm();

	const key = Math.random();

	const getTrains = useCallback(
		() => {
			return trains.map((v) => <Select.Option value={v.id}>{v.name}</Select.Option>);
		},
		[trains],
	);

	const getStation = useCallback(
		() => {
			return stations.map((v) => <Select.Option value={v.id}>{v.name}</Select.Option>);
		},
		[stations],
	)

	/** @type{ (e: {stops: {stop: string, time: import('moment').Moment}[], s: string, arrivalTime: import('moment').Moment,  startTime: import('moment').Moment, start: string,end: string,stops: string[],price: number,sheets: number})=> {}} */
	const onSaveSubmit = (e) => {
		try {
			console.log(e);
			message.loading({ content: "Saving Router", key });
			const train = doc(trainCollection, e.train);
			// const time = e.time.toDate();
			if(!e?.stops?.length || e?.stops?.length < 2){
				message.error("Add atleast two stops");
				return;
			}
			if (e.seat >= 0)
				e.seat = +e.seat;
			const start = doc(stationCollection, e.start);
			const end = doc(stationCollection, e.end);
			const stops =
				e.stops.map(e => doc(stationCollection, e.stop));
			const times =
				e.stops.map(e => e.time.toDate());
			console.log(e);
			e.arrivalTime = e?.arrivalTime?.toDate();
			e.startTime = e?.startTime?.toDate();
			addDoc(routerCollection, { ...e, train, times, start, end, stops });
			message.success({ content: "Saved Router", key });
			form.resetFields();
		} catch (e) {
			console.error(e);
			message.error({ content: e.message, key });
		}
	}
	const [items, setItems] = useState();

	useEffect(() => {
		getDocs(trainCollection).then((d) => {
			const docs = d.docs;
			setTrains(docs.map((val) => ({ ...val.data(), id: val.id })));
		});
		getDocs(stationCollection).then((d) => {
			const docs = d.docs;
			setStations(docs.map((val) => ({ ...val.data(), id: val.id })));
		});
	}, []);
	useEffect(() => {
		onSnapshot(routerCollection, async (d) => {
			const { docs } = d;
			const data = await Promise.all(docs.map(async (val) => {
				const data = val.data();
				console.log(data)
				const train = await getDoc(data.train)
				const start = await getDoc(data.start)
				const end = await getDoc(data.end)
				// const stop = await getDoc(data.stops)

				const id = val.id;
				return { ...data, id, train: train.data(), start: start.data(), end: end.data() };
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
							<h1 className="page-title">Schedule</h1>
							<ol className="breadcrumb page-breadcrumb">
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
									className={classnames({ active: activeTab === 2 })}
									onClick={() => setActiveTab(2)}
								>
									Add
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
										title: "Train Name",
										key: 'train',
										render: (_, e) => e.train.name
									},
									{
										// title: "Date",
										// render: (_, r)=> moment(r.date.toDate()).format('LL'),
									},
									{
										title: "Start",
										key: 'start',
										render: (_, e) => e.start.name
									},
									{
										title: "End",
										key: 'end',
										render: (_, e) => e.end.name
									},
								]} />
							</div>
						</TabPane>
						<TabPane tabId={2} className={classnames(['fade show'])}>
							<div className={`card ${isCardRemove ? 'card-remove' : ''} ${isCollapsed ? 'card-collapsed' : ''}`}>
								<div className="card-header">
									<h3 className="card-title">Journey Basic Info</h3>
									<div className="card-options ">
										<a href className="card-options-collapse" onClick={() => this.setState({ isCollapsed: !isCollapsed })}><i className="fe fe-chevron-up"></i></a>
										<a href className="card-options-remove" onClick={() => this.setState({ isCardRemove: !isCardRemove })}><i className="fe fe-x"></i></a>
									</div>

								</div>
								<div className="card-body">
									<Form form={form} layout="vertical" className="m-4" onFinish={onSaveSubmit}>
										<FormItem name="train" required label="Train Name" rules={[{ required: true }]}>
											<Select className="w-100">
												{getTrains()}
											</Select>
										</FormItem>
										<FormItem name="startTime" required label="Start Time" rules={[{ required: true }]}>
											<TimePicker className="w-100" use12Hours format="h:mm A" />
										</FormItem>
										<FormItem name="arrivalTime" required label="Arrival Time" rules={[{ required: true }]}>
											<TimePicker use12Hours format="h:mm A" className="w-100" />
										</FormItem>
										<h6>Available Days</h6>
										{['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((v) =>
											<FormItem name={v} key={v} valuePropName="checked" initialValue={false}>
												<Checkbox name={v}>{v.toUpperCase()}</Checkbox>
											</FormItem>
										)}


										<FormItem name="start" required label="Start Point" rules={[{ required: true }]}>
											<Select className="w-100">
												{getStation()}
											</Select>
										</FormItem>

										<FormItem name="end" required label="End Point" rules={[{ required: true }]}>
											<Select className="w-100">
												{getStation()}
											</Select>
										</FormItem>
										<Title level={4}>Add Stops</Title>
										<FormList name="stops">
											{(fields, { add, remove }, { errors }) => (
												<>
													{fields.map((field) => (
														<>
															{fields.length && (<FormItem noStyle key={field.key}>
																<Row gutter={8} style={{alignItems: 'center'}}>
																	<Col md={12}>
																		<FormItem name={[field.name, "stop"]} required label="Stop" rules={[{ required: true, message: "Required" }]}>
																			<Select
																				placeholder="Select Multiple Stops"
																				className="w-100"
																			>
																				{getStation()}
																			</Select>
																		</FormItem>
																	</Col>
																	<Col md={11}>
																		<FormItem name={[field.name, "time"]} required label="Arrival Time" rules={[{ required: true, message: "Required"  }]}>
																			<TimePicker className="w-100" format="h:mm A" use12Hours />
																		</FormItem>
																	</Col>
																	<Col md={1}>
																		{fields.length > 1 ? (
																			<Button
																				className="dynamic-delete-button"
																				onClick={() => remove(field.name)}
																			>-</Button>
																		) : null}
																	</Col>
																</Row>
															</FormItem>)}
														</>
													))}
													<Button block type="primary" onClick={add}>
														Add +
													</Button>
												</>
											)}
										</FormList>
										<Divider></Divider>
										<FormItem name="price" required label="Price" rules={[{ required: true }]}>
											<InputNumber className="w-100" />
										</FormItem>
										<FormItem name="seat" required label="Seat" rules={[{ required: true }]}>
											<InputNumber className="w-100" />
										</FormItem>
										<Space direction="horizontal">
										<Button type="primary" htmlType="submit" >Save</Button>  
										<Button type="primary" htmlType="submit">Update</Button>
										</Space>
									</Form>
								</div>
							</div>
							<div className="card">
							</div>
						</TabPane>
					</TabContent>
				</div>
			</div>
		</>
	);
}

export default Journeys;
