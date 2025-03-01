"use client";

import styles from "./page.module.css";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { callMsGraph } from "./graph"; // Function to fetch user profile from Microsoft Graph API
import React, { useState } from "react";

export default function Home() {
	const { instance, accounts } = useMsal();
	const account = accounts[0];
	const [graphData, setGraphData] = useState(null);
	interface UserInfo {
		displayName: string;
		mail: string;
	}
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [error, setError] = useState<unknown>(null);

	const handleLogin = async () => {
		try {
			const response = await instance.loginPopup(loginRequest);
			setUserInfo(await callMsGraph(response.accessToken));
		} catch (error) {
			setError(error);
		}
	};

	const handleLogout = () => {
		instance.logoutPopup();
		setUserInfo(null);
	};

	return (
		<div className={styles.page}>
			{!accounts.length ? (
				<button type="button" onClick={handleLogin}>
					Sign In
				</button>
			) : (
				<>
					<button type="button" onClick={handleLogout}>
						Sign Out
					</button>
					<h1>Welcome, {userInfo?.displayName || "User"}</h1>
					<h2>Email: {userInfo?.mail}</h2>
				</>
			)}
		</div>
	);
}
