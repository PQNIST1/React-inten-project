// components/VideoModal.js
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../controller/SliceReducer/modal';
import YouTube from 'react-youtube';

const VideoModal = () => {
  const dispatch = useDispatch();
  const { isModalOpen, videoId } = useSelector((state) => state.modal);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },);

  if (!isModalOpen) {
    return null;
  }

  const opts = {
    height: '500',
    width: '1200',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-10">
      <div ref={modalRef} className="relative p-4 rounded-lg shadow-lg">
        <YouTube videoId={videoId} opts={opts} />
      </div>
    </div>
  );
};

export default VideoModal;
