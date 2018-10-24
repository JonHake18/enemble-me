import React from 'react';
import PropTypes from 'prop-types';


const Profile = ({ secretData, user }) => (
  user.isMusician?
  <div className="container">
    <div
      title="Profile"
      subtitle="You should get access to this page only after authentication."
    />
  {<div style={{ fontSize: '16px', color: 'green' }}>Welcome Musician: <strong>{user.firstName}</strong>!<br /></div>}
  </div>
  :
    <div className="container">
    <div
      title="Profile"
      subtitle="You should get access to this page only after authentication."
    />
  {<div style={{ fontSize: '16px', color: 'green' }}>Welcome Band: <strong>{user.bandName}</strong>!<br /></div>}
  </div>
);


Profile.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Profile;
