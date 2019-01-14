///
///	code by Isaiah Smith
///		
///	https://technostalgic.tech  
///	twitter @technostalgicGM
///

class RenderHelper{

	/** draws text at the specified location */
	static DrawText(/**@type {CanvasRenderingContext2D}*/ctx, /**@type {String}*/text, /**@type {rect}*/targetRect, /**@type {TextRenderFormat}*/format = new TextRenderFormat()){
		
		format.SetToContext(ctx);
		
		var textpos = targetRect.center;
		if(format.hAlign == HorizontalTextAlignment.Left)
			textpos.x = targetRect.left;
		else if(format.hAlign == HorizontalTextAlignment.Right)
			textpos.x = targetRect.right;

		var yOff = 0.4;
		if(format.vAlign == VerticalTextAlignment.Top){
			textpos.y = targetRect.top;
			yOff = 0.8;
		}
		else if (format.vAlign == VerticalTextAlignment.Bottom){
			textpos.y = targetRect.bottom;
			yOff = -0.2;
		}

		yOff *= format.size;
		textpos.y += yOff;

		if(format.outline)
			ctx.strokeText(text, textpos.x, textpos.y);
		if(format.fill)
			ctx.fillText(text, textpos.x, textpos.y);
	}

	/** draws the image at the specified position */
	static DrawImage(/**@type {CanvasRenderingContext2D}*/ctx, /**@type {HTMLImageElement}*/img, /**@type {vec2}*/position){
		
		var r = new rect(new vec2(), new vec2(img.width, img.height));
		r.center = position;
		ctx.drawImage(img, r.left, r.top);
	}

	/** draws a portion of the specified image at the specified target rect */
	static DrawSprite(/**@type {CanvasRenderingContext2D}*/ctx, /**@type {HTMLImageElement}*/img, /**@type {rect}*/targetLocation, /**@type {rect}*/ spriteRect){

		if(!spriteRect)
			spriteRect = new rect(vec2.zero, new vec2(img.width, img.height));

		ctx.drawImage(img, 
			spriteRect.left, spriteRect.top, spriteRect.width, spriteRect.height, 
			targetLocation.left, targetLocation.top, targetLocation.width, targetLocation.height );
	}
}