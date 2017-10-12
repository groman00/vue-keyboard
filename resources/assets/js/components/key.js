import { getFrequencyOfNote } from '../lib/helpers' ;

export default {
    props: ['context', 'note', 'activeNotes', 'gainNode', 'waveType'],
    data() {
        return {
            oscillator: null,
            isPlaying: false,
            frequency: getFrequencyOfNote('C3')
        };
    },
    template: '<div>hello key</div>',
    // created() {},
    watch: {
        isPlaying(bool) {
            const time = this.context.currentTime;
            if (bool) {
                console.log('starting');
                this.oscillator = this.context.createOscillator()
                this.oscillator.connect(this.gainNode);
                this.oscillator.type = this.waveType;
                this.oscillator.frequency.value = getFrequencyOfNote('C3');
                this.oscillator.start(time);
                return;
            }
            console.log('stopping');
            this.oscillator.stop();
        },
        activeNotes(notes) {
            console.log(notes,notes.includes(this.note), this.note);
            this.isPlaying = notes.includes(this.note);
        }
    }
};
