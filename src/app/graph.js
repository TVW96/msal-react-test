export const callMsGraph = async (accessToken) => {
	const response = await fetch("https://graph.microsoft.com/v1.0/me", {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	return response.json();
};
