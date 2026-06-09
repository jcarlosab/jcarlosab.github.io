// components/ConnectedUsersIndicator.jsx
import { useRoom } from '../context/RoomContext';

function ConnectedUsersIndicator() {
	const { users } = useRoom();

	return (
		<div className="connected-users-indicator">
			<i className="bi bi-people-fill"></i>
			<span className="user-count">{users.length}</span>
		</div>
	);
}

export default ConnectedUsersIndicator;
