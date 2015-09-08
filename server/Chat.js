(function () {
    var _ = require('lodash');
    var uuid = require('node-uuid');

    function chat() {
        var me = {
            messages: [],
            users: [],
            addUser: function (name) {
                var user = {
                    id: uuid.v4(),
                    name: name,
                    color: '#000000' // TODO: Randomize
                };

                me.users[user.id] = user;

                // return the user to be return to client
                return user;
            },
            removeUser: function (id) {
                me.users = _.remove(me.users, function (user) {
                    return user.id === id;
                });
            },
            addMessage: function (senderID, message) {
                me.messages.push({
                    id: me.messages.length,
                    sender: me.users[senderID],
                    message: message
                });

                // return the index of this message
                return me.messages.length - 1;
            },
            getMessages: function (last, count) {
                var result = [];
                var i = (last - count) < 0 ? last : count;

                for (; i > 0; i--) {
                    result.push(me.messages[last - i]);
                }
                console.log(me.messages, result);

                return result;
            }
        };

        Object.defineProperties(me, {
            lastMessages: {
                enumerate: true,
                get: function () {
                    return me.getMessages(me.messages.length - 1, 50);
                }
            }
        });

        return me;
    }

    module.exports = chat;
})();