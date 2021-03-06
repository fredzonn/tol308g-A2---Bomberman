// ======================
// ANIMATING SPRITE STUFF
// ======================

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function AnimatingSprite(sx, sy, width, height, image) {
    this.sx = sx;
    this.sy = sy;
    this.width = width;
    this.height = height;
    this.image = image;
    this.scale = 2;
}

AnimatingSprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image,
                  this.sx, this.sy, this.width, this.height,
                  x, y, this.width, this.height);
};

AnimatingSprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image, this.sx, this.sy, this.width, this.height,
                  -w/2, -h/2, this.width, this.width);
    
    ctx.restore();
};  

AnimatingSprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

AnimatingSprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};
