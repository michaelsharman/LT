import * as app from '../../../../core/app';
import * as player from '../../../../core/player';
import logger from '../../../../../utils/logger';
import { Howl, Howler } from 'howler';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Renders an audio player that the end-user can use
 * to play white noise sounds. Helps for some users
 * with focus and concentration.
 *
 * By default the player renders inside a custom dialog
 * from Items API. This is the simplest set up, just call
 * `run()` and add something like the following to your
 * Items API config object (the essential piece is the
 * custom button):
 *
 * ```
 * {
 *     "config": {
 *         "regions": "main",
 *         "region_overrides": {
 *             "right": [
 *                 {
 *                     "type": "save_button"
 *                 },
 *                 {
 *                     "type": "fullscreen_button"
 *                 },
 *                 {
 *                     "type": "reviewscreen_button"
 *                 },
 *                 {
 *                     "type": "accessibility_button"
 *                 },
 *                 {
 *                     "type": "flagitem_button"
 *                 },
 *                 {
 *                     "type": "custom_button",
 *                     "options": {
 *                         "name": "btn-whitenoise",
 *                         "label": "White noise player",
 *                         "icon_class": "lt__whitenoise-player-icon"
 *                     }
 *                 },
 *                 {
 *                     "type": "masking_button"
 *                 }
 *             ]
 *         }
 *     }
 * }
 * ```
 *
 * This will render a button in the vertical toolbar of the player with a headphones
 * icon. Click this and the player will launch (see below).
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/whitenoise.gif" alt="" width="900"></p>
 *
 * If you want to render the player inside a custom element, pass an `id` to
 * `launchPlayer(id)` after calling `run()`. This will render the player
 * inside an element of your choice. You will be responsible for showing/hiding
 * the player, or just leave it always visible.
 *
 * ```
 * <div id="player-wrapper"></div>
 * <div id="learnosity_assess"></div>
 *
 * <script>
 *   LT.init(app);
 *   LT.extensions.whiteNoise.run();
 *
 *   // Trigger this on a click event or anything defining when
 *   // you want to load the white noise player
 *   LT.extensions.whiteNoise.launchPlayer('player-wrapper');
 * </script>
 * ```
 * @module Extensions/Assessment/whiteNoise
 */

const state = {
    elementId: null,
    player: {
        instances: {
            beach: null,
            birds: null,
            wind: null,
            thunder: null,
            campfire: null,
            rain: null,
        },
        sound: null,
        volume: null,
    },
    playlist: {
        beach: 'https://assets.learnosity.com/learnosity_toolkit/whitenoise/beach.mp3',
        birds: 'https://assets.learnosity.com/learnosity_toolkit/whitenoise/birds.mp3',
        wind: 'https://assets.learnosity.com/learnosity_toolkit/whitenoise/wind.mp3',
        thunder: 'https://assets.learnosity.com/learnosity_toolkit/whitenoise/thunder.mp3',
        campfire: 'https://assets.learnosity.com/learnosity_toolkit/whitenoise/campfire.mp3',
        rain: 'https://assets.learnosity.com/learnosity_toolkit/whitenoise/rain.mp3',
    },
    queryRoot: document,
    renderedCss: false,
};

/**
 * Sets up the white noise audio player.
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.whiteNoise.run();
 * @since 2.7.0
 * @param {string=} id Optional id of an element, or element, to render the player into
 * @param {object=} shadowRoot Optional A shadow root to render the player into
 */
export function run(id, shadowRoot) {
    state.elementId = id || null;
    state.queryRoot = shadowRoot || document;

    if (!state.renderedCss) injectCSS();

    // Listener for an Items API custom button
    app.assessApp().on('button:btn-whitenoise:clicked', () => {
        launchPlayer();
    });
}

/**
 * Launches the white noise audio player. Defaults to rendering inside an
 * Items API custom dialog, in which case you never need to call this
 * method directly.
 *

 * @since 2.7.0
 */
export function launchPlayer() {
    const content = playerTemplate();

    if (state.elementId && !state.shadowRoot) {
        const customWrapper = state.queryRoot.querySelector(`#${state.elementId}`);
        if (customWrapper) {
            customWrapper.innerHTML = content;
        } else {
            logger.error(`Element id '${state.elementId}' not found, could not render player.`);
            return;
        }
    } else if (state.elementId && state.queryRoot !== document) {
        const el = state.queryRoot.querySelector(`#${state.elementId}`);
        console.log(el);

        if (el) {
            el.innerHTML = content;
        } else {
            logger.error(`Shadow root element id '${state.elementId}' not found, could not render player.`);
            return;
        }
    } else {
        player.dialog({
            header: 'White noise player',
            body: content,
            buttons: [
                {
                    button_id: 'dialog_btn_whitenoise_player',
                    label: 'Close',
                    is_primary: false,
                },
            ],
        });
    }

    setTimeout(() => {
        const elSounds = state.queryRoot.querySelectorAll('.lt__controls-sound');
        const elVolume = state.queryRoot.querySelector(`#ld-volume`);

        elSounds.forEach(el => {
            el.addEventListener('keydown', event => {
                if (event.key === ' ' || event.key === 'Enter') {
                    event.preventDefault();
                    el.click();
                }
            });
            el.addEventListener('click', event => {
                event.preventDefault();
                actionTriggered(el);
            });
        });

        if (state.player.sound) setSoundsClass(state.player.sound);

        elVolume.value = state.player.volume || 1.0;
        volume();

        elVolume.addEventListener('input', () => {
            volume();
        });
    }, 500);

    // Setup logic to close the dialog
    app.assessApp().on('button:dialog_btn_whitenoise_player:clicked', () => {
        player.hideDialog();
    });
}

/**
 * Detects which sound icon was clicked and whether
 * to play or stop the audio.
 * @param {object} el
 * @since 2.7.0
 * @ignore
 */
function actionTriggered(el) {
    const sound = el.getAttribute('data-lt-sound');
    const targetSound = state.queryRoot.querySelector(`[data-lt-sound="${sound}"]`);

    if (state.player.sound) stop(state.player.sound);

    if (targetSound.classList.contains('lt__sound-active')) {
        stop(sound);
    } else {
        if (!state.player.instances[sound]) {
            initPlayer(sound);
        }
        state.player.sound = sound;
        play(sound);
    }

    setSoundsClass(sound);
}

/**
 * Initialises a Howl instance with the mp3 URI.
 * @param {string} sound
 * @since 2.7.0
 * @ignore
 */
function initPlayer(sound) {
    state.player.instances[sound] = new Howl({
        src: [state.playlist[sound]],
        html5: true,
        loop: true,
    });
}

/**
 * Starts to play a Howl instance.
 * @param {string} sound
 * @since 2.7.0
 * @ignore
 */
function play(sound) {
    state.player.instances[sound].play();
}

/**
 * Stops playing a Howl instance.
 * @param {string} sound
 * @since 2.7.0
 * @ignore
 */
function stop(sound) {
    state.player.instances[sound].stop();
}

/**
 * Adjusts the player volume.
 * @since 2.7.0
 * @ignore
 */
function volume() {
    const elVolume = state.queryRoot.querySelector(`#ld-volume`);
    const elVolumeValue = state.queryRoot.querySelector(`#ld-volume-value`);
    const currentVolume = elVolume.value;

    state.player.volume = currentVolume;
    Howler.volume(currentVolume);
    elVolumeValue.innerHTML = currentVolume * 100;
}

/**
 * Sets the active state on the current sound button.
 * @since 2.7.0
 * @ignore
 */
function setSoundsClass(activeSound) {
    const elSounds = state.queryRoot.querySelectorAll('.lt__controls-sound');

    elSounds.forEach(el => {
        if (el.getAttribute('data-lt-sound') === activeSound && !el.classList.contains('lt__sound-active')) {
            el.classList.add('lt__sound-active');
            el.focus();
            el.setAttribute('aria-pressed', 'true');
        } else {
            el.classList.remove('lt__sound-active');
            el.setAttribute('aria-pressed', 'false');
        }
    });
}

/**
 * The HTML used to render the player.
 * @since 2.7.0
 * @ignore
 */
function playerTemplate() {
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

/**
 * Injects the necessary CSS to the header
 * @since 2.7.0
 * @ignore
 */
function injectCSS() {
    let root = ':root';
    if (state.queryRoot !== document) {
        root = ':host';
    }

    const elStyle = document.createElement('style');
    const css = `
/* Learnosity white noise player styles */
${root} {
    --lt-border: #888888;
    --lt-border-radius: 10px;
    --lt-color: #333333;
}

.lt__player {
    background-color: #fff;
    width: 100%;
    max-width: 30rem;
    border: 1px solid #dddddd;
    border-radius: var(--lt-border-radius);
    padding: 1rem;
    filter: drop-shadow(4px 5px 7px #8d8d8d);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: var(--lt-color);
    margin: 0 auto;
}
.lt__player svg {
    width: 60px;
    height: 60px;
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
    border-radius: var(--lt-border-radius);
    border: 1px solid var(--lt-border);
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
    width: 30px;
}
.lt__control-wrapper svg:last-child {
    position: relative;
    left: 15px;
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
    width: 15rem;
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
    color: var(--lt-color);
    margin-top: 0;
    font-size: 16px;
    -webkit-transition: color .2s;
    transition: color .2s;
    -webkit-font-smoothing: antialiased;
}
`;

    elStyle.textContent = css;

    if (state.queryRoot === document) {
        document.head.append(elStyle);
    } else {
        state.queryRoot.appendChild(elStyle);
    }

    state.renderedCss = true;
}
