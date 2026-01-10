(window as any).global = window;

import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io('http://localhost:3000'); // server URL

function VideoCall() {

  const myVideoRef: any = useRef(null);
  const peerVideoRef: any = useRef(null);
  const connectionRef: any = useRef(null);

  const [stream, setStream] = useState<any>(null);
  const [userId, setUserId] = useState<any>('');
  const [isCallAccepted, setIsCallAccepted] = useState<any>(false);
  const [incominCallInfo, setIncominCallInfo] = useState<any>({});

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream: any) => {
        setStream(mediaStream);
        myVideoRef.current.srcObject = mediaStream;
      }).catch((error) => console.error('Error accessing media devices:', error));
  }, []);

    const initiateCall = () => {
    if (userId) {
      const peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', (signalData: any) => {
        console.log('Initiating call to user:', userId, signalData);
        socket.emit('initiateCall', { userId, signalData, myId: socket?.id }); //initiating call
      });

      peer.on('stream', (remoteStream: any) => {
        peerVideoRef.current.srcObject = remoteStream;
      });

      socket.on('callAccepted', (signal: any) => {
        setIsCallAccepted(true);
        peer.signal(signal);
      });

      connectionRef.current = peer;
    } else {
      alert('enter user id call initiate a call')
    }
  };

    const answerCall = () => {
    setIsCallAccepted(true);

    const peer = new SimplePeer({ initiator: false, trickle: false, stream: stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: incominCallInfo.from });
    });

    peer.on('stream', (currentStream) => {
      peerVideoRef.current.srcObject = currentStream;
    });

    peer.signal(incominCallInfo.signalData);

    connectionRef.current = peer;
  };

  const endCall = () => {
    socket.emit('endCall', { to: incominCallInfo.from });
    destroyConnection();
  };

  const destroyConnection = () => {
    connectionRef.current.destroy();
    window.location.reload();
  };


  return (
        <div className="flex flex-col item-center">
      <h2 className='text-center'>Video Calling MERN App</h2>

      <div className='flex flex-col w-300 gap-4'>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className='input'
        />
        <button onClick={initiateCall} className='input bg-blue'>Call user</button>
      </div>

      <section className='m-4'>My ID: <u><i>{socket?.id}</i></u></section>

      <div className='flex flex-row gap-4 m-4 mb-8'>
        <div>
          <h3 className='text-center'>My Video</h3>
          <video ref={myVideoRef} autoPlay playsInline muted className='video_player' />
        </div>
        
        {isCallAccepted &&
          <div>
            <h3 className='text-center'>Peer Video</h3>
            <video ref={peerVideoRef} autoPlay playsInline className='video_player' />
          </div>
        }
      </div>

      {isCallAccepted ?
        <button className='input bg-red' onClick={endCall}>End Call</button>
        :
        (incominCallInfo?.isSomeoneCalling) &&
        <div className='flex flex-col mb-8'>
          <section className='m-4'><u>{incominCallInfo?.from}</u> is calling</section>
          <button onClick={answerCall} className='input bg-green'>Answer call</button>
        </div>
      }
    </div>
  );
}

export default VideoCall;
