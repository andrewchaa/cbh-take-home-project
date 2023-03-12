const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it('Returns the partition key when it is provided', () => {
    const event = { partitionKey: 'my_partition_key' };

    expect(deterministicPartitionKey(event)).toBe('my_partition_key');
  });

  it('Calculates the partition key when it is not provided', () => {
    const event = { key: 'value' };
    const expectedPartitionKey = crypto
      .createHash('sha3-512')
      .update(JSON.stringify(event))
      .digest('hex');

    expect(deterministicPartitionKey(event)).toBe(expectedPartitionKey);
  });

  it('Returns a partition key with a maximum length of 256 characters', () => {
    const longCandidate = 'x'.repeat(300);
    const event = { partitionKey: longCandidate };
    const expectedPartitionKey = crypto
      .createHash('sha3-512')
      .update(longCandidate)
      .digest('hex');

    expect(deterministicPartitionKey(event)).toBe(expectedPartitionKey);
  });

});
