
const ShoppingListStorage = {
    data: {
        member: {},
        group: {},
    },
    getMemmber(openid) {
        return this.data.member[openid];
    },

    setMember(openid, info) {
        this.data.member[openid] = info;
    },

    getGroup(id) {
        return this.data.group[id];
    },

    setGroup(id, info) {
        this.data.group[id] = info;
    },
}

export default ShoppingListStorage;