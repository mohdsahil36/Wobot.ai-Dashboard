import React from 'react';
import { Camera } from '../types';
import styles from './CameraRow.module.css';
import CancelIcon from '../../../assets/not-interested.svg';
import ProgressIcon from '../../../assets/Progress.svg';
import BoxIcon from '../../../assets/Box.svg';

interface CameraRowProps {
  camera: Camera;
  onStatusToggle: () => void;
  onDelete: (cameraId: string) => void;
}

const CameraRow: React.FC<CameraRowProps> = ({ camera, onStatusToggle, onDelete }) => {
  const handleDelete = () => {
    if (camera._id) {
      onDelete(camera._id);
    }
  };

  return (
    <tr className={styles['camera-row']}>
      <td>{camera.name || 'N/A'}</td>
      <td>
        <div className={styles.healthStatus}>
          <img src={ProgressIcon} alt="Cloud Health" className={styles.icon} />
          <span className={styles.health}>{camera.health?.cloud || 'N/A'}</span>
          <img src={BoxIcon} alt="Device Health" className={styles.icon} />
          <span className={styles.health}>{camera.health?.device || 'N/A'}</span>
        </div>
      </td>
      <td>{camera.location || 'N/A'}</td>
      <td>{camera.recorder || 'N/A'}</td>
      <td>{camera.tasks || 'N/A'} tasks</td>
      <td className={styles.status}>
        <button 
          onClick={onStatusToggle} 
          className={`${styles.statusButton} ${camera.status === 'Active' ? styles.active : styles.inactive}`}
          aria-label={`Toggle status: ${camera.status}`}
        >
          {camera.status || 'N/A'}
        </button>
      </td>
      <td className={styles.actions}>
        <button onClick={handleDelete} className={styles.deleteButton} aria-label="Delete camera">
          <img 
            src={CancelIcon} 
            alt="Delete" 
            className={styles.deleteIcon}
          />
        </button>
      </td>
    </tr>
  );
};

export default CameraRow;
