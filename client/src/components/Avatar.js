import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUsers = useSelector(state => state?.user?.onlineUser);

  let avatarInitials = '';
  if (name) {
    const splitName = name.split(' ');
    avatarInitials = splitName.map(part => part[0]).join('').toUpperCase();
  }

  const colors = [
    'bg-blue-200',
    'bg-green-200',
    'bg-indigo-200',
    'bg-purple-200',
    'bg-pink-200',
    'bg-yellow-200',
    'bg-red-200',
    'bg-teal-200',
    'bg-cyan-200',
  ];

  const randomColor = Math.floor(Math.random() * colors.length);
  const isOnline = onlineUsers.includes(userId);

  return (
    <div className={`overflow-hidden rounded-full relative`} style={{ width: width + 'px', height: height + 'px' }}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} width={width} height={height} className='overflow-hidden rounded-full' />
      ) : name ? (
        <div
          className={`overflow-hidden rounded-full flex justify-center items-center text-lg font-bold text-gray-800 ${colors[randomColor]}`}
          style={{ width: width + 'px', height: height + 'px' }}
        >
          {avatarInitials}
        </div>
      ) : (
        <FaRegUserCircle size={width} className='text-gray-400' />
      )}
     {isOnline && (
  <div className='absolute bottom-0 right-1 z-10'>
    <div className='relative'>
      <div className='bg-green-500 rounded-full w-3 h-3 border-2 border-white'></div>
    </div>
  </div>
)}

    </div>
  );
};

export default Avatar;
