Palettes
Project 1: Seeding complete!
Project 2: Seeding complete!
✓ should GET all palettes
Project 1: Seeding complete!
Project 2: Seeding complete!
2) should get a single palette
Project 1: Seeding complete!
Project 2: Seeding complete!
✓ should throw an error if GET palette does not exist
Project 1: Seeding complete!
Project 2: Seeding complete!
✓ should POST a new palette
Project 1: Seeding complete!
Project 2: Seeding complete!
✓ should throw an error if POST does not include name property
Project 1: Seeding complete!
Project 2: Seeding complete!
✓ should throw an error if POST does not include project_id property
Project 1: Seeding complete!
Project 2: Seeding complete!
3) should delete a palette
Project 1: Seeding complete!
Project 2: Seeding complete!
✓ should throw an error if DELETE palette does not exist


11 passing(3s)
3 failing

1) Projects
should get a single project:
Uncaught TypeError: Cannot read property 'should' of undefined
at chai.request.get.end(test / routes.spec.js: 49: 18)
at Test.Request.callback(node_modules / superagent / lib / node / index.js: 728: 3)
at ClientRequest.req.once.err(node_modules / superagent / lib / node / index.js: 647: 10)
at Socket.socketErrorListener(_http_client.js: 389: 9)
at emitErrorNT(internal / streams / destroy.js: 64: 8)
at _combinedTickCallback(internal / process / next_tick.js: 138: 11)
at process._tickCallback(internal / process / next_tick.js: 180: 9)

2) Palettes
should get a single palette:
Uncaught TypeError: Cannot read property 'should' of undefined
at chai.request.get.end(test / routes.spec.js: 160: 18)
at Test.Request.callback(node_modules / superagent / lib / node / index.js: 728: 3)
at ClientRequest.req.once.err(node_modules / superagent / lib / node / index.js: 647: 10)
at Socket.socketErrorListener(_http_client.js: 389: 9)
at emitErrorNT(internal / streams / destroy.js: 64: 8)
at _combinedTickCallback(internal / process / next_tick.js: 138: 11)
at process._tickCallback(internal / process / next_tick.js: 180: 9)

3) Palettes
should delete a palette:
Error: Timeout of 2000ms exceeded.For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/Users/michaelgatewood / Documents / ___Turing / Mod4 / palette - picker / test / routes.spec.js)
