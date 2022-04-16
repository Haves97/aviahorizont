import { STEP_LINE_TANGAGE } from './constants.js'

class AirhorizontModel {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this._radiusAM = (k) => this.canvas.width / 2 * k;
        this._xCenter = () => this.canvas.width / 2;
        this._yCenter = () => this.canvas.height / 2;
        this._angleMark = [10, 20, 30, 40, 50, 60, 70, 80, 90, 80, 70, 60, 50, 40, 30, 20, 10];
        this._reversEathSkyDisplay = false;
        this.moveMarkAirplaneVal = {
            anglePitch: 0,
            angleRoll: 0,
            eathSkyDisplay: 0,
        };
    }

    resetMoveMarkAirplaneVal() {
        this.moveMarkAirplaneVal.anglePitch = 0;
        this.moveMarkAirplaneVal.angleRoll = 0;
        this.moveMarkAirplaneVal.eathSkyDisplay = 0;
    }

    showAirhorizontModel() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._drawBackgroundCanvas();
        this._drawAirhorizon();
    }

    _drawBackgroundCanvas() {
        let xCenter = this._xCenter();
        let yCenter = this._yCenter();
        let radius = this._radiusAM(0.9);

        this.ctx.beginPath();
        this.ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#808080";
        this.ctx.fill();
    }

    _drawAirhorizon() {
        let xCenter = this._xCenter();
        let yCenter = this._yCenter();
        let radius = this._radiusAM(0.7);

        const regRotate = () => {
            this.ctx.translate(xCenter, yCenter);
            this.ctx.rotate(this.moveMarkAirplaneVal.angleRoll * Math.PI / 180);
        };

        const regClip = () => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#808080";
            this.ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.clip();
        };

        const regFill = () => {
            let gradient = this.ctx.createLinearGradient(0, -this.canvas.height, 0, this.canvas.height);

            gradient.addColorStop(0, '#87CEEB');
            gradient.addColorStop(0.5 + this.moveMarkAirplaneVal.eathSkyDisplay, '#87CEEB');
            gradient.addColorStop(0.5 + this.moveMarkAirplaneVal.eathSkyDisplay, '#a2653e');
            gradient.addColorStop(1, '#a2653e');

            this.ctx.beginPath();
            this.ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        };

        const drawMark = () => {
            this.ctx.font = "17px Arial";
            this.ctx.fillStyle = "#ffffff";
            this.ctx.strokeStyle = "#ffffff";
            this._drawLineMark(0, this.moveMarkAirplaneVal.anglePitch, 0, "zero");
            for (let i = 0; i < this._angleMark.length; ++i) {
                this._drawLineMark(0, this.moveMarkAirplaneVal.anglePitch, i + 1, "lineUpBig");
                this._drawLineMark(0, this.moveMarkAirplaneVal.anglePitch, i + 1, "lineDownBig");
                this._drawLineMark(0, this.moveMarkAirplaneVal.anglePitch, i + 1, "lineUpSmall");
                this._drawLineMark(0, this.moveMarkAirplaneVal.anglePitch, i + 1, "lineDownSmall");
                this._drawAngleMark(0, this.moveMarkAirplaneVal.anglePitch, this._angleMark[i], i + 1, "angleUp");
                this._drawAngleMark(0, this.moveMarkAirplaneVal.anglePitch, this._angleMark[i], i + 1, "angleDown");
            }
        };

        this.ctx.save();
        regRotate();
        regClip();
        regFill();
        drawMark();
        this.ctx.restore();
        this._drawMarkAirplane();
    }

    _drawLineMark(xCenter, yCenter, k, dirSizeLine) {
        let stepX, stepY;
        switch (dirSizeLine) {
            case "lineUpBig":
            case "lineDownBig":
                this.ctx.lineWidth = 3;
                stepX = 50;
                stepY = STEP_LINE_TANGAGE * k;
                break;
            case "lineUpSmall":
            case "lineDownSmall":
                this.ctx.lineWidth = 2;
                stepX = 25;
                stepY = (k == 1 ? STEP_LINE_TANGAGE / 2 : (STEP_LINE_TANGAGE * k) - (STEP_LINE_TANGAGE / 2));
                break;
            case "zero":
                this.ctx.lineWidth = 3;
                stepX = 168; // радиус
                stepY = 0;
                break;
        }
        this.ctx.beginPath();
        if (dirSizeLine == "lineDownBig" || dirSizeLine == "lineDownSmall" || dirSizeLine == "zero") {
            this.ctx.moveTo(xCenter - stepX, yCenter + stepY);
            this.ctx.lineTo(xCenter + stepX, yCenter + stepY);
        } else if (dirSizeLine == "lineUpBig" || dirSizeLine == "lineUpSmall") {
            this.ctx.moveTo(xCenter - stepX, yCenter - stepY);
            this.ctx.lineTo(xCenter + stepX, yCenter - stepY);
        }
        this.ctx.stroke();
        this.ctx.closePath();
    }

    _drawAngleMark(xCenter, yCenter, num, k, dirAngle) {
        switch (dirAngle) {
            case "angleUp":
                this.ctx.fillText(num, xCenter - 80, yCenter - STEP_LINE_TANGAGE * k + 5);
                this.ctx.fillText(num, xCenter + 60, yCenter - STEP_LINE_TANGAGE * k + 5);
                break;
            case "angleDown":
                this.ctx.fillText(num, xCenter - 80, yCenter + STEP_LINE_TANGAGE * k + 5);
                this.ctx.fillText(num, xCenter + 60, yCenter + STEP_LINE_TANGAGE * k + 5);
                break;
        }
    }

    _drawMarkAirplane() {
        let xCenter = this._xCenter();
        let yCenter = this._yCenter();
        this.ctx.save();
        this.ctx.lineWidth = 6;
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.translate(xCenter, yCenter);
        this.ctx.beginPath();
        this.ctx.moveTo(-xCenter / 2, 0);
        this.ctx.lineTo(-xCenter / 2 + 100, 0);
        this.ctx.lineTo(-xCenter / 2 + 100, yCenter * 0.08);
        this.ctx.lineTo(xCenter / 12, yCenter * 0.08);
        this.ctx.lineTo(xCenter / 12, 0);
        this.ctx.lineTo(xCenter / 2, 0);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

    checkBorderUp(isButton = false) {
        if (this.moveMarkAirplaneVal.anglePitch == ((this._angleMark.length - 3) * STEP_LINE_TANGAGE)) {
            this.moveMarkAirplaneVal.anglePitch = -4 * STEP_LINE_TANGAGE;
        }

        if (!this._reversEathSkyDisplay) {
            this.moveMarkAirplaneVal.eathSkyDisplay += !isButton ? 0.000429670000 : 0.000214835;
            if (this.moveMarkAirplaneVal.anglePitch == 414) {
                this._reversEathSkyDisplay = true;
            }
        } else {
            this.moveMarkAirplaneVal.eathSkyDisplay -= !isButton ? 0.000429670000 : 0.000214835;
            if (this.moveMarkAirplaneVal.anglePitch == 0) {
                this._reversEathSkyDisplay = false;
            }
        }


    }

    checkBorderDown(isButton = false) {
        if (this.moveMarkAirplaneVal.anglePitch == ((this._angleMark.length - 3) * -STEP_LINE_TANGAGE)) {
            this.moveMarkAirplaneVal.anglePitch = 4 * STEP_LINE_TANGAGE;
        }

        if (!this._reversEathSkyDisplay) {
            this.moveMarkAirplaneVal.eathSkyDisplay -= !isButton ? 0.000429670000 : 0.000214835;
            if (this.moveMarkAirplaneVal.anglePitch == -414) {
                this._reversEathSkyDisplay = true;
            }
        } else {
            this.moveMarkAirplaneVal.eathSkyDisplay += !isButton ? 0.000429670000 : 0.000214835;
            if (this.moveMarkAirplaneVal.anglePitch == 0) {
                this._reversEathSkyDisplay = false;
            }
        }
    }
}

export { AirhorizontModel };