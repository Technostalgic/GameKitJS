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
}