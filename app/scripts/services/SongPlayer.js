 (function() {
     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};
       
     var currentAlbum = Fixtures.getAlbum();
         
/**
 * @desc Buzz object audio file
 * @type {Object}
 */
     var currentBuzzObject = null;
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
         
var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
    
         currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });
 
    currentSong = song;
 };
         
     
var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };
     
          SongPlayer.currentSong = null;
      /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
 SongPlayer.currentTime = null;

         SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (currentSong !== song) {
             setSong(song);
         currentBuzzObject.play();   
        } else if (currentSong === song) {
         if (currentBuzzObject.isPaused()) {
            playSong();
         }
     }  
     };
     
var stopSong = function(){
    currentBuzzObject.stop();
    song.playing = null;
}
         
 SongPlayer.pause = function(song) {
     song = song || SongPlayer.currentSong;
     currentBuzzObject.pause();
     song.playing = false;
 };
     
SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
         if (currentSongIndex < 0) {
         stopSong();
     }  else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
     
     SongPlayer.next = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex++;
         if (currentSongIndex > 5) {
         stopSong();
     }  else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
     
      /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
 SongPlayer.setCurrentTime = function(time) {
     if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
     }
 };

         
         
SongPlayer.volumeControl = function(){
    
};
         
var playSong = function(){
    currentBuzzObject.play();
    song.playing = true;
}
         
          return SongPlayer;
     }
 

     
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();