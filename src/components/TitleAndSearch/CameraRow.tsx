import React from 'react';
import { Camera } from './types';
import styles from './CameraRow.module.css';
import CancelIcon from '../../assets/not-interested.svg';

interface CameraRowProps {
  camera: Camera;
  onStatusToggle: () => void;
  onDelete: (cameraId: string) => void;
}

const CameraRow: React.FC<CameraRowProps> = ({ camera, onStatusToggle, onDelete }) => {
  return (
    <tr className={styles['camera-row']}>
      <td>{camera.name || 'N/A'}</td>
      <td>{`${camera.health?.cloud || 'N/A'} / ${camera.health?.device || 'N/A'}`}</td>
      <td>{camera.location || 'N/A'}</td>
      <td>{camera.recorder || 'N/A'}</td>
      <td>{camera.tasks || 'N/A'} tasks</td>
      <td className={styles.status}>
        <button 
          onClick={onStatusToggle} 
          className={`${styles.statusButton} ${camera.status === 'Active' ? styles.active : styles.inactive}`}
        >
          {camera.status || 'N/A'}
        </button>
      </td>
      <td className={styles.actions}>
        <img 
          src={CancelIcon} 
          alt="Delete" 
          onClick={() => onDelete(camera._id)} 
          className={styles.deleteIcon}
        />
      </td>
    </tr>
  );
};

export default CameraRow;
