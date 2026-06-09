import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export const useRoomUUID = () => {
	const { uuid: uuidParam } = useParams();
	const location = useLocation();
	
	// Obtener UUID de la URL o query params
	const getInitialUUID = () => {
		if (uuidParam) return uuidParam;
		const params = new URLSearchParams(location.search);
		return params.get('uuid') || '';
	};

	const [roomUUID, setRoomUUID] = useState(getInitialUUID());

	useEffect(() => {
		const currentUUID = getInitialUUID();
		if (currentUUID && currentUUID !== roomUUID) {
		setRoomUUID(currentUUID);
		}
	}, [uuidParam, location.search]);

	return [roomUUID, setRoomUUID];
};