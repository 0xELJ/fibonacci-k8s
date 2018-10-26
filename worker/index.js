const keys = require('./keys');
const redis = require('redis');

// redis connection setup
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const sub = redisClient.duplicate();

// fibonacci recursive solution
function fib(index) {
  if(index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// any time that we get a new value that shows up in redis we're going to calculate a new
// fibonacci value and then insert that into a hash of values
sub.on('message', (channel, message) => {
  // the key of the hash of values will be the index that we received (message contains the
  // index) and the value will be the fibonacci sequence calculated
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
