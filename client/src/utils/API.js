require('dotenv');
import axios from 'axios';

/* the GET '/api/musicians/APIkey=' route uses URL query strings.
after the route URL, a question mark needs to be placed.
Then the query strings can be listed one after another using '&amp'
Spaces in strings need to be replaced by their encoded form: '%20'
Currently the API only supports searches with single instruments and single exp queries
example:
`/api/musicians/APIkey=${process.env.APIkey}?location=Kansas%20City&ampgenre=jazz&ampinstrument=trumpet&ampexp=3`
*/

/* EXAMPLE user signon request body:
{
	"firstName" : "Francis",
	"lastName" : "Biker",
	"password" : "jellyfish",
	"email" : "francisBiker@email.com",
	"city" : "Philidelphia",
	"state" : "PN",
	"isMusician" : true,
	"instruments" : [
		{
			"instrument" : "drums",
			"yearsExp" : 3
		},{
			"instrument" : "tuba",
			"yearsExp" : 5
		}
	]
}
*/
export default {
     searchMusicians: function(queryObj){
          return axios.get(`/api/musicians/APIkey=${process.env.APIkey}`)
     }
}