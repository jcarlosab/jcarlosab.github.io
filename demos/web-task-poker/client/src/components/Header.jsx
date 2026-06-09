// app/src/components/Header.jsx
import { useRoom } from '../context/RoomContext';
import ConnectedUsersIndicator from './ConnectedUsersIndicator';

function Header() {
	const { roomUUID } = useRoom();

	const copyToClipboard = () => {
		navigator.clipboard.writeText(`${window.location.origin}/room/${roomUUID}`);
		alert('Copied to clipboard!');
	};

	return (
		<header className="main-header">
			<div className="room">
				<div className="room-info">
					<div className="room-title">
						Sala:
					</div>
					<span className="room-id" onClick={copyToClipboard}>
						{ roomUUID + " " }
						<i className="bi bi-clipboard copy-icon" title="Copiar ID de sala"></i>
					</span>
				</div>
				<div className="active-users">
					<ConnectedUsersIndicator />
				</div>
			</div>
		</header>
	);
}

export default Header;