export const RoleToggle = ({ activeRole, onRoleChange }) => {
	return (
		<div className="role-toggle">
			<button 
				className={`role-btn ${activeRole === 'admin' ? 'active' : ''}`}
				onClick={() => onRoleChange('admin')}
				type="button"
			>
				<i className="bi bi-shield-check"></i>
				<span>Administrador</span>
			</button>
			<button 
				className={`role-btn ${activeRole === 'user' ? 'active' : ''}`}
				onClick={() => onRoleChange('user')}
				type="button"
			>
				<i className="bi bi-person"></i>
				<span>Participante</span>
			</button>
		</div>
	);
};

export const ConnectionStatus = ({ isConnected }) => {
	if (isConnected) return null;

	return (
		<div className="connection-status disconnected">
		<i className="bi bi-wifi-off"></i>
		<span>Sin conexión con el servidor</span>
		</div>
	);
};


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