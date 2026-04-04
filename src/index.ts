import { serve } from "bun";
import index from "./frontend/index.html";
import db from "./server/db";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/save": {
      async PUT(req) {
        try {
          const body = await req.json();
          if(body.url) {
            db.run("INSERT INTO videos (url) VALUES (?)", body.url);
            
            return Response.json({ message: "SAVED" });
          }
          return Response.json({ error: "MALFORMED_REQUEST" }, { status: 400 });
        } 
        catch (error) {
          const message = String(error);

          if (message.includes("UNIQUE")) {
            return Response.json(
              { error: "URL_ALREADY_EXISTS" },
              { status: 409 }
            );
          }

          return Response.json(
            { error: "INTERNAL_SERVER_ERROR" },
            { status: 500 }
          );
        }
      },
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
