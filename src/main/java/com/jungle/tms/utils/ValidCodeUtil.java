package com.jungle.tms.utils;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.font.FontRenderContext;
import java.awt.font.GlyphVector;
import java.awt.image.BufferedImage;
import java.util.Random;

public class ValidCodeUtil {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

	/**
	 * 生成随机字符
	 * @param charset
	 * @param size
	 * @return
	 */
	public static StringBuilder randomChar(String charset, int size) {
		Random random = new Random();
		StringBuilder rand = new StringBuilder();
		int len = charset.length();
		for (int i = 0; i < size; i++) {
			rand.append(charset.charAt(random.nextInt(len)));
		}
		return rand;
	}

	/**
	 * 生成指定校验码图片
	 * 
	 * @param randStr
	 * @return
	 */
	public static BufferedImage buildValidCode(StringBuilder randStr,int width,int height) {
		try {
			BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
			Graphics g = image.getGraphics();
			
			g.setColor(new Color(255,255,225));
			g.fillRect(0,0,width,height);			
			
			Random random = new Random();
			String[] fontNames = { "Times New Roman", "Arial", "Book antiqua", "" };
			for (int i = 0; i < randStr.length(); i++) {
				//设置随机字体
				g.setFont(new Font(fontNames[random.nextInt(3)], Font.ITALIC,height));
				//设置随机颜色
				g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
				//画字符
				g.drawChars(new char[]{randStr.charAt(i)},0,1, 16 * i + random.nextInt(6) + 3, height/* - random.nextInt(2)*/);
			}
			g.dispose();
			//try {
			//	Thread.sleep(100);
			//} catch (Exception ex) {
			//}
			return image;
		} catch (Exception ex) {
			return null;
		}
	}

	public static BufferedImage renderWord(String word, int width, int height)
	{
		int fontSize = 16;//getConfig().getTextProducerFontSize();
		Font[] fonts = new Font[]{new Font("Times New Roman",Font.ITALIC,height),new Font("Arial",Font.BOLD,height),new Font("Book antiqua",Font.HANGING_BASELINE,height)};
		//Color color = Color.black;//getConfig().getTextProducerFontColor();
		//int charSpace = getConfig().getTextProducerCharSpace();
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
		Graphics2D g2D = image.createGraphics();
		g2D.setColor(new Color(255,255,225));
		
		RenderingHints hints = new RenderingHints(
				RenderingHints.KEY_ANTIALIASING,
				RenderingHints.VALUE_ANTIALIAS_ON);
		hints.add(new RenderingHints(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY));
		g2D.setRenderingHints(hints);

		FontRenderContext frc = g2D.getFontRenderContext();
		Random random = new Random();

		int startPosY = (height - fontSize) / 5 + fontSize;

		char[] wordChars = word.toCharArray();
		Font[] chosenFonts = new Font[wordChars.length];
		int [] charWidths = new int[wordChars.length];
		int widthNeeded = 0;
		for (int i = 0; i < wordChars.length; i++)
		{
			chosenFonts[i] = fonts[random.nextInt(fonts.length)];

			char[] charToDraw = new char[]{
				wordChars[i]
			};
			GlyphVector gv = chosenFonts[i].createGlyphVector(frc, charToDraw);
			charWidths[i] = (int)gv.getVisualBounds().getWidth();
			if (i > 0)
			{
				widthNeeded = widthNeeded + 2;
			}
			widthNeeded = widthNeeded + charWidths[i];
		}
		
		int startPosX = (width - widthNeeded) / 2;
		for (int i = 0; i < wordChars.length; i++)
		{
			g2D.setFont(chosenFonts[i]);
			char[] charToDraw = new char[] {
				wordChars[i]
			};
			g2D.drawChars(charToDraw, 0, charToDraw.length, startPosX, startPosY);
			startPosX = startPosX + (int) charWidths[i] + 1;
		}

		return image;
	}
}
