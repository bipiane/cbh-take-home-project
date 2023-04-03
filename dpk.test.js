const {deterministicPartitionKey} = require("./dpk");

describe("deterministicPartitionKey", () => {

    it("Returns the literal '0' when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe("0");
    });

    describe("Test raw type events", () => {
        test.each([
            {
                event: 'foo_bar',
                expected: '811ea0ba6fb8cfb3d689cefa2e8de2d8000ad15d2338317aaf94c0ec8c2a4f24685bf320049336cc91165e65dc469fe9ff5269000a4f85e7e0379d7b1981b767'
            },
            {
                event: 1234,
                expected: 'd760688da522b4dc3350e6fb68961b0934f911c7d0ff337438cabf4608789ba94ce70b6601d7e08a279ef088716c4b1913b984513fea4c557d404d0598d4f2f1'
            },
            {
                event: true,
                expected: 'ff2c82ed266dc30b1afe862bee32cf996b213513bc6b3e242ff605ddd9d5bbd1e7eebf6dde586b8700125cb7b95d35aec2f4e750d092cd359b202e3d2be41e1a'
            },
            {
                event: null,
                expected: '0'
            },
            {
                event: false,
                expected: '0'
            },
            {
                event: 0,
                expected: '0'
            },
            {
                event: '',
                expected: '0'
            },
        ])(`Should return '$expected' for event '$event'`, ({event, expected}) => {
            const trivialKey = deterministicPartitionKey(event);
            expect(trivialKey).toBe(expected);
        });
    })

    describe("Test object type events without 'partitionKey' property", () => {
        test.each([
            {
                event: {},
                expected: 'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862'
            },
            {
                event: {foo: "bar",},
                expected: 'a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8'
            },
        ])(`Should return '$expected' for event '$event'`, ({event, expected}) => {
            const trivialKey = deterministicPartitionKey(event);
            expect(trivialKey).toBe(expected);
        });
    })

    describe("Test events with 'partitionKey' property", () => {
        test.each([
            {
                event: {partitionKey: 'some_key'},
                expected: 'some_key'
            },
            {
                event: {partitionKey: '811ea0ba6fb8cfb3d689cefa2e8de2d8000ad15d2338317aaf94c0ec8c2a4f24685bf320049336cc91165e65dc469fe9ff5269000a4f85e7e0379d7b1981b767'},
                expected: '811ea0ba6fb8cfb3d689cefa2e8de2d8000ad15d2338317aaf94c0ec8c2a4f24685bf320049336cc91165e65dc469fe9ff5269000a4f85e7e0379d7b1981b767'
            },
            {
                event: {partitionKey: 12345},
                expected: '12345'
            },
            {
                event: {partitionKey: false},
                expected: '51a5f43b933ce152103a4789a17f1cf958e0b5e1c793082db6a6c74dd3f04c69ad8f558e28cf7c3eac61af4e484741f095129e815c4de4fdd30e3cd6c4e3c00f'
            },
            {
                event: {partitionKey: ''},
                expected: 'b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6'
            },
        ])(`Should return '$expected' for event '$event'`, ({event, expected}) => {
            const trivialKey = deterministicPartitionKey(event);
            expect(trivialKey).toBe(expected);
        });
    })

    describe("Test key max length of 256", () => {
        const partitionKey = "a".repeat(256)
        test.each([
            {
                event: {partitionKey: partitionKey},
                expected: partitionKey
            },
            {
                event: {partitionKey: `${partitionKey}a`}, // extra character
                expected: '5008048b64c14975181175f157be4a780c3d443d2177edf323d57884bc7e3979b9b53bca1325e880df3da0d97c435693441cb5527fbe950f5585678dfbb37785'
            },
        ])(`Should return '$expected' for event '$event'`, ({event, expected}) => {
            const trivialKey = deterministicPartitionKey(event);
            expect(trivialKey).toBe(expected);
        });
    });
});
