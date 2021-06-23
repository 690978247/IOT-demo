
/* 定义变量 */
// 协议名称： S7_TCP   Modbus_TCP  OPC_DA  OPC_UA  MC3E_Binary_Etherent  MCA1E_Binary_Etherent  Fins_TCP
var protocolName = 'S7_TCP'



/* 方法 */
// 打开变量弹窗
function openPop() {
  let pop = document.getElementById('popup')
  pop.style.display = 'block'
}

// 关闭变量弹窗
function closePop () {
  let pop = document.getElementById('popup')
  pop.style.display = 'none'
}
