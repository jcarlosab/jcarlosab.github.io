// app/src/pages/DashboardAdmin.jsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import TaskList from '../components/tasks/TaskList';
import { useRoom } from '../context/RoomContext';

function DashboardAdmin() {
	const { currentUser, setRoomUUID } = useRoom();
	const navigate = useNavigate();
	const { uuid } = useParams();

	useEffect(() => {
		if (!uuid) {
		navigate('/');
		return;
		}
		setRoomUUID(uuid);
	}, [uuid, navigate, setRoomUUID]);

	useEffect(() => {
		if (currentUser.role !== 'master') {
		navigate('/');
		}
	}, [currentUser, navigate]);

	return (
		<div className="dashboard">
		<Header />
		<TaskList        // si lo tienes disponible
		roomUUID={uuid}        // o el array que uses
		currentUser={currentUser}
		editable
		/>
		</div>
	);
}

export default DashboardAdmin;