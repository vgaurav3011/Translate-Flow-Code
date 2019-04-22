const COLOR = new Object();
COLOR.line_block = "black";

const BT_NEW_BLOCK = $("#bt-new-block");
const BT_NEW_CLINK = $("#bt-connect-link");
//const BT_NEW_CBLOCK = $("#bt-connect-block");
const BT_DEL_LINK = $("#bt-delete-link");
const BT_DEL_BLOCK = $("#bt-delete-block");
const BT_GERATE_CODE = $("#bt-geratecode");
const BT_UPDATE_BLOCK = $("#bt-updateblock");
const SUB_MENU_BTICONS = $("#submenu-icons");
const BT_ZOOM_IN = $("#bt-zoom-in");
const BT_ZOOM_OUT = $("#bt-zoom-out");
/*BUTTONS FOR CREATE BLOCKS*/
const BT_NEW_BLOCK_PROCESS = $("#bt-new-process");
const BT_NEW_BLOCK_DECISION = $("#bt-new-decision");
const BT_NEW_BLOCK_INPUT = $("#bt-new-input");
const BT_NEW_BLOCK_OUTPUT = $("#bt-new-output");
const BT_NEW_BLOCK_CONNECT= $("#bt-new-conection");
const BT_NEW_BLOCK_START = $("#bt-new-start");
const BT_NEW_BLOCK_END = $("#bt-new-end");


const canvas = document.getElementById("canv-flow");
const ctx = canvas.getContext("2d");

const MSG_CONTAINER_ERRO = $("#msg-for-user");
const MSG_TEXT_ERRO = $("#text-msg-for-user");
const MSG_TIP_ERRO = $("#tip-msg-for-user");



ef = new EngineFlow();
ef.start();
/*
s = new StartEnd(250,10, ctx, "Start");
p = new Process(200,100, ctx, "numero = 10");
d = new Decision(200,200, ctx, "numero%2 = 0");
p2 = new Process(100,300, ctx, "numero2 = 100");
p3 = new Process(300,300, ctx, "numero2 = 10");
c = new Conection(270,400, ctx, "");

ef.addBlock(s);
ef.addBlock(p);
ef.addBlock(d);

ef.addBlock(p2);
ef.addBlock(p3);
ef.addBlock(c);

s.addLink(p);
p.addLink(d);
d.linkyes = p2;
d.linkno = p3;

p2.addLink(c);
p3.addLink(c);
*/

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}


/** FUNCTIONS MOUSE **/
canvas.addEventListener('mousedown', function (evt) {
		
	var old_selectedBlock = null;
	var mousePos = getMousePos(canvas, evt);
	var posx =  mousePos.x ;
	var posy =  mousePos.y ;
	
	//hiding submenu buttons
	if(SUB_MENU_BTICONS.css("display") == "block")
		SUB_MENU_BTICONS.hide();
	
	//if have a old selected block in memory
	if((ef.selectedBlock  != null) && (ef.selectedBlock  != undefined) && (ef.selectedBlock.selected) ){
		ef.selectedBlock.moving = false;
		ef.selectedBlock.selected = false;
		
		if(ef.linkingblocks)
			old_selectedBlock = ef.selectedBlock;
		
		ef.selectedBlock  = null;
	}
		
	arrayBlocks = ef.stackBlock;
	
	
	for(var i=0; i< arrayBlocks.length; i++){
		 
		if( arrayBlocks[i].click(posx, posy)){
			
			if( (ef.linkingblocks) && (old_selectedBlock != null)) {
				console.log("linking blocks");
				
				ef.selectedBlock = arrayBlocks[i];
				old_selectedBlock.addLink(ef.selectedBlock);
				
				ef.linkingblocks = false;
				
			}else{
		
				ef.selectedBlock = arrayBlocks[i];
				ef.selectedBlock.selected = true;
				
				if(ef.ctrl)
					ef.selectedBlock.moving = true;
		
				ef.marginX = mousePos.x - ef.selectedBlock.x
				
				ef.setDataInMenu();
			}
			break;
		}
	}
	
});

canvas.addEventListener("mousemove", function(evt){
	
	var mousePos = getMousePos(canvas, evt);
	
	if( ((ef.selectedBlock!=undefined) || (ef.selectedBlock != null) ) && (ef.selectedBlock.moving) && (ef.ctrl)  ){
		ef.selectedBlock.x  = mousePos.x - ef.marginX;
		ef.selectedBlock.y = mousePos.y;
	}
	
});

canvas.addEventListener('dblclick', function (evt) {
	alert("test double click");
});


//ADD EVENTS

