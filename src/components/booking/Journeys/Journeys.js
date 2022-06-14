import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem, } from "reactstrap";
import classnames from 'classnames';
import FormItem from 'antd/lib/form/FormItem';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Button, Select, TimePicker, message, Table, InputNumber } from 'antd';
import { addDoc, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { routerCollection, stationCollection, trainCollection } from '../../../config/firebaseConfig';
import Form, { useForm } from 'antd/lib/form/Form';
import moment from 'moment';




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

	/** @type{ (e: {s: string, time: import('moment').Moment, start: string,end: string,stops: string[],price: number,sheets: number})=> {}} */
	const onSaveSubmit = (e) => {
		try {
			message.loading({ content: "Saving Router", key });
			const train = doc(trainCollection, e.train);
			const time = e.time.toDate();
			const start = doc(stationCollection, e.start);
			const end = doc(stationCollection, e.end);
			const stops =
				e.stops.map(e => doc(stationCollection, e));
			console.log(e);
			addDoc(routerCollection, { ...e, train, time, start, end, stops });
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
										<FormItem name="time" required label="Time" rules={[{ required: true }]}>
											<TimePicker className="w-100" format={'HH:mm'} />
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
										<FormItem name="stops" required label="Stops" rules={[{ required: true }]}>
											<Select
												mode="multiple"
												placeholder="Select Multiple Stops"
												className="w-100"
											>
												{getStation()}
											</Select>
										</FormItem>
										<FormItem name="price" required label="Price" rules={[{ required: true }]}>
											<InputNumber className="w-100" />
										</FormItem>
										<FormItem name="seat" required label="Seat" rules={[{ required: true }]}>
											<InputNumber className="w-100" />
										</FormItem>
										<Button htmlType="submit" type="primary">SAVE</Button>

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
