import { Entity, EntityBase, Fields, Remult } from "remult";
import { createPostgresConnection } from 'remult/postgres';
import { config } from 'dotenv';
import axios from "axios";
import * as xlsx from 'xlsx';


@Entity(undefined!, {
    dbName: "noflim.GeocodeCache",
    allowApiRead: false,
    allowApiCrud: false
})
export class GeocodeCache extends EntityBase {
    @Fields.string()
    id!: string;
    @Fields.string()
    googleApiResult!: string;
    @Fields.date()
    createDate!: Date;
}

(async () => {
    config();

    const wb = xlsx.readFile("C:\\temp\\locations.xlsx");
    const s = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 }) as any[];

    const db = await createPostgresConnection({ autoCreateTables: false, configuration: 'heroku', sslInDev: true });
    const ggl = await new Remult(db).repo(GeocodeCache).find();
    for (const c of s) {
      
        let g = ggl.find(g => g.id.startsWith(c[0].toString().trim()));
        if (g) {
            let result = JSON.parse(g?.googleApiResult);
            let r = result.results[0];
            if (r) {
                r.types[0] = 'establishment';
                r.partial_match = false;
                r.formatted_address = c[0];
                let sp = c[2].toString().split(',')
                r.geometry.location.lat = +sp[0];
                r.geometry.location.lng = +sp[1];

            } else {
                result.status = 'OK';
                let sp = c[2].toString().split(',')
                r = {
                    types: ['establishment'],
                    partial_match: false,
                    formatted_address: c[0],
                    geometry: { location: { lat: +sp[0], lng: +sp[1] } }
                }
                result.results.push(r);
            }
            if (!r.address_components)
                r.address_components = [];
            g.googleApiResult = JSON.stringify(result);
            await g.save();
        } else {
            console.log(c[0]);
        }
    }


})()

