import * as xlsx from 'xlsx';
import { getDataFromNoflim } from './getDataFromNoflim';

import { Data } from './Interfaces';

const wb = xlsx.readFile("C:\\Users\\Noam\\Downloads\\דוח חללים להנחת פתקי חיפוש - דוח לנעם 22032022.xlsx");
const s = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 }) as [];


async function process() {
    var count = 0;
    for (const r of s) {


        const row = r as string[];
        if (count++ == 0) {
            row[4] = 'בית עלמין באתר יזכור';
            row[5] = 'אזור';
            row[6] = 'חלקה';
            row[7] = 'שורה';
            row[8] = 'קבר';
            row[9] = 'הנחיות';
        } else

            if (row[3]) {
                console.log(row[0]);
                const sp = (row[3] as string).split('/');
                const param = sp[sp.length - 1].split('#')[0];
                if (param) {
                    const d: Data = await getDataFromNoflim(param);

                    row[4] = d.cemetery_name;
                    row[5] = d.grave_area;
                    row[6] = d.grave_plot;
                    row[7] = d.grave_row_number;
                    row[8] = d.grave_number;
                    var directions = '';
                    for (const position of [5, 6, 7, 8]) {
                        if (row[position]) {
                            if (directions)
                                directions += ', ';
                            //@ts-ignore
                            directions += s[0][position] + ": " + row[position].trim();
                        }
                    }
                    row[9] = directions;
                }

            }

    }
    //save to excel when done
    let wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(s, { skipHeader: true }));
    xlsx.writeFile(wb, "c:\\temp\\result.xlsx");
    console.log("done");
    return;



}
process();








