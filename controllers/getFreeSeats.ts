import { Database } from "https://deno.land/x/mongo@v0.12.1/ts/database.ts";
import { helpers } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { bookSchema, ClientSchema, seatSchema, IContext } from "../schemas.ts";

const getFreeSeats = async (ctx: IContext) => {
    try {
        const db: Database = ctx.state.db;
        const bookCollection = db.collection<bookSchema>("bookCollection");
        const ClientCollection = db.collection<ClientSchema>("ClientCollection");
        const seatCollection = db.collection<seatSchema>("seatCollection");

        const { day, month, year } = helpers.getQuery(ctx, { mergeParams: true });
        const seat = await bookCollection.findOne({ id: id });
        if (seat) {
            //Devolver datos del sitio
            const seat = await seatCollection.findOne({ id: id });
            if (seat) { //sigue existiendo el asiento
                let seatData = { "seat": { ...seat } };
                if (seat.booked = false) {
                    const totalData = seat.seats.map(async (p) => {
                        const seat = await seatCollection.findOne({ sku: p.sku });
                        return {
                            ...seatData
                        };
                    });
                    ctx.response.status = 200;
                    ctx.response.body = totalData;
                }
                ctx.response.status = 404;
                ctx.response.body = "Bad request";
               
            } 
        }
    } catch (e) {
        ctx.response.status = 500;
        ctx.response.body = "Server Error";
    }
};

export {getFreeSeats}
