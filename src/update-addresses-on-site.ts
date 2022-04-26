import * as xlsx from 'xlsx';
import axios from 'axios';

import { config } from 'dotenv';
config();
async function process1() {
    const options = {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": process.env.AUTH!,
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "_ga=GA1.3.1492354548.1580380476; _fbp=fb.2.1633264229906.1408050598; _gcl_au=1.1.48852020.1650176780; _gid=GA1.3.508166174.1650776906",
            "Referer": "https://salmaz.herokuapp.com/noflim/events",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }
    };



    //   console.table(s.map(s => s[0]));
    for (const row of (await axios.get<any[]>("https://salmaz.herokuapp.com/noflim/api/events", options)).data) {

        await axios.put("https://salmaz.herokuapp.com/noflim/api/events/" + row.id, {
            address: ''
        },options)
        let result = await axios.put("https://salmaz.herokuapp.com/noflim/api/events/" + row.id, {
            address: row.address
        },options);
        console.log(result);

    }
}
process1();