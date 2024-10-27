import React from 'react';
import styles from './Filters.module.css';
import LocationIcon from '../../../assets/Location.svg';
import StatusIcon from '../../../assets/WifiIcon.svg';

interface FiltersProps {
  selectedLocation: string;
  selectedStatus: string;
  locations: string[];
  statuses: string[];
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filters: React.FC<FiltersProps> = ({ selectedLocation, selectedStatus, locations, statuses, onFilterChange }) => {
  return (
    <div className={styles.filters}>
      <div className={styles['location-div']}>
        <img src={LocationIcon} alt="location" className={styles.locationIcon}/>
        <select name="location" onChange={onFilterChange} value={selectedLocation} className={styles.locationSelect}>
          <option value="" className={styles.locationOptions}>All Locations</option>
          {locations.map((item) => (
            <option value={item} key={item} className={styles.locationOptions}>{item}</option>
          ))}
        </select>
      </div>

      <div className={styles['status-div']}>
        <img src={StatusIcon} alt="location" className={styles.statusIcon}/>
        <select name="status" onChange={onFilterChange} value={selectedStatus} className={styles.locationSelect}>
          <option value="" className={styles.statusoptions}>Status</option>
          {statuses.map((status) => (
            <option value={status} key={status}>{status}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
