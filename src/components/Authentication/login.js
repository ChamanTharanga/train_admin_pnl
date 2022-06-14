import { Button, Form, Input, message } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../config/firebaseConfig';

export default () => {
	const history = useHistory();
	const onSubmit = useCallback(
		async (e) => {
			const { email, password } = e;
			try {
				await signInWithEmailAndPassword(firebaseAuth, email, password);
				const redirect = localStorage.getItem('redirect');
				if(redirect && redirect !== 'undefined') {
					localStorage.removeItem('redirect');
					history.replace(redirect);
				}
				history.replace('/');
			} catch (err) {
				message.error(err.message);
			}
		},
		[history],
	)

	return (
		<div className="auth option2">
			<div className="auth_left">
				<div className="card">
					<div className="card-body">
						<div className="text-center">
							<Link className="header-brand" to="/">
								<i class="fa fa-train brand-logo"></i>
							</Link>
							<div className="card-title mt-3">Login to your account</div>
						</div>
						{/* <div className="form-group">
							<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
						</div>
						<div className="form-group">
							<label className="form-label"><Link to="forgotpassword" className="float-right small">I forgot password</Link></label>
							<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
						</div> */}

						{/* <div className="form-group">
							<label className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" />
								<span className="custom-control-label">Remember me</span>
							</label>
						</div> */}
						{/* <div className="text-center">
							<Link to="/" className="btn btn-primary btn-block" title="">Sign in</Link>
							<div className="text-muted mt-4">Don't have account yet? <Link to="/signup">Sign Up</Link></div>
						</div> */}
						<Form layout="vertical" onFinish={onSubmit}>
							<Form.Item name="email">
								<Input type="email" required />
							</Form.Item>
							<Form.Item name="password">
								<Input type="password" required />
							</Form.Item>
							<Button block type="primary" htmlType="submit">LOG IN</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}
