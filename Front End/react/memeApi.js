

let memeURL;

if (process.env.NODE_ENV === 'development') {
   memeURL = 'http://localhost:3200';
} else {
  memeURL = '/api'
}

export default memeURL;