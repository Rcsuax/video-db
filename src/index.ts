import { serve } from "bun";
import homepage from "./frontend/index.html";
import db from "./backend/db";

// const router = new Bun.FileSystemRouter({
//   style: "nextjs",
//   dir: "./pages/",
// });

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/": homepage,
    // "/": {
    //   async GET(req) {
    //     let match = router.match(req);
    //     if(!match) return Response.json({ error: "PAGE_NOT_FOUND" }, { status: 404 });
        
    //     let page = require(match.filePath);
    //     return new (page)(req, match.query, match.params);
    //   }
    // },

    "/api/video": {
      async GET(req) {
        const query = db.query(`SELECT url from videos`);
        const results = query.all();
        console.log("reuslts", results)
        return Response.json({ videos: results });
      },
    },

    "/api/video/save": {
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
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
