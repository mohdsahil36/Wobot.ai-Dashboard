import React, { useState, useEffect } from 'react';
import styles from './CameraTable.module.css';
import { Camera, CameraResponse } from './types';
import Filters from './Filters';
import CameraRow from './CameraRow';
import SearchIcon from '../../assets/SearchIcon.svg';
import Pagination from './Pagination';
const CameraTable: React.FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [filters, setFilters] = useState({ location: '', status: 'All', search: '' });
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const itemsPerPageOptions = [5, 10, 20, 50];

  const externaltoken = import.meta.env.VITE_TOKEN; 
  const externalapiUrl = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await fetch(`${externalapiUrl}/fetch/cameras`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${externaltoken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch data');

        const data: CameraResponse = await response.json();
        if (Array.isArray(data.data)) {
          setCameras(data.data);
          setLocations([...new Set(data.data.map(camera => camera.location))]);
        }
      } catch (error) {
        console.error("Error fetching cameras:", error);
        setError("Something went wrong!");
      }
    };

    fetchCameras();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const filteredCameras = cameras.filter(camera => {
    const locationMatch = filters.location ? camera.location === filters.location : true;
    const statusMatch = filters.status !== 'All' ? camera.status === filters.status : true;
    const searchMatch = camera.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                        camera.location.toLowerCase().includes(filters.search.toLowerCase()) ||
                        camera.recorder.toLowerCase().includes(filters.search.toLowerCase());

    return locationMatch && statusMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredCameras.length / itemsPerPage);
  const currentCameras = filteredCameras.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1) return;
    if (pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.cameraContainer}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.camerasTitle}>Cameras</h2>
          <p className={styles.camerasDesc}>Manage your cameras here</p>
        </div>
        <div className={styles['search-bar']}>
          <input 
            type="text" 
            name="search" 
            placeholder="search" 
            value={filters.search} 
            onChange={handleFilterChange} 
            className={styles.searchBar}
          />
          <img src={SearchIcon} alt="search" className={styles.SearchIcon}/>
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}

      <Filters 
        selectedLocation={filters.location}
        selectedStatus={filters.status}
        locations={locations}
        statuses={['All', 'Active', 'Inactive']}
        onFilterChange={handleFilterChange}
      />

      <table className={styles.cameraTable}>
        <thead className={styles.tableHeading}>
          <tr className={styles.tableHeadingtitles}>
            <th>Name</th>
            <th>Health</th>
            <th>Location</th>
            <th>Recorder</th>
            <th>Tasks</th>
            <th className={styles.status}>Status</th>
            <th className={styles.actions}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.cameraBody}>
          {currentCameras.map((camera) => (
            <CameraRow 
              key={camera._id} 
              camera={camera} 
              onStatusToggle={async () => {
                const newStatus = camera.status === 'Active' ? 'Inactive' : 'Active';
                try {
                  const response = await fetch(`${externalapiUrl}/update/camera/status`, {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${externaltoken}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: camera.id, status: newStatus }),
                  });

                  if (!response.ok) throw new Error('Failed to update status');

                  setCameras(prevCameras => 
                    prevCameras.map(c => 
                      c._id === camera._id ? { ...c, status: newStatus } : c
                    )
                  );
                } catch (error) {
                  console.error('Error updating status:', error);
                  setError('Could not update status');
                }
              }} 
              onDelete={(cameraId) => setCameras(cameras.filter(camera => camera._id !== cameraId))} 
            />
          ))}
        </tbody>
      </table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        currentPage={currentPage}
        onItemsPerPageChange={setItemsPerPage}
        onPageChange={handlePageChange}
        itemsPerPageOptions={itemsPerPageOptions}
      />
    </div>
  );
};

export default CameraTable;
