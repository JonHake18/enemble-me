import React from 'react';
import PropTypes from 'prop-types';
import YoutubeEmbedVideo from "youtube-embed-video";



const Profile = ({ secretData, user }) => (
  user.isMusician?
  <div className="content">
    <h1>{user.firstName + " " + user.lastName}</h1>
  {<div>
    <h3>Resident of {user.city}, {user.state}</h3>
    <br/>
  </div>}
  {<div>
    <h3>Instrument Proficiencies</h3>
      <ul>
      {user.instrumentsPlayed !== undefined && user.instrumentsPlayed.map((instrument, index)=>{
        return <li key={`instrument:${index}`}><h5>{instrument.yearsExp} years of experience playing the {instrument.instrument}</h5></li>
      })}
      </ul>
      <br/>
    </div>}
  {<div>
      <button className="btn-primary" data-userid={user._id}>Contact This Musician</button>
    </div>}
    <YoutubeEmbedVideo size="medium" videoId={user.videoLink} className="video-player" style={{ borderWidth: 5, borderColor: '#ffffff', borderStyle: 'solid' }} suggestions={false} />
</div>
  :
  <div className="content">
    <h1>{user.bandName}</h1>
    <p>
      {user.bandDescription}
    </p>
    {<div>
      <h3>Musical Genre: {user.musicGenre}</h3>
      <br/>
    </div>}
    {<div>
      <h3>Proudly representing their hometown of {user.city}, {user.state}</h3>
      <br/>
    </div>}
    {<div>
      <h3>Instrumental Positions/ Vacancies</h3>
        <ul>
          {user.instrumentsDesired !== undefined && user.instrumentsDesired.map((instrument, index)=>{
            return <li key={`instrument:${index}`}><h5>{instrument.yearsExp} years of experience playing the {instrument.instrument}</h5></li>
          })}
        </ul>
        <br/>
      </div>}
      {<div>
        <button className="btn-primary" data-userid={user._id}>Contact This Band</button>
      </div>}
  </div>

);


Profile.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Profile;