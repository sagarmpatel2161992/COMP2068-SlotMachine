// button class to create button 
class Button {

    // Private Instance variable
    private _buttonImage: createjs.Bitmap;
    private _x: number;
    private _y: number;

    // constructor for button class which creates buttonimage and adds eventlistner 
    constructor(path: string, x: number, y: number) {
        this._buttonImage = new createjs.Bitmap(path);
        this.setX(x);
        this.setY(y);

        this._buttonImage.x = this._x;
        this._buttonImage.y = this._y;
        this._buttonImage.addEventListener("mouseover", this.mouseOver);
        this._buttonImage.addEventListener("mouseout", this.mouseOut);
    }

    // mouseover function for button which will scale the image by 10%  
    public mouseOver(event: createjs.MouseEvent) {
        event.currentTarget.scaleX = 1.1; // 100% Alpha 
        event.currentTarget.scaleY = 1.1;
    }

    // mouseout function to get real image back
    public mouseOut(event: createjs.MouseEvent) {
        event.currentTarget.scaleX = 1; // 100% Alpha 
        event.currentTarget.scaleY = 1;
    }

    // Getters
    public getImage(): createjs.Bitmap {
        return this._buttonImage;
    }
    public getX(): number {
        return this._x;
    }
    public getY(): number {
        return this._y
    }

    // Setters
    public setX(x: number) {
        this._x = x;
    }
    public setY(y: number) {
        this._y = y;
    }
} 