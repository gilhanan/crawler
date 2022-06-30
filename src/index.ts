import axios from 'axios';

async function main() {
  const res = await axios.get('http://google.com/');

  console.log(res.status);
}

main();
