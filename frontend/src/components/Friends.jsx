import React from "react";
import moment from "moment";
import { FaRegCheckCircle } from "react-icons/fa";

const Friends = (props) => {
  const { frndInfo, msgInfo } = props.friend;
  const { activeUser } = props;
  const myId = props.myId;
  //console.log(frndInfo)
  //console.log(activeUser);
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./image/${frndInfo.image}`} alt="user" />

          {activeUser &&
          activeUser.length > 0 &&
          activeUser.some((u) => u.userId === frndInfo._id) ? (
            <div className="active_icon"></div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4
            className={
              msgInfo?.senderId !== myId &&
              msgInfo?.status !== undefined &&
              msgInfo.status !== "seen"
                ? "unseen_message fd_name"
                : "fd_name"
            }
          >
            {frndInfo.userName}
          </h4>

          <div className="msg-time">
            {msgInfo && msgInfo.senderId === myId ? (
              <span>You</span>
            ) : (
              <span
                className={
                  msgInfo?.senderId !== myId &&
                  msgInfo?.status !== undefined &&
                  msgInfo.status !== "seen"
                    ? "unseen_message "
                    : ""
                }
              >
                {frndInfo.userName + " "}
              </span>
            )}
            :
            {msgInfo && msgInfo.message.text ? (
              <span
                className={
                  msgInfo?.senderId !== myId &&
                  msgInfo?.status !== undefined &&
                  msgInfo.status !== "seen"
                    ? "unseen_message "
                    : ""
                }
              >
                {msgInfo.message.text.length > 10
                  ? msgInfo.message.text.slice(0, 10) + "..."
                  : msgInfo.message.text}
              </span>
            ) : msgInfo && msgInfo.message.image ? (
              <span> Image sent</span>
            ) : (
              <span>Is Connected</span>
            )}
            <br></br>
            <span>
              {" "}
              {msgInfo
                ? moment(msgInfo?.createdAt).startOf("minutes").fromNow()
                : moment(msgInfo?.createdAt).startOf("minutes").fromNow()}
            </span>
          </div>
        </div>
        {myId === msgInfo?.senderId ? (
          <div className="seen-unseen-icon">
            {msgInfo.status === "seen" ? (
              <img src={`./image/${frndInfo.image}`} alt="user" />
            ) : msgInfo.status === "delivered" ? (
              <div className="delivered">
                <FaRegCheckCircle />{" "}
              </div>
            ) : (
              <div className="unseen"></div>
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {msgInfo?.status !== undefined && msgInfo?.status !== "seen" ? (
              <div className="seen-icon"> </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
