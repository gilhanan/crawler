import https from 'https';
import axios from 'axios';
import requestsFile from './requests.json';

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  validateStatus: (): boolean => true
});

const summarizeByStatus: { [status: string]: number } = {};

async function main() {
  const { Rows } = requestsFile;
  const { length } = Rows;

  for (let index = 0; index < length; index++) {
    const row = Rows[index];

    const [url] = row;

    console.log(url);

    try {
      const { status } = await instance.get(url);

      summarizeByStatus[status] = (summarizeByStatus[status] || 0) + 1;
    } catch (error) {
      summarizeByStatus['Exceptions'] =
        (summarizeByStatus['Exceptions'] || 0) + 1;
      console.error(error);
    }

    console.log({ length, summarizeByStatus });
  }
}

main();
