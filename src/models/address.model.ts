import Address from '@schemas/address.schema';

export default {
    createAddress: async (payload: AddressPayload) => {
        return await Address.create(payload);
    }
}