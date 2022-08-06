import React from 'react';
import { FaCaretSquareDown } from 'react-icons/fa';

const FriendInfo = ({currentFriend, activeUser, handleClick, message}) => {
  return (
    <div className='friend-info'>
        <input type="checkbox" id='gallery' />
      <div className='image-name'>
        <div className='image'>
          <img onClick={handleClick} src={`/image/${currentFriend.image}`}alt='user' />
        </div>

        {activeUser &&
                    activeUser.length > 0 &&
                    activeUser.some(
                      (usr) => usr.userId === currentFriend._id
                    ) ? (
                      <div className='active-user'>Active</div>
                    ) : (
                      <div className='inactive-user'>In-active</div>
                    )}
        
        <div className='name'>
          <h4>{currentFriend.userName}</h4>
        </div>
      </div>
      <div className='others'>
        <div className='custom-chat'>
          <h3>Customise Chat</h3>
          <FaCaretSquareDown/>
        </div>
        <div className='privacy'>
          <h3>Privacy and Support</h3>
          <FaCaretSquareDown/>
        </div>
        <div className='media'>
          <h3>Shared Media</h3>
          <label htmlFor="gallery"><FaCaretSquareDown/></label> 
        </div>
      </div>
      <div className="gallery">
      {
        message && message.length > 0 ? message.map((msg, index)=>
          msg.message.image && <img key={index} src={`./image/${msg.message.image}`} />
        ) : <div className='no-media'> No media </div>
      }
      </div>
    </div>
  );
};

export default FriendInfo;
