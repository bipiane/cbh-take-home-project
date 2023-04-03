const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
    const PARTITION_KEY_DEFAULT = "0";
    const PARTITION_KEY_MAX_LENGTH = 256;
    let partitionKey;

    if (event) {
        if (event.partitionKey) {
            partitionKey = event.partitionKey;

            if (typeof partitionKey !== "string") {
                partitionKey = JSON.stringify(partitionKey);
            }

            // Event partition key may be too long
            if (partitionKey.length > PARTITION_KEY_MAX_LENGTH) {
                partitionKey = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
            }
        } else {
            const data = JSON.stringify(event);
            partitionKey = crypto.createHash("sha3-512").update(data).digest("hex");
        }
    }

    if (!partitionKey) {
        partitionKey = PARTITION_KEY_DEFAULT
    }

    return partitionKey;
};