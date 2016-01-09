/// <reference path="../typings/webfontloader/webfontloader.d.ts"/>
/// <reference path="../typings/canvasScreenshot/settings.d.ts"/>

declare var RSVP: any;
declare module "RSVP" {
    export = RSVP;
}

class canvasScreenshot {
    private defaultTimeout = 1000;
    private defaultY = 60;
    private defaultMetaYLift = 5;
    private padding = 26;
    private paddingBeforeSignature = 20;
    private x = 0;
    private y = 0;
    private maxWidth = 600;
    private lineHeight = 20;
    private canvas: HTMLCanvasElement = null;
    private context: CanvasRenderingContext2D = null;
    private canvasId = 'screenshot';
    private signature = 'Created with Sikher';
    private logo = 'data:image/png;base64,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';
    private deferred = RSVP.defer();
    private deferred2 = RSVP.defer();

    constructor(
        private settings: CanvasScreenshotSettings
    ) {
        WebFont.load({
            timeout: this.settings.timeout? this.settings.timeout : this.defaultTimeout,
            custom: {
                families: this.settings.families || ['GurbaniAkhar'],
                urls: this.settings.urls
            },
            active: () => this.settings.activeCallback ? this.settings.activeCallback() : this.activeCallback(),
            inactive: () => this.settings.inactiveCallback ? this.settings.inactiveCallback() : this.inactiveCallback()
        });
        return this.deferred.promise;
    }

    private activeCallback() {
        if (!<HTMLCanvasElement>document.getElementById(this.canvasId)) {
            var canvas = document.createElement('canvas');
            canvas.id = this.canvasId;
            document.body.appendChild(canvas);
        }
        
        this.canvas = <HTMLCanvasElement>document.getElementById(this.canvasId);
        this.canvas.width = this.maxWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');

        // Set of operations for drawing one image
        this.reset();
        this.y = this.lineHeight;
        this.drawWithData().then(() => {
            this.deferred2 = RSVP.defer();
            this.canvas.height = this.y;
            this.y = this.lineHeight;
            this.drawWithData().then(() => {
                this.deferred.resolve(this.canvas.toDataURL());
            });
        });
    }

    private inactiveCallback() {
        console.warn('No fonts could be loaded');
        return this.deferred.reject();
    }

    private drawWithData() {
        this.settings.data
            .map((data, i, arr)=> this.draw(data, i, arr));
        return this.deferred2.promise;
    }

    private draw(data, i, arr) {
        if (data.gurmukhi) {
            this.context.font = '20px GurbaniAkhar';
            this.context.fillStyle = '#268bd2';
            this.wrapText(data.gurmukhi, this.x, this.y);
        }
        if (data.translation) {
            this.context.font = '18px resetthefont';
            this.context.fillStyle = '#b58900';
            this.wrapText(data.translation, this.x, this.y);
        }
        if (data.transliteration) {
            this.context.font = '18px resetthefont';
            this.context.fillStyle = '#93a1a1';
            this.wrapText(data.transliteration, this.x, this.y);
        }
        if (i === arr.length - 1 && data.scripture && data.page) {
            this.y += this.paddingBeforeSignature;
            this.context.font = 'italic 16px resetthefont';
            this.context.fillStyle = '#93a1a1';
            this.drawMetadata(this.signature + ' - ' + 'Page ' + data.page + ' - ' + this.calcScripture(data.scripture));
            var img = new Image();
            img.src = this.logo;
            img.onload = () => {
                this.context.drawImage(img,this.canvas.width - img.width,this.canvas.height - img.height);
                this.deferred2.resolve();
            }
        }
    }
    
    private calcScripture(str) {
        var scriptures = {
            'sggs':'Guru Granth Sahib',
            'bgv' : 'Bhai Gurdas Vaaran',
            'kbg' : 'Bhai Gurdas Kabit Savaiye',
            'bnl' : 'Bhai Nand Lal Bani',
            'dgs' : 'Dasam Granth Sahib',
            'misc' : 'Amrit Kirtan'
        }
        
        return scriptures[str] || '';
    }

    private drawMetadata(meta) {
        var metrics = this.context.measureText(meta);
        var x = 0;
        var y = this.canvas.height - this.defaultMetaYLift;
        this.context.fillText(meta, x, y);
    }

    private wrapText(text, x, y) {
      this.y += this.padding;
      var words = text.split(' ');
      var line = '';
    
      for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = this.context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > this.maxWidth && n > 0) {
          this.context.fillText(line, x, y);
          line = words[n] + ' ';
          y += this.lineHeight;
          this.y += this.lineHeight;
        }
        else {
          line = testLine;
        }
      }
      this.context.fillText(line, x, y);
    }

    canvasToDataUrl() {
        return this.canvas.toDataURL();
    }

    private openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
    
    private reset() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}