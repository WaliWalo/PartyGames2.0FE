import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:4000', {
  transports: ['websocket'],
});

export default socket;

export function socket_init() {
  console.log('connected to socket');
}
