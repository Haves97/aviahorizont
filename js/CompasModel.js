
class CompasModel {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this._scaleMarks = this._getScaleMarks();
        this.moveCompas(-526);
    }

    _getScaleMarks() {
        let stepMarkBig = 42;
        let stepMarkSmall = stepMarkBig / 2; //
        let scaleMarks = [];
        let valMarks = [180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350,
            0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170
        ];
        let k = 10; // используются для более лучшего отображения
        for (let i = 0; i < 36; ++i) {
            scaleMarks.push({});
            let j = scaleMarks.length - 1;
            scaleMarks[j].mark = {};
            scaleMarks[j].mark.x = i * stepMarkBig + k;
            scaleMarks[j].mark.y = 20;
            scaleMarks[j].degree = {};
            scaleMarks[j].degree.y = 35;
            let num = valMarks[i];
            scaleMarks[j].degree.text = String(num);
            scaleMarks[j].degree.x = scaleMarks[j].mark.x - this._adjustShowDegree(num);
            scaleMarks[j].formSize = 'Big';
            scaleMarks.push({});
            j = scaleMarks.length - 1;
            scaleMarks[j].mark = {};
            scaleMarks[j].mark.x = i * stepMarkBig - stepMarkSmall + k;
            scaleMarks[j].mark.y = 10;
            scaleMarks[j].formSize = 'Small';
        }
        return scaleMarks;
    }

    resetScaleMarks() {
        let stepMarkBig = 42;
        let stepMarkSmall = stepMarkBig / 2;
        let k = 10; // используются для более лучшего отображения
        let counter = 0;
        for (let i = 0; i < 36; ++i) {
            this._scaleMarks[counter].mark.x = i * stepMarkBig + k;
            this._scaleMarks[counter].degree.x = this._scaleMarks[counter].mark.x - this._adjustShowDegree(Number(this._scaleMarks[counter].degree.text));
            counter++;
            this._scaleMarks[counter].mark.x = i * stepMarkBig - stepMarkSmall + k;
            counter++;
        }
        this.moveCompas(-526);
    }

    _adjustShowDegree(num) {
        let adjust;
        if (num == 0) {
            adjust = 3;
        } else if (num > 0 && num < 100) {
            adjust = 6;
        } else {
            adjust = 9;
        }
        return adjust;
    }

    drawCompas() {
        this.ctx.save();
        this.ctx.fillStyle = "#808080";
        let widCom = this.canvas.width;
        let hegCom = 50;
        this.ctx.translate(20, 0);
        this.ctx.fillRect(0, 0, widCom, hegCom);

        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "#87CEEB";
        this.ctx.beginPath();
        this.ctx.moveTo(widCom / 2, 20);
        this.ctx.lineTo(widCom / 2, -12);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.lineWidth = 2;
        this.ctx.font = "12px Arial";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.beginPath();
        for (let i = 0; i < this._scaleMarks.length; ++i) {
            this.ctx.moveTo(this._scaleMarks[i].mark.x, 0);
            this.ctx.lineTo(this._scaleMarks[i].mark.x, this._scaleMarks[i].mark.y);
            if (this._scaleMarks[i].formSize == 'Big') {
                this.ctx.fillText(this._scaleMarks[i].degree.text, this._scaleMarks[i].degree.x, this._scaleMarks[i].degree.y);
            }
        }
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();

    }

    moveCompas(degree) {
        for (let i = 0; i < this._scaleMarks.length; ++i) {
            this._scaleMarks[i].mark.x += degree;
            if (this._scaleMarks[i].formSize == 'Big') {
                this._scaleMarks[i].degree.x += degree;
            }
            if (this._scaleMarks[i].mark.x > 1500) {
                this._scaleMarks[i].mark.x = -10;
                if (this._scaleMarks[i].formSize == 'Big') {
                    this._scaleMarks[i].degree.x = this._scaleMarks[i].mark.x - this._adjustShowDegree(Number(this._scaleMarks[i].degree.text));
                }
            } else if (this._scaleMarks[i].mark.x < -1050) {
                this._scaleMarks[i].mark.x = 461;
                if (this._scaleMarks[i].formSize == 'Big') {
                    this._scaleMarks[i].degree.x = this._scaleMarks[i].mark.x - this._adjustShowDegree(Number(this._scaleMarks[i].degree.text));
                }
            }
        }
    }
}

export { CompasModel };