

import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:8030/api/profile', { method: 'GET', credentials:'include'});
        const data = await response.json();
        if (data) {
          setUserDetails(data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return <div></div>;
}
