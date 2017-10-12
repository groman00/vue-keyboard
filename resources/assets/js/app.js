import Vue from 'vue';

// Components
import key from './components/key';

// Register components
Vue.component('key', key)

// Vue app
const audioContext = new AudioContext();
const app = new Vue({
    el: '#app',
    data: {
        activeNotes: [],
        keyValues: [
            // Hard code the order of keyboard keys for simplicity
            [9, 'C4'],      //  tab
            [49, 'C#4'],    //  1
            [81, 'D4'],     //  q
            [50, 'D#4'],    //  2
            [87, 'E4'],     //  w
            [69, 'F4'],     //  e
            [52, 'F#4'],    //  4
            [82, 'G4'],     //  r
            [53, 'G#4'],    //  5
            [84, 'A4'],     //  t
            [54, 'A#4'],    //  6
            [89, 'B4'],     //  y
            [85, 'C5'],     //  u
            [56, 'C#5'],    //  8pi
            [73, 'D5'],     //  i
            [57, 'D#5'],    //  9
            [79, 'E5'],     //  o
            [80, 'F5'],     //  p
            [189, 'F#5'],   //  -
            [219, 'G5'],    //  [
            [187, 'G#5'],   //  =
            [221, 'A5'],    //  ]
            [8, 'A#5'],     //  del
            [220, 'B5'],    //  \
        ],
        notes: [],
        keyMap: {},
        context: audioContext,
        waveType: 'sine',
        gain: 0,
        pitch: 4,
        maxPitch: 8,
        minPitch: 0,
        gainNode: audioContext.createGain()
    },
    created() {
        this.updateKeyValues();
        this.setupGain();
        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    },
    watch: {
        gain(value) {
            this.gainNode.gain.value = value;
        },
        pitch(toValue, fromValue) {
            const change = (toValue - fromValue)    ;
            let note;
            let octave;

            this.keyValues = this.keyValues.map(keyValue => {
                note = keyValue[1];
                octave = note.charAt(note.length - 1);
                return [keyValue[0], note.replace(octave, parseInt(octave) + change)];
            });
        },
        keyValues() {
            this.updateKeyValues();
        }
    },
    methods: {
        setupGain() {
            this.gain = .75;
            this.gainNode.connect(this.context.destination);
        },
        updateKeyValues() {
            this.activeNotes = [];
            this.$nextTick(() => {
                this.notes = [];
                this.keyValues.forEach((keyValue) => {
                    this.notes.push(keyValue[1]);
                    this.keyMap[keyValue[0]] = keyValue[1];
                });
            });
        },
        keydown(e) {
            const code = e.keyCode;
            const note = this.keyMap[code];
            if (code === 38 && this.pitch !== this.maxPitch) {
                // arrow up raises pitch
                this.pitch = this.pitch + 1;
                return true;
            }
            if (code === 40 && this.pitch !== this.minPitch) {
                // arrow down lowers pitch
                this.pitch = this.pitch - 1;
                return true;
            }
            if (!note) {
                return true;
            }
            e.preventDefault();
            if (!this.activeNotes.includes(note)) {
                console.log('up', note);
                this.activeNotes.push(note)
            }
        },
        keyup({ keyCode }) {
            const note = this.keyMap[keyCode];
            if (!note) {
                return true;
            }
            console.log('removing', note);
            this.activeNotes.splice(this.activeNotes.findIndex(activeNote => activeNote === note), 1);
            return false;
        }
    }
})