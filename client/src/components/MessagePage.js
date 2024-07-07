import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import { TbDotsVertical } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Loading from "./Loading";
import background from '../assets/background.jpeg';
import { IoSendSharp } from "react-icons/io5";
import moment from 'moment'

const MessagePage = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  const [openImageVideoUpload,setOpenImageVideoUpload]=useState(false)
  const [message,setMessage]=useState({
    text:"",
    imageUrl:"",
    videoUrl:""

  })
  const [loading,setLoading]=useState(false)
  const [allMessage,setAllMessage]=useState([]) 
  const currentMessage=useRef(false)

  useEffect(()=>{
    if(currentMessage.current){
        currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
    }
},[allMessage])

  
  const handleUploadImageVideoOpen=()=>{
      setOpenImageVideoUpload(prev=>!prev)
  }
  
  const handleUploadImage= async(e)=>{
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)
    setMessage(prev=>{
      return {
        ...prev,
        imageUrl:uploadPhoto.url
      }
    })
  }
  const handleClearUploadImage=()=>{
    setMessage(prev=>{
      return {
        ...prev,
        imageUrl:""
      }
    })

  }

  const handleUploadVideo=async(e)=>{
    const file = e.target.files[0]
    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)
    setMessage(prev=>{
      return {
        ...prev,
        videoUrl:uploadPhoto.url
      }
    })
  }

  const handleClearUploadVideo=()=>{
    setMessage(prev=>{
      return {
        ...prev,
        videoUrl:""
      }
    })

  }



  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId)
       
      socketConnection.emit('seen',params.userId)

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      })
      socketConnection.on('message',(data)=>{
        setAllMessage(data)
      })

    }
  }, [socketConnection, params?.userId, user]);


  const handleOnChange=(e)=>{
    const {name,value}=e.target

    setMessage(prev=>{
      return{
        ...prev,
        text:value
      }
    })
  }

  const handleSendMessage=(e)=>{
    e.preventDefault()
  if(message.text || message.imageUrl || message.videoUrl){
    if(socketConnection){
      socketConnection.emit('new message',{
        sender:user?._id,
        receiver:params.userId,
        text:message.text,
        imageUrl:message.imageUrl,
        videoUrl:message.videoUrl,
        msgByUserId:user?._id
      })
      setMessage({
        text : "",
        imageUrl : "",
        videoUrl : ""
      })
    }

  }
      
  }

  return (
    <div style={{backgroundImage:`url(${background})`}} className="bg-no-repeat bg-cover">
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0">{dataUser?.name}</h3>
            <p className="-my-2">
              {dataUser.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-gray-400">offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer">
            <TbDotsVertical />
          </button>
        </div>
      </header>
      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
      <div className="flex flex-col gap-2 py-1 mx-1 " ref={currentMessage}>
       {
                      allMessage.map((msg,index)=>{
                        return(
                          <div className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg?.msgByUserId ? "ml-auto bg-sky-200" : "bg-white"}`}>
                            <div className='w-full relative'>
                              {
                                msg?.imageUrl && (
                                  <img  
                                    src={msg?.imageUrl}
                                    alt=""
                                    className='w-full h-full object-scale-down'
                                  />
                                )
                              }
                              {
                                msg?.videoUrl && (
                                  <video
                                    src={msg.videoUrl}
                                    className='w-full h-full object-scale-down'
                                    controls
                                  />
                                )
                              }
                            </div>
                            <p className='px-2'>{msg.text}</p>
                            <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                          </div>
                        )
                      })
                    }
       </div>       
       {
        message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-400 " onClick={handleClearUploadImage}>
              <IoClose size={30}/>
            </div>
          <div className="bg-white p-3">
              <img src={message.imageUrl} alt="photos" className="aspect-square w-full h-full max-w-sm m-2"/>
          </div>
        </div>
        )
       }
      {
        message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-400 " onClick={handleClearUploadVideo}>
              <IoClose size={30}/>
            </div>
          <div className="bg-white p-3">
              <video src={message.videoUrl}
              className="aspect-square w-full h-full max-w-sm m-2"
              controls
              muted
              autoPlay
              />
          </div>
        </div>
        )
       }
       {
        loading &&(
          <div className="w-full h-full flex  justify-center items-center">
            <Loading/>
          </div>
        ) 
       }
       
      </section>


      <section className="h-16 bg-white flex items-center px-4">
        <div className=" relative ">
          <button onClick={handleUploadImageVideoOpen} className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-primary hover:text-white">
            <FaPlus size={20} />
          </button>
           {
            openImageVideoUpload && (
              <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
            <form>
              <label htmlFor="uploadImage" className="flex items-center gap-2 p-2 hover:bg-slate-200 px-3 cursor-pointer">
                <div className="text-primary">
                <FaImage size={18}/>
                </div>
                <p>Images</p>
              </label>
              <label htmlFor="uploadVideo" className="flex items-center gap-2 p-2 hover:bg-slate-200 px-3 cursor-pointer">
                <div className="text-purple-400">
              <FaVideo size={18}/>
                </div>
                <p>Videos</p>
              </label>
              <input type="file" id="uploadImage" onChange={handleUploadImage} className="hidden"/>
                <input type="file" id="uploadVideo" onChange={handleUploadVideo} className="hidden"/>

            </form>
          </div>
            )
           }
          
        </div>
    <form className="w-full h-full flex gap-2" onSubmit={handleSendMessage}>
      <input type="text" id=""
      placeholder="Type a message"
      className="py-1 px-4 w-full h-full outline-none"
      value={message.text}
      onChange={handleOnChange}
      />
      <button className=" hover:text-green-600">
        <IoSendSharp size={25}/>
      </button>
        </form>
      </section>
    </div>
  );
};

export default MessagePage;
