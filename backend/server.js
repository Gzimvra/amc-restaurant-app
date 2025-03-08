require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3500;

// ################################################## MIDDLEWARES ##################################################








// #################################################### ROUTES #####################################################

app.all("*", (req, res) => {
    res.status(200).json({ success: "Hello World!"})
//   res.status(404);
//   if (req.accepts("json")) {
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
});


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
