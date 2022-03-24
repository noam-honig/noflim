import * as axios from 'axios';
import { Data } from './Interfaces';
export async function getDataFromNoflim(param: string): Promise<Data> {
    return await axios.default({
        method: 'get',
        url: 'https://www.izkor.gov.il/search/memory/presentation/' + param,
        headers: {
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://www.izkor.gov.il/%D7%90%D7%91%D7%95%20%D7%92%D7%9C%D7%99%D7%95%D7%9F%20%D7%A2%D7%95%D7%93%D7%94%20%D7%A1%D7%9C%D7%99%D7%9E%D7%9F/en_4336809c3294a576f8fcec0116aba96f',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': 'visid_incap_1068888=r0C1ODqST2C4oUvRn7yz0qiYPGIAAAAAQUIPAAAAAAAd7Wb7bNO1y1yxfMS0X7zn; incap_ses_352_1068888=i8VbBgl9XkthUvvtwI7iBKiYPGIAAAAAqPkT4sFhdzkzDpnDMci4Yw=='
        }
    })
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        })
}