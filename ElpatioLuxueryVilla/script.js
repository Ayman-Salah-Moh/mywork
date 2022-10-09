(function(){
    var script = {
 "mouseWheelEnabled": true,
 "verticalAlign": "top",
 "data": {
  "name": "Player445"
 },
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "vrPolyfillScale": 1,
 "propagateClick": false,
 "desktopMipmappingEnabled": false,
 "mobileMipmappingEnabled": false,
 "paddingLeft": 0,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "start": "this.playAudioList([this.audio_A0640F59_B455_8DC5_41E3_91011CD42A3C]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_A27B392B_B5D3_7546_41DF_6B971E131A24], 'gyroscopeAvailable'); this.playList_A9CCA5B7_BA36_5B6D_41D9_40B6D2E53678.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_A27B692B_B5D3_7546_41E4_E14A293EF70F].forEach(function(component) { component.set('visible', false); }) }",
 "minWidth": 20,
 "children": [
  "this.MainViewer",
  "this.Container_A27A992B_B5D3_7546_4176_5518E5E0DC92",
  "this.Image_A2FAE81F_B5F2_B37E_41E0_556410FA173D",
  "this.Image_A2971E1B_B049_38DB_41DB_DB8861434AFD",
  "this.Container_A5769A3C_BC52_B742_41E2_CDB7158C7066",
  "this.IconButton_A75203B0_BDAD_9542_41B0_B3C47DD2126E"
 ],
 "defaultVRPointer": "laser",
 "scripts": {
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getKey": function(key){  return window[key]; },
  "registerKey": function(key, value){  window[key] = value; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "existsKey": function(key){  return key in window; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "unregisterKey": function(key){  delete window[key]; }
 },
 "width": "100%",
 "buttonToggleFullscreen": "this.IconButton_A27B692B_B5D3_7546_41E4_E14A293EF70F",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "layout": "absolute",
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "shadow": false,
 "gap": 10,
 "height": "100%",
 "buttonToggleMute": "this.IconButton_A27B492B_B5D3_7546_41B9_DD8F06D75D91",
 "paddingRight": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "class": "Player",
 "definitions": [{
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_A0640F59_B455_8DC5_41E3_91011CD42A3C.mp3",
  "oggUrl": "media/audio_A0640F59_B455_8DC5_41E3_91011CD42A3C.ogg",
  "class": "AudioResource"
 },
 "class": "MediaAudio",
 "id": "audio_A0640F59_B455_8DC5_41E3_91011CD42A3C",
 "data": {
  "label": "0126. Dusk - AShamaluevMusic"
 }
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_A9CB35B7_BA36_5B6D_41C9_006CB51B99B2",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 34.2,
   "backwardYaw": 149.99,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "Kitchen 360",
 "id": "panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D",
 "cardboardMenu": "this.Menu_A9CE05B7_BA36_5B6D_41BF_541C33D7F59C",
 "thumbnailUrl": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMin": "150%",
 "hfovMax": 102,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_t.jpg"
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122",
   "x": 367.26,
   "angle": -87.92,
   "class": "PanoramaMapLocation",
   "y": 848.3
  }
 ],
 "overlays": [
  "this.overlay_BE851541_B059_160F_41DA_A09E6D2A132A"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -174.98,
   "backwardYaw": 76.83,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "PP Living 360",
 "id": "panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E",
 "cardboardMenu": "this.Menu_A9CE05B7_BA36_5B6D_41BF_541C33D7F59C",
 "thumbnailUrl": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMin": "104%",
 "hfovMax": 103,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_t.jpg"
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122",
   "x": 239.95,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 238.66
  }
 ],
 "overlays": [
  "this.overlay_BEE5C126_B059_6E15_41E5_AA48040DEF69",
  "this.overlay_A01AC055_B0C9_2E37_41D0_BD686623B410",
  "this.overlay_A88750BE_BA6A_595F_41C4_3701A6BE16F7"
 ]
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "class": "VideoPlayer"
},
{
 "items": [
  "this.PanoramaPlayListItem_A9CDF5B7_BA36_5B6D_41E5_41EE825C3726",
  "this.PanoramaPlayListItem_A9CDA5B7_BA36_5B6D_41DC_D80032795708",
  "this.PanoramaPlayListItem_A9CD35B7_BA36_5B6D_41DA_629285049F4C",
  "this.PanoramaPlayListItem_A9CEF5B7_BA36_5B6D_41E1_0A63A8CEA5B1"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": -85.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "targetYaw": -1.26,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -1.75,
    "yawSpeed": 33.25,
    "easing": "cubic_in_out",
    "pitchSpeed": 19.07
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_A9F9F5D1_BA36_5B25_41E2_EFBD5CD02058",
 "manualRotationSpeed": 1400
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_A9CCA5B7_BA36_5B6D_41D9_40B6D2E53678",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_camera",
 "manualRotationSpeed": 1400
},
{
 "adjacentPanoramas": [
  {
   "yaw": 94.66,
   "backwardYaw": -45.22,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372",
   "distance": 1
  },
  {
   "yaw": 149.99,
   "backwardYaw": 34.2,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E"
  }
 ],
 "hfov": 360,
 "label": "PP Entrance 360",
 "id": "panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC",
 "cardboardMenu": "this.Menu_A9CE05B7_BA36_5B6D_41BF_541C33D7F59C",
 "thumbnailUrl": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMin": "104%",
 "hfovMax": 103,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_t.jpg"
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122",
   "x": 184.15,
   "angle": 266.86,
   "class": "PanoramaMapLocation",
   "y": 800.72
  }
 ],
 "overlays": [
  "this.overlay_BD0B1C79_B049_F6FF_41DE_A60125CB22C5",
  "this.overlay_BE6DB341_B04B_F20F_41DC_2C7A9F4FF90D",
  "this.overlay_A005AE74_B1C7_196D_41CC_69281B97D6A0"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 76.83,
   "backwardYaw": -174.98,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E",
   "distance": 1
  },
  {
   "yaw": -45.22,
   "backwardYaw": 94.66,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "PP Dining 360",
 "id": "panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372",
 "cardboardMenu": "this.Menu_A9CE05B7_BA36_5B6D_41BF_541C33D7F59C",
 "thumbnailUrl": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMin": "120%",
 "hfovMax": 103,
 "vfov": 180,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/f/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/u/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/r/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/b/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/d/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/l/0/{row}_{column}.jpg",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2560,
      "colCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_t.jpg"
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122",
   "x": 294.81,
   "angle": -89.82,
   "class": "PanoramaMapLocation",
   "y": 583.19
  }
 ],
 "overlays": [
  "this.overlay_BEDAB120_B049_EE0D_4119_C5E05945BF00",
  "this.overlay_BF10BF92_B047_720D_41D3_2BE010821EC5",
  "this.overlay_A1CB853A_B0CB_167D_41DC_50C320AC8C39",
  "this.overlay_BA21F8FE_B455_94BE_417E_1F545BC53A44",
  "this.overlay_A63DC2BB_BC52_9746_41D0_9A9C2820182F"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": -103.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_A9E515EB_BA36_5AE5_41DD_0D6E7C5BB4A0",
 "manualRotationSpeed": 1400
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_camera",
 "manualRotationSpeed": 1400
},
{
 "paddingBottom": 0,
 "backgroundColorRatios": [],
 "data": {
  "name": "Window1960"
 },
 "bodyPaddingRight": 5,
 "id": "window_B42B3FE1_B9EE_C6E5_41E4_F8076687D478",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingLeft": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 550,
 "headerVerticalAlign": "middle",
 "shadowVerticalLength": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "bodyBackgroundOpacity": 0.7,
 "bodyPaddingTop": 5,
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": true,
 "height": 500,
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "shadow": true,
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "horizontalAlign": "center",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "footerBackgroundOpacity": 1,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "headerBorderSize": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "class": "Window",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "overflow": "scroll",
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_B42B4FE1_B9EE_C6E5_41DC_679E88BF6382",
  "this.image_uidA9CA15B7_BA36_5B6D_41D3_D37CBDE6EB57_1"
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "footerBorderColor": "#000000",
 "headerBackgroundOpacity": 0.7,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "layout": "vertical",
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "scrollBarWidth": 10,
 "minHeight": 20,
 "closeButtonIconWidth": 12,
 "footerBorderSize": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": -1.26,
  "class": "PanoramaCameraPosition",
  "pitch": -1.75
 },
 "id": "panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_camera",
 "manualRotationSpeed": 1400
},
{
 "items": [
  {
   "media": "this.video_A62C49FC_B0CB_31F5_41C8_2E75D8089742",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_A9CCB5B7_BA36_5B6D_41CE_DA0A9CD72640, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_A9CCB5B7_BA36_5B6D_41CE_DA0A9CD72640, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "playList_A9CCB5B7_BA36_5B6D_41CE_DA0A9CD72640",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": 134.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_A99A7605_BA36_592D_41E5_C877C3761228",
 "manualRotationSpeed": 1400
},
{
 "paddingBottom": 0,
 "backgroundColorRatios": [],
 "data": {
  "name": "Window31318"
 },
 "bodyPaddingRight": 5,
 "id": "window_A2BB0D6A_B5B2_8DC6_41D0_B8B0443FEAF3",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingLeft": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 300,
 "headerVerticalAlign": "middle",
 "shadowVerticalLength": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "bodyBackgroundOpacity": 0.8,
 "bodyPaddingTop": 5,
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": false,
 "height": 170,
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "title": "Elevator",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "shadow": true,
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "horizontalAlign": "center",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "footerBackgroundOpacity": 1,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "headerBorderSize": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "class": "Window",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "overflow": "scroll",
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_A2B95D6A_B5B2_8DC6_41D4_628ECB8DDC78"
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "footerBorderColor": "#000000",
 "headerBackgroundOpacity": 0.8,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "layout": "vertical",
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "scrollBarWidth": 10,
 "minHeight": 20,
 "closeButtonIconWidth": 12,
 "footerBorderSize": 0
},
{
 "minimumZoomFactor": 0.5,
 "overlays": [
  "this.overlay_A48E7A93_BCD5_9746_41C9_D058D623319C",
  "this.overlay_A494D288_BCD5_9742_41E5_0F1EB7413678",
  "this.overlay_A490A83E_BCD5_73BE_41DA_CCEA3B64D580",
  "this.overlay_A4935C26_BCD2_934E_41E0_DCDD5F1BFD83"
 ],
 "label": "Plan T",
 "id": "map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "width": 490,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122.png",
    "width": 490,
    "class": "ImageResourceLevel",
    "height": 1033
   },
   {
    "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_lq.png",
    "width": 176,
    "class": "ImageResourceLevel",
    "height": 372,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayRadiusScale": 0.1,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1.2,
 "fieldOfViewOverlayInsideOpacity": 0.28,
 "initialZoomFactor": 1,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "class": "Map",
 "height": 1033,
 "thumbnailUrl": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_t.png"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": -30.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "targetYaw": -1.26,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -1.75,
    "yawSpeed": 33.25,
    "easing": "cubic_in_out",
    "pitchSpeed": 19.07
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_A9EB55F8_BA36_5AE3_41CE_34916A7E850C",
 "manualRotationSpeed": 1400
},
{
 "fontFamily": "Arial",
 "rollOverFontColor": "#FFFFFF",
 "selectedFontColor": "#FFFFFF",
 "children": [
  {
   "label": "PP Entrance 360",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "MenuItem"
  },
  {
   "label": "PP Dining 360",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "MenuItem"
  },
  {
   "label": "PP Living 360",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "MenuItem"
  },
  {
   "label": "Kitchen 360",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "MenuItem"
  }
 ],
 "label": "Media",
 "id": "Menu_A9CE05B7_BA36_5B6D_41BF_541C33D7F59C",
 "rollOverOpacity": 0.8,
 "class": "Menu",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": "#000000",
 "backgroundColor": "#404040",
 "selectedBackgroundColor": "#202020",
 "opacity": 0.4
},
{
 "paddingBottom": 0,
 "backgroundColorRatios": [],
 "data": {
  "name": "Window1960"
 },
 "bodyPaddingRight": 5,
 "id": "window_A8925086_BA6A_592C_41D5_027E26D4CFB3",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingLeft": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "width": 550,
 "headerVerticalAlign": "middle",
 "shadowVerticalLength": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "bodyBackgroundOpacity": 0.7,
 "bodyPaddingTop": 5,
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": true,
 "height": 500,
 "veilColorDirection": "horizontal",
 "titleFontSize": "1.29vmin",
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "shadow": true,
 "bodyPaddingBottom": 5,
 "titleFontWeight": "normal",
 "horizontalAlign": "center",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "footerBackgroundOpacity": 1,
 "footerHeight": 5,
 "paddingRight": 0,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "headerBorderSize": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "class": "Window",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "overflow": "scroll",
 "headerPaddingRight": 10,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.htmlText_A8966086_BA6A_592C_4184_34435B3F3FBF",
  "this.image_uidA9CBA5B7_BA36_5B6D_41E1_C53D4F68127E_1"
 ],
 "veilShowEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 12,
 "bodyBorderSize": 0,
 "shadowColor": "#000000",
 "titleFontStyle": "normal",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 10,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#000000",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "hideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "veilHideEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeOutEffect"
 },
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "showEffect": {
  "easing": "cubic_in_out",
  "duration": 500,
  "class": "FadeInEffect"
 },
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "footerBorderColor": "#000000",
 "headerBackgroundOpacity": 0.7,
 "bodyBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "bodyPaddingLeft": 5,
 "layout": "vertical",
 "closeButtonIconLineWidth": 2,
 "titlePaddingBottom": 5,
 "paddingTop": 0,
 "borderRadius": 5,
 "closeButtonPressedIconColor": "#FFFFFF",
 "shadowOpacity": 0.5,
 "scrollBarWidth": 10,
 "minHeight": 20,
 "closeButtonIconWidth": 12,
 "footerBorderSize": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": -145.8,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_A9825612_BA36_5927_41E5_F4B46FBF545A",
 "manualRotationSpeed": 1400
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_camera",
 "manualRotationSpeed": 1400
},
{
 "class": "Photo",
 "label": "Rotating TV Stand",
 "id": "photo_A90D15DF_BA77_BADD_41E3_2DA304C9A9DD",
 "width": 827,
 "duration": 5000,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_A90D15DF_BA77_BADD_41E3_2DA304C9A9DD.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 552,
 "thumbnailUrl": "media/photo_A90D15DF_BA77_BADD_41E3_2DA304C9A9DD_t.jpg"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_A1DE7464_B049_1615_41E3_91CEE511BC68.mp3",
  "oggUrl": "media/audio_A1DE7464_B049_1615_41E3_91CEE511BC68.ogg",
  "class": "AudioResource"
 },
 "class": "MediaAudio",
 "id": "audio_A1DE7464_B049_1615_41E3_91CEE511BC68",
 "data": {
  "label": "mixkit-lightweight-sliding-door-close-182"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 100,
  "yaw": 5.02,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_A9F545C4_BA36_5B23_41BD_85D34F932CE6",
 "manualRotationSpeed": 1400
},
{
 "label": "Y2Mate.is - Peaky Blinders  Season 5 Trailer  Netflix-Ruyl8_PT_y8-1080p-1655254988269",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "id": "video_A62C49FC_B0CB_31F5_41C8_2E75D8089742",
 "class": "Video",
 "height": 1080,
 "thumbnailUrl": "media/video_A62C49FC_B0CB_31F5_41C8_2E75D8089742_t.jpg",
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_A62C49FC_B0CB_31F5_41C8_2E75D8089742.mp4"
 }
},
{
 "gyroscopeEnabled": true,
 "buttonCardboardView": "this.IconButton_A27B292B_B5D3_7546_41AC_DDC5E42AABF6",
 "buttonToggleHotspots": "this.IconButton_A27B592B_B5D3_7546_41E4_321181DB152F",
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonToggleGyroscope": "this.IconButton_A27B392B_B5D3_7546_41DF_6B971E131A24",
 "mouseControlMode": "drag_acceleration"
},
{
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "width": "100%",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 100,
 "minHeight": 50,
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "height": "100%",
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "fade_out_fade_in",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "toolTipFontStyle": "normal",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 300,
 "paddingBottom": 0,
 "playbackBarHeadHeight": 15
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_A27A992B_B5D3_7546_4176_5518E5E0DC92",
 "scrollBarColor": "#000000",
 "right": "6.09%",
 "width": 115.05,
 "children": [
  "this.Container_A27BF92B_B5D3_7546_41D1_E65DDA931156",
  "this.Container_A27B192B_B5D3_7546_41E4_D00A28F185A0"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minWidth": 1,
 "top": "2.4%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 641,
 "layout": "absolute",
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "shadow": false,
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 0,
 "data": {
  "name": "--SETTINGS"
 },
 "class": "Container",
 "minHeight": 1,
 "paddingBottom": 0,
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "id": "Image_A2FAE81F_B5F2_B37E_41E0_556410FA173D",
 "left": "1.33%",
 "paddingLeft": 0,
 "width": 200,
 "borderSize": 0,
 "minWidth": 250,
 "url": "skin/Image_A2FAE81F_B5F2_B37E_41E0_556410FA173D.png",
 "top": "2.3%",
 "height": 302,
 "click": "this.openLink('https://www.facebook.com/profile.php?id=100086274412265&_rdc=1&_rdr', '_blank')",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "maxWidth": 250,
 "maxHeight": 150,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "scaleMode": "fit_to_width",
 "borderRadius": 0,
 "paddingRight": 0,
 "data": {
  "name": "El Sheikh Logo"
 },
 "class": "Image",
 "cursor": "hand",
 "minHeight": 150,
 "paddingBottom": 0
},
{
 "toolTipFontFamily": "Arial",
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "id": "Image_A2971E1B_B049_38DB_41DB_DB8861434AFD",
 "toolTipShadowSpread": 0,
 "toolTip": "01110903919\u000a",
 "toolTipBorderColor": "#767676",
 "right": "0.72%",
 "width": 350,
 "borderSize": 0,
 "paddingLeft": 0,
 "minWidth": 250,
 "toolTipOpacity": 1,
 "url": "skin/Image_A2971E1B_B049_38DB_41DB_DB8861434AFD.png",
 "toolTipFontSize": "1.11vmin",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowColor": "#000000",
 "toolTipShadowVerticalLength": 0,
 "bottom": "1.21%",
 "height": 183,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "toolTipTextShadowBlurRadius": 3,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "maxWidth": 250,
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "maxHeight": 170,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "paddingRight": 0,
 "data": {
  "name": "Ayman Salah Logo"
 },
 "class": "Image",
 "toolTipFontStyle": "normal",
 "minHeight": 170,
 "paddingBottom": 0,
 "toolTipTextShadowOpacity": 0
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "Container_A5769A3C_BC52_B742_41E2_CDB7158C7066",
 "left": "2.46%",
 "paddingLeft": 0,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 250,
 "children": [
  "this.MapViewer"
 ],
 "top": "26.11%",
 "width": "13.269%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "layout": "absolute",
 "height": "32.787%",
 "verticalAlign": "top",
 "shadow": false,
 "maxWidth": 250,
 "gap": 10,
 "maxHeight": 350,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "paddingRight": 0,
 "data": {
  "name": "Container62011"
 },
 "class": "Container",
 "minHeight": 350,
 "paddingBottom": 0,
 "overflow": "scroll"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_A75203B0_BDAD_9542_41B0_B3C47DD2126E",
 "left": "2.35%",
 "paddingLeft": 0,
 "width": 39,
 "borderSize": 0,
 "minWidth": 39,
 "top": "21.86%",
 "iconURL": "skin/IconButton_A75203B0_BDAD_9542_41B0_B3C47DD2126E.png",
 "mode": "toggle",
 "height": 39,
 "click": "if(!this.Container_A5769A3C_BC52_B742_41E2_CDB7158C7066.get('visible')){ this.setComponentVisibility(this.Container_A5769A3C_BC52_B742_41E2_CDB7158C7066, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_A5769A3C_BC52_B742_41E2_CDB7158C7066, false, 0, null, null, false) }",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "maxWidth": 39,
 "rollOverIconURL": "skin/IconButton_A75203B0_BDAD_9542_41B0_B3C47DD2126E_rollover.png",
 "maxHeight": 39,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_A75203B0_BDAD_9542_41B0_B3C47DD2126E_pressed.png",
 "paddingRight": 0,
 "data": {
  "name": "image button menu"
 },
 "class": "IconButton",
 "cursor": "hand",
 "minHeight": 39,
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_A27B692B_B5D3_7546_41E4_E14A293EF70F",
 "paddingLeft": 0,
 "width": 58,
 "borderSize": 0,
 "minWidth": 58,
 "iconURL": "skin/IconButton_A27B692B_B5D3_7546_41E4_E14A293EF70F.png",
 "pressedRollOverIconURL": "skin/IconButton_A27B692B_B5D3_7546_41E4_E14A293EF70F_pressed_rollover.png",
 "mode": "toggle",
 "height": 58,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "maxWidth": 58,
 "maxHeight": 58,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_A27B692B_B5D3_7546_41E4_E14A293EF70F_pressed.png",
 "paddingRight": 0,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "class": "IconButton",
 "cursor": "hand",
 "minHeight": 58,
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_A27B492B_B5D3_7546_41B9_DD8F06D75D91",
 "paddingLeft": 0,
 "width": 58,
 "borderSize": 0,
 "minWidth": 58,
 "iconURL": "skin/IconButton_A27B492B_B5D3_7546_41B9_DD8F06D75D91.png",
 "pressedRollOverIconURL": "skin/IconButton_A27B492B_B5D3_7546_41B9_DD8F06D75D91_pressed_rollover.png",
 "mode": "toggle",
 "height": 58,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "maxWidth": 58,
 "maxHeight": 58,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_A27B492B_B5D3_7546_41B9_DD8F06D75D91_pressed.png",
 "paddingRight": 0,
 "data": {
  "name": "IconButton MUTE"
 },
 "class": "IconButton",
 "cursor": "hand",
 "minHeight": 58,
 "paddingBottom": 0
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "left": "0.07%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "paddingLeft": 0,
 "width": "86.36%",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "minWidth": 230,
 "minHeight": 320,
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "height": "100%",
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "maxHeight": 320,
 "transitionMode": "blending",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "toolTipFontStyle": "normal",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": "0%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "maxWidth": 230,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingTop": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "paddingBottom": 0,
 "data": {
  "name": "Floor Plan"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.27,
   "image": "this.AnimatedImageResource_A46FD0F4_B079_2FF5_41C0_917811DB7E43",
   "pitch": -7.74,
   "yaw": 34.2,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC, this.camera_A9EB55F8_BA36_5AE3_41CE_34916A7E850C); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_BE851541_B059_160F_41DA_A09E6D2A132A",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.27,
   "yaw": 34.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.36,
   "image": "this.AnimatedImageResource_A1ED7CA5_B1F9_19EC_4198_D1107A79C3EC",
   "pitch": -17.7,
   "yaw": -174.98,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372, this.camera_A9E515EB_BA36_5AE5_41DD_0D6E7C5BB4A0); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_BEE5C126_B059_6E15_41E5_AA48040DEF69",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.36,
   "yaw": -174.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "blending": 0.02,
 "hfov": 17.07,
 "autoplay": true,
 "id": "overlay_A01AC055_B0C9_2E37_41D0_BD686623B410",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/overlay_A01AC055_B0C9_2E37_41D0_BD686623B410_t.jpg",
    "width": 1920,
    "class": "ImageResourceLevel",
    "height": 1080
   }
  ]
 },
 "pitch": -1.07,
 "useHandCursor": true,
 "roll": 0.07,
 "yaw": 151.39,
 "rotationY": -25,
 "rotationX": -2.78,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_A62C49FC_B0CB_31F5_41C8_2E75D8089742.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "vfov": 9.59,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0_HS_2_0.png",
      "width": 30,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "hfov": 1.65,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.26,
   "yaw": 151.48
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.showWindow(this.window_A8925086_BA6A_592C_41D5_027E26D4CFB3, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A88750BE_BA6A_595F_41C4_3701A6BE16F7",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.65,
   "yaw": 151.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "media": "this.panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_A9CDF5B7_BA36_5B6D_41E5_41EE825C3726, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_camera",
 "id": "PanoramaPlayListItem_A9CDF5B7_BA36_5B6D_41E5_41EE825C3726"
},
{
 "media": "this.panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_A9CDA5B7_BA36_5B6D_41DC_D80032795708, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_camera",
 "id": "PanoramaPlayListItem_A9CDA5B7_BA36_5B6D_41DC_D80032795708"
},
{
 "media": "this.panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_A9CD35B7_BA36_5B6D_41DA_629285049F4C, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_camera",
 "id": "PanoramaPlayListItem_A9CD35B7_BA36_5B6D_41DA_629285049F4C"
},
{
 "media": "this.panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D",
 "end": "this.trigger('tourEnded')",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_A9CEF5B7_BA36_5B6D_41E1_0A63A8CEA5B1, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "camera": "this.panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_camera",
 "id": "PanoramaPlayListItem_A9CEF5B7_BA36_5B6D_41E1_0A63A8CEA5B1"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.81,
   "image": "this.AnimatedImageResource_A46980F3_B079_2FF3_41D8_69166CEFB008",
   "pitch": -27.03,
   "yaw": 94.66,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372, this.camera_A99A7605_BA36_592D_41E5_C877C3761228); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_BD0B1C79_B049_F6FF_41DE_A60125CB22C5",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.81,
   "yaw": 94.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.62,
   "image": "this.AnimatedImageResource_A46EB0F3_B079_2FF3_41E3_558CCD5D5B34",
   "pitch": -10.33,
   "yaw": 149.99,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "rollOver": "var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_A1DE7464_B049_1615_41E3_91CEE511BC68)",
   "click": "this.startPanoramaWithCamera(this.panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D, this.camera_A9825612_BA36_5927_41E5_F4B46FBF545A); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_BE6DB341_B04B_F20F_41DC_2C7A9F4FF90D",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 13.62,
   "yaw": 149.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.05,
   "image": "this.AnimatedImageResource_A1A549BC_B1F9_3BDC_4185_D96BE8EE2008",
   "pitch": -11.32,
   "yaw": 94.66,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A005AE74_B1C7_196D_41CC_69281B97D6A0",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.05,
   "yaw": 94.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.11,
   "image": "this.AnimatedImageResource_A46EE0F3_B079_2FF3_41CD_64C1992B6A4B",
   "pitch": -23.63,
   "yaw": 76.83,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E, this.camera_A9F545C4_BA36_5B23_41BD_85D34F932CE6); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_BEDAB120_B049_EE0D_4119_C5E05945BF00",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.11,
   "yaw": 76.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.2,
   "image": "this.AnimatedImageResource_A46F60F3_B079_2FF3_41DD_DCB905643BBA",
   "pitch": -39.21,
   "yaw": -45.22,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC, this.camera_A9F9F5D1_BA36_5B25_41E2_EFBD5CD02058); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_BF10BF92_B047_720D_41D3_2BE010821EC5",
 "data": {
  "label": "Arrow 01 Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.2,
   "yaw": -45.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -39.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "blending": 0.01,
 "hfov": 33.72,
 "autoplay": true,
 "id": "overlay_A1CB853A_B0CB_167D_41DC_50C320AC8C39",
 "enabledInCardboard": true,
 "loop": false,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/overlay_A1CB853A_B0CB_167D_41DC_50C320AC8C39_t.jpg",
    "width": 1920,
    "class": "ImageResourceLevel",
    "height": 1080
   }
  ]
 },
 "pitch": -4.43,
 "useHandCursor": true,
 "roll": 1.42,
 "yaw": 116,
 "rotationY": 23.54,
 "rotationX": 3.9,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_A62C49FC_B0CB_31F5_41C8_2E75D8089742.mp4"
 },
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "vfov": 18.7,
 "distance": 50,
 "class": "VideoPanoramaOverlay"
},
{
 "rollOverDisplay": false,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0_HS_3_0.png",
      "width": 58,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "hfov": 3.23,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -2.76,
   "yaw": -2.5
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.showWindow(this.window_A2BB0D6A_B5B2_8DC6_41D0_B8B0443FEAF3, 5000, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_BA21F8FE_B455_94BE_417E_1F545BC53A44",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.23,
   "yaw": -2.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rollOverDisplay": false,
 "items": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0_HS_4_0.png",
      "width": 48,
      "class": "ImageResourceLevel",
      "height": 50
     }
    ]
   },
   "hfov": 2.55,
   "distance": 50,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -16.64,
   "yaw": 116.01
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.showWindow(this.window_B42B3FE1_B9EE_C6E5_41E4_F8076687D478, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A63DC2BB_BC52_9746_41D0_9A9C2820182F",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.55,
   "yaw": 116.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "propagateClick": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">Rotating TV Stand, Can be swivel 360 degrees.</SPAN></SPAN></DIV></div>",
 "id": "htmlText_B42B4FE1_B9EE_C6E5_41DC_679E88BF6382",
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 0,
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "12%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "data": {
  "name": "HTMLText1961"
 },
 "class": "HTMLText",
 "scrollBarWidth": 10,
 "minHeight": 0,
 "paddingBottom": 10
},
{
 "propagateClick": false,
 "id": "image_uidA9CA15B7_BA36_5B6D_41D3_D37CBDE6EB57_1",
 "paddingLeft": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 0,
 "url": "media/photo_A90D15DF_BA77_BADD_41E3_2DA304C9A9DD.jpg",
 "horizontalAlign": "center",
 "height": "87%",
 "verticalAlign": "middle",
 "shadow": false,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "paddingRight": 0,
 "data": {
  "name": "Image15761"
 },
 "class": "Image",
 "minHeight": 0,
 "paddingBottom": 0
},
{
 "propagateClick": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">3 Floor indoor small home elevators hydraulic residential lift with cabin.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">Lifting height \u00b7 It can be customized according to client's requirement.</SPAN></DIV></div>",
 "id": "htmlText_A2B95D6A_B5B2_8DC6_41D4_628ECB8DDC78",
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 0,
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "100%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "data": {
  "name": "HTMLText31319"
 },
 "class": "HTMLText",
 "scrollBarWidth": 10,
 "minHeight": 0,
 "paddingBottom": 10
},
{
 "map": {
  "width": 34.56,
  "x": 222.68,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "offsetY": 0,
  "height": 42.65,
  "y": 217.34
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A48E7A93_BCD5_9746_41C9_D058D623319C",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 222.68,
  "y": 217.34,
  "width": 34.56,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_HS_0.png",
     "width": 34,
     "class": "ImageResourceLevel",
     "height": 42
    }
   ]
  },
  "height": 42.65,
  "class": "HotspotMapOverlayImage"
 }
},
{
 "map": {
  "width": 38.41,
  "x": 275.6,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 19
    }
   ]
  },
  "offsetY": 0,
  "height": 46.1,
  "y": 560.14
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A494D288_BCD5_9742_41E5_0F1EB7413678",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 275.6,
  "y": 560.14,
  "width": 38.41,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_HS_1.png",
     "width": 38,
     "class": "ImageResourceLevel",
     "height": 46
    }
   ]
  },
  "height": 46.1,
  "class": "HotspotMapOverlayImage"
 }
},
{
 "map": {
  "width": 38.79,
  "x": 164.76,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_HS_2_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 37.67,
  "y": 781.89
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A490A83E_BCD5_73BE_41DA_CCEA3B64D580",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 164.76,
  "y": 781.89,
  "width": 38.79,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_HS_2.png",
     "width": 38,
     "class": "ImageResourceLevel",
     "height": 37
    }
   ]
  },
  "height": 37.67,
  "class": "HotspotMapOverlayImage"
 }
},
{
 "map": {
  "width": 39.98,
  "x": 347.27,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_HS_3_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 17
    }
   ]
  },
  "offsetY": 0,
  "height": 42.65,
  "y": 826.98
 },
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_A4935C26_BCD2_934E_41E0_DCDD5F1BFD83",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 347.27,
  "y": 826.98,
  "width": 39.98,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_A4F47B9E_BCD5_B57E_41A9_F13F79A68122_HS_3.png",
     "width": 39,
     "class": "ImageResourceLevel",
     "height": 42
    }
   ]
  },
  "height": 42.65,
  "class": "HotspotMapOverlayImage"
 }
},
{
 "propagateClick": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\">Rotating TV Stand, Can be swivel 360 degrees.</SPAN></SPAN></DIV></div>",
 "id": "htmlText_A8966086_BA6A_592C_4184_34435B3F3FBF",
 "paddingLeft": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minWidth": 0,
 "width": "100%",
 "scrollBarMargin": 2,
 "height": "12%",
 "shadow": false,
 "paddingTop": 10,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 10,
 "data": {
  "name": "HTMLText1961"
 },
 "class": "HTMLText",
 "scrollBarWidth": 10,
 "minHeight": 0,
 "paddingBottom": 10
},
{
 "propagateClick": false,
 "id": "image_uidA9CBA5B7_BA36_5B6D_41E1_C53D4F68127E_1",
 "paddingLeft": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 0,
 "url": "media/photo_A90D15DF_BA77_BADD_41E3_2DA304C9A9DD.jpg",
 "horizontalAlign": "center",
 "height": "87%",
 "verticalAlign": "middle",
 "shadow": false,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "paddingRight": 0,
 "data": {
  "name": "Image15762"
 },
 "class": "Image",
 "minHeight": 0,
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_A27B292B_B5D3_7546_41AC_DDC5E42AABF6",
 "paddingLeft": 0,
 "width": 68,
 "borderSize": 0,
 "minWidth": 68,
 "iconURL": "skin/IconButton_A27B292B_B5D3_7546_41AC_DDC5E42AABF6.png",
 "mode": "push",
 "height": 68,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "maxWidth": 68,
 "rollOverIconURL": "skin/IconButton_A27B292B_B5D3_7546_41AC_DDC5E42AABF6_rollover.png",
 "maxHeight": 68,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "paddingRight": 0,
 "data": {
  "name": "IconButton VR"
 },
 "class": "IconButton",
 "cursor": "hand",
 "minHeight": 68,
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_A27B592B_B5D3_7546_41E4_321181DB152F",
 "paddingLeft": 0,
 "width": 58,
 "borderSize": 0,
 "minWidth": 58,
 "iconURL": "skin/IconButton_A27B592B_B5D3_7546_41E4_321181DB152F.png",
 "pressedRollOverIconURL": "skin/IconButton_A27B592B_B5D3_7546_41E4_321181DB152F_pressed_rollover.png",
 "mode": "toggle",
 "height": 58,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "maxWidth": 58,
 "maxHeight": 58,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_A27B592B_B5D3_7546_41E4_321181DB152F_pressed.png",
 "paddingRight": 0,
 "data": {
  "name": "IconButton HS "
 },
 "class": "IconButton",
 "cursor": "hand",
 "minHeight": 58,
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_A27B392B_B5D3_7546_41DF_6B971E131A24",
 "paddingLeft": 0,
 "width": 58,
 "borderSize": 0,
 "minWidth": 1,
 "iconURL": "skin/IconButton_A27B392B_B5D3_7546_41DF_6B971E131A24.png",
 "pressedRollOverIconURL": "skin/IconButton_A27B392B_B5D3_7546_41DF_6B971E131A24_pressed_rollover.png",
 "mode": "toggle",
 "height": 58,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "maxWidth": 58,
 "maxHeight": 58,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_A27B392B_B5D3_7546_41DF_6B971E131A24_pressed.png",
 "paddingRight": 0,
 "data": {
  "name": "IconButton GYRO"
 },
 "class": "IconButton",
 "cursor": "hand",
 "minHeight": 1,
 "paddingBottom": 0
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_A27BF92B_B5D3_7546_41D1_E65DDA931156",
 "scrollBarColor": "#000000",
 "right": "0%",
 "width": 110,
 "children": [
  "this.IconButton_A27B092B_B5D3_7546_41C8_A04DCD570296"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minWidth": 1,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 110,
 "layout": "horizontal",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "gap": 10,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "paddingRight": 0,
 "data": {
  "name": "button menu sup"
 },
 "class": "Container",
 "minHeight": 1,
 "paddingBottom": 0,
 "overflow": "visible"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_A27B192B_B5D3_7546_41E4_D00A28F185A0",
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minWidth": 1,
 "children": [
  "this.IconButton_A27B292B_B5D3_7546_41AC_DDC5E42AABF6",
  "this.IconButton_A27B392B_B5D3_7546_41DF_6B971E131A24",
  "this.IconButton_A27B492B_B5D3_7546_41B9_DD8F06D75D91",
  "this.IconButton_A27B592B_B5D3_7546_41E4_321181DB152F",
  "this.IconButton_A27B692B_B5D3_7546_41E4_E14A293EF70F"
 ],
 "width": "91.304%",
 "bottom": "0%",
 "contentOpaque": false,
 "horizontalAlign": "center",
 "layout": "vertical",
 "scrollBarMargin": 2,
 "height": "85.959%",
 "verticalAlign": "top",
 "shadow": false,
 "gap": 3,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "paddingRight": 0,
 "data": {
  "name": "-button set"
 },
 "class": "Container",
 "minHeight": 1,
 "paddingBottom": 0,
 "overflow": "scroll"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A46FD0F4_B079_2FF5_41C0_917811DB7E43",
 "frameDuration": 33,
 "levels": [
  {
   "url": "media/panorama_BD95CD55_B04F_3637_41CF_34EF7D21558D_0_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A1ED7CA5_B1F9_19EC_4198_D1107A79C3EC",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BA3FB086_B048_EE15_41E1_E96B4022F96E_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A46980F3_B079_2FF3_41D8_69166CEFB008",
 "frameDuration": 33,
 "levels": [
  {
   "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A46EB0F3_B079_2FF3_41E3_558CCD5D5B34",
 "frameDuration": 33,
 "levels": [
  {
   "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A1A549BC_B1F9_3BDC_4185_D96BE8EE2008",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_BACEA60C_B048_F215_41E3_C52DCAED54AC_0_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A46EE0F3_B079_2FF3_41CD_64C1992B6A4B",
 "frameDuration": 33,
 "levels": [
  {
   "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_A46F60F3_B079_2FF3_41DD_DCB905643BBA",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_BB6E2AEF_B047_1212_41E1_22871AAFD372_0_HS_1_0.png",
   "width": 300,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "id": "IconButton_A27B092B_B5D3_7546_41C8_A04DCD570296",
 "paddingLeft": 0,
 "width": 70,
 "borderSize": 0,
 "minWidth": 70,
 "iconURL": "skin/IconButton_A27B092B_B5D3_7546_41C8_A04DCD570296.png",
 "pressedRollOverIconURL": "skin/IconButton_A27B092B_B5D3_7546_41C8_A04DCD570296_pressed_rollover.png",
 "mode": "toggle",
 "height": 70,
 "click": "if(!this.Container_A27B192B_B5D3_7546_41E4_D00A28F185A0.get('visible')){ this.setComponentVisibility(this.Container_A27B192B_B5D3_7546_41E4_D00A28F185A0, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_A27B192B_B5D3_7546_41E4_D00A28F185A0, false, 0, null, null, false) }",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "shadow": false,
 "maxWidth": 70,
 "maxHeight": 70,
 "backgroundOpacity": 0,
 "paddingTop": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_A27B092B_B5D3_7546_41C8_A04DCD570296_pressed.png",
 "paddingRight": 0,
 "data": {
  "name": "image button menu"
 },
 "class": "IconButton",
 "cursor": "hand",
 "minHeight": 70,
 "paddingBottom": 0
}],
 "minHeight": 20,
 "paddingBottom": 0,
 "overflow": "visible"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
