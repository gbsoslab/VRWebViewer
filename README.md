# VRWebViewer

## Execution
- Install node dependencies. 
'''javascript
$ npm install
'''
- Install monogodb
'''
$ brew install mongodb
'''
- Initialize Database
'''
$ mkdir -p $PROJECT DIR/data/db
'''
- Start Database
'''
$ mongod --dbpath $PROJECT DIR/data/db &
'''
- Run Server
'''
$ DEBUG=express:* node ./bin/www
'''
