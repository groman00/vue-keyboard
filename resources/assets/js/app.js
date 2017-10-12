import Vue from 'vue';

// Components
import key from './components/key';

// Register components
Vue.component('key', key)

const audioContext = new AudioContext();
const app = new Vue({
    el: '#app',
    data: {
        activeNotes: [],
        context: audioContext,
        waveType: 'sine',
        gain: 0,
        gainNode: audioContext.createGain()
    },
    created() {
        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);

        this.setupGain();

        // const currentTime = ;

        // console.log(currentTime);


    },
    watch: {
        gain(value) {
            this.gainNode.gain.value = value;
        }
    },
    methods: {
        setupGain() {
            this.gain = .75;
            this.gainNode.connect(this.context.destination);
        },
        keydown({ keyCode }) {
            console.log('up', keyCode);
            const code = keyCode.toString();
            if (!this.activeNotes.includes(code)) {
                console.log('adding');
                this.activeNotes.push(code)
            }
            return false;
        },
        keyup({ keyCode }) {
            console.log('removing');
            this.activeNotes.splice(this.activeNotes.findIndex(code => code.toString() === keyCode), 1);
            return false;
        }
    }
})