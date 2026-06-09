import { useState,useEffect } from 'react';
import { useRoom } from '../context/RoomContext';
import { createRoom, joinRoom } from '../services/socket';
import { useLoginNavigation } from '../hooks/useLoginNavigation';
import { useRoomUUID } from '../hooks/useRoomUUID';
import { validateLogin } from '../utils/loginValidation';
import { RoleToggle, ConnectionStatus, LoginInput } from '../components/Login';
import logo from '../assets/logo512x512.png'

function LoginForm() {
	const { socket, setCurrentUser, isConnected } = useRoom();
	const [username, setUsername] = useState('');
	const [role, setRole] = useState('user'); // 'admin' o 'user'
	const [roomUUID, setRoomUUID] = useRoomUUID();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(''); 

	// Hook para navegación automática
	useLoginNavigation(socket, roomUUID);

	// ⭐ AÑADIR ESTE useEffect COMPLETO:
useEffect(() => {
  if (!socket) return;

  const handleSocketError = ({ message }) => {
    console.error('❌ Error del servidor:', message);
    setError(message);
    setIsLoading(false);  // ← Esto ya lo tenías
  };

  const handleRoomCreated = () => {
    setIsLoading(false);  // ← AÑADIR
  };

  const handleRoomJoined = () => {
    setIsLoading(false);  // ← AÑADIR
  };

  socket.on('error', handleSocketError);
  socket.on('room-created', handleRoomCreated);
  socket.on('room-joined', handleRoomJoined);

  return () => {
    socket.off('error', handleSocketError);
    socket.off('room-created', handleRoomCreated);
    socket.off('room-joined', handleRoomJoined);
  };
}, [socket]);

	// ⭐ AÑADIR ESTE TAMBIÉN (limpia el error cuando el usuario escribe):
	useEffect(() => {
	if (error) {
		setError('');
	}
	}, [username, roomUUID, role]);

	const showError = (message) => {
		setError(message);  // ← Cambiar de alert a setError
		setIsLoading(false);
	};

	const handleCreateRoom = async () => {
  // Validaciones...
  
  setIsLoading(true);
  setError('');
  
  // ⭐ AÑADIR timeout
  const timeout = setTimeout(() => {
    setIsLoading(false);
    setError('No se pudo crear la sala. Intenta de nuevo.');
  }, 3000);
  
  try {
    setCurrentUser({ username: username.trim(), role: 'master' });
    createRoom(socket, username.trim());
  } catch (error) {
    clearTimeout(timeout);
    console.error('Error al crear sala:', error);
    showError('Error al crear la sala.');
  }
};

	const handleJoinRoom = async () => {
  // Validaciones
  const usernameValidation = validateLogin.username(username);
  if (!usernameValidation.valid) {
    showError(usernameValidation.error);
    return;
  }

  const roomValidation = validateLogin.roomUUID(roomUUID);
  if (!roomValidation.valid) {
    showError(roomValidation.error);
    return;
  }

  const connectionValidation = validateLogin.connection(isConnected);
  if (!connectionValidation.valid) {
    showError(connectionValidation.error);
    return;
  }

  setIsLoading(true);
  setError('');  // ← AÑADIR: Limpiar error anterior
  
  // ⭐ AÑADIR: Timeout de seguridad por si no llega respuesta
  const timeout = setTimeout(() => {
    setIsLoading(false);
    setError('No se pudo conectar a la sala. Verifica el código.');
  }, 3000);  // 3 segundos
  
  try {
    setCurrentUser({ username: username.trim(), role: 'participant' });
    joinRoom(socket, roomUUID.trim(), username.trim());
    
    // ⭐ AÑADIR: Limpiar timeout si todo va bien
    // (el evento 'room-joined' o 'error' se encargará del resto)
  } catch (error) {
    clearTimeout(timeout);
    console.error('Error al unirse a sala:', error);
    showError('Error al unirse a la sala.');
  }
};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (role === 'admin') {
			handleCreateRoom();
		} else {
			handleJoinRoom();
		}
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<div className="login-header">
					<div className="logo">
						<img src={ logo } alt="logo" />
					</div>
					<h1>Task Poker</h1>
					<p>Estimaciones ágiles en equipo</p>
				</div>

				<ConnectionStatus isConnected={isConnected} />

				{/* ⭐ AÑADIR ESTO: */}
				{error && (
				<div className="error-message">
					<i className="bi bi-exclamation-circle"></i>
					<span>{error}</span>
				</div>
				)}

				<form onSubmit={handleSubmit} className="login-form">
					<RoleToggle activeRole={role} onRoleChange={setRole} />

					<LoginInput
						type="text"
						placeholder="Tu nombre"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						icon="person"
						maxLength={20}
						disabled={isLoading}
					/>

					{role === 'user' && (
						<LoginInput
						type="text"
						placeholder="Código de sala"
						value={roomUUID}
						onChange={(e) => setRoomUUID(e.target.value)}
						icon="key"
						disabled={isLoading}
						/>
					)}

					<button
						type="submit"
						disabled={!isConnected || isLoading}
						className={`login-btn ${role === 'admin' ? 'admin' : 'user'}`}
					>
						{isLoading ? (
						<>
							<span className="spinner-small"></span>
							{role === 'admin' ? 'Creando...' : 'Accediendo...'}
						</>
						) : (
						<>
							<i className={`bi bi-${role === 'admin' ? 'plus-circle' : 'box-arrow-in-right'}`}></i>
							{role === 'admin' ? 'Crear Sala' : 'Unirse a Sala'}
						</>
						)}
					</button>
				</form>

				<div className="login-footer">
					<small>
						{role === 'admin' 
							? 'Como administrador podrás gestionar las votaciones'
							: 'Solicita el código de sala al administrador'
						}
					</small>
				</div>
			</div>
		</div>
	);
}

export default LoginForm;