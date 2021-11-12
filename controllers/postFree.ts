import { Database } from "https://deno.land/x/mongo@v0.12.1/ts/database.ts";
import { bookSchema, ClientSchema, seatSchema, IContext } from "../schemas.ts";

const postBook = async (ctx: IContext) => {
    try {
        const db: Database = ctx.state.db;
        const bookCollection = db.collection<bookSchema>("bookCollection");
        const ClientCollection = db.collection<ClientSchema>("ClientCollection");
        const seatCollection = db.collection<seatSchema>("seatCollection");
        const { value: newbook } = ctx.request.body({ type: "json" });
        const solicitud: Partial<bookSchema> = await newbook;
    
        if (!(solicitud.clientCIF && solicitud.Seats)) {//si algun dato no existe
            ctx.response.status = 404;
            ctx.response.body = "Bad Request1";
            return;
        } else {
            const exists = await seatCollection.findOne({ id: solicitud.id })
            const validSeats = solicitud.Seats.filter(p => p.sku && p.amount);
            //si encontramos el sitio reservado
            if (!exists || (validSeats.booked = true)) {
                ctx.response.status = 200;
                ctx.response.body = "Ok";
                await seatCollection.updateOne(
                    { client: ctx.client.clientCIF },
                    { $booked: {booked: false } }
                  );
                return;
            } else {
                ctx.response.status = 404;
                ctx.response.body = "Bad Request2";
                return;
            }
        }
    } catch (e) {
        ctx.response.status = 500;
        ctx.response.body = "Server Error";
    }
};

export { postBook };
