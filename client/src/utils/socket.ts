import { Local } from '../environment/env';
import {io} from "socket.io-client"
const socket = io(`${Local.BASE_URL}`);

export default socket;