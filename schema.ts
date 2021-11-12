import type { Context } from "https://deno.land/x/oak@v6.3.1/context.ts";
//cliente que hace la reserva
export interface ClientSchema {
  _id: { $oid: string };
  cif: string;
  name: string;
  address: string;
  phone?: number;
  email?: string;
}

export interface IClient {
  cif: string;
  name: string;
  address: string;
  phone?: number;
  email?: string;
}
//asiento
export interface SeatSchema {
  _id: { $oid: string };
  sku: string;
  number: string;
  booked: boolean;
  price?: number;
}

export interface ISeat {
  sku: string;
  number: string;
  booked: boolean;
  price: number;
}
//reserva asociada a un cliente y un asiento
export interface BookSchema {
  _id: { $oid: string };
  clientCIF: string;
  Seats: Ireg[];
  day: number;
  month: number;
  year: number;
  seat: number;
}

export interface IBook {
  clientCIF: string;
  Seats: Ireg[];
}

interface Ireg {
  sku: string;
  amount: number;
}

export type IContext = Context<Record<string, any>>;
