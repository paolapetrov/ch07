/* import { db } from "./data";

declare interface WeatherInterface {
    zip: string;
    weather: string;
    tempC: string;
    tempF: string;
    friends: string[];
}
    */

import { WeatherInterface } from "@/mongoose/weather/interface";
import { findByZip,updateByZip } from "@/mongoose/weather/services";
//import { findBreakingChanges } from "graphql";
console.log("Inside graphql resolvers");

export const resolvers = {
    Query: {
        weather: async (_: any, param: WeatherInterface) => {
            //return [db.find((item) => item.zip === param.zip)];
            let data = await findByZip(param.zip);
            return [data];
        }
    },
    Mutation: {
        weather: async (_: any, param: { data: WeatherInterface }) => {
            //return [db.find((item) => item.zip === param.data.zip)];
            let data = await findByZip(param.data.zip);
            return [data];
        }
    }
};