import React from "react";
import { useState } from "react";
import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
import FriendInfo from "./FriendInfo";
import Message from "./Message";
import MessageSend from "./MessageSend";

const RightSide = ({
  currentFriend,
  inputHandle,
  newMessage,
  sendMessage,
  message,
  scrollRef,
  sendEmoji,
  sendImage,
  activeUser,
  typingMessage
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setOpenModal(true);
    setTimeout(() => {
      setOpenModal(false)
    }, 6000);
  }; 

  return (
    <div className="col-9" >
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
          {openModal && <img className="avatar" src={`/image/${currentFriend.image}`} alt="" />}
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img
                      onClick={()=>setOpenModal(!openModal)}
                      src={`/image/${currentFriend.image}`}
                      alt="friendsDp"
                    />
                    {activeUser &&
                    activeUser.length > 0 &&
                    activeUser.some(
                      (usr) => usr.userId === currentFriend._id
                    ) ? (
                      <div className="active-icon"></div>
                    ) : (
                      <div className="inactive-icon"></div>
                    )}
                  </div>
                  <div className="name">
                    <h3>{currentFriend.userName}</h3>
                  </div>
                </div>
                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>
                  <div className="icon">
                    <FaVideo />
                  </div>
                  <div className="icon">
                    <label htmlFor="dot">
                      {" "}
                      <FaRocketchat />
                    </label>
                  </div>
                </div>
              </div>
              <Message
                message={message}
                scrollRef={scrollRef}
                currentFriend={currentFriend}
                typingMessage={typingMessage}
              />
              <MessageSend
                inputHandle={inputHandle}
                newMessage={newMessage}
                sendMessage={sendMessage}
                sendEmoji={sendEmoji}
                sendImage={sendImage}
              />
            </div>
          </div>
          <div className="col-4">
            <FriendInfo message={message} handleClick={handleClick} currentFriend={currentFriend} activeUser={activeUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
