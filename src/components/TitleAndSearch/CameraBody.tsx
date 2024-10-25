import React from 'react';
import { Camera } from './types'; // Adjust the import according to your types
import CameraRow from './CameraRow';

interface CameraBodyProps {
  currentCameras: Camera[];
  setCameras: React.Dispatch<React.SetStateAction<Camera[]>>;
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const CameraBody: React.FC<CameraBodyProps> = ({ currentCameras, setCameras, token, setError }) => {
  const handleStatusToggle = async (camera: Camera) => {
    const newStatus = camera.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update/camera/status`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: camera.id, status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      setCameras(prevCameras =>
        prevCameras.map(c => (c._id === camera._id ? { ...c, status: newStatus } : c))
      );
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Could not update status');
    }
  };

  return (
    <>
      {currentCameras.map((camera) => (
        <CameraRow
          key={camera._id}
          camera={camera}
          onStatusToggle={() => handleStatusToggle(camera)}
          onDelete={(cameraId) => setCameras(prevCameras => prevCameras.filter(c => c._id !== cameraId))}
        />
      ))}
    </>
  );
};

export default CameraBody;
