import React, { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';
import uploadFile from '../helpers/uploadFile';
import Divider from './Divider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name || '', // Update to access correct user name
    profile_pic: user?.profile_pic || '', // Update to access correct profile pic
  });

  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData({
      name: user?.name || '',
      profile_pic: user?.profile_pic || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);
    setData((prev) => ({
      ...prev,
      profile_pic: uploadPhoto?.url || '',
    }));
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;
      const response = await axios.post(URL, data, { withCredentials: true });
      toast.success(response?.data?.message);
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 py-6 m-4 rounded w-full max-w-sm">
        <h2 className="font-semibold text-lg">Profile Details</h2>
        <p className="text-sm text-gray-600">Edit User Details</p>
        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <div className="my-1 flex items-center gap-3">
              <div>Profile Image:</div>
              <Avatar width={30} height={30} imageUrl={data?.profile_pic} name={data?.name} />
              <label htmlFor="profile_pic" className="cursor-pointer text-primary hover:underline">
              <button className='font-semibold' onClick={handleOpenUploadPhoto} >Update Profile Image</button>
                <input
                  type="file"
                  id="profile_pic"
                  className="hidden"
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>
          <Divider />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);
