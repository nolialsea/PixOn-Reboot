function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

const PAL = {
	DB32: [
		[0, 0, 0],
		[34, 32, 52],
		[69, 40, 60],
		[102, 57, 49],
		[143, 86, 59],
		[223, 113, 38],
		[217, 160, 102],
		[238, 195, 154],
		[251, 242, 54],
		[153, 229, 80],
		[106, 190, 48],
		[55, 148, 110],
		[75, 105, 47],
		[82, 75, 36],
		[50, 60, 57],
		[63, 63, 116],
		[48, 96, 130],
		[91, 110, 225],
		[99, 155, 255],
		[95, 205, 228],
		[203, 219, 252],
		[255, 255, 255],
		[155, 173, 183],
		[132, 126, 135],
		[105, 106, 106],
		[89, 86, 82],
		[118, 66, 138],
		[172, 50, 50],
		[217, 87, 99],
		[215, 123, 186],
		[143, 151, 74],
		[138, 111, 48],
	],

	ENDESGA32: [
		[190, 74, 47],
		[215, 118, 67],
		[234, 212, 170],
		[228, 166, 114],
		[184, 111, 80],
		[115, 62, 57],
		[62, 39, 49],
		[162, 38, 51],
		[228, 59, 68],
		[247, 118, 34],
		[254, 174, 52],
		[254, 231, 97],
		[99, 199, 77],
		[62, 137, 72],
		[38, 92, 66],
		[25, 60, 62],
		[18, 78, 137],
		[0, 153, 219],
		[44, 232, 245],
		[255, 255, 255],
		[192, 203, 220],
		[139, 155, 180],
		[90, 105, 136],
		[58, 68, 102],
		[38, 43, 68],
		[24, 20, 37],
		[255, 0, 68],
		[104, 56, 108],
		[181, 80, 136],
		[246, 117, 122],
		[232, 183, 150],
		[194, 133, 105],
	],

	ARNE32: [
		[0, 0, 0],
		[73, 60, 43],
		[190, 38, 51],
		[224, 111, 139],
		[164, 100, 34],
		[235, 137, 49],
		[247, 226, 107],
		[255, 255, 255],
		[157, 157, 157],
		[47, 72, 78],
		[27, 38, 50],
		[68, 137, 26],
		[163, 206, 39],
		[0, 87, 132],
		[49, 162, 242],
		[178, 220, 239],
		[52, 42, 151],
		[101, 109, 113],
		[204, 204, 204],
		[115, 41, 48],
		[203, 67, 167],
		[82, 79, 64],
		[173, 157, 51],
		[236, 71, 0],
		[250, 180, 11],
		[17, 94, 51],
		[20, 128, 126],
		[21, 194, 165],
		[34, 90, 246],
		[153, 100, 249],
		[247, 142, 214],
		[244, 185, 144],
	],

	GAMEBOY4: [
		[51, 44, 80],
		[70, 135, 143],
		[148, 227, 68],
		[226, 243, 228],
	],

	TWO_BIT_GRAYSCALE: [
		[0, 0, 0],
		[103, 103, 103],
		[182, 182, 182],
		[255, 255, 255],
	],

	AAP64: [
		[6, 6, 8],
		[20, 16, 19],
		[59, 23, 37],
		[115, 23, 45],
		[180, 32, 42],
		[223, 62, 35],
		[250, 106, 10],
		[249, 163, 27],
		[255, 213, 65],
		[255, 252, 64],
		[214, 242, 100],
		[156, 219, 67],
		[89, 193, 53],
		[20, 160, 46],
		[26, 122, 62],
		[36, 82, 59],
		[18, 32, 32],
		[20, 52, 100],
		[40, 92, 196],
		[36, 159, 222],
		[32, 214, 199],
		[166, 252, 219],
		[255, 255, 255],
		[254, 243, 192],
		[250, 214, 184],
		[245, 160, 151],
		[232, 106, 115],
		[188, 74, 155],
		[121, 58, 128],
		[64, 51, 83],
		[36, 34, 52],
		[34, 28, 26],
		[50, 43, 40],
		[113, 65, 59],
		[187, 117, 71],
		[219, 164, 99],
		[244, 210, 156],
		[218, 224, 234],
		[179, 185, 209],
		[139, 147, 175],
		[109, 117, 141],
		[74, 84, 98],
		[51, 57, 65],
		[66, 36, 51],
		[91, 49, 56],
		[142, 82, 82],
		[186, 117, 106],
		[233, 181, 163],
		[227, 230, 255],
		[185, 191, 251],
		[132, 155, 228],
		[88, 141, 190],
		[71, 125, 133],
		[35, 103, 78],
		[50, 132, 100],
		[93, 175, 141],
		[146, 220, 186],
		[205, 247, 226],
		[228, 210, 170],
		[199, 176, 139],
		[160, 134, 98],
		[121, 103, 85],
		[90, 78, 68],
		[66, 57, 52],
	],

	ARCADE_STANDARD29: [
		[241, 240, 238],
		[255, 77, 77],
		[159, 30, 49],
		[255, 196, 56],
		[240, 108, 0],
		[241, 194, 132],
		[201, 126, 79],
		[151, 63, 63],
		[87, 20, 46],
		[114, 203, 37],
		[35, 133, 49],
		[10, 75, 77],
		[48, 197, 173],
		[47, 126, 131],
		[105, 222, 255],
		[51, 165, 255],
		[50, 89, 226],
		[40, 35, 123],
		[201, 92, 209],
		[108, 52, 157],
		[255, 170, 188],
		[229, 93, 172],
		[23, 25, 27],
		[150, 165, 171],
		[88, 108, 121],
		[42, 55, 71],
		[185, 165, 136],
		[126, 99, 82],
		[65, 47, 47],
	],

	CGA_2_HIGH: [
		[0, 0, 0],
		[255, 85, 85],
		[85, 255, 255],
		[255, 255, 255],
	],

	CGA: [
		[0, 0, 0],
		[85, 85, 85],
		[170, 170, 170],
		[255, 255, 255],
		[0, 0, 170],
		[85, 85, 255],
		[0, 170, 0],
		[85, 255, 85],
		[0, 170, 170],
		[85, 255, 255],
		[170, 0, 0],
		[255, 85, 85],
		[170, 0, 170],
		[255, 85, 255],
		[170, 85, 0],
		[255, 255, 85],
	],

	COMODORE64: [
		[0, 0, 0],
		[98, 98, 98],
		[137, 137, 137],
		[173, 173, 173],
		[255, 255, 255],
		[159, 78, 68],
		[203, 126, 117],
		[109, 84, 18],
		[161, 104, 60],
		[201, 212, 135],
		[154, 226, 155],
		[92, 171, 94],
		[106, 191, 198],
		[136, 126, 203],
		[80, 69, 155],
		[160, 87, 163],
	],

	DAWNBRINGER32: [
		[0, 0, 0],
		[34, 32, 52],
		[69, 40, 60],
		[102, 57, 49],
		[143, 86, 59],
		[223, 113, 38],
		[217, 160, 102],
		[238, 195, 154],
		[251, 242, 54],
		[153, 229, 80],
		[106, 190, 48],
		[55, 148, 110],
		[75, 105, 47],
		[82, 75, 36],
		[50, 60, 57],
		[63, 63, 116],
		[48, 96, 130],
		[91, 110, 225],
		[99, 155, 255],
		[95, 205, 228],
		[203, 219, 252],
		[255, 255, 255],
		[155, 173, 183],
		[132, 126, 135],
		[105, 106, 106],
		[89, 86, 82],
		[118, 66, 138],
		[172, 50, 50],
		[217, 87, 99],
		[215, 123, 186],
		[143, 151, 74],
		[138, 111, 48],
	],

	DB_ISO22: [
		[12, 8, 22],
		[76, 65, 56],
		[112, 80, 58],
		[188, 95, 78],
		[206, 145, 72],
		[228, 218, 108],
		[144, 196, 70],
		[105, 142, 52],
		[77, 97, 60],
		[38, 50, 60],
		[44, 75, 115],
		[60, 115, 115],
		[85, 141, 222],
		[116, 186, 234],
		[240, 250, 255],
		[207, 182, 144],
		[182, 124, 116],
		[132, 90, 120],
		[85, 84, 97],
		[116, 102, 88],
		[107, 123, 137],
		[147, 147, 136],
	],

	GAMEBOY_CHOCOLATE: [
		[255, 228, 194],
		[220, 164, 86],
		[169, 96, 76],
		[66, 41, 54],
	],

	GNOME32: [
		[234, 232, 227],
		[186, 181, 171],
		[128, 125, 116],
		[86, 82, 72],
		[197, 210, 200],
		[131, 166, 127],
		[93, 117, 85],
		[68, 86, 50],
		[224, 182, 175],
		[193, 102, 90],
		[136, 70, 49],
		[102, 56, 34],
		[173, 167, 200],
		[136, 127, 163],
		[98, 91, 129],
		[73, 64, 102],
		[157, 184, 210],
		[117, 144, 174],
		[75, 105, 131],
		[49, 78, 108],
		[239, 224, 205],
		[224, 195, 158],
		[179, 145, 105],
		[130, 102, 71],
		[223, 66, 30],
		[153, 0, 0],
		[238, 214, 128],
		[209, 148, 12],
		[70, 160, 70],
		[38, 119, 38],
		[255, 255, 255],
		[0, 0, 0],
	],

	GRAFXKID_GAMEBOY_POCKET_GRAY: [
		[43, 43, 38],
		[112, 107, 102],
		[168, 159, 148],
		[224, 219, 205],
	],

	KIROKAZ_GAMEBOY: [
		[51, 44, 80],
		[70, 135, 143],
		[148, 227, 68],
		[226, 243, 228],
	],

	LINEAR_COLOR_BASIC: [
		[14, 12, 12],
		[95, 45, 86],
		[153, 57, 112],
		[220, 74, 123],
		[247, 134, 151],
		[159, 41, 78],
		[98, 35, 47],
		[143, 64, 41],
		[197, 96, 37],
		[238, 142, 46],
		[252, 203, 163],
		[218, 78, 56],
		[250, 203, 62],
		[151, 218, 63],
		[75, 167, 71],
		[61, 115, 79],
		[49, 65, 82],
		[65, 112, 137],
		[73, 167, 144],
		[114, 214, 206],
		[86, 152, 204],
		[89, 86, 189],
		[71, 53, 121],
		[129, 86, 170],
		[194, 120, 208],
		[240, 179, 221],
		[253, 247, 237],
		[211, 191, 169],
		[170, 141, 122],
		[119, 92, 85],
		[72, 59, 58],
	],

	LINKS_AWAKENING_SGB: [
		[90, 57, 33],
		[107, 140, 66],
		[123, 198, 123],
		[255, 255, 181],
	],

	MATRIAX8C: [
		[240, 240, 220],
		[250, 200, 0],
		[16, 200, 64],
		[0, 160, 200],
		[210, 64, 64],
		[160, 105, 75],
		[115, 100, 100],
		[16, 24, 32],
	],

	MEGAMAN_V_SGB: [
		[16, 37, 51],
		[66, 103, 142],
		[111, 158, 223],
		[206, 206, 206],
	],

	MICROSOFT_WINDOWS: [
		[0, 0, 0],
		[126, 126, 126],
		[190, 190, 190],
		[255, 255, 255],
		[126, 0, 0],
		[254, 0, 0],
		[4, 126, 0],
		[6, 255, 4],
		[255, 255, 4],
		[126, 126, 0],
		[0, 0, 126],
		[0, 0, 255],
		[126, 0, 126],
		[254, 0, 255],
		[4, 126, 126],
		[6, 255, 255],
	],

	MSX: [
		[0, 0, 0],
		[202, 202, 202],
		[255, 255, 255],
		[183, 94, 81],
		[217, 100, 89],
		[254, 135, 124],
		[202, 193, 94],
		[221, 206, 133],
		[60, 160, 66],
		[64, 182, 74],
		[115, 206, 124],
		[89, 85, 223],
		[126, 117, 240],
		[100, 218, 238],
		[181, 101, 179],
	],

	NINTENDO_ENTERTAINMENT_SYSTEM: [
		[0, 0, 0],
		[252, 252, 252],
		[248, 248, 248],
		[188, 188, 188],
		[124, 124, 124],
		[164, 228, 252],
		[60, 188, 252],
		[0, 120, 248],
		[0, 0, 252],
		[184, 184, 248],
		[104, 136, 252],
		[0, 88, 248],
		[0, 0, 188],
		[216, 184, 248],
		[152, 120, 248],
		[104, 68, 252],
		[68, 40, 188],
		[248, 184, 248],
		[248, 120, 248],
		[216, 0, 204],
		[148, 0, 132],
		[248, 164, 192],
		[248, 88, 152],
		[228, 0, 88],
		[168, 0, 32],
		[240, 208, 176],
		[248, 120, 88],
		[248, 56, 0],
		[168, 16, 0],
		[252, 224, 168],
		[252, 160, 68],
		[228, 92, 16],
		[136, 20, 0],
		[248, 216, 120],
		[248, 184, 0],
		[172, 124, 0],
		[80, 48, 0],
		[216, 248, 120],
		[184, 248, 24],
		[0, 184, 0],
		[0, 120, 0],
		[184, 248, 184],
		[88, 216, 84],
		[0, 168, 0],
		[0, 104, 0],
		[184, 248, 216],
		[88, 248, 152],
		[0, 168, 68],
		[0, 88, 0],
		[0, 252, 252],
		[0, 232, 216],
		[0, 136, 136],
		[0, 64, 88],
		[248, 216, 248],
		[120, 120, 120],
	],

	NINTENDO_GAMEBOY_BGB: [
		[8, 24, 32],
		[52, 104, 86],
		[136, 192, 112],
		[224, 248, 208],
	],

	NINTENDO_SUPER_GAMEBOY: [
		[51, 30, 80],
		[166, 55, 37],
		[214, 142, 73],
		[247, 231, 198],
	],

	OPTIMUM: [
		[0, 0, 0],
		[87, 87, 87],
		[160, 160, 160],
		[255, 255, 255],
		[42, 75, 215],
		[29, 105, 20],
		[129, 74, 25],
		[129, 38, 192],
		[157, 175, 255],
		[129, 197, 122],
		[233, 222, 187],
		[173, 35, 35],
		[41, 208, 208],
		[255, 238, 51],
		[255, 146, 51],
		[255, 205, 243],
	],

	PICO8: [
		[0, 0, 0],
		[95, 87, 80],
		[130, 117, 154],
		[192, 193, 197],
		[255, 240, 231],
		[125, 41, 83],
		[255, 7, 78],
		[255, 118, 166],
		[169, 82, 56],
		[255, 161, 8],
		[254, 235, 44],
		[255, 202, 168],
		[0, 133, 81],
		[0, 227, 57],
		[34, 46, 83],
		[44, 171, 254],
	],

	POKEMON_SGB: [
		[24, 16, 16],
		[132, 115, 156],
		[247, 181, 140],
		[255, 239, 255],
	],

	STARMANCER: [
		[27, 32, 55],
		[41, 51, 98],
		[31, 68, 125],
		[37, 97, 165],
		[42, 129, 203],
		[46, 162, 235],
		[50, 187, 248],
		[29, 24, 38],
		[43, 32, 55],
		[71, 45, 88],
		[105, 60, 129],
		[136, 70, 160],
		[170, 86, 185],
		[222, 115, 223],
		[52, 19, 26],
		[81, 25, 34],
		[120, 32, 41],
		[162, 40, 40],
		[190, 53, 34],
		[233, 69, 37],
		[250, 106, 57],
		[77, 36, 22],
		[128, 66, 39],
		[186, 95, 28],
		[228, 137, 20],
		[234, 178, 8],
		[255, 227, 69],
		[255, 245, 108],
		[10, 35, 31],
		[13, 64, 53],
		[7, 97, 70],
		[10, 128, 87],
		[14, 158, 94],
		[8, 200, 116],
		[8, 231, 123],
		[16, 32, 48],
		[21, 50, 66],
		[18, 76, 93],
		[14, 112, 121],
		[12, 157, 148],
		[18, 203, 175],
		[33, 233, 193],
		[38, 41, 51],
		[64, 65, 76],
		[101, 106, 115],
		[132, 141, 144],
		[168, 176, 179],
		[200, 205, 207],
		[221, 227, 227],
		[9, 7, 17],
		[25, 26, 35],
		[83, 85, 94],
	],

	//TODO
	//PRIO: [],

}

let paletteId = 0
let palettes = []
for (let key in PAL) {
	let pal = PAL[key]
	pal.name = key
    palettes.push(pal)
}

class Palette {
	static get palette (){
		document.title = palettes[paletteId].name
		return palettes[paletteId]
	}
	static get prevPalette (){
		paletteId = clamp(--paletteId, 0, palettes.length-1)
		return Palette.palette
	}
	static get nextPalette (){
		paletteId = clamp(++paletteId, 0, palettes.length-1)
		return Palette.palette
	}
}


export default Palette