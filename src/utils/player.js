import {addSourcePrefix} from './utils'

export class Player {
    constructor(audioPrefix = '', volume = 100, handle = null) {
        this.audio = new Audio()
        //this.audio.preload = 'auto'
        this.audio.type = 'audio/mpeg'
        this.audioPrefix = audioPrefix
        this.addEndHandle(handle)
        this.volume = volume
        this.audio.crossOrigin = 'anonymous'
    }

    set volume(value) {
        if (value < 0 || value > 100) {
            return
        }
        this.audio.volume = value/100
    }

    async play(source) {
        this.audio.src = addSourcePrefix(source, this.audioPrefix)
        console.log(this.audio.src)
        try {
            await this.audio.play()
        } catch (e) {
            console.log(e)
        }
    }

    async continuePlay() {
        if (this.audio.currentSrc !== '') {
            try {
                await this.audio.play()
            } catch (e) {
                console.log(e)
            }
        }
    }

    pause() {
        this.audio.pause()
    }

    stop() {
        this.pause()
        this.audio.currentTime = 0
        this.audio.src = ''
    }

    addEndHandle(handle) {
        if (handle === undefined || handle === null || typeof handle !== 'function') {
            return
        }
        this.audio.addEventListener('ended', handle, false)
    }
}
