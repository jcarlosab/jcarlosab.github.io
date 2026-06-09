export const ConnectionStatus = ({ isConnected }) => {
	if (isConnected) return null;

	return (
		<div className="connection-status disconnected">
		<i className="bi bi-wifi-off"></i>
		<span>Sin conexión con el servidor</span>
		</div>
	);
	};

	// components/LoginInput.jsx
	export const LoginInput = ({ 
	type = 'text', 
	placeholder, 
	value, 
	onChange, 
	icon,
	maxLength,
	disabled = false 
	}) => {
	return (
		<div className="input-group">
		{icon && <i className={`bi bi-${icon} input-icon`}></i>}
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className="input-field"
			maxLength={maxLength}
			disabled={disabled}
			autoComplete="off"
		/>
		</div>
	);
};