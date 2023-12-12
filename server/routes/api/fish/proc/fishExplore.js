const mqttConnection = require('../../../../modules/util/mqtt');

module.exports = async (req, res) => {
    try{
        mqttConnection.publish(`Fish/explore/${req.query.section}`, JSON.stringify({ explore: true }));
        res.sendStatus(200);
    }catch(e){res.status(500).send(e)}
}