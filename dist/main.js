(()=>{"use strict";let t=new class{constructor(t=["","","","","","","","",""]){this.currentState=t}printConsoleBoard(){let t="";this.currentState.forEach(((e,r)=>{t+=e?` ${e} |`:"   |",(r+1)%3==0&&(t=t.slice(0,-1),r<8&&(t+="\n――― ――― ―――\n"))})),console.log("%c"+t,"color: #6d4e42;font-size:16px")}isEmpty(){return this.currentState.every((t=>!t))}isFull(){return this.currentState.every((t=>t))}isTerminal(){const t=["xxx","ooo"],e=[this.currentState[0]+this.currentState[1]+this.currentState[2],this.currentState[3]+this.currentState[4]+this.currentState[5],this.currentState[6]+this.currentState[7]+this.currentState[8],this.currentState[0]+this.currentState[3]+this.currentState[6],this.currentState[1]+this.currentState[4]+this.currentState[7],this.currentState[2]+this.currentState[5]+this.currentState[8],this.currentState[0]+this.currentState[4]+this.currentState[8],this.currentState[2]+this.currentState[4]+this.currentState[6]];if(this.isEmpty())return!1;for(let r=0;r<e.length;r++)for(let n=0;n<t.length;n++)if(e[r]===t[n])return console.log(t[n][0]+" is winner"),{winner:t[n][0]};return!!this.isFull()&&(console.log("Draw"),{winner:"draw"})}}(["x","x","x","o","x","x","x","x","x"]);t.printConsoleBoard(),console.log(t.isEmpty()),console.log(t.isFull()),console.log("hallå"),t.isTerminal()})();