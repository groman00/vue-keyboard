import { getFrequencyOfNote } from '../lib/helpers' ;

const template =
`
        <div class="key" :class="computedClass">
            <span>{{ note }}</span>
        </div>
`;

export default {
    template: template,
    props: ['context', 'note', 'activeNotes', 'gainNode', 'waveType'],
    data() {
        return {
            oscillator: null,
            isPlaying: false,
            frequency: getFrequencyOfNote(this.note)
        };
    },
    computed: {
        computedClass() {
            return [{ 'active': this.isPlaying}, `key-${this.note.indexOf('#') === -1 ? 'white' : 'black'}`]
        }
    },
    watch: {
        isPlaying(bool) {
            const time = this.context.currentTime;
            if (bool) {
                console.log(`${this.note} starting`);
                this.oscillator = this.context.createOscillator()
                this.oscillator.connect(this.gainNode);
                this.oscillator.type = this.waveType;
                this.oscillator.frequency.value = this.frequency
                this.oscillator.start(time);
                return;
            }
            console.log(`${this.note} stopping`);
            this.oscillator.stop();
        },
        activeNotes(notes) {
            this.isPlaying = notes.includes(this.note);
        }
    }
};
