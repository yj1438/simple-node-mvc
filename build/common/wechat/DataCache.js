'use strict';

var DataCache = {
    token: '',
    token_expries: 0,
    ticket: '',
    ticket_expries: 0,
    setToken: function setToken(data) {
        this.token = data.access_token;
        //过期时间提前60s
        this.token_expries = data.expires_in + Math.floor(new Date().getTime() / 1000) - 60;
    },
    setTicket: function setTicket(data) {
        this.ticket = data.ticket;
        //过期时间提前60s
        this.ticket_expries = data.expires_in + Math.floor(new Date().getTime() / 1000) - 60;
    }
};

module.exports = DataCache;
//# sourceMappingURL=DataCache.js.map
