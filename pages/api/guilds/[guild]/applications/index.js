const axios = require('axios')

export default async (req, res) => {
    const { guild } = req.query;
    const { access, refresh } = req.body;

    let adminCheck;

    try {
        adminCheck = await axios.post("https://receptioni.st/api/guilds/" + guild + "/hasAdmin", { access, refresh });
    }
    catch (err) {
        if (err.response.status == 401) {
            res.statusCode = 401;
            res.json({ success: false, message: "401 Unauthorized Access" })
            res.end();
        }
        if (err.response.status == 429) {
            res.statusCode = 429;
            res.json({ success: false, message: "429 Rate Limited" })
            res.end();
        }
    }

    res.statusCode = 200;
    res.json({ success: true, adminCheck })
    res.end();

}