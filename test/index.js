const test = require('tape')
const magnet = require('magnet-uri')
const createTorrent = require('create-torrent')
const parseTorrent = require('parse-torrent')
const createFollowingTorrent = require('..')

test('valid next torrent in comment', function (t) {
  const input1 = Buffer.from('input1')
  const input2 = Buffer.from('input2')

  const opts1 = {
    name: '1'
  }
  const opts2 = {
    name: '2'
  }

  createTorrent(input2, opts2, function(err, buffer2) {
    createFollowingTorrent(input1, opts1, input2, opts2, function(err, buffer1) {
      t.error(err)
      const torrent1 = parseTorrent(buffer1)
      const torrent2 = parseTorrent(buffer2)
      const comment = JSON.parse(torrent1.comment)
      const torrent2URI = magnet.encode(torrent2)
      t.equal(comment.next, torrent2URI, 'magnet uri of next should equal to torrent2')
      t.end()
    })
  })
})
