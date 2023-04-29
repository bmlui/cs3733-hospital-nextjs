export default class EncodeDecode{

     static  encodeDirections(start: string, end: string, directions: string, generateDate: string, forDate: string):string {
        const pako = require('pako');

        // Encode the compressed data using Base64
        const encodedDataStart = encodeURIComponent(Buffer.from(start).toString('base64'));


          // Encode the compressed data using Base64
          const encodedDataEnd = encodeURIComponent(Buffer.from(end).toString('base64'));


          
          // Encode the compressed data using Base64
          const encodedDataDirections = encodeURIComponent(Buffer.from(directions).toString('base64'));

          // Encode the compressed data using Base64
          const encodedDataGenerateDate = encodeURIComponent(Buffer.from(generateDate).toString('base64'));

          // Encode the compressed data using Base64
          const encodedDataForDate = encodeURIComponent(Buffer.from(forDate).toString('base64'));


        // Define the string to compress
        const finalString = '?start=' + encodedDataStart + '&end=' + encodedDataEnd + '&directions=' + encodedDataDirections + '&generateDate=' + encodedDataGenerateDate + '&forDate=' + encodedDataForDate;
    
            return finalString;
}

static decodeDirections(encodedData: string):string {
    const pako = require('pako');
    // URL decode the encoded data
const decodedData = Buffer.from(decodeURIComponent(encodedData), 'base64').toString('ascii'); 

return decodeURIComponent(decodedData);
}


}