const createTorrent = require('create-torrent')
const magnet = require('magnet-uri')
const parseTorrent = require('parse-torrent')

function createFollowingTorrent(input1, opts1, input2, opts2, callback) {
  createTorrent(input2, opts2, function(err, buffer2) {
    if (err) return callback(err)
    const torrent2 = parseTorrent(buffer2)
    const comment = {
      next: magnet.encode(torrent2)
    }
    opts1.comment = JSON.stringify(comment)
    createTorrent(input1, opts1, callback)
  })
}

module.exports = createFollowingTorrent