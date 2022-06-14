import React, { Component,useEffect, useState } from 'react';
import Profilecomponent from '../../common/profilecomponent';
import SweetAlert from 'sweetalert2-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';
import Dropzone from '../../common/DropzoneExample';
import Form, { useForm } from 'antd/lib/form/Form';
import BookingService from '../../../services/BookingService';
import { Table } from 'antd';
import moment from 'moment';

export default () => {
	const [activeTab, setActiveTab] = useState(1);

	const [show, setShow] = useState(false);

	const [form] = useForm();

	const [booking, setBooking] = useState();

	useEffect(()=> {
		BookingService.getBooking((v)=> {
			setBooking(v);
		});
	}, []);
	return (
		<>
			<div className="section-body">
				<div className="container-fluid">
					<div className="d-flex justify-content-between align-items-center ">
						<div className="header-action">
							<h1 className="page-title">Booking</h1>
							<ol className="breadcrumb page-breadcrumb">
							</ol>
						</div>
						<Nav tabs className="page-header-tab">
							<NavItem>
								{/* <NavLink
									className={classnames({ active: activeTab === 1 })}
									onClick={() => setActiveTab(1)}
								>
									List View
								</NavLink> */}
							</NavItem>
							<NavItem>
								{/* <NavLink
									className={classnames({ active: activeTab === 2 })}
									onClick={() =>  setActiveTab(2)}
								>
									Profile
								</NavLink> */}
							</NavItem>
							<NavItem>
								{/* <NavLink
									className={classnames({ active: activeTab === 3 })}
									onClick={() => setActiveTab(3)}
								>
									Add
								</NavLink> */}
							</NavItem>
						</Nav>

					</div>
				</div>
			</div>
			<div className="section-body mt-4">
				<div className="container-fluid">
					<TabContent activeTab={activeTab}>
						<TabPane tabId={1} className={classnames(['fade show'])}>
							<div className="card">
								<div className="card-body">
									<div className="row">
										{/* <div className="col-lg-2 col-md-4 col-sm-6">
											<div className="input-group">
												<input type="text" className="form-control" placeholder="Roll No." />
											</div>
										</div> */}
										<div className="col-lg-2 col-md-4 col-sm-6">
											<div className="input-group">
												<input type="text" className="form-control" placeholder="Name" />
											</div>
										</div>
										{/* <div className="col-lg-4 col-md-4 col-sm-6">
											<div className="input-group">
												<input type="text" className="form-control" placeholder="Department" />
											</div>
										</div>
										<div className="col-lg-2 col-md-4 col-sm-6">
											<div className="input-group">
												<DatePicker
													placeholderText="Admission Date"
													className="form-control"
												/>
											</div>
										</div> */}
										<div className="col-lg-2 col-md-4 col-sm-6">
											<a href className="btn btn-sm btn-primary btn-block" title="">Search</a>
										</div>
									</div>
								</div>
							</div>
							<div className="table-responsive card">
								<Table dataSource={booking} loading={!booking} columns={[
									{
										title: "Date",
										render: (_, r)=> moment(r.date.toDate()).format('LL'),
									},
									{
										title: "From",
										render: (_, r)=> r.fromObj.name,
									},
									{
										title: "To",
										render: (_, r)=> r.toObj.name,
									},
									{
										title: "User",
										render: (_, r)=> r.userObj.name,
									},
									{
										title: "Seat",
										dataIndex: 'seatNumber',
									},
									
								]}/>
							</div>
						</TabPane>
						<TabPane tabId={2} className={classnames(['fade show'])}>
							<Profilecomponent />
						</TabPane>
						<TabPane tabId={3} className={classnames(['fade show'])}>
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
										<form className="card-body">
											<div className="form-group row">
												<label className="col-md-3 col-form-label">First Name <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<input type="text" className="form-control" placeholder="Enter First name" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Last Name <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<input type="text" className="form-control" placeholder="Enter Last name" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Roll No <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Email</label>
												<div className="col-md-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Registration Date <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<DatePicker
														className="form-control"
													/>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Class <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<select className="form-control input-height" name="department">
														<option value="">Select...</option>
														<option value="Category 1">Computer</option>
														<option value="Category 2">Mechanical</option>
														<option value="Category 3">Mathematics</option>
														<option value="Category 3">Commerce</option>
													</select>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Gender <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<select className="form-control input-height" name="gender">
														<option value="">Select...</option>
														<option value="Category 1">Male</option>
														<option value="Category 2">Female</option>
													</select>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Mobile No. <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Parents Name <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Parents Mobile No. <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Date Of Birth  <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Address <span className="text-danger">*</span></label>
												<div className="col-md-9">
													<input type="text" className="form-control" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-md-3 col-form-label">Profile Picture</label>
												<div className="col-md-9">
													<Dropzone />
													<small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
												</div>
											</div>
										</form>
									</div>
								</div>
								<div className="col-lg-4 col-md-12 col-sm-12">
									<div className="card">
										<div className="card-header">
											<h3 className="card-title">Account Information</h3>
											<div className="card-options ">
												<a href className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
												<a href className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
											</div>
										</div>
										<div className="card-body">
											<div className="row clearfix">
												<div className="col-sm-12">
													<div className="form-group">
														<label>User Name</label>
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group">
														<label>Password</label>
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="col-md-6 col-sm-12">
													<div className="form-group">
														<label>Confirm Password</label>
														<input type="text" className="form-control" />
													</div>
												</div>
												<div className="col-sm-12">
													<button type="submit" className="mr-1 btn btn-primary">Submit</button>
													<button type="submit" className="btn btn-outline-secondary">Cancel</button>
												</div>
											</div>
										</div>
									</div>
									<div className="card">
										<div className="card-header">
											<h3 className="card-title">Account Information</h3>
											<div className="card-options ">
												<a href className="card-options-collapse" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a>
												<a href className="card-options-remove" data-toggle="card-remove"><i className="fe fe-x"></i></a>
											</div>
										</div>
										<div className="card-body">
											<div className="form-group">
												<label>Facebook</label>
												<input type="text" className="form-control" />
											</div>
											<div className="form-group">
												<label>Twitter</label>
												<input type="text" className="form-control" />
											</div>
											<div className="form-group">
												<label>LinkedIN</label>
												<input type="text" className="form-control" />
											</div>
											<div className="form-group">
												<label>Behance</label>
												<input type="text" className="form-control" />
											</div>
											<div className="form-group">
												<label>dribbble</label>
												<input type="text" className="form-control" />
											</div>
											<button type="submit" className="mr-1 btn btn-primary">Submit</button>
											<button type="submit" className="btn btn-outline-secondary">Cancel</button>
										</div>
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
