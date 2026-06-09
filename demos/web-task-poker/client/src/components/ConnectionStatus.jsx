export const ConnectionStatus = ({ isConnected }) => {
	if (isConnected) return null;

	return (
		<div className="connection-status disconnected">
			<i className="bi bi-wifi-off"></i>
			<span>Sin conexión con el servidor</span>
		</div>
	);
};