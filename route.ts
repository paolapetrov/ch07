import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../../graphql/resolvers";
import { typeDefs } from "../../graphql/schema";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/middleware/db-connect";

//@ts-ignore
const server = new ApolloServer({
    resolvers,
    typeDefs
});

const handler = startServerAndCreateNextHandler(server);

async function connectDB(req: NextRequest) {
    await dbConnect();
    return handler(req);
}


async function allowCors(req: NextRequest) {
    const response = await connectDB(req);
    if (req.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 200,
            headers: {
                "Allow": "POST",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        });
    }
    // Set CORS headers on the response 
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST");
    response.headers.set("Access-Control-Allow-Headers", "*");
    response.headers.set("Access-Control-Allow-Credentials", "true");

    return response;
    }

    //Named export for POST method (GraphQL typically uses POST)
    export async function POST(req: NextRequest) {
    return allowCors(req);
    }

    // Optional: Named export for GET (if you want to support GraphQL queries via GET)
    export async function GET(req: NextRequest) {
        return allowCors(req)    
    }
