const path = require("path");
const fs = require("fs");
const { request } = require("http");
const fastify = require("fastify")();

fastify.get("/", function (req, res) {
    const bufferIndexHtml = fs.readFileSync(
        path.join(__dirname, "/public/index.html")
    );
    res.type("text/html").send(bufferIndexHtml);
});

fastify.get("/t/:timeline", function (req, res) {
    const bufferIndexHtml = fs.readFileSync(
        path.join(__dirname, "/public/presets.html")
    );
    res.type("text/html").send(bufferIndexHtml);
});

fastify.get("/new", function (req, res) {
    const bufferIndexHtml = fs.readFileSync(
        path.join(__dirname, "/public/new.html")
    );
    res.type("text/html").send(bufferIndexHtml);
});

fastify.get("/createCard", function (req, res) {
    const bufferIndexHtml = fs.readFileSync(
        path.join(__dirname, "/public/newc.html")
    );
    res.type("text/html").send(bufferIndexHtml);
});

const opts = {
    schema: {
        querystring: {
            theData: { type: "object" },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    success: { type: "boolean" },
                },
            },
        },
    },
};

fastify.post("/saveCard", opts, (req, res) => {
    fs.writeFile(
        "./public/cards/" + req.body.cardName + ".html",
        req.body.cardData,
        function (err) {
            if (err) {
                console.log(err);
                res.send(err);
                throw err;
            }
        }
    );
    res.send({ success: true });
});

fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "public"),
    prefix: "/",
});

fastify.listen({ port: 80, host: "0.0.0.0" }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Running on ${address} at port 80`);
});
