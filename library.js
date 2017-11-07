"use strict";

var type = "",
    embed = "",
    embedUrl_ogg = /<a href="(:*.*\.ogv)">.*<\/a>/ig, // regex ogg
    embedUrl_mp4 = /<a href="(:*.*\.mp4)">.*<\/a>/ig, // regex mp4
    embedUrl_mov = /<a href="(:*.*\.mov)">.*<\/a>/ig, // regex mov
    embedUrl_webm = /<a href="(:*.*\.webm)">.*<\/a>/ig; // regex webm

var VideoPlayer {
    parse: function (data, callback) {
        if (!data || !data.postData || !data.postData.content) {
            return callback(null, data);
        }
        // ogg
        if (data.postData.content.match(embedUrl_ogg)) {
            console.log("video/ogg");
            embed = "";
            embed += ' <div class="videoContBox"  data-src="$1" data-type="video/ogg" data-codec="theora, vorbis" >';
            embed += '    <br><video class="vplayer" width="100%" height="auto" controls>';
            embed += '     <source src="$1" type=\'video/ogg; codecs="theora, vorbis"\' />';
            embed += ' </video></div>';
            data.postData.content = data.postData.content.replace(embedUrl_ogg, embed);
        }
        // mp4
        if (data.postData.content.match(embedUrl_mp4)) {
            console.log("video/mp4");
            embed = "";
            embed += ' <div class="videoContBox"  data-src="$1" data-type="video/mp4" data-codec="avc1.42E01E, mp4a.40.2" >';
            embed += '   <br><video class="vplayer" width="100%" height="auto" controls>';
            embed += '  	  <source src="$1" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' />';
            embed += '  </video></div>';
            data.postData.content = data.postData.content.replace(embedUrl_mp4, embed);
        }
        // mov
        if (data.postData.content.match(embedUrl_mov)) {
            console.log("video/mov");
            embed = "";
            embed += ' <div class="videoContBox" data-src="$1" data-type="video/mp4" data-codec="avc1.42E01E, mp4a.40.2" >';
            embed += '    <br><video class="vplayer" width="100%" height="auto" controls>';
            embed += '  	  <source src="$1" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' />';
            embed += ' </video></div>';
            data.postData.content = data.postData.content.replace(embedUrl_mov, embed);
        }
        // webm
        if (data.postData.content.match(embedUrl_webm)) {
            console.log("video/webm");
            embed = "";
            embed += ' <div class="videoContBox"  data-src="$1" data-type="video/webm" data-codec="vp8, vorbis" >';
            embed += '   <br><video class="vplayer" width="100%" height="auto" controls>';
            embed += '     <source src="$1" type=\'video/webm; codecs="vp8, vorbis"\' />';
            embed += ' </video></div>';
            data.postData.content = data.postData.content.replace(embedUrl_webm, embed);
        }
        callback(null, data);
    }
};

module.exports = VideoPlayer;