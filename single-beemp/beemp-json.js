module.exports = {
  '_id'         : '12345678',
  'timestamp'   : '1486588264',
  'ownerid'     : 'asdfghjk',
  'owner'       : 'ben',
  'message'     : 'There is a #place in #space that has a face',
  'tags'        : [
                    'place',
                    'space'
                  ],

  //in the schema this will be a list of ids
  //that will be called when the message is displayed
  'replies'  : [
                {
                  '_id'       : '87654321',
                  'timestamp' : '1486588293',
                  'ownerid'   : 'qwertyui',
                  'owner'     : 'billy_joel',
                  'message'   : 'I #can\'t believe what your saying',
                  'tags'      : [
                                  'can\'t'
                                ],
                  'replies'   : [] //ALWAYS SHOULD BE NULL

                },
                {
                  '_id'       : '56565656',
                  'timestamp' : '1486588355',
                  'ownerid'   : 'lglglglg',
                  'owner'     : 'Sandvich',
                  'message'   : '#treachery!!!',
                  'tags'      : [
                                  'treachery!!!'
                                ],
                  'replies'   : []
                }
               ]
}
