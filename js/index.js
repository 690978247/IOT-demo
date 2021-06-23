
/* 定义变量 */
// 协议名称： S7_TCP   Modbus_TCP  OPC_DA  OPC_UA  MC3E_Binary_Etherent  MCA1E_Binary_Etherent  Fins_TCP
var popupData = {
  protocolName: 'S7_TCP',
  dataType: '二进制变量'
}

// 定义一个提交的数据结构， 用来填写默认值与回显
var addressData = {
  dataArea: '位', // 数据区域
  letters: 'M', // 寄存器字母块（M/DBX/I/Q/MB/DBB/IB/QB/MW/DBW/IW/QW/MD/DBD/ID/QD）
  lettleValue: 0, // 寄存器字母对应的值
  DBNum: 1, // DB号
  bit: 0,  //  位
  len: 1, // 长度
  addressOffset: 1, // 地址偏移量
  addressType: '字节' // 地址类型
}



/* 方法 */
// 打开变量弹窗
function openPop() {
  let pop = document.getElementById('popup')
  pop.style.display = 'block'

  // 1: 数据区域  2. 寄存器字母块（M/DBX/I/Q/MB/DBB/IB/QB/MW/DBW/IW/QW/MD/DBD/ID/QD） 3.  DB号  4. 地址偏移量   5. 位   6. 长度   7.  地址类型 
  // S7_TCP 渲染弹窗
  if (popupData.protocolName === 'S7_TCP') {
    if (popupData.dataType === '二进制变量') {
      renderS7_TCPHTML([1,2,5], addressData)
    }
  }


}


function renderS7_TCPHTML(items = [], data = {}) {
   // 1: 数据区域  2. 下拉块（M/DBX/I/Q/MB/DBB/IB/QB/MW/DBW/IW/QW/MD/DBD/ID/QD） 3.  DB号  4. 地址偏移量   5. 位   6. 长度   7.  地址类型 
  let wrap = document.getElementById('popup-body-wrap')
  let html = ``
  if (items.includes(1)) {
    html +=`
    <div class="PBW-block" >
        <div class="PBW-block-item" >
          <span>数据区域</span>
          <select onchange="changeData(event, 'dataArea')" >
            <option value="位" ${data.dataArea === '位' ? 'selected' : ''} >位</option>
            <option value="DB" ${data.dataArea === 'DB' ? 'selected' : ''} >DB</option>
            <option value="输入" ${data.dataArea === '输入' ? 'selected' : ''} >输入</option>
            <option value="输出" ${data.dataArea === '输出' ? 'selected' : ''} >输出</option>
          </select>
        </div>
    </div>
    `.trim()
  }

  if (items.includes(2)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>${data.letters}</span>
          <input type="number" min="0" value="${data.lettleValue}" onblur="blurData(event, 'lettleValue')" >
        </div>
      </div>
    `.trim()
  }

  if (items.includes(3)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>DB号</span>
          <input type="number" min="1" value="${data.DBNum}" onblur="blurData(event, 'DBNum')" >
        </div>
      </div>
    `.trim()
  }

  if (items.includes(4)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>地址偏移量</span>
          <input type="number" min="1" value="${data.addressOffset}" onblur="blurData(event, 'addressOffset')" >
        </div>
      </div>
    `.trim()
  }

  if (items.includes(5)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>位</span>
          <select onchange="changeData(event, 'bit')">
            <option value="0" ${data.bit === '0' ? 'selected' : ''} >0</option>
            <option value="1" ${data.bit === '1' ? 'selected' : ''} >1</option>
            <option value="2" ${data.bit === '2' ? 'selected' : ''} >2</option>
            <option value="3" ${data.bit === '3' ? 'selected' : ''} >3</option>
            <option value="4" ${data.bit === '4' ? 'selected' : ''} >4</option>
            <option value="5" ${data.bit === '5' ? 'selected' : ''} >5</option>
            <option value="6" ${data.bit === '6' ? 'selected' : ''} >6</option>
            <option value="7" ${data.bit === '7' ? 'selected' : ''} >7</option>
          </select>
        </div>
      </div>
    `.trim()
  }

  if (items.includes(6)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>长度</span>
          <input type="number" min="1" max="255" value="${data.len}" onblur="blurData(event, 'len')" >
        </div>
      </div>
    `.trim()
  }

  if (items.includes(7)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>地址类型</span>
          <select onchange="changeData(event, 'addressType')">
            <option value="字节" ${data.addressType === '字节' ? 'selected' : ''} >字节</option>
            <option value="字" ${data.addressType === '字' ? 'selected' : ''} >字</option>
            <option value="双字" ${data.addressType === '双字' ? 'selected' : ''} >双字</option>
          </select>
        </div>
      </div>
    `.trim()
  }

  wrap.innerHTML = html
  
}

// 关闭变量弹窗
function closePop () {
  let pop = document.getElementById('popup')
  pop.style.display = 'none'
}

// 提交弹窗
function confirmPop () {
  console.log(addressData)
  closePop()
}

// 选择下拉内容
function changeData (e, prop) {
  addressData[prop] = e.target.value
}

function blurData (e, prop) {
  let types = ['DBNum','addressOffset']
  if (prop === 'lettleValue') {
    // 必填，0或正整数；
    if (!e.target.value) {
      e.target.value = 0
    } else if (e.target.value < 0) {
      e.target.value = 0
    }
  } else if (types.includes(prop)) {
    // 必填，大于0的正整数
    if (!e.target.value) {
      e.target.value = 1
    } else if (e.target.value < 1) {
      e.target.value = 1
    }
  } else if (prop === 'len') {
    // 必填，1-255的正整数
    if (!e.target.value) {
      e.target.value = 1
    } else if (e.target.value <= 1) {
      e.target.value = 1
    } else if (e.target.value >= 255) {
      e.target.value = 255
    }
  }

  addressData[prop] = e.target.value
}
