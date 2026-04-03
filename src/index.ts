import { serve } from "bun";
import index from "./frontend/index.html";
import db from "./server/sql";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/save": {
      async PUT(req) {
        const body = await req.json();
        
        if(body.url) {
          db.run("INSERT INTO videos (url) VALUES (?)", body.url);
          
          return Response.json({
            message: "SAVED",
            method: "PUT",
          });
        }

        return Response.json({ error: "Save failed" }, { status: 400 });
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
