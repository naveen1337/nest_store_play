const redis = require("redis");
const client = redis.createClient("redis-test.com:12794");


// [redis[s]:]//[[user][:password@]]:12794][/db-number][?db=db-number[&password=bar[&option=value]]]redis-test.com[