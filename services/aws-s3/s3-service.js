/**
 * This module contains all the functions to handle S3 requests
 */
const AWS = require('aws-sdk');
const constants = require('../../config/constants'); // get super admin controller
const sadminService = require('../sadminService');

/**
 * AWS S3 Client Config
 */
const s3ClientConfig = {
  accessKeyId: process.env.AWS_S3_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_S3_IAM_USER_SECRET,
  Bucket: process.env.AWS_S3_BUCKET_NAME,
};

/**
 * Define module
 */
const s3service = {

  /**
  * Add new Coto logo to S3 and return the url
  */
  addS3CotoLogo: function (s3CotoDetails) {
    // Create S3 service object
    const s3 = new AWS.S3(s3ClientConfig);

    // call S3 to retrieve upload file to specified bucket
    const file = s3CotoDetails.file;
    const path = constants.AWS_S3_FOLDER_COTOS_ROOT + '/' + s3CotoDetails.idCoto + '-' + s3CotoDetails.nombreCoto + '/' + constants.AWS_S3_FOLDER_COTOS_LOGO + '/';

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: path + file.name,
      Body: file.data,
    };

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } if (data) {
        //Update the URL in cotos table
        const cotoInfo = {
          coto_img: data.Location, 
          id: s3CotoDetails.idCoto,
        };
        sadminService.updateCotoLogo(cotoInfo, function (err, data) {
          if (err) {
            console.log("Error", err);
          }
        });
        return data.Location;
      }
    });
  },
}

// export this module
module.exports = s3service;
