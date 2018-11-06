class RenderHelper{

	/** draws text at the specified location */
	static DrawText(/**@type {CanvasRenderingContext2D}*/ctx, /**@type {String}*/text, /**@type {rect}*/targetRect, /**@type {TextRenderFormat}*/format = new TextRenderFormat()){
		
		format.SetToContext(ctx);
		
		var textpos = targetRect.center;
		if(format.alignment == TextAlignment.Left)
			textpos.x = targetRect.left;
		else if(format.alignment == TextAlignment.Right)
			textpos.x = targetRect.right;

		if(format.outline)
			ctx.strokeText(text, textpos.x, textpos.y);
		if(format.fill)
			ctx.fillText(text, textpos.x, textpos.y);
	}
}