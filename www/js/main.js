var iddata = new Array();
var values = new Array();
var myUrl = new Array();
var mylen = 0;
var myName = new Array();

function handleStatusChange(response) {
	var output = '';
		if (response.authResponse) {
		FB.api('/me/friends?fields=id,name,picture', function(responsename) {
			//output += data;
			var len;
			len = responsename.data.length;
			for(var i = 0; i < len ; i++){
			output += "<option value=\"" + responsename.data[i].name + "\">" + responsename.data[i].name + "</option>";
				
			}
			$('#dropDown').html(output);
			
		});
        }

  else {
  alert("failure");
    console.log(response);
  }
}

function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude + '<br />' +
                            'Longitude: ' + position.coords.longitude + '<br />' +
                            '<hr />' + element.innerHTML;
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }


// onSuccess: Get a snapshot of the current contacts
//
function onFindSuccess(contacts) {
    
    
    for (var i=0; i<contacts.length; i++) {
        
           //myName[i] = contacts[i].name.givenName + " " +  contacts[i].name.familyName;
           window.localStorage.setItem("myPh"+ mylen , contacts[i].phoneNumbers[0].value.replace(/\D/g,''));
           window.localStorage.setItem("Length", mylen);
           console.log(window.localStorage.getItem("myPh"+mylen));
           mylen +=  contacts.length;
    }
    console.log(window.localStorage.getItem("Length"));
};

// onError: Failed to get the contacts
//
function onFindError(contactError) {
    alert('onError!');
};



$(document).ready(function(){
    //window.localStorage.removeItem("Length");
    alert(window.localStorage.getItem("Length"));
    var contlen = 0;
    var options = { frequency: 10000 };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    console.log(watchID);

   $('#login-button').on('click', function(){
 	 FB.login(null, {scope: 'email, publish_stream'});
   });
 
                  
   $('#submitdone').on('click', function() {
                     
                      values = $('#dropDown').val();
                      console.log(values);
	                      for (var vals = 0; vals < values.length; vals++) {
	                      /* HIDDEN FOR NOW BUT REQUIRED TO POST ON FACEBOOK
                            FB.api('/me/feed', 'post', { message: 'SOS friends please check your text message! I\'m in trouble!! help!!' }, function (response) {
                            if (!response || response.error) {
                             alert(response.error.message);
                             } else {
                             alert('Post ID: ' + response.id);
                             }
                             });*/
                      }
                      
                     
                      for(var i = 0; i< values.length; i++)
                      {
                      var options = new ContactFindOptions();
                      options.filter=values[i];          // empty search string returns all contacts
                      options.multiple=true;      // return multiple results
                      filter = ["name", "phoneNumbers"]  ;   // return contact.name field...do check out iOS twirks
                      
                      // find contacts
                      navigator.contacts.find(filter, onFindSuccess, onFindError, options);
                      }
                      
               });
                  

  $('#sendbutton').on('click', function(){
                 //click to send the sms here
                    contlen = window.localStorage.getItem("Length");
                    for(var i = 0; i <= contlen; i++ ){
                      $.ajax({
                             type: "POST",
                             url:'https://api.mogreet.com/moms/transaction.send?client_id=1193&token=a56f6b894172fcbf88ddaa0fbff8c3dd&campaign_id=26519&to='+ window.localStorage.getItem("myPh"+i)+'&from=2137132024&message=hi%20ishita',
                             dataType : "jsonp",
                            
                           /*  success: function(){
                             alert("post successful" + this.responseText);
                             },
                             error: function (xmlHttpRequest, textStatus, errorThrown) {
                             alert("error : " + textStatus + ", errorThrown = " + errorThrown);
                             alert("this.reponseText = " + this.responseText);
                             }*/
                             });
                      
                      alert(window.localStorage.getItem("myPh"+i));
                      }
                      
                      

                      
               });
               
});

