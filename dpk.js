const crypto = require("crypto");

const HASH_ALGORITHM = "sha3-512";
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const DIGEST = "hex";

exports.deterministicPartitionKey = (event) => {

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const candidate = getCandidateFrom(event);
  if (!candidate) {
    return TRIVIAL_PARTITION_KEY;
  }

  const partitionKeyTooLong = candidate.length > MAX_PARTITION_KEY_LENGTH;
  if (partitionKeyTooLong) {
    return crypto
      .createHash(HASH_ALGORITHM)
      .update(candidate)
      .digest(DIGEST);
    }

  return candidate;
};

function getCandidateFrom(event) {
  if (event.partitionKey) {
    return event.partitionKey;
  }

  const data = JSON.stringify(event);
  return crypto
    .createHash(HASH_ALGORITHM)
    .update(data)
    .digest(DIGEST);
}
