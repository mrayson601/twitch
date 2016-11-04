$(document).ready(function() {

  function getQuery(inputChannel) {
    var clientID = "rsqasjkf3chiqi3efr4vi4puxcw66po";
    var channelName = inputChannel;
    var searchURL = "https://api.twitch.tv/kraken/streams/" + channelName + '?' + 'client_id=' + clientID + '&callback=?';

    $.ajax({
      url: searchURL,
      dataType: 'jsonp',
      type: 'GET',
      success: function(data) {
        console.log(data);
        var resultSummary = $("<div class=channelInfo></div>");
        resultSummary.addClass("row");

        //add logo
        if (data.stream == null || data.status == 422) {
          resultSummary.append("<div class='col-xs-3 col-sm-3'><img class=logo  src=https://d30y9cdsu7xlg0.cloudfront.net/png/4032-200.png></div>");
        } else {
          resultSummary.append("<div class='col-xs-3 col-sm-3'><img class=logo src=" + data.stream.channel.logo + "></div>");
        }

        //add channel name
        if (data.stream == null) {
          resultSummary.append("<a href=https://twitch.tv/" + channelName + " target=_blank class='channelLink col-xs-9 col-sm-3' >" + channelName + "</a>");
        } else {
          resultSummary.append("<a href=" + data.stream.channel.url + " target=_blank class='channelLink col-xs-9 col-sm-3' >" + data.stream.channel.name + "</a>");
        }

        //add status or game
        if (data.status == 422) {
          resultSummary.append("<span class='statusText col-xs-6 col-sm-6'>Account Closed</span>");
          resultSummary.addClass("closed");
        } else if (data.stream == null) {
          resultSummary.append("<span class='statusText col-xs-9 col-sm-6'>Offline</span>");
          resultSummary.addClass("offline");
        } else {
          resultSummary.append("<div class='statusText col-xs-9 col-sm-6'>" + data.stream.channel.game + " " + data.stream.channel.status + "</div>");
          resultSummary.addClass("online");
        }

        //sort results by online, offline, closed
        if (resultSummary.hasClass("online")) {
          $("#online").append((resultSummary).fadeIn(700));
        } else if (resultSummary.hasClass("offline")) {
          $("#offline").append((resultSummary).fadeIn(1000));
        } else {
          $("#closed").append((resultSummary).fadeIn(1700));
        }
      }
    });
  }

  channelArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "DanteJPN", "beyondthesummit", "zzyzxtv"];

  channelArray.forEach(getQuery);

  $("#refresh").click(function() {
    $("#online").html("");
    $("#offline").html("");
    $("#closed").html("");
    if ($("#searchBox").val() != "") {
      channelArray.push($("#searchBox").val());
    }
    channelArray.forEach(getQuery);
  })

});
