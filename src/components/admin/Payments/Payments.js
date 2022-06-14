import React, { Component, useEffect, useState } from 'react';
import { TabContent, TabPane, Nav, NavLink, NavItem } from "reactstrap";
import classnames from 'classnames';
import { Table } from 'antd';
import { collection, getDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../../config/firebaseConfig';
import { async } from '@firebase/util';

const Payments = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isCardRemove, setIsCardRemove] = useState(false);
	const [items, setItems] = useState()

	useEffect(() => {
		onSnapshot(collection(firestore, 'bookings'), async (snapshot) => {
			const docs = snapshot.docs;
			const items = await Promise.all(docs.map(async (doc) => {
				const data = doc.data();
				const from = await getDoc(data.from)
				const to = await getDoc(data.to)
				const user = await getDoc(data.user)
				const route = await getDoc(data.route)
				const train = await getDoc((route.data()).train)
				return {
					...data,
					from: from.data(),
					to: to.data(),
					user: user.data(),
					route: route.data(),
					train: train.data(),
				}
			}))
			setItems(items);
		});
	}, []);

	return (
		<>
			<div className="section-body">
				<div className="container-fluid"> 
					<div className="d-flex justify-content-between align-items-center ">
						<div className="header-action">
							<h1 className="page-title">Fees</h1>
							<ol className="breadcrumb page-breadcrumb">
							</ol>
						</div>

						<Nav tabs className="page-header-tab">
							<NavItem>
								<NavLink
									className={classnames({ active: activeTab === 1 })}
									onClick={() => setActiveTab(1)}
								>
									List
								</NavLink>
							</NavItem>
							<NavItem>
								{/* <NavLink
										className={classnames({ active: activeTab === 2 })}
										onClick={() => this.setState({ activeTab: 2 })}
									>
										Fees Receipt
    			               </NavLink> */}
							</NavItem>
							<NavItem>
								{/* <NavLink
										className={classnames({ active: activeTab === 3 })}
										onClick={() => this.setState({ activeTab: 3 })}
									>
										Add Fees
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
									<div className="table-responsive">
										<Table pagination={false} loading={!items} dataSource={items ?? []} columns={[
											{
												title: "User",
												render: (_, e)=> e.user?.name
											},


											
											{
												title: "Train",
												key: 'train',
												render: (_, e) => e.train?.name
											},
											{
												title: "From",
												key: 'from',
												render: (_, e) => e.from?.name
											},
											{
												title: "To",
												key: 'to',
												render: (_, e) => e.to?.name
											}, {
												title: "DATE",
												key: 'Date',
												render: (_, e) => e?.date?.toDate()?.toJSON()
											}, {
												title: "Seat Number",
												dataIndex: 'seatNumber',
											},
										]} />
									</div>
								</div>
							</div>
						</TabPane>
						<TabPane tabId={2} className={classnames(['fade show'])}>
							<div className="card">
								<div className="card-header">
									<h3 className="card-title">#AB0017</h3>
									<div className="card-options">
										<button type="button" className="btn btn-primary"><i className="si si-printer"></i> Print Invoice</button>
									</div>
								</div>
								<div className="card-body">
									<div className="row my-8">
										<div className="col-6">
											<p className="h3">Company</p>
											<address>
												Street Address<br />
												State, City<br />
												Region, Postal Code<br />
												ltd@example.com
											</address>
										</div>
										<div className="col-6 text-right">
											<p className="h3">Client</p>
											<address>
												Street Address<br />
												State, City<br />
												Region, Postal Code<br />
												ctr@example.com
											</address>
										</div>
									</div>
									<div className="table-responsive push">
										<table className="table table-bordered table-hover text-nowrap">
											<tbody><tr>
												<th className="text-center width35"></th>
												<th>Product</th>
												<th className="text-center" style={{ width: "1%" }}>Qnt</th>
												<th className="text-right" style={{ width: "1%" }}>Unit</th>
												<th className="text-right" style={{ width: "1%" }}>Amount</th>
											</tr>
												<tr>
													<td className="text-center">1</td>
													<td>
														<p className="font600 mb-1">Logo Creation</p>
														<div className="text-muted">Logo and business cards design</div>
													</td>
													<td className="text-center">1</td>
													<td className="text-right">$1.800,00</td>
													<td className="text-right">$1.800,00</td>
												</tr>
												<tr>
													<td className="text-center">2</td>
													<td>
														<p className="font600 mb-1">Online Store Design &amp; Development</p>
														<div className="text-muted">Design/Development for all popular modern browsers</div>
													</td>
													<td className="text-center">1</td>
													<td className="text-right">$20.000,00</td>
													<td className="text-right">$20.000,00</td>
												</tr>
												<tr>
													<td className="text-center">3</td>
													<td>
														<p className="font600 mb-1">App Design</p>
														<div className="text-muted">Promotional mobile application</div>
													</td>
													<td className="text-center">1</td>
													<td className="text-right">$3.200,00</td>
													<td className="text-right">$3.200,00</td>
												</tr>
												<tr>
													<td colSpan="4" className="font600 text-right">Subtotal</td>
													<td className="text-right">$25.000,00</td>
												</tr>
												<tr className="bg-light">
													<td colSpan="4" className="font600 text-right">Vat Rate</td>
													<td className="text-right">20%</td>
												</tr>
												<tr>
													<td colSpan="4" className="font600 text-right">Vat Due</td>
													<td className="text-right">$5.000,00</td>
												</tr>
												<tr className="bg-green text-light">
													<td colSpan="4" className="font700 text-right">Total Due</td>
													<td className="font700 text-right">$30.000,00</td>
												</tr>
											</tbody></table>
									</div>
									<p className="text-muted text-center">Thank you very much for doing business with us. We look forward to working with you again!</p>
								</div>
							</div>
						</TabPane>
						<TabPane tabId={3} className={classnames(['fade show'])}>
							<div className={`card ${isCardRemove ? 'card-remove' : ''} ${isCollapsed ? 'card-collapsed' : ''}`}>
								<div className="card-header">
									<h3 className="card-title">Add Library</h3>
									<div className="card-options ">
										<a href className="card-options-collapse" onClick={() => setIsCollapsed(!isCollapsed)}><i className="fe fe-chevron-up"></i></a>
										<a href className="card-options-remove" onClick={() => setIsCardRemove(!isCardRemove)}><i className="fe fe-x"></i></a>
									</div>
								</div>
								<form className="card-body">
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Roll No <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Student Name <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Department/Class  <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<select className="form-control" name="select">
												<option value="">Select...</option>
												<option value="Category 1">Mathematics</option>
												<option value="Category 2">Engineering</option>
												<option value="Category 3">Science</option>
												<option value="Category 3">M.B.A.</option>
												<option value="Category 3">Music</option>
											</select>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Fees Type  <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<select className="form-control" name="selectType">
												<option value="">Select...</option>
												<option value="Category 1">Annual</option>
												<option value="Category 2">Tuition</option>
												<option value="Category 3">Transport</option>
												<option value="Category 3">Exam</option>
												<option value="Category 3">Library</option>
											</select>
										</div>
									</div>

									<div className="form-group row">
										<label className="col-md-3 col-form-label">Payment Duration <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<div className="custom-controls-stacked">
												<label className="custom-control custom-radio custom-control-inline">
													<input type="radio" className="custom-control-input" name="example-inline-radios" value="option1" defaultChecked />
													<span className="custom-control-label">Monthly</span>
												</label>
												<label className="custom-control custom-radio custom-control-inline">
													<input type="radio" className="custom-control-input" name="example-inline-radios" value="option2" />
													<span className="custom-control-label">Session</span>
												</label>
												<label className="custom-control custom-radio custom-control-inline">
													<input type="radio" className="custom-control-input" name="example-inline-radios" value="option3" />
													<span className="custom-control-label">Yearly</span>
												</label>
											</div>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Collection Date <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<input data-provide="datepicker" data-date-autoclose="true" className="form-control" placeholder="" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Amount <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Payment Method <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<select className="form-control" name="select">
												<option value="">Select...</option>
												<option value="Category 1">Cash</option>
												<option value="Category 2">Cheque</option>
												<option value="Category 3">Credit Card</option>
												<option value="Category 4">Debit Card</option>
												<option value="Category 5">Netbanking</option>
												<option value="Category 6">Other</option>
											</select>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Payment Status <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<select className="form-control" name="select">
												<option value="">Select...</option>
												<option value="Category 1">Paid</option>
												<option value="Category 2">Unpaid</option>
												<option value="Category 3">Pending</option>
											</select>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Payment Reference No. <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<input type="text" className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label">Payment Details <span className="text-danger">*</span></label>
										<div className="col-md-7">
											<textarea rows="4" className="form-control no-resize" placeholder="Please type what you want..."></textarea>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-md-3 col-form-label"></label>
										<div className="col-md-7">
											<button type="submit" className="mr-1 btn btn-primary">Submit</button>
											<button type="submit" className="btn btn-outline-secondary">Cancel</button>
										</div>
									</div>
								</form>
							</div>
						</TabPane>
					</TabContent>
				</div>
			</div>
		</>
	);
}

export default Payments;
