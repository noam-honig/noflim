import * as xlsx from 'xlsx';
import axios from 'axios';
const wb = xlsx.readFile("C:\\temp\\events.xlsx");
const s = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 }) as [];
import { config } from 'dotenv';
config();
async function process1() {



    //   console.table(s.map(s => s[0]));
    for (const row of s) {
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
        let r = await axios.get<any[]>("https://salmaz.herokuapp.com/noflim/api/events?eventStatus_ne=9&eventDate_gte=2022-04-17&name_contains=" + escape(row[0]), options);
        if (r.data.length == 0) {
            let result = await axios.post("https://salmaz.herokuapp.com/noflim/api/events", {

                "name": row[0] + ' - ' + (row[1] == '1' ? 'נופל אחד' : row[1] + ' נופלים'),
                "type": "other",
                "eventStatus": 0,
                "description": "הצטרפו אלינו במבצע להנחת \"פתקי חיפוש\" על קבריהם של \"לוחמים עלומים\" עד ליום חמישי 5.5 לפני הצפירה.\n",
                "eventDate": "2022-05-02",
                "startTime": "",
                "endTime": "",
                "requiredVolunteers": 1,
                "address": row[0],
                "distributionCenter": "",
                "phone1": "",
                "phone1Description": "",
                "specificUrl": ""
            }, options);
        }

    }
}
process1();