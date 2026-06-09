export const validateLogin = {
	username: (username) => {
		if (!username || username.trim().length === 0) {
		return { valid: false, error: 'El nombre es obligatorio' };
		}
		if (username.length < 2) {
		return { valid: false, error: 'El nombre debe tener al menos 2 caracteres' };
		}
		if (username.length > 20) {
		return { valid: false, error: 'El nombre no puede exceder 20 caracteres' };
		}
		return { valid: true };
	},

	roomUUID: (uuid) => {
		if (!uuid || uuid.trim().length === 0) {
		return { valid: false, error: 'El código de sala es obligatorio' };
		}
		return { valid: true };
	},

	connection: (isConnected) => {
		if (!isConnected) {
		return { valid: false, error: 'No hay conexión con el servidor. Intenta recargar la página.' };
		}
		return { valid: true };
	}
};