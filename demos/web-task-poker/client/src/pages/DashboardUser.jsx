// pages/DashboardUser.jsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import TaskList from '../components/tasks/TaskList';
import VotingPanel from '../components/VotingPanel';
import { useRoom } from '../context/RoomContext';

function DashboardUser() {
  const { currentUser, setRoomUUID } = useRoom();
  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    if (!uuid) {
      navigate('/', { replace: true });
      return;
    }
    setRoomUUID(uuid);
  }, [uuid, navigate, setRoomUUID]);

  useEffect(() => {
    if (currentUser.role && currentUser.role !== 'participant') {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className="dashboard">
		<Header />
		<div className="dashboard-content">
			<div className="completed-tasks-section">
				<TaskList editable={false} />
			</div>
		</div>
    </div>
  );
}

export default DashboardUser;
