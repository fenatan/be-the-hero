const generateId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate un unique ID', () =>{
        const id = generateId();

        expect(id).toHaveLength(8);
    });
});