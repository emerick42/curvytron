/**
 * Room Repository
 */
function RoomRepository(socket)
{
    this.socket  = socket;
    this.rooms = new Collection([], 'name');
}

/**
 * Create a room
 *
 * @param {String} first_argument
 *
 * @return {Room}
 */
RoomRepository.prototype.create = function(name)
{
    var room = new Room(name);

    if (this.rooms.add(room)) {
        this.emitNewRoom(room);

        return room;
    }
}

/**
 * List rooms
 */
RoomRepository.prototype.listRooms = function(client)
{
    for (var i = this.rooms.ids.length - 1; i >= 0; i--) {
        this.emitNewRoom(this.rooms.items[i], client);
    }
};

/**
 * emitNewRoom
 *
 * @param {Room} room
 * @param {Socket} client
 */
RoomRepository.prototype.emitNewRoom = function(room, client)
{
    var socket = (typeof(client) !== 'undefined' ? client : this.socket)

    socket.emit('room:new', room.serialize());
    console.log('room:new', room.serialize());
};

/**
 * Get by name
 *
 * @param {String} name
 *
 * @return {Room}
 */
RoomRepository.prototype.get = function(name)
{
    return this.rooms.getById(name);
};