const fs = require("fs");

exports.writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
        if (err) {
        console.log(err);
        }
    });
};

exports.getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        try {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", async () => {
            resolve(body);
        });
        } catch (error) {
        reject(error);
        }
    });
};
