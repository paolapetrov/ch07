import { NextRequest, NextResponse} from "next/server";
import { findByZip } from "@/mongoose/weather/services";
import dbConnect from "@/middleware/db-connect";

dbConnect ();

console.log ("Inside zipcode");

export async function GET(request: Request,{ params }: { params: { zipcode: string } }) {
    console.log ("1");
    const zipcode = params.zipcode; // Extract dynamic route parameter
    console.log ("2");
    //return NextResponse.json({ message: 'Received zipcode: ${zipcode}` });
    //Promise<NextResponse<WeatherDetailType>> {
        let data = await findByZip(zipcode);
        return NextResponse.json(data);
}


/*
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { zipcode } = req.query; // Extract dynamic route parameter
    return NextResponse.json({ message: `Received ID: ${id}` });
  }
*/