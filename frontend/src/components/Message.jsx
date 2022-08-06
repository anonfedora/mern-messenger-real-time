import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCheckCircle } from "react-icons/fa";

const Message = ({ message, currentFriend, scrollRef, typingMessage }) => {
  const { myInfo } = useSelector((state) => state.auth);

  const [openImage, setOpenImage] = useState(false);

  return (
    <>
      <div className="message-show">
        {message && message.length > 0 ? (
          message.map((m, index) =>
            m.senderId === myInfo.id ? (
              <div ref={scrollRef} className="my-message">
                <div className="image-message">
                  <div className="my-text" key={message._id}>
                    <p className="message-text">
                      {/*Opening current chat image */}
                      {openImage && (
                        <img
                          className="avatar"
                          src={`/image/${m.message.image[0]}`}
                          alt=""
                        />
                      )}

                      {m.message.text === "" ? (
                        <img
                          onClick={() => setOpenImage(!openImage)}
                          src={`./image/${m.message.image}`}
                        />
                      ) : (
                        m.message.text
                      )}
                    </p>
                    {index === message.length - 1 &&
                    m.senderId === myInfo.id ? (
                      m.status === "seen" ? (
                        <img
                          className="img"
                          src={`/image/${currentFriend.image}`}
                          alt="user"
                        />
                      ) : m.status === "delivered" ? (
                        <span>
                          {" "}
                          <FaRegCheckCircle />{" "}
                        </span>
                      ) : (
                        <span>
                          <FaRegCheckCircle />
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="time">
                  {moment(m.createdAt).startOf("mini").fromNow()}
                </div>
              </div>
            ) : (
              <div className="fd-message" key={message._id} ref={scrollRef}>
                <div className="image-message-time">
                  <img src={`/image/${currentFriend.image}`} alt="user" />
                  <div className="message-time">
                    <div className="fd-text">
                      <p className="fd-message-text message-text">
                        {m.message.text === "" ? (
                          <img src={`./image/${m.message.image}`} />
                        ) : (
                          m.message.text
                        )}
                      </p>
                    </div>
                    <div className="time">
                      {moment(m.createdAt).startOf("mini").fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend_connect">
            <img src={`/image/${currentFriend.image}`} alt="user" />
            <h3>Connected to {currentFriend.userName}</h3>
            <span>
              {" "}
              {moment(currentFriend.createdAt).startOf("mini").fromNow()}
            </span>
          </div>
        )}
      </div>

      {typingMessage &&
      typingMessage.msg &&
      typingMessage.senderId === currentFriend._id ? (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message-time">
              <img src={`/image/${currentFriend.image}`} alt="user" />
              <div className="message-time">
                <div className="fd-text">
                  <p className="time">Typing...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Message;
