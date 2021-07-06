in order for client to connect express you
need to match the correct url the correct port and the ip of the current pc.
const api = axios.create({ baseURL: "http://192.168.43.251:4000/api"});
<----->
'192.168.43.251' is the current ip address of the computer i'm using at the moment