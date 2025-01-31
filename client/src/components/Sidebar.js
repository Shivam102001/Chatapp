import React, { useEffect, useState } from "react";
import { BsChatText } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from "../redux/userSlice";


const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user._id);
      socketConnection.on("conversation", (data) => {
        console.log("conversation", data);
        const conversationUserData = data.map((coversationUser, index) => {
          if (coversationUser?.sender?._id === coversationUser?.receiver?._id) {
            return {
              ...coversationUser,
              userDetails: coversationUser.sender,
            };
          } else if (coversationUser?.receiver?._id !== user?._id) {
            return {
              ...coversationUser,
              userDetails: coversationUser.receiver,
            };
          } else {
            return {
              ...coversationUser,
              userDetails: coversationUser.sender,
            };
          }
        });
        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  const handleLogout=()=>{
      dispatch(logout())
      navigate("/email")
      localStorage.clear()
  }

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 rounded flex justify-center items-center cursor-pointer hover:bg-slate-200 ${
                isActive && "bg-slate-200"
              }`
            }
            title="Chat"
          >
            <BsChatText size={22} />
          </NavLink>

          <div
            title="Add friend"
            onClick={() => setOpenSearchUser(true)}
            className="w-12 h-12 rounded flex justify-center items-center cursor-pointer hover:bg-slate-200"
          >
            <AiOutlineUserAdd size={22} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="mx-auto"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          <button
            title="Logout"
            className="w-12 h-12 rounded flex justify-center items-center cursor-pointer hover:bg-slate-200" onClick={handleLogout}
          >
            <span className="-ml-1">
              <TbLogout2 size={22} />
            </span>
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800 h-16">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-16">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          )}
          {allUser.map((conv, index) => {
            return (
              <NavLink to={"/"+conv?.userDetails?._id} key={conv?._id} className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-200 cursor-pointer">
                <div>
                  <Avatar imageUrl={conv?.userDetails?.profile_pic}
                    name={conv?.userDetails?.name}
                    width={35}
                    height={35}
                  />
                </div>
                <div>
                  <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">{conv?.userDetails?.name}</h3>
                  <div className="text-slate-500 text-xs flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {
                        conv?.lastMsg?.imageUrl &&(
                          <div className="flex items-center gap-1">
                            <span><FaImage/></span>
                            {!conv?.lastMsg?.text && <span>Image</span>} 
                           
                          </div>
                        )
                      }
                      {
                        conv?.lastMsg?.videoUrl &&(
                          <div className="flex items-center gap-1">
                            <span><FaVideo/></span>
                            {!conv?.lastMsg?.text && <span>Video</span>}
                          </div>
                        )
                      }
                    </div>
                    <p className="text-ellipsis line-clamp-1">{conv?.lastMsg?.text}</p>
                  </div>
                </div>
                {
               Boolean(conv?.unseenMsg) &&(<p className="flex justify-center items-center text-sm w-5 h-5 ml-auto p-1 bg-primary text-white text-center font-semibold rounded-full">{conv?.unseenMsg}</p>
                  )
                }
                
              </NavLink>
            )
          })}
        </div>
      </div>

      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
};

export default Sidebar;
