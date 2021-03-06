const clamd = require('clamdjs')
const fs = require('fs')
var async = require('async')
const SUPPORTED_FILE_TYPES = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/bmp',
]
const CognitiveServicesCredentials = require('ms-rest-azure')
  .CognitiveServicesCredentials
const ContentModeratorAPIClient = require('azure-cognitiveservices-contentmoderator')

require('dotenv').config()

const logger = require('./winstonLogger')

let serviceKey = process.env.CONTENT_MODERATOR_SERVICE_KEY
if (!serviceKey) console.warn('WARNING: Azure content moderator not configured')

async function scanFiles(data) {
  try {
    var scanner = clamd.createScanner(process.env.CLAM_URL, 3310)
    for (const file of Object.entries(data.evidence.files)) {
      //scan file for virus
      var readStream = fs.createReadStream(file[1].path)
      //set timeout for 10000
      await scanner
        .scanStream(readStream, 10000)
        .then(function (reply) {
          file[1].malwareScanDetail = reply
          file[1].malwareIsClean = clamd.isCleanReply(reply)
        })
        .catch(function (reply) {
          file[1].malwareScanDetail = 'ERROR: Unable to perform virus scan'
          file[1].malwareIsClean = false
          console.warn('Virus scan failed on ' + data.reportId)
        })
    }
  } catch (error) {
    console.warn('WARNING: File scanning failed')
  }
}

let credentials = serviceKey
  ? new CognitiveServicesCredentials(serviceKey)
  : undefined
let client = serviceKey
  ? new ContentModeratorAPIClient(
      credentials,
      'https://canadacentral.api.cognitive.microsoft.com/',
    )
  : undefined

const contentModerateFile = (file, callback) => {
  if (!SUPPORTED_FILE_TYPES.includes(file[1].type)) {
    console.debug(
      `Content Moderator Error File not scanned Azure image moderator doesn't support for file type ${file[1].type}`,
    )
    file[1].adultClassificationScore =
      'Could not scan - not a supported file type'
    callback(null, file[1])
    return
  }
  var readStream = fs.createReadStream(file[1].path)
  client.imageModeration.evaluateFileInput(readStream, {}, function (
    err,
    _result,
    _request,
    response,
  ) {
    if (err) {
      console.warn(`Error in Content Moderator: ${JSON.stringify(err)} `)
      logger.error({
        ns: 'server.submit.contentmoderator.error',
        message: 'Error in Content Moderator',
        error: err,
      })
      file[1].adultClassificationScore = 'Could not scan'
    } else {
      try {
        const contMod = JSON.parse(response.body)
        file[1].isImageRacyClassified = contMod.IsImageRacyClassified
        file[1].isImageAdultClassified = contMod.IsImageAdultClassified
        file[1].adultClassificationScore = contMod.AdultClassificationScore
        file[1].racyClassificationScore = contMod.RacyClassificationScore
      } catch (error) {
        console.warn(`Error in Content Moderator: ${error.stack} `)
      }
    }
    callback(null, file[1])
  })
}

async function contentModeratorFiles(data, finalCallback) {
  if (!serviceKey)
    console.warn('Warning: files not scanned with Content Moderator')
  else {
    async.map(
      Object.entries(data.evidence.files),
      contentModerateFile,
      function (err, _results) {
        if (err) console.warn('Content Moderator Error:' + JSON.stringify(err))
        finalCallback()
      },
    )
  }
}

module.exports = { scanFiles, contentModeratorFiles }
