import { n as V } from "./app-CnMVZMul.js";
import { d as X, h as W } from "./player-CQcwZiP8.js";
import { l as H } from "./logger-BpyELtLr.js";
import { c as S, a as ne } from "./_commonjsHelpers-1BW40pRg.js";
var L = {};
/*!
 *  howler.js v2.2.4
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
var P;
function z() {
  return P || (P = 1, function(y) {
    (function() {
      "use strict";
      var m = function() {
        this.init();
      };
      m.prototype = {
        /**
         * Initialize the global Howler object.
         * @return {Howler}
         */
        init: function() {
          var e = this || r;
          return e._counter = 1e3, e._html5AudioPool = [], e.html5PoolSize = 10, e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = "canplaythrough", e._navigator = typeof window < "u" && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.autoUnlock = !0, e._setup(), e;
        },
        /**
         * Get/set the global volume for all sounds.
         * @param  {Float} vol Volume from 0.0 to 1.0.
         * @return {Howler/Float}     Returns self or current volume.
         */
        volume: function(e) {
          var t = this || r;
          if (e = parseFloat(e), t.ctx || A(), typeof e < "u" && e >= 0 && e <= 1) {
            if (t._volume = e, t._muted)
              return t;
            t.usingWebAudio && t.masterGain.gain.setValueAtTime(e, r.ctx.currentTime);
            for (var n = 0; n < t._howls.length; n++)
              if (!t._howls[n]._webAudio)
                for (var o = t._howls[n]._getSoundIds(), s = 0; s < o.length; s++) {
                  var u = t._howls[n]._soundById(o[s]);
                  u && u._node && (u._node.volume = u._volume * e);
                }
            return t;
          }
          return t._volume;
        },
        /**
         * Handle muting and unmuting globally.
         * @param  {Boolean} muted Is muted or not.
         */
        mute: function(e) {
          var t = this || r;
          t.ctx || A(), t._muted = e, t.usingWebAudio && t.masterGain.gain.setValueAtTime(e ? 0 : t._volume, r.ctx.currentTime);
          for (var n = 0; n < t._howls.length; n++)
            if (!t._howls[n]._webAudio)
              for (var o = t._howls[n]._getSoundIds(), s = 0; s < o.length; s++) {
                var u = t._howls[n]._soundById(o[s]);
                u && u._node && (u._node.muted = e ? !0 : u._muted);
              }
          return t;
        },
        /**
         * Handle stopping all sounds globally.
         */
        stop: function() {
          for (var e = this || r, t = 0; t < e._howls.length; t++)
            e._howls[t].stop();
          return e;
        },
        /**
         * Unload and destroy all currently loaded Howl objects.
         * @return {Howler}
         */
        unload: function() {
          for (var e = this || r, t = e._howls.length - 1; t >= 0; t--)
            e._howls[t].unload();
          return e.usingWebAudio && e.ctx && typeof e.ctx.close < "u" && (e.ctx.close(), e.ctx = null, A()), e;
        },
        /**
         * Check for codec support of specific extension.
         * @param  {String} ext Audio file extention.
         * @return {Boolean}
         */
        codecs: function(e) {
          return (this || r)._codecs[e.replace(/^x-/, "")];
        },
        /**
         * Setup various state values for global tracking.
         * @return {Howler}
         */
        _setup: function() {
          var e = this || r;
          if (e.state = e.ctx && e.ctx.state || "suspended", e._autoSuspend(), !e.usingWebAudio)
            if (typeof Audio < "u")
              try {
                var t = new Audio();
                typeof t.oncanplaythrough > "u" && (e._canPlayEvent = "canplay");
              } catch {
                e.noAudio = !0;
              }
            else
              e.noAudio = !0;
          try {
            var t = new Audio();
            t.muted && (e.noAudio = !0);
          } catch {
          }
          return e.noAudio || e._setupCodecs(), e;
        },
        /**
         * Check for browser support for various codecs and cache the results.
         * @return {Howler}
         */
        _setupCodecs: function() {
          var e = this || r, t = null;
          try {
            t = typeof Audio < "u" ? new Audio() : null;
          } catch {
            return e;
          }
          if (!t || typeof t.canPlayType != "function")
            return e;
          var n = t.canPlayType("audio/mpeg;").replace(/^no$/, ""), o = e._navigator ? e._navigator.userAgent : "", s = o.match(/OPR\/(\d+)/g), u = s && parseInt(s[0].split("/")[1], 10) < 33, a = o.indexOf("Safari") !== -1 && o.indexOf("Chrome") === -1, c = o.match(/Version\/(.*?) /), h = a && c && parseInt(c[1], 10) < 15;
          return e._codecs = {
            mp3: !!(!u && (n || t.canPlayType("audio/mp3;").replace(/^no$/, ""))),
            mpeg: !!n,
            opus: !!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            oga: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!(t.canPlayType('audio/wav; codecs="1"') || t.canPlayType("audio/wav")).replace(/^no$/, ""),
            aac: !!t.canPlayType("audio/aac;").replace(/^no$/, ""),
            caf: !!t.canPlayType("audio/x-caf;").replace(/^no$/, ""),
            m4a: !!(t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
            m4b: !!(t.canPlayType("audio/x-m4b;") || t.canPlayType("audio/m4b;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
            mp4: !!(t.canPlayType("audio/x-mp4;") || t.canPlayType("audio/mp4;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
            weba: !!(!h && t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
            webm: !!(!h && t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
            dolby: !!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
            flac: !!(t.canPlayType("audio/x-flac;") || t.canPlayType("audio/flac;")).replace(/^no$/, "")
          }, e;
        },
        /**
         * Some browsers/devices will only allow audio to be played after a user interaction.
         * Attempt to automatically unlock audio on the first user interaction.
         * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
         * @return {Howler}
         */
        _unlockAudio: function() {
          var e = this || r;
          if (!(e._audioUnlocked || !e.ctx)) {
            e._audioUnlocked = !1, e.autoUnlock = !1, !e._mobileUnloaded && e.ctx.sampleRate !== 44100 && (e._mobileUnloaded = !0, e.unload()), e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
            var t = function(n) {
              for (; e._html5AudioPool.length < e.html5PoolSize; )
                try {
                  var o = new Audio();
                  o._unlocked = !0, e._releaseHtml5Audio(o);
                } catch {
                  e.noAudio = !0;
                  break;
                }
              for (var s = 0; s < e._howls.length; s++)
                if (!e._howls[s]._webAudio)
                  for (var u = e._howls[s]._getSoundIds(), a = 0; a < u.length; a++) {
                    var c = e._howls[s]._soundById(u[a]);
                    c && c._node && !c._node._unlocked && (c._node._unlocked = !0, c._node.load());
                  }
              e._autoResume();
              var h = e.ctx.createBufferSource();
              h.buffer = e._scratchBuffer, h.connect(e.ctx.destination), typeof h.start > "u" ? h.noteOn(0) : h.start(0), typeof e.ctx.resume == "function" && e.ctx.resume(), h.onended = function() {
                h.disconnect(0), e._audioUnlocked = !0, document.removeEventListener("touchstart", t, !0), document.removeEventListener("touchend", t, !0), document.removeEventListener("click", t, !0), document.removeEventListener("keydown", t, !0);
                for (var b = 0; b < e._howls.length; b++)
                  e._howls[b]._emit("unlock");
              };
            };
            return document.addEventListener("touchstart", t, !0), document.addEventListener("touchend", t, !0), document.addEventListener("click", t, !0), document.addEventListener("keydown", t, !0), e;
          }
        },
        /**
         * Get an unlocked HTML5 Audio object from the pool. If none are left,
         * return a new Audio object and throw a warning.
         * @return {Audio} HTML5 Audio object.
         */
        _obtainHtml5Audio: function() {
          var e = this || r;
          if (e._html5AudioPool.length)
            return e._html5AudioPool.pop();
          var t = new Audio().play();
          return t && typeof Promise < "u" && (t instanceof Promise || typeof t.then == "function") && t.catch(function() {
            console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
          }), new Audio();
        },
        /**
         * Return an activated HTML5 Audio object to the pool.
         * @return {Howler}
         */
        _releaseHtml5Audio: function(e) {
          var t = this || r;
          return e._unlocked && t._html5AudioPool.push(e), t;
        },
        /**
         * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
         * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
         * @return {Howler}
         */
        _autoSuspend: function() {
          var e = this;
          if (!(!e.autoSuspend || !e.ctx || typeof e.ctx.suspend > "u" || !r.usingWebAudio)) {
            for (var t = 0; t < e._howls.length; t++)
              if (e._howls[t]._webAudio) {
                for (var n = 0; n < e._howls[t]._sounds.length; n++)
                  if (!e._howls[t]._sounds[n]._paused)
                    return e;
              }
            return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout(function() {
              if (e.autoSuspend) {
                e._suspendTimer = null, e.state = "suspending";
                var o = function() {
                  e.state = "suspended", e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume());
                };
                e.ctx.suspend().then(o, o);
              }
            }, 3e4), e;
          }
        },
        /**
         * Automatically resume the Web Audio AudioContext when a new sound is played.
         * @return {Howler}
         */
        _autoResume: function() {
          var e = this;
          if (!(!e.ctx || typeof e.ctx.resume > "u" || !r.usingWebAudio))
            return e.state === "running" && e.ctx.state !== "interrupted" && e._suspendTimer ? (clearTimeout(e._suspendTimer), e._suspendTimer = null) : e.state === "suspended" || e.state === "running" && e.ctx.state === "interrupted" ? (e.ctx.resume().then(function() {
              e.state = "running";
              for (var t = 0; t < e._howls.length; t++)
                e._howls[t]._emit("resume");
            }), e._suspendTimer && (clearTimeout(e._suspendTimer), e._suspendTimer = null)) : e.state === "suspending" && (e._resumeAfterSuspend = !0), e;
        }
      };
      var r = new m(), l = function(e) {
        var t = this;
        if (!e.src || e.src.length === 0) {
          console.error("An array of source files must be passed with any new Howl.");
          return;
        }
        t.init(e);
      };
      l.prototype = {
        /**
         * Initialize a new Howl group object.
         * @param  {Object} o Passed in properties for this group.
         * @return {Howl}
         */
        init: function(e) {
          var t = this;
          return r.ctx || A(), t._autoplay = e.autoplay || !1, t._format = typeof e.format != "string" ? e.format : [e.format], t._html5 = e.html5 || !1, t._muted = e.mute || !1, t._loop = e.loop || !1, t._pool = e.pool || 5, t._preload = typeof e.preload == "boolean" || e.preload === "metadata" ? e.preload : !0, t._rate = e.rate || 1, t._sprite = e.sprite || {}, t._src = typeof e.src != "string" ? e.src : [e.src], t._volume = e.volume !== void 0 ? e.volume : 1, t._xhr = {
            method: e.xhr && e.xhr.method ? e.xhr.method : "GET",
            headers: e.xhr && e.xhr.headers ? e.xhr.headers : null,
            withCredentials: e.xhr && e.xhr.withCredentials ? e.xhr.withCredentials : !1
          }, t._duration = 0, t._state = "unloaded", t._sounds = [], t._endTimers = {}, t._queue = [], t._playLock = !1, t._onend = e.onend ? [{ fn: e.onend }] : [], t._onfade = e.onfade ? [{ fn: e.onfade }] : [], t._onload = e.onload ? [{ fn: e.onload }] : [], t._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : [], t._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : [], t._onpause = e.onpause ? [{ fn: e.onpause }] : [], t._onplay = e.onplay ? [{ fn: e.onplay }] : [], t._onstop = e.onstop ? [{ fn: e.onstop }] : [], t._onmute = e.onmute ? [{ fn: e.onmute }] : [], t._onvolume = e.onvolume ? [{ fn: e.onvolume }] : [], t._onrate = e.onrate ? [{ fn: e.onrate }] : [], t._onseek = e.onseek ? [{ fn: e.onseek }] : [], t._onunlock = e.onunlock ? [{ fn: e.onunlock }] : [], t._onresume = [], t._webAudio = r.usingWebAudio && !t._html5, typeof r.ctx < "u" && r.ctx && r.autoUnlock && r._unlockAudio(), r._howls.push(t), t._autoplay && t._queue.push({
            event: "play",
            action: function() {
              t.play();
            }
          }), t._preload && t._preload !== "none" && t.load(), t;
        },
        /**
         * Load the audio file.
         * @return {Howler}
         */
        load: function() {
          var e = this, t = null;
          if (r.noAudio) {
            e._emit("loaderror", null, "No audio support.");
            return;
          }
          typeof e._src == "string" && (e._src = [e._src]);
          for (var n = 0; n < e._src.length; n++) {
            var o, s;
            if (e._format && e._format[n])
              o = e._format[n];
            else {
              if (s = e._src[n], typeof s != "string") {
                e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                continue;
              }
              o = /^data:audio\/([^;,]+);/i.exec(s), o || (o = /\.([^.]+)$/.exec(s.split("?", 1)[0])), o && (o = o[1].toLowerCase());
            }
            if (o || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), o && r.codecs(o)) {
              t = e._src[n];
              break;
            }
          }
          if (!t) {
            e._emit("loaderror", null, "No codec support for selected audio sources.");
            return;
          }
          return e._src = t, e._state = "loading", window.location.protocol === "https:" && t.slice(0, 5) === "http:" && (e._html5 = !0, e._webAudio = !1), new i(e), e._webAudio && _(e), e;
        },
        /**
         * Play a sound or resume previous playback.
         * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
         * @param  {Boolean} internal Internal Use: true prevents event firing.
         * @return {Number}          Sound ID.
         */
        play: function(e, t) {
          var n = this, o = null;
          if (typeof e == "number")
            o = e, e = null;
          else {
            if (typeof e == "string" && n._state === "loaded" && !n._sprite[e])
              return null;
            if (typeof e > "u" && (e = "__default", !n._playLock)) {
              for (var s = 0, u = 0; u < n._sounds.length; u++)
                n._sounds[u]._paused && !n._sounds[u]._ended && (s++, o = n._sounds[u]._id);
              s === 1 ? e = null : o = null;
            }
          }
          var a = o ? n._soundById(o) : n._inactiveSound();
          if (!a)
            return null;
          if (o && !e && (e = a._sprite || "__default"), n._state !== "loaded") {
            a._sprite = e, a._ended = !1;
            var c = a._id;
            return n._queue.push({
              event: "play",
              action: function() {
                n.play(c);
              }
            }), c;
          }
          if (o && !a._paused)
            return t || n._loadQueue("play"), a._id;
          n._webAudio && r._autoResume();
          var h = Math.max(0, a._seek > 0 ? a._seek : n._sprite[e][0] / 1e3), b = Math.max(0, (n._sprite[e][0] + n._sprite[e][1]) / 1e3 - h), T = b * 1e3 / Math.abs(a._rate), x = n._sprite[e][0] / 1e3, I = (n._sprite[e][0] + n._sprite[e][1]) / 1e3;
          a._sprite = e, a._ended = !1;
          var M = function() {
            a._paused = !1, a._seek = h, a._start = x, a._stop = I, a._loop = !!(a._loop || n._sprite[e][2]);
          };
          if (h >= I) {
            n._ended(a);
            return;
          }
          var g = a._node;
          if (n._webAudio) {
            var C = function() {
              n._playLock = !1, M(), n._refreshBuffer(a);
              var k = a._muted || n._muted ? 0 : a._volume;
              g.gain.setValueAtTime(k, r.ctx.currentTime), a._playStart = r.ctx.currentTime, typeof g.bufferSource.start > "u" ? a._loop ? g.bufferSource.noteGrainOn(0, h, 86400) : g.bufferSource.noteGrainOn(0, h, b) : a._loop ? g.bufferSource.start(0, h, 86400) : g.bufferSource.start(0, h, b), T !== 1 / 0 && (n._endTimers[a._id] = setTimeout(n._ended.bind(n, a), T)), t || setTimeout(function() {
                n._emit("play", a._id), n._loadQueue();
              }, 0);
            };
            r.state === "running" && r.ctx.state !== "interrupted" ? C() : (n._playLock = !0, n.once("resume", C), n._clearTimer(a._id));
          } else {
            var O = function() {
              g.currentTime = h, g.muted = a._muted || n._muted || r._muted || g.muted, g.volume = a._volume * r.volume(), g.playbackRate = a._rate;
              try {
                var k = g.play();
                if (k && typeof Promise < "u" && (k instanceof Promise || typeof k.then == "function") ? (n._playLock = !0, M(), k.then(function() {
                  n._playLock = !1, g._unlocked = !0, t ? n._loadQueue() : n._emit("play", a._id);
                }).catch(function() {
                  n._playLock = !1, n._emit("playerror", a._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), a._ended = !0, a._paused = !0;
                })) : t || (n._playLock = !1, M(), n._emit("play", a._id)), g.playbackRate = a._rate, g.paused) {
                  n._emit("playerror", a._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                  return;
                }
                e !== "__default" || a._loop ? n._endTimers[a._id] = setTimeout(n._ended.bind(n, a), T) : (n._endTimers[a._id] = function() {
                  n._ended(a), g.removeEventListener("ended", n._endTimers[a._id], !1);
                }, g.addEventListener("ended", n._endTimers[a._id], !1));
              } catch ($) {
                n._emit("playerror", a._id, $);
              }
            };
            g.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (g.src = n._src, g.load());
            var R = window && window.ejecta || !g.readyState && r._navigator.isCocoonJS;
            if (g.readyState >= 3 || R)
              O();
            else {
              n._playLock = !0, n._state = "loading";
              var B = function() {
                n._state = "loaded", O(), g.removeEventListener(r._canPlayEvent, B, !1);
              };
              g.addEventListener(r._canPlayEvent, B, !1), n._clearTimer(a._id);
            }
          }
          return a._id;
        },
        /**
         * Pause playback and save current position.
         * @param  {Number} id The sound ID (empty to pause all in group).
         * @return {Howl}
         */
        pause: function(e) {
          var t = this;
          if (t._state !== "loaded" || t._playLock)
            return t._queue.push({
              event: "pause",
              action: function() {
                t.pause(e);
              }
            }), t;
          for (var n = t._getSoundIds(e), o = 0; o < n.length; o++) {
            t._clearTimer(n[o]);
            var s = t._soundById(n[o]);
            if (s && !s._paused && (s._seek = t.seek(n[o]), s._rateSeek = 0, s._paused = !0, t._stopFade(n[o]), s._node))
              if (t._webAudio) {
                if (!s._node.bufferSource)
                  continue;
                typeof s._node.bufferSource.stop > "u" ? s._node.bufferSource.noteOff(0) : s._node.bufferSource.stop(0), t._cleanBuffer(s._node);
              } else (!isNaN(s._node.duration) || s._node.duration === 1 / 0) && s._node.pause();
            arguments[1] || t._emit("pause", s ? s._id : null);
          }
          return t;
        },
        /**
         * Stop playback and reset to start.
         * @param  {Number} id The sound ID (empty to stop all in group).
         * @param  {Boolean} internal Internal Use: true prevents event firing.
         * @return {Howl}
         */
        stop: function(e, t) {
          var n = this;
          if (n._state !== "loaded" || n._playLock)
            return n._queue.push({
              event: "stop",
              action: function() {
                n.stop(e);
              }
            }), n;
          for (var o = n._getSoundIds(e), s = 0; s < o.length; s++) {
            n._clearTimer(o[s]);
            var u = n._soundById(o[s]);
            u && (u._seek = u._start || 0, u._rateSeek = 0, u._paused = !0, u._ended = !0, n._stopFade(o[s]), u._node && (n._webAudio ? u._node.bufferSource && (typeof u._node.bufferSource.stop > "u" ? u._node.bufferSource.noteOff(0) : u._node.bufferSource.stop(0), n._cleanBuffer(u._node)) : (!isNaN(u._node.duration) || u._node.duration === 1 / 0) && (u._node.currentTime = u._start || 0, u._node.pause(), u._node.duration === 1 / 0 && n._clearSound(u._node))), t || n._emit("stop", u._id));
          }
          return n;
        },
        /**
         * Mute/unmute a single sound or all sounds in this Howl group.
         * @param  {Boolean} muted Set to true to mute and false to unmute.
         * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
         * @return {Howl}
         */
        mute: function(e, t) {
          var n = this;
          if (n._state !== "loaded" || n._playLock)
            return n._queue.push({
              event: "mute",
              action: function() {
                n.mute(e, t);
              }
            }), n;
          if (typeof t > "u")
            if (typeof e == "boolean")
              n._muted = e;
            else
              return n._muted;
          for (var o = n._getSoundIds(t), s = 0; s < o.length; s++) {
            var u = n._soundById(o[s]);
            u && (u._muted = e, u._interval && n._stopFade(u._id), n._webAudio && u._node ? u._node.gain.setValueAtTime(e ? 0 : u._volume, r.ctx.currentTime) : u._node && (u._node.muted = r._muted ? !0 : e), n._emit("mute", u._id));
          }
          return n;
        },
        /**
         * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
         *   volume() -> Returns the group's volume value.
         *   volume(id) -> Returns the sound id's current volume.
         *   volume(vol) -> Sets the volume of all sounds in this Howl group.
         *   volume(vol, id) -> Sets the volume of passed sound id.
         * @return {Howl/Number} Returns self or current volume.
         */
        volume: function() {
          var e = this, t = arguments, n, o;
          if (t.length === 0)
            return e._volume;
          if (t.length === 1 || t.length === 2 && typeof t[1] > "u") {
            var s = e._getSoundIds(), u = s.indexOf(t[0]);
            u >= 0 ? o = parseInt(t[0], 10) : n = parseFloat(t[0]);
          } else t.length >= 2 && (n = parseFloat(t[0]), o = parseInt(t[1], 10));
          var a;
          if (typeof n < "u" && n >= 0 && n <= 1) {
            if (e._state !== "loaded" || e._playLock)
              return e._queue.push({
                event: "volume",
                action: function() {
                  e.volume.apply(e, t);
                }
              }), e;
            typeof o > "u" && (e._volume = n), o = e._getSoundIds(o);
            for (var c = 0; c < o.length; c++)
              a = e._soundById(o[c]), a && (a._volume = n, t[2] || e._stopFade(o[c]), e._webAudio && a._node && !a._muted ? a._node.gain.setValueAtTime(n, r.ctx.currentTime) : a._node && !a._muted && (a._node.volume = n * r.volume()), e._emit("volume", a._id));
          } else
            return a = o ? e._soundById(o) : e._sounds[0], a ? a._volume : 0;
          return e;
        },
        /**
         * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
         * @param  {Number} from The value to fade from (0.0 to 1.0).
         * @param  {Number} to   The volume to fade to (0.0 to 1.0).
         * @param  {Number} len  Time in milliseconds to fade.
         * @param  {Number} id   The sound id (omit to fade all sounds).
         * @return {Howl}
         */
        fade: function(e, t, n, o) {
          var s = this;
          if (s._state !== "loaded" || s._playLock)
            return s._queue.push({
              event: "fade",
              action: function() {
                s.fade(e, t, n, o);
              }
            }), s;
          e = Math.min(Math.max(0, parseFloat(e)), 1), t = Math.min(Math.max(0, parseFloat(t)), 1), n = parseFloat(n), s.volume(e, o);
          for (var u = s._getSoundIds(o), a = 0; a < u.length; a++) {
            var c = s._soundById(u[a]);
            if (c) {
              if (o || s._stopFade(u[a]), s._webAudio && !c._muted) {
                var h = r.ctx.currentTime, b = h + n / 1e3;
                c._volume = e, c._node.gain.setValueAtTime(e, h), c._node.gain.linearRampToValueAtTime(t, b);
              }
              s._startFadeInterval(c, e, t, n, u[a], typeof o > "u");
            }
          }
          return s;
        },
        /**
         * Starts the internal interval to fade a sound.
         * @param  {Object} sound Reference to sound to fade.
         * @param  {Number} from The value to fade from (0.0 to 1.0).
         * @param  {Number} to   The volume to fade to (0.0 to 1.0).
         * @param  {Number} len  Time in milliseconds to fade.
         * @param  {Number} id   The sound id to fade.
         * @param  {Boolean} isGroup   If true, set the volume on the group.
         */
        _startFadeInterval: function(e, t, n, o, s, u) {
          var a = this, c = t, h = n - t, b = Math.abs(h / 0.01), T = Math.max(4, b > 0 ? o / b : o), x = Date.now();
          e._fadeTo = n, e._interval = setInterval(function() {
            var I = (Date.now() - x) / o;
            x = Date.now(), c += h * I, c = Math.round(c * 100) / 100, h < 0 ? c = Math.max(n, c) : c = Math.min(n, c), a._webAudio ? e._volume = c : a.volume(c, e._id, !0), u && (a._volume = c), (n < t && c <= n || n > t && c >= n) && (clearInterval(e._interval), e._interval = null, e._fadeTo = null, a.volume(n, e._id), a._emit("fade", e._id));
          }, T);
        },
        /**
         * Internal method that stops the currently playing fade when
         * a new fade starts, volume is changed or the sound is stopped.
         * @param  {Number} id The sound id.
         * @return {Howl}
         */
        _stopFade: function(e) {
          var t = this, n = t._soundById(e);
          return n && n._interval && (t._webAudio && n._node.gain.cancelScheduledValues(r.ctx.currentTime), clearInterval(n._interval), n._interval = null, t.volume(n._fadeTo, e), n._fadeTo = null, t._emit("fade", e)), t;
        },
        /**
         * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
         *   loop() -> Returns the group's loop value.
         *   loop(id) -> Returns the sound id's loop value.
         *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
         *   loop(loop, id) -> Sets the loop value of passed sound id.
         * @return {Howl/Boolean} Returns self or current loop value.
         */
        loop: function() {
          var e = this, t = arguments, n, o, s;
          if (t.length === 0)
            return e._loop;
          if (t.length === 1)
            if (typeof t[0] == "boolean")
              n = t[0], e._loop = n;
            else
              return s = e._soundById(parseInt(t[0], 10)), s ? s._loop : !1;
          else t.length === 2 && (n = t[0], o = parseInt(t[1], 10));
          for (var u = e._getSoundIds(o), a = 0; a < u.length; a++)
            s = e._soundById(u[a]), s && (s._loop = n, e._webAudio && s._node && s._node.bufferSource && (s._node.bufferSource.loop = n, n && (s._node.bufferSource.loopStart = s._start || 0, s._node.bufferSource.loopEnd = s._stop, e.playing(u[a]) && (e.pause(u[a], !0), e.play(u[a], !0)))));
          return e;
        },
        /**
         * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
         *   rate() -> Returns the first sound node's current playback rate.
         *   rate(id) -> Returns the sound id's current playback rate.
         *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
         *   rate(rate, id) -> Sets the playback rate of passed sound id.
         * @return {Howl/Number} Returns self or the current playback rate.
         */
        rate: function() {
          var e = this, t = arguments, n, o;
          if (t.length === 0)
            o = e._sounds[0]._id;
          else if (t.length === 1) {
            var s = e._getSoundIds(), u = s.indexOf(t[0]);
            u >= 0 ? o = parseInt(t[0], 10) : n = parseFloat(t[0]);
          } else t.length === 2 && (n = parseFloat(t[0]), o = parseInt(t[1], 10));
          var a;
          if (typeof n == "number") {
            if (e._state !== "loaded" || e._playLock)
              return e._queue.push({
                event: "rate",
                action: function() {
                  e.rate.apply(e, t);
                }
              }), e;
            typeof o > "u" && (e._rate = n), o = e._getSoundIds(o);
            for (var c = 0; c < o.length; c++)
              if (a = e._soundById(o[c]), a) {
                e.playing(o[c]) && (a._rateSeek = e.seek(o[c]), a._playStart = e._webAudio ? r.ctx.currentTime : a._playStart), a._rate = n, e._webAudio && a._node && a._node.bufferSource ? a._node.bufferSource.playbackRate.setValueAtTime(n, r.ctx.currentTime) : a._node && (a._node.playbackRate = n);
                var h = e.seek(o[c]), b = (e._sprite[a._sprite][0] + e._sprite[a._sprite][1]) / 1e3 - h, T = b * 1e3 / Math.abs(a._rate);
                (e._endTimers[o[c]] || !a._paused) && (e._clearTimer(o[c]), e._endTimers[o[c]] = setTimeout(e._ended.bind(e, a), T)), e._emit("rate", a._id);
              }
          } else
            return a = e._soundById(o), a ? a._rate : e._rate;
          return e;
        },
        /**
         * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
         *   seek() -> Returns the first sound node's current seek position.
         *   seek(id) -> Returns the sound id's current seek position.
         *   seek(seek) -> Sets the seek position of the first sound node.
         *   seek(seek, id) -> Sets the seek position of passed sound id.
         * @return {Howl/Number} Returns self or the current seek position.
         */
        seek: function() {
          var e = this, t = arguments, n, o;
          if (t.length === 0)
            e._sounds.length && (o = e._sounds[0]._id);
          else if (t.length === 1) {
            var s = e._getSoundIds(), u = s.indexOf(t[0]);
            u >= 0 ? o = parseInt(t[0], 10) : e._sounds.length && (o = e._sounds[0]._id, n = parseFloat(t[0]));
          } else t.length === 2 && (n = parseFloat(t[0]), o = parseInt(t[1], 10));
          if (typeof o > "u")
            return 0;
          if (typeof n == "number" && (e._state !== "loaded" || e._playLock))
            return e._queue.push({
              event: "seek",
              action: function() {
                e.seek.apply(e, t);
              }
            }), e;
          var a = e._soundById(o);
          if (a)
            if (typeof n == "number" && n >= 0) {
              var c = e.playing(o);
              c && e.pause(o, !0), a._seek = n, a._ended = !1, e._clearTimer(o), !e._webAudio && a._node && !isNaN(a._node.duration) && (a._node.currentTime = n);
              var h = function() {
                c && e.play(o, !0), e._emit("seek", o);
              };
              if (c && !e._webAudio) {
                var b = function() {
                  e._playLock ? setTimeout(b, 0) : h();
                };
                setTimeout(b, 0);
              } else
                h();
            } else if (e._webAudio) {
              var T = e.playing(o) ? r.ctx.currentTime - a._playStart : 0, x = a._rateSeek ? a._rateSeek - a._seek : 0;
              return a._seek + (x + T * Math.abs(a._rate));
            } else
              return a._node.currentTime;
          return e;
        },
        /**
         * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
         * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
         * @return {Boolean} True if playing and false if not.
         */
        playing: function(e) {
          var t = this;
          if (typeof e == "number") {
            var n = t._soundById(e);
            return n ? !n._paused : !1;
          }
          for (var o = 0; o < t._sounds.length; o++)
            if (!t._sounds[o]._paused)
              return !0;
          return !1;
        },
        /**
         * Get the duration of this sound. Passing a sound id will return the sprite duration.
         * @param  {Number} id The sound id to check. If none is passed, return full source duration.
         * @return {Number} Audio duration in seconds.
         */
        duration: function(e) {
          var t = this, n = t._duration, o = t._soundById(e);
          return o && (n = t._sprite[o._sprite][1] / 1e3), n;
        },
        /**
         * Returns the current loaded state of this Howl.
         * @return {String} 'unloaded', 'loading', 'loaded'
         */
        state: function() {
          return this._state;
        },
        /**
         * Unload and destroy the current Howl object.
         * This will immediately stop all sound instances attached to this group.
         */
        unload: function() {
          for (var e = this, t = e._sounds, n = 0; n < t.length; n++)
            t[n]._paused || e.stop(t[n]._id), e._webAudio || (e._clearSound(t[n]._node), t[n]._node.removeEventListener("error", t[n]._errorFn, !1), t[n]._node.removeEventListener(r._canPlayEvent, t[n]._loadFn, !1), t[n]._node.removeEventListener("ended", t[n]._endFn, !1), r._releaseHtml5Audio(t[n]._node)), delete t[n]._node, e._clearTimer(t[n]._id);
          var o = r._howls.indexOf(e);
          o >= 0 && r._howls.splice(o, 1);
          var s = !0;
          for (n = 0; n < r._howls.length; n++)
            if (r._howls[n]._src === e._src || e._src.indexOf(r._howls[n]._src) >= 0) {
              s = !1;
              break;
            }
          return f && s && delete f[e._src], r.noAudio = !1, e._state = "unloaded", e._sounds = [], e = null, null;
        },
        /**
         * Listen to a custom event.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to call.
         * @param  {Number}   id    (optional) Only listen to events for this sound.
         * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
         * @return {Howl}
         */
        on: function(e, t, n, o) {
          var s = this, u = s["_on" + e];
          return typeof t == "function" && u.push(o ? { id: n, fn: t, once: o } : { id: n, fn: t }), s;
        },
        /**
         * Remove a custom event. Call without parameters to remove all events.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to remove. Leave empty to remove all.
         * @param  {Number}   id    (optional) Only remove events for this sound.
         * @return {Howl}
         */
        off: function(e, t, n) {
          var o = this, s = o["_on" + e], u = 0;
          if (typeof t == "number" && (n = t, t = null), t || n)
            for (u = 0; u < s.length; u++) {
              var a = n === s[u].id;
              if (t === s[u].fn && a || !t && a) {
                s.splice(u, 1);
                break;
              }
            }
          else if (e)
            o["_on" + e] = [];
          else {
            var c = Object.keys(o);
            for (u = 0; u < c.length; u++)
              c[u].indexOf("_on") === 0 && Array.isArray(o[c[u]]) && (o[c[u]] = []);
          }
          return o;
        },
        /**
         * Listen to a custom event and remove it once fired.
         * @param  {String}   event Event name.
         * @param  {Function} fn    Listener to call.
         * @param  {Number}   id    (optional) Only listen to events for this sound.
         * @return {Howl}
         */
        once: function(e, t, n) {
          var o = this;
          return o.on(e, t, n, 1), o;
        },
        /**
         * Emit all events of a specific type and pass the sound id.
         * @param  {String} event Event name.
         * @param  {Number} id    Sound ID.
         * @param  {Number} msg   Message to go with event.
         * @return {Howl}
         */
        _emit: function(e, t, n) {
          for (var o = this, s = o["_on" + e], u = s.length - 1; u >= 0; u--)
            (!s[u].id || s[u].id === t || e === "load") && (setTimeout(function(a) {
              a.call(this, t, n);
            }.bind(o, s[u].fn), 0), s[u].once && o.off(e, s[u].fn, s[u].id));
          return o._loadQueue(e), o;
        },
        /**
         * Queue of actions initiated before the sound has loaded.
         * These will be called in sequence, with the next only firing
         * after the previous has finished executing (even if async like play).
         * @return {Howl}
         */
        _loadQueue: function(e) {
          var t = this;
          if (t._queue.length > 0) {
            var n = t._queue[0];
            n.event === e && (t._queue.shift(), t._loadQueue()), e || n.action();
          }
          return t;
        },
        /**
         * Fired when playback ends at the end of the duration.
         * @param  {Sound} sound The sound object to work with.
         * @return {Howl}
         */
        _ended: function(e) {
          var t = this, n = e._sprite;
          if (!t._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop)
            return setTimeout(t._ended.bind(t, e), 100), t;
          var o = !!(e._loop || t._sprite[n][2]);
          if (t._emit("end", e._id), !t._webAudio && o && t.stop(e._id, !0).play(e._id), t._webAudio && o) {
            t._emit("play", e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = r.ctx.currentTime;
            var s = (e._stop - e._start) * 1e3 / Math.abs(e._rate);
            t._endTimers[e._id] = setTimeout(t._ended.bind(t, e), s);
          }
          return t._webAudio && !o && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, t._clearTimer(e._id), t._cleanBuffer(e._node), r._autoSuspend()), !t._webAudio && !o && t.stop(e._id, !0), t;
        },
        /**
         * Clear the end timer for a sound playback.
         * @param  {Number} id The sound ID.
         * @return {Howl}
         */
        _clearTimer: function(e) {
          var t = this;
          if (t._endTimers[e]) {
            if (typeof t._endTimers[e] != "function")
              clearTimeout(t._endTimers[e]);
            else {
              var n = t._soundById(e);
              n && n._node && n._node.removeEventListener("ended", t._endTimers[e], !1);
            }
            delete t._endTimers[e];
          }
          return t;
        },
        /**
         * Return the sound identified by this ID, or return null.
         * @param  {Number} id Sound ID
         * @return {Object}    Sound object or null.
         */
        _soundById: function(e) {
          for (var t = this, n = 0; n < t._sounds.length; n++)
            if (e === t._sounds[n]._id)
              return t._sounds[n];
          return null;
        },
        /**
         * Return an inactive sound from the pool or create a new one.
         * @return {Sound} Sound playback object.
         */
        _inactiveSound: function() {
          var e = this;
          e._drain();
          for (var t = 0; t < e._sounds.length; t++)
            if (e._sounds[t]._ended)
              return e._sounds[t].reset();
          return new i(e);
        },
        /**
         * Drain excess inactive sounds from the pool.
         */
        _drain: function() {
          var e = this, t = e._pool, n = 0, o = 0;
          if (!(e._sounds.length < t)) {
            for (o = 0; o < e._sounds.length; o++)
              e._sounds[o]._ended && n++;
            for (o = e._sounds.length - 1; o >= 0; o--) {
              if (n <= t)
                return;
              e._sounds[o]._ended && (e._webAudio && e._sounds[o]._node && e._sounds[o]._node.disconnect(0), e._sounds.splice(o, 1), n--);
            }
          }
        },
        /**
         * Get all ID's from the sounds pool.
         * @param  {Number} id Only return one ID if one is passed.
         * @return {Array}    Array of IDs.
         */
        _getSoundIds: function(e) {
          var t = this;
          if (typeof e > "u") {
            for (var n = [], o = 0; o < t._sounds.length; o++)
              n.push(t._sounds[o]._id);
            return n;
          } else
            return [e];
        },
        /**
         * Load the sound back into the buffer source.
         * @param  {Sound} sound The sound object to work with.
         * @return {Howl}
         */
        _refreshBuffer: function(e) {
          var t = this;
          return e._node.bufferSource = r.ctx.createBufferSource(), e._node.bufferSource.buffer = f[t._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop || 0), e._node.bufferSource.playbackRate.setValueAtTime(e._rate, r.ctx.currentTime), t;
        },
        /**
         * Prevent memory leaks by cleaning up the buffer source after playback.
         * @param  {Object} node Sound's audio node containing the buffer source.
         * @return {Howl}
         */
        _cleanBuffer: function(e) {
          var t = this, n = r._navigator && r._navigator.vendor.indexOf("Apple") >= 0;
          if (!e.bufferSource)
            return t;
          if (r._scratchBuffer && e.bufferSource && (e.bufferSource.onended = null, e.bufferSource.disconnect(0), n))
            try {
              e.bufferSource.buffer = r._scratchBuffer;
            } catch {
            }
          return e.bufferSource = null, t;
        },
        /**
         * Set the source to a 0-second silence to stop any downloading (except in IE).
         * @param  {Object} node Audio node to clear.
         */
        _clearSound: function(e) {
          var t = /MSIE |Trident\//.test(r._navigator && r._navigator.userAgent);
          t || (e.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
        }
      };
      var i = function(e) {
        this._parent = e, this.init();
      };
      i.prototype = {
        /**
         * Initialize a new Sound object.
         * @return {Sound}
         */
        init: function() {
          var e = this, t = e._parent;
          return e._muted = t._muted, e._loop = t._loop, e._volume = t._volume, e._rate = t._rate, e._seek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++r._counter, t._sounds.push(e), e.create(), e;
        },
        /**
         * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
         * @return {Sound}
         */
        create: function() {
          var e = this, t = e._parent, n = r._muted || e._muted || e._parent._muted ? 0 : e._volume;
          return t._webAudio ? (e._node = typeof r.ctx.createGain > "u" ? r.ctx.createGainNode() : r.ctx.createGain(), e._node.gain.setValueAtTime(n, r.ctx.currentTime), e._node.paused = !0, e._node.connect(r.masterGain)) : r.noAudio || (e._node = r._obtainHtml5Audio(), e._errorFn = e._errorListener.bind(e), e._node.addEventListener("error", e._errorFn, !1), e._loadFn = e._loadListener.bind(e), e._node.addEventListener(r._canPlayEvent, e._loadFn, !1), e._endFn = e._endListener.bind(e), e._node.addEventListener("ended", e._endFn, !1), e._node.src = t._src, e._node.preload = t._preload === !0 ? "auto" : t._preload, e._node.volume = n * r.volume(), e._node.load()), e;
        },
        /**
         * Reset the parameters of this sound to the original state (for recycle).
         * @return {Sound}
         */
        reset: function() {
          var e = this, t = e._parent;
          return e._muted = t._muted, e._loop = t._loop, e._volume = t._volume, e._rate = t._rate, e._seek = 0, e._rateSeek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++r._counter, e;
        },
        /**
         * HTML5 Audio error listener callback.
         */
        _errorListener: function() {
          var e = this;
          e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0), e._node.removeEventListener("error", e._errorFn, !1);
        },
        /**
         * HTML5 Audio canplaythrough listener callback.
         */
        _loadListener: function() {
          var e = this, t = e._parent;
          t._duration = Math.ceil(e._node.duration * 10) / 10, Object.keys(t._sprite).length === 0 && (t._sprite = { __default: [0, t._duration * 1e3] }), t._state !== "loaded" && (t._state = "loaded", t._emit("load"), t._loadQueue()), e._node.removeEventListener(r._canPlayEvent, e._loadFn, !1);
        },
        /**
         * HTML5 Audio ended listener callback.
         */
        _endListener: function() {
          var e = this, t = e._parent;
          t._duration === 1 / 0 && (t._duration = Math.ceil(e._node.duration * 10) / 10, t._sprite.__default[1] === 1 / 0 && (t._sprite.__default[1] = t._duration * 1e3), t._ended(e)), e._node.removeEventListener("ended", e._endFn, !1);
        }
      };
      var f = {}, _ = function(e) {
        var t = e._src;
        if (f[t]) {
          e._duration = f[t].duration, d(e);
          return;
        }
        if (/^data:[^;]+;base64,/.test(t)) {
          for (var n = atob(t.split(",")[1]), o = new Uint8Array(n.length), s = 0; s < n.length; ++s)
            o[s] = n.charCodeAt(s);
          p(o.buffer, e);
        } else {
          var u = new XMLHttpRequest();
          u.open(e._xhr.method, t, !0), u.withCredentials = e._xhr.withCredentials, u.responseType = "arraybuffer", e._xhr.headers && Object.keys(e._xhr.headers).forEach(function(a) {
            u.setRequestHeader(a, e._xhr.headers[a]);
          }), u.onload = function() {
            var a = (u.status + "")[0];
            if (a !== "0" && a !== "2" && a !== "3") {
              e._emit("loaderror", null, "Failed loading audio file with status: " + u.status + ".");
              return;
            }
            p(u.response, e);
          }, u.onerror = function() {
            e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete f[t], e.load());
          }, w(u);
        }
      }, w = function(e) {
        try {
          e.send();
        } catch {
          e.onerror();
        }
      }, p = function(e, t) {
        var n = function() {
          t._emit("loaderror", null, "Decoding audio data failed.");
        }, o = function(s) {
          s && t._sounds.length > 0 ? (f[t._src] = s, d(t, s)) : n();
        };
        typeof Promise < "u" && r.ctx.decodeAudioData.length === 1 ? r.ctx.decodeAudioData(e).then(o).catch(n) : r.ctx.decodeAudioData(e, o, n);
      }, d = function(e, t) {
        t && !e._duration && (e._duration = t.duration), Object.keys(e._sprite).length === 0 && (e._sprite = { __default: [0, e._duration * 1e3] }), e._state !== "loaded" && (e._state = "loaded", e._emit("load"), e._loadQueue());
      }, A = function() {
        if (r.usingWebAudio) {
          try {
            typeof AudioContext < "u" ? r.ctx = new AudioContext() : typeof webkitAudioContext < "u" ? r.ctx = new webkitAudioContext() : r.usingWebAudio = !1;
          } catch {
            r.usingWebAudio = !1;
          }
          r.ctx || (r.usingWebAudio = !1);
          var e = /iP(hone|od|ad)/.test(r._navigator && r._navigator.platform), t = r._navigator && r._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), n = t ? parseInt(t[1], 10) : null;
          if (e && n && n < 9) {
            var o = /safari/.test(r._navigator && r._navigator.userAgent.toLowerCase());
            r._navigator && !o && (r.usingWebAudio = !1);
          }
          r.usingWebAudio && (r.masterGain = typeof r.ctx.createGain > "u" ? r.ctx.createGainNode() : r.ctx.createGain(), r.masterGain.gain.setValueAtTime(r._muted ? 0 : r._volume, r.ctx.currentTime), r.masterGain.connect(r.ctx.destination)), r._setup();
        }
      };
      y.Howler = r, y.Howl = l, typeof S < "u" ? (S.HowlerGlobal = m, S.Howler = r, S.Howl = l, S.Sound = i) : typeof window < "u" && (window.HowlerGlobal = m, window.Howler = r, window.Howl = l, window.Sound = i);
    })();
    /*!
     *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
     *  
     *  howler.js v2.2.4
     *  howlerjs.com
     *
     *  (c) 2013-2020, James Simpson of GoldFire Studios
     *  goldfirestudios.com
     *
     *  MIT License
     */
    (function() {
      "use strict";
      HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function(r) {
        var l = this;
        if (!l.ctx || !l.ctx.listener)
          return l;
        for (var i = l._howls.length - 1; i >= 0; i--)
          l._howls[i].stereo(r);
        return l;
      }, HowlerGlobal.prototype.pos = function(r, l, i) {
        var f = this;
        if (!f.ctx || !f.ctx.listener)
          return f;
        if (l = typeof l != "number" ? f._pos[1] : l, i = typeof i != "number" ? f._pos[2] : i, typeof r == "number")
          f._pos = [r, l, i], typeof f.ctx.listener.positionX < "u" ? (f.ctx.listener.positionX.setTargetAtTime(f._pos[0], Howler.ctx.currentTime, 0.1), f.ctx.listener.positionY.setTargetAtTime(f._pos[1], Howler.ctx.currentTime, 0.1), f.ctx.listener.positionZ.setTargetAtTime(f._pos[2], Howler.ctx.currentTime, 0.1)) : f.ctx.listener.setPosition(f._pos[0], f._pos[1], f._pos[2]);
        else
          return f._pos;
        return f;
      }, HowlerGlobal.prototype.orientation = function(r, l, i, f, _, w) {
        var p = this;
        if (!p.ctx || !p.ctx.listener)
          return p;
        var d = p._orientation;
        if (l = typeof l != "number" ? d[1] : l, i = typeof i != "number" ? d[2] : i, f = typeof f != "number" ? d[3] : f, _ = typeof _ != "number" ? d[4] : _, w = typeof w != "number" ? d[5] : w, typeof r == "number")
          p._orientation = [r, l, i, f, _, w], typeof p.ctx.listener.forwardX < "u" ? (p.ctx.listener.forwardX.setTargetAtTime(r, Howler.ctx.currentTime, 0.1), p.ctx.listener.forwardY.setTargetAtTime(l, Howler.ctx.currentTime, 0.1), p.ctx.listener.forwardZ.setTargetAtTime(i, Howler.ctx.currentTime, 0.1), p.ctx.listener.upX.setTargetAtTime(f, Howler.ctx.currentTime, 0.1), p.ctx.listener.upY.setTargetAtTime(_, Howler.ctx.currentTime, 0.1), p.ctx.listener.upZ.setTargetAtTime(w, Howler.ctx.currentTime, 0.1)) : p.ctx.listener.setOrientation(r, l, i, f, _, w);
        else
          return d;
        return p;
      }, Howl.prototype.init = /* @__PURE__ */ function(r) {
        return function(l) {
          var i = this;
          return i._orientation = l.orientation || [1, 0, 0], i._stereo = l.stereo || null, i._pos = l.pos || null, i._pannerAttr = {
            coneInnerAngle: typeof l.coneInnerAngle < "u" ? l.coneInnerAngle : 360,
            coneOuterAngle: typeof l.coneOuterAngle < "u" ? l.coneOuterAngle : 360,
            coneOuterGain: typeof l.coneOuterGain < "u" ? l.coneOuterGain : 0,
            distanceModel: typeof l.distanceModel < "u" ? l.distanceModel : "inverse",
            maxDistance: typeof l.maxDistance < "u" ? l.maxDistance : 1e4,
            panningModel: typeof l.panningModel < "u" ? l.panningModel : "HRTF",
            refDistance: typeof l.refDistance < "u" ? l.refDistance : 1,
            rolloffFactor: typeof l.rolloffFactor < "u" ? l.rolloffFactor : 1
          }, i._onstereo = l.onstereo ? [{ fn: l.onstereo }] : [], i._onpos = l.onpos ? [{ fn: l.onpos }] : [], i._onorientation = l.onorientation ? [{ fn: l.onorientation }] : [], r.call(this, l);
        };
      }(Howl.prototype.init), Howl.prototype.stereo = function(r, l) {
        var i = this;
        if (!i._webAudio)
          return i;
        if (i._state !== "loaded")
          return i._queue.push({
            event: "stereo",
            action: function() {
              i.stereo(r, l);
            }
          }), i;
        var f = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
        if (typeof l > "u")
          if (typeof r == "number")
            i._stereo = r, i._pos = [r, 0, 0];
          else
            return i._stereo;
        for (var _ = i._getSoundIds(l), w = 0; w < _.length; w++) {
          var p = i._soundById(_[w]);
          if (p)
            if (typeof r == "number")
              p._stereo = r, p._pos = [r, 0, 0], p._node && (p._pannerAttr.panningModel = "equalpower", (!p._panner || !p._panner.pan) && m(p, f), f === "spatial" ? typeof p._panner.positionX < "u" ? (p._panner.positionX.setValueAtTime(r, Howler.ctx.currentTime), p._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), p._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : p._panner.setPosition(r, 0, 0) : p._panner.pan.setValueAtTime(r, Howler.ctx.currentTime)), i._emit("stereo", p._id);
            else
              return p._stereo;
        }
        return i;
      }, Howl.prototype.pos = function(r, l, i, f) {
        var _ = this;
        if (!_._webAudio)
          return _;
        if (_._state !== "loaded")
          return _._queue.push({
            event: "pos",
            action: function() {
              _.pos(r, l, i, f);
            }
          }), _;
        if (l = typeof l != "number" ? 0 : l, i = typeof i != "number" ? -0.5 : i, typeof f > "u")
          if (typeof r == "number")
            _._pos = [r, l, i];
          else
            return _._pos;
        for (var w = _._getSoundIds(f), p = 0; p < w.length; p++) {
          var d = _._soundById(w[p]);
          if (d)
            if (typeof r == "number")
              d._pos = [r, l, i], d._node && ((!d._panner || d._panner.pan) && m(d, "spatial"), typeof d._panner.positionX < "u" ? (d._panner.positionX.setValueAtTime(r, Howler.ctx.currentTime), d._panner.positionY.setValueAtTime(l, Howler.ctx.currentTime), d._panner.positionZ.setValueAtTime(i, Howler.ctx.currentTime)) : d._panner.setPosition(r, l, i)), _._emit("pos", d._id);
            else
              return d._pos;
        }
        return _;
      }, Howl.prototype.orientation = function(r, l, i, f) {
        var _ = this;
        if (!_._webAudio)
          return _;
        if (_._state !== "loaded")
          return _._queue.push({
            event: "orientation",
            action: function() {
              _.orientation(r, l, i, f);
            }
          }), _;
        if (l = typeof l != "number" ? _._orientation[1] : l, i = typeof i != "number" ? _._orientation[2] : i, typeof f > "u")
          if (typeof r == "number")
            _._orientation = [r, l, i];
          else
            return _._orientation;
        for (var w = _._getSoundIds(f), p = 0; p < w.length; p++) {
          var d = _._soundById(w[p]);
          if (d)
            if (typeof r == "number")
              d._orientation = [r, l, i], d._node && (d._panner || (d._pos || (d._pos = _._pos || [0, 0, -0.5]), m(d, "spatial")), typeof d._panner.orientationX < "u" ? (d._panner.orientationX.setValueAtTime(r, Howler.ctx.currentTime), d._panner.orientationY.setValueAtTime(l, Howler.ctx.currentTime), d._panner.orientationZ.setValueAtTime(i, Howler.ctx.currentTime)) : d._panner.setOrientation(r, l, i)), _._emit("orientation", d._id);
            else
              return d._orientation;
        }
        return _;
      }, Howl.prototype.pannerAttr = function() {
        var r = this, l = arguments, i, f, _;
        if (!r._webAudio)
          return r;
        if (l.length === 0)
          return r._pannerAttr;
        if (l.length === 1)
          if (typeof l[0] == "object")
            i = l[0], typeof f > "u" && (i.pannerAttr || (i.pannerAttr = {
              coneInnerAngle: i.coneInnerAngle,
              coneOuterAngle: i.coneOuterAngle,
              coneOuterGain: i.coneOuterGain,
              distanceModel: i.distanceModel,
              maxDistance: i.maxDistance,
              refDistance: i.refDistance,
              rolloffFactor: i.rolloffFactor,
              panningModel: i.panningModel
            }), r._pannerAttr = {
              coneInnerAngle: typeof i.pannerAttr.coneInnerAngle < "u" ? i.pannerAttr.coneInnerAngle : r._coneInnerAngle,
              coneOuterAngle: typeof i.pannerAttr.coneOuterAngle < "u" ? i.pannerAttr.coneOuterAngle : r._coneOuterAngle,
              coneOuterGain: typeof i.pannerAttr.coneOuterGain < "u" ? i.pannerAttr.coneOuterGain : r._coneOuterGain,
              distanceModel: typeof i.pannerAttr.distanceModel < "u" ? i.pannerAttr.distanceModel : r._distanceModel,
              maxDistance: typeof i.pannerAttr.maxDistance < "u" ? i.pannerAttr.maxDistance : r._maxDistance,
              refDistance: typeof i.pannerAttr.refDistance < "u" ? i.pannerAttr.refDistance : r._refDistance,
              rolloffFactor: typeof i.pannerAttr.rolloffFactor < "u" ? i.pannerAttr.rolloffFactor : r._rolloffFactor,
              panningModel: typeof i.pannerAttr.panningModel < "u" ? i.pannerAttr.panningModel : r._panningModel
            });
          else
            return _ = r._soundById(parseInt(l[0], 10)), _ ? _._pannerAttr : r._pannerAttr;
        else l.length === 2 && (i = l[0], f = parseInt(l[1], 10));
        for (var w = r._getSoundIds(f), p = 0; p < w.length; p++)
          if (_ = r._soundById(w[p]), _) {
            var d = _._pannerAttr;
            d = {
              coneInnerAngle: typeof i.coneInnerAngle < "u" ? i.coneInnerAngle : d.coneInnerAngle,
              coneOuterAngle: typeof i.coneOuterAngle < "u" ? i.coneOuterAngle : d.coneOuterAngle,
              coneOuterGain: typeof i.coneOuterGain < "u" ? i.coneOuterGain : d.coneOuterGain,
              distanceModel: typeof i.distanceModel < "u" ? i.distanceModel : d.distanceModel,
              maxDistance: typeof i.maxDistance < "u" ? i.maxDistance : d.maxDistance,
              refDistance: typeof i.refDistance < "u" ? i.refDistance : d.refDistance,
              rolloffFactor: typeof i.rolloffFactor < "u" ? i.rolloffFactor : d.rolloffFactor,
              panningModel: typeof i.panningModel < "u" ? i.panningModel : d.panningModel
            };
            var A = _._panner;
            A || (_._pos || (_._pos = r._pos || [0, 0, -0.5]), m(_, "spatial"), A = _._panner), A.coneInnerAngle = d.coneInnerAngle, A.coneOuterAngle = d.coneOuterAngle, A.coneOuterGain = d.coneOuterGain, A.distanceModel = d.distanceModel, A.maxDistance = d.maxDistance, A.refDistance = d.refDistance, A.rolloffFactor = d.rolloffFactor, A.panningModel = d.panningModel;
          }
        return r;
      }, Sound.prototype.init = /* @__PURE__ */ function(r) {
        return function() {
          var l = this, i = l._parent;
          l._orientation = i._orientation, l._stereo = i._stereo, l._pos = i._pos, l._pannerAttr = i._pannerAttr, r.call(this), l._stereo ? i.stereo(l._stereo) : l._pos && i.pos(l._pos[0], l._pos[1], l._pos[2], l._id);
        };
      }(Sound.prototype.init), Sound.prototype.reset = /* @__PURE__ */ function(r) {
        return function() {
          var l = this, i = l._parent;
          return l._orientation = i._orientation, l._stereo = i._stereo, l._pos = i._pos, l._pannerAttr = i._pannerAttr, l._stereo ? i.stereo(l._stereo) : l._pos ? i.pos(l._pos[0], l._pos[1], l._pos[2], l._id) : l._panner && (l._panner.disconnect(0), l._panner = void 0, i._refreshBuffer(l)), r.call(this);
        };
      }(Sound.prototype.reset);
      var m = function(r, l) {
        l = l || "spatial", l === "spatial" ? (r._panner = Howler.ctx.createPanner(), r._panner.coneInnerAngle = r._pannerAttr.coneInnerAngle, r._panner.coneOuterAngle = r._pannerAttr.coneOuterAngle, r._panner.coneOuterGain = r._pannerAttr.coneOuterGain, r._panner.distanceModel = r._pannerAttr.distanceModel, r._panner.maxDistance = r._pannerAttr.maxDistance, r._panner.refDistance = r._pannerAttr.refDistance, r._panner.rolloffFactor = r._pannerAttr.rolloffFactor, r._panner.panningModel = r._pannerAttr.panningModel, typeof r._panner.positionX < "u" ? (r._panner.positionX.setValueAtTime(r._pos[0], Howler.ctx.currentTime), r._panner.positionY.setValueAtTime(r._pos[1], Howler.ctx.currentTime), r._panner.positionZ.setValueAtTime(r._pos[2], Howler.ctx.currentTime)) : r._panner.setPosition(r._pos[0], r._pos[1], r._pos[2]), typeof r._panner.orientationX < "u" ? (r._panner.orientationX.setValueAtTime(r._orientation[0], Howler.ctx.currentTime), r._panner.orientationY.setValueAtTime(r._orientation[1], Howler.ctx.currentTime), r._panner.orientationZ.setValueAtTime(r._orientation[2], Howler.ctx.currentTime)) : r._panner.setOrientation(r._orientation[0], r._orientation[1], r._orientation[2])) : (r._panner = Howler.ctx.createStereoPanner(), r._panner.pan.setValueAtTime(r._stereo, Howler.ctx.currentTime)), r._panner.connect(r._node), r._paused || r._parent.pause(r._id, !0).play(r._id, !0);
      };
    })();
  }(L)), L;
}
var D = z();
const v = {
  elementId: null,
  player: {
    instances: {
      beach: null,
      birds: null,
      wind: null,
      thunder: null,
      campfire: null,
      rain: null
    },
    sound: null,
    volume: null
  },
  playlist: {
    beach: "https://assets.learnosity.com/learnosity_toolkit/whitenoise/beach.mp3",
    birds: "https://assets.learnosity.com/learnosity_toolkit/whitenoise/birds.mp3",
    wind: "https://assets.learnosity.com/learnosity_toolkit/whitenoise/wind.mp3",
    thunder: "https://assets.learnosity.com/learnosity_toolkit/whitenoise/thunder.mp3",
    campfire: "https://assets.learnosity.com/learnosity_toolkit/whitenoise/campfire.mp3",
    rain: "https://assets.learnosity.com/learnosity_toolkit/whitenoise/rain.mp3"
  },
  queryRoot: document,
  renderedCss: !1
};
function N(y, m) {
  v.elementId = y || null, v.queryRoot = m || document, v.renderedCss || K();
  try {
    V().on("button:btn-whitenoise:clicked", () => {
      G();
    });
  } catch (r) {
    r instanceof TypeError || H.error("Error with white noise player:", r);
  }
}
function G() {
  const y = j();
  if (v.elementId && !v.shadowRoot) {
    const m = v.queryRoot.querySelector(`#${v.elementId}`);
    if (m)
      m.innerHTML = y;
    else {
      H.error(`Element id '${v.elementId}' not found, could not render player.`);
      return;
    }
  } else if (v.elementId && v.queryRoot !== document) {
    const m = v.queryRoot.querySelector(`#${v.elementId}`);
    if (m)
      m.innerHTML = y;
    else {
      H.error(`Shadow root element id '${v.elementId}' not found, could not render player.`);
      return;
    }
  } else
    X({
      header: "White noise player",
      body: y,
      buttons: [
        {
          button_id: "dialog_btn_whitenoise_player",
          label: "Close",
          is_primary: !1
        }
      ]
    });
  setTimeout(() => {
    const m = v.queryRoot.querySelectorAll(".lt__controls-sound"), r = v.queryRoot.querySelector("#ld-volume");
    m.forEach((l) => {
      l.addEventListener("keydown", (i) => {
        (i.key === " " || i.key === "Enter") && (i.preventDefault(), l.click());
      }), l.addEventListener("click", (i) => {
        i.preventDefault(), Q(l);
      });
    }), v.player.sound && q(v.player.sound), r.value = v.player.volume || 1, F(), r.addEventListener("input", () => {
      F();
    });
  }, 500);
  try {
    V().on("button:dialog_btn_whitenoise_player:clicked", () => {
      W();
    });
  } catch (m) {
    m instanceof TypeError || H.error("Error with white noise player:", m);
  }
}
function Q(y) {
  const m = y.getAttribute("data-lt-sound"), r = v.queryRoot.querySelector(`[data-lt-sound="${m}"]`);
  v.player.sound && E(v.player.sound), r.classList.contains("lt__sound-active") ? E(m) : (v.player.instances[m] || Y(m), v.player.sound = m, Z(m)), q(m);
}
function Y(y) {
  v.player.instances[y] = new D.Howl({
    src: [v.playlist[y]],
    html5: !0,
    loop: !0
  });
}
function Z(y) {
  v.player.instances[y].play();
}
function E(y) {
  v.player.instances[y].stop();
}
function F() {
  const y = v.queryRoot.querySelector("#ld-volume"), m = v.queryRoot.querySelector("#ld-volume-value"), r = y.value;
  v.player.volume = r, D.Howler.volume(r), m.innerHTML = r * 100;
}
function q(y) {
  v.queryRoot.querySelectorAll(".lt__controls-sound").forEach((r) => {
    r.getAttribute("data-lt-sound") === y && !r.classList.contains("lt__sound-active") ? (r.classList.add("lt__sound-active"), r.focus(), r.setAttribute("aria-pressed", "true")) : (r.classList.remove("lt__sound-active"), r.setAttribute("aria-pressed", "false"));
  });
}
function j() {
  return `<div class="lt__player">
    <div class="lt__meta">
        <p id="lt__player-instructions" class="sr-only">Choose a sound from the list below. Click to play or pause, use the slider at the bottom to control the volume level.</p>
        <ul aria-labelledby="lt__player-instructions">
            <li><button class="lt__controls-sound" data-lt-sound="beach" aria-pressed="false" aria-label="Click to play or pause beach sounds"><svg role="img" aria-label="Beach" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z" /></svg><span class="lt__sound-label">Beach</span></button></li>
            <li><button class="lt__controls-sound" data-lt-sound="birds" aria-pressed="false" aria-label="Click to play or pause birds sounds"><svg role="img" aria-label="Birds" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160.8 96.5c14 17 31 30.9 49.5 42.2c25.9 15.8 53.7 25.9 77.7 31.6V138.8C265.8 108.5 250 71.5 248.6 28c-.4-11.3-7.5-21.5-18.4-24.4c-7.6-2-15.8-.2-21 5.8c-13.3 15.4-32.7 44.6-48.4 87.2zM320 144v30.6l0 0v1.3l0 0 0 32.1c-60.8-5.1-185-43.8-219.3-157.2C97.4 40 87.9 32 76.6 32c-7.9 0-15.3 3.9-18.8 11C46.8 65.9 32 112.1 32 176c0 116.9 80.1 180.5 118.4 202.8L11.8 416.6C6.7 418 2.6 421.8 .9 426.8s-.8 10.6 2.3 14.8C21.7 466.2 77.3 512 160 512c3.6 0 7.2-1.2 10-3.5L245.6 448H320c88.4 0 160-71.6 160-160V128l29.9-44.9c1.3-2 2.1-4.4 2.1-6.8c0-6.8-5.5-12.3-12.3-12.3H400c-44.2 0-80 35.8-80 80zm80-16a16 16 0 1 1 0 32 16 16 0 1 1 0-32z" /></svg><span class="lt__sound-label">Birds</span></button></li>
            <li><button class="lt__controls-sound" data-lt-sound="campfire" aria-pressed="false" aria-label="Click to play or pause campfire sounds"><svg role="img" aria-label="Campfire" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z" /></svg><span class="lt__sound-label">Campfire</span></button></li>
            <li><button class="lt__controls-sound" data-lt-sound="rain" aria-pressed="false" aria-label="Click to play or pause rain sounds"><svg role="img" aria-label="Rain" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zm-6.8 52c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L89.2 372zm160 0c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L249.2 372zm124.9 64.6L409.2 372c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3z" /></svg><span class="lt__sound-label">Rain</span></button></li>
            <li><button class="lt__controls-sound" data-lt-sound="thunder" aria-pressed="false" aria-label="Click to play or pause thunder sounds"><svg role="img" aria-label="Thunder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 224c0 53 43 96 96 96h47.2L290 202.5c17.6-14.1 42.6-14 60.2 .2s22.8 38.6 12.8 58.8L333.7 320H352h64c53 0 96-43 96-96s-43-96-96-96c-.5 0-1.1 0-1.6 0c1.1-5.2 1.6-10.5 1.6-16c0-44.2-35.8-80-80-80c-24.3 0-46.1 10.9-60.8 28C256.5 24.3 219.1 0 176 0C114.1 0 64 50.1 64 112c0 7.1 .7 14.1 1.9 20.8C27.6 145.4 0 181.5 0 224zm330.1 3.6c-5.8-4.7-14.2-4.7-20.1-.1l-160 128c-5.3 4.2-7.4 11.4-5.1 17.8s8.3 10.7 15.1 10.7h70.1L177.7 488.8c-3.4 6.7-1.6 14.9 4.3 19.6s14.2 4.7 20.1 .1l160-128c5.3-4.2 7.4-11.4 5.1-17.8s-8.3-10.7-15.1-10.7H281.9l52.4-104.8c3.4-6.7 1.6-14.9-4.2-19.6z" /></svg><span class="lt__sound-label">Thunder</span></button></li>
            <li><button class="lt__controls-sound" data-lt-sound="wind" aria-pressed="false" aria-label="Click to play or pause wind sounds"><svg role="img" aria-label="Wind" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg><span class="lt__sound-label">Wind</span></button></li>
        </ul>
    </div>
    <div class="lt__toolbar">
        <div class="lt__control-wrapper">
            <label for="ld-volume">
                Volume (<span id="ld-volume-value">100</span>%)
            </label>
            <svg role="img" aria-label="Move the slider to the left to reduce volume" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 64c0-12.6-7.4-24-18.9-29.2s-25-3.1-34.4 5.3L131.8 160H64c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64h67.8L266.7 471.9c9.4 8.4 22.9 10.4 34.4 5.3S320 460.6 320 448V64z"/></svg>
            <input type="range" id="ld-volume" min="0" max="1.0" value="1.0" step="0.1" class="lt__controls-volume slider">
            <svg role="img" aria-label="Move the slider to the right to increase volume" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>
        </div>
    </div>
</div>`;
}
function K() {
  let y = ":root";
  v.queryRoot !== document && (y = ":host");
  const m = document.createElement("style");
  m.setAttribute("data-style", "LT White Noise");
  const r = `
/* Learnosity white noise player styles */
${y} {
    --lt-wn-border: #888888;
    --lt-wn-border-radius: 10px;
    --lt-wn-color: #333333;
    --lt-wn-svg-size: 4rem;
    --lt-wn-control-svg-size: 1.5rem;
    --lt-wn-range-size: 15rem;
    --lt-wn-min-height: 19rem;
}

@container (max-width: 300px) {
    .lt__player {
        min-height: var(--lt-wn-min-height);
        :is(svg) {
            --lt-wn-svg-size: 3rem;
        }
        .lt__control-wrapper {
            :is(svg) {
                --lt-wn-control-svg-size: 1rem;
            }
            input[type="range"] {
                --lt-wn-range-size: 10rem;
            }
        }
    }
}

.lt__player {
    container-type: size;
    background-color: #fff;
    width: 100%;
    max-width: 30rem;
    min-height: var(--lt-wn-min-height);
    border: 1px solid #dddddd;
    border-radius: var(--lt-wn-border-radius);
    padding: 1rem;
    filter: drop-shadow(4px 5px 7px #8d8d8d);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: var(--lt-wn-color);
    margin: 0 auto;
}
.lt__player svg {
    width: var(--lt-wn-svg-size);
    height: var(--lt-wn-svg-size);
    display: inline;
}
.lt__meta ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    list-style: none;
    text-align: center;
    margin: 0;
    padding: 0;
}
.lt__meta ul li {
    box-sizing: border-box;
    border-radius: var(--lt-wn-border-radius);
    border: 1px solid var(--lt-wn-border);
    margin: 0.3rem;

    &:hover {
        background-color: #f2f4f5;
    }
}
.lt__meta ul li button {
    display: block;
    text-decoration: none;
    border-radius: inherit;
    width: 100%;
    border: none;
    background: none;

    &:hover,
    &:focus {
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
        background-color: #f2f4f5;
    }

    &:active {
        box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
    }
}
.lt__meta ul li button.lt__sound-active {
    box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
    background: #efefef;
}
.lt__meta ul li svg {
    padding: 1rem 1rem 0.3rem 1rem;
    vertical-align: middle;
}
.lt__control-wrapper svg {
    width: var(--lt-wn-control-svg-size);
}
.lt__control-wrapper svg:last-child {
    position: relative;
    left: 0.6rem;
}
.lt__sound-label {
    display: block;
    padding-bottom: 0.7rem;
}
.lt__toolbar {
    margin-top: 0.5rem;
    text-align: center;
}
.lt__control-wrapper label {
    text-align: center;
    padding-bottom: 0;
    margin-bottom: 0;
    display: block;
    position: relative;
    top: 10px;
}
.lt__control-wrapper button {
    background: none;
    border: none;
    cursor: pointer;
}
input[type="range"] {
   -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: var(--lt-wn-range-size);
}
/* Removes default focus */
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
   background-color: #01243d;
   border-radius: 0.5rem;
   height: 0.5rem;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
   appearance: none;
   margin-top: -12px;
   background-color: #fff;
   border: 2px solid #01243d;
   height: 2rem;
   width: 1rem;
}
input[type="range"]:focus::-webkit-slider-thumb {
  border: 1px solid #01243d;
  outline: 3px solid #01243d;
  outline-offset: 0.125rem;
}
input[type="range"]::-moz-range-track {
   background-color: #01243d;
   border-radius: 0.5rem;
   height: 0.5rem;
}
input[type="range"]::-moz-range-thumb {
   border: none;
   border-radius: 0;
   border: 1px solid #01243d;
   background-color: #fff;
   height: 2rem;
   width: 1rem;
}
input[type="range"]:focus::-moz-range-thumb {
  border: 1px solid #01243d;
  outline: 3px solid #01243d;
  outline-offset: 0.125rem;
}

@media (max-width: 400px) {
    .lt__meta ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    input[type="range"] {
        width: 10rem;
    }
}

.lt__whitenoise-player-icon::before {
    content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80V384 336 288C0 146.6 114.6 32 256 32s256 114.6 256 256v48 48 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z"/></svg>');
    width: 16px;
    color: var(--lt-wn-color);
    margin-top: 0;
    font-size: 16px;
    -webkit-transition: color .2s;
    transition: color .2s;
    -webkit-font-smoothing: antialiased;
}
`;
  m.textContent = r, v.queryRoot === document ? document.head.append(m) : v.queryRoot.appendChild(m), v.renderedCss = !0;
}
const re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  launchPlayer: G,
  run: N
}, Symbol.toStringTag, { value: "Module" }));
export {
  G as l,
  N as r,
  re as w
};
