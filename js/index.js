
/* 定义变量 */
// 协议名称： S7_TCP   Modbus_TCP  OPC_DA  OPC_UA  MC3E_Binary_Etherent  MCA1E_Binary_Etherent  Fins_TCP
var popupData = {
  protocolName: 'Modbus_TCP',
  dataType: '二进制变量'
}

// 定义一个提交的数据结构， 用来填写默认值与回显
var addressData = {
  dataArea: '线圈状态', // 数据区域
  letters: 'M', // 寄存器字母块（M/DBX/I/Q/MB/DBB/IB/QB/MW/DBW/IW/QW/MD/DBD/ID/QD）
  lettleValue: 0, // 寄存器字母对应的值
  DBNum: 1, // DB号
  bit: 0,  //  位
  len: 1, // 长度
  addressOffset: 1, // 地址偏移量
  addressType: '字节', // 地址类型
  addressValue: '', // 最后组装出来的变量值
  showList: [], // 弹窗显示的form块
  address: 1, // Modbus_TCP 地址
}
// 克隆一份数据用来做弹窗取消的回显
var formData = JSON.parse(JSON.stringify(addressData))




/* 方法 */
// 打开变量弹窗
function openPop() {
  let pop = document.getElementById('popup')
  pop.style.display = 'block'

  // 1: 数据区域  2. 寄存器字母块（M/DBX/I/Q/MB/DBB/IB/QB/MW/DBW/IW/QW/MD/DBD/ID/QD） 3.  DB号  4. 地址偏移量   5. 位   6. 长度   7.  地址类型 
  if (popupData.protocolName === 'S7_TCP') {    //  渲染 S7_TCP弹窗
    if (popupData.dataType === '二进制变量') {
      formData.showList = formData.showList.length === 0 ?  [1,2,5] : formData.showList
    } else if (popupData.dataType === '有符号8位整型' || popupData.dataType === '无符号8位整型') {
      formData.letters = 'MB'
      formData.showList = formData.showList.length === 0 ?  [1,2] : formData.showList
    } else if (popupData.dataType === '有符号16位整型' || popupData.dataType === '无符号16位整型') {
      formData.letters = 'MW'
      formData.showList = formData.showList.length === 0 ?  [1,2] : formData.showList
    } else if (popupData.dataType === '有符号32位整型' || popupData.dataType === '无符号32位整型' || popupData.dataType === 'F32位浮点数IEEE754' || popupData.dataType === '定时器') {
      formData.letters = 'MD'
      formData.showList = formData.showList.length === 0 ?  [1,2] : formData.showList
    } else if (popupData.dataType === '有符号64位整型' || popupData.dataType === '无符号64位整型' || popupData.dataType === 'F64位浮点数IEEE754' || popupData.dataType === '日期'|| popupData.dataType === '时间'|| popupData.dataType === '日期时间') {
      formData.showList = formData.showList.length === 0 ?  [1,4,7] : formData.showList
    } else if (popupData.dataType === '文本变量8位字符集' || popupData.dataType === '文本变量16位字符集') {
      formData.showList = formData.showList.length === 0 ?  [1,4,6] : formData.showList
    } else if (popupData.dataType === '字符串' || popupData.dataType === '宽字符串') {
      formData.showList = formData.showList.length === 0 ?  [1,4,6,7] : formData.showList
    }
    renderS7_TCPHTML(formData.showList, formData, popupData.dataType)
  } else if (popupData.protocolName === 'Modbus_TCP') { //  渲染 Modbus_TCP弹窗
    if (popupData.dataType === '二进制变量') {
      formData.showList = formData.showList.length === 0 ?  [1,2] : formData.showList
    } 
    renderModbus_TCPHTML(formData.showList, formData, popupData.dataType)
  }


}

// 关闭变量弹窗
function closePop () {
  let pop = document.getElementById('popup')
  pop.style.display = 'none'
  formData = JSON.parse(JSON.stringify(addressData))
}

// 提交弹窗
function confirmPop () {
  console.log(addressData)
  addressData = JSON.parse(JSON.stringify(formData))
  closePop()
}

// S7_TCP协议 弹窗渲染函数
function renderS7_TCPHTML(items = [], data = {}, type) {
  // 1: 数据区域  2. 下拉块（M/DBX/I/Q/MB/DBB/IB/QB/MW/DBW/IW/QW/MD/DBD/ID/QD） 3.  DB号  4. 地址偏移量   5. 位   6. 长度   7.  地址类型 
 let wrap = document.getElementById('popup-body-wrap')
 let html = ``
  if (items.includes(1)) {
    html +=`
    <div class="PBW-block" >
        <div class="PBW-block-item" >
          <span>数据区域</span>
          <select onchange="changeData(event, 'dataArea', '${type}')" >
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
          <select onchange="changeData(event, 'bit', '${type}')">
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
          <select onchange="changeData(event, 'addressType', '${type}')">
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

// Modbus_TCP协议 弹窗渲染函数
function renderModbus_TCPHTML (items = [], data = {}, type) {
  // 1. 数据区域  2. 地址   3.位  4. 长度
  let wrap = document.getElementById('popup-body-wrap')
  let html = ``
  if (items.includes(1)) {
    html +=`
    <div class="PBW-block" >
        <div class="PBW-block-item" >
          <span>数据区域</span>
          <select onchange="changeModule_TCPData(event, 'dataArea', '${type}')" >
            <option value="线圈状态" ${data.dataArea === '线圈状态' ? 'selected' : ''} >线圈状态</option>
            <option value="离散输入状态" ${data.dataArea === '离散输入状态' ? 'selected' : ''} >离散输入状态</option>
            <option value="输入寄存器" ${data.dataArea === '输入寄存器' ? 'selected' : ''} >输入寄存器</option>
            <option value="输出寄存器" ${data.dataArea === '输出寄存器' ? 'selected' : ''} >输出寄存器</option>
          </select>
        </div>
    </div>
    `.trim()
  }
  if (items.includes(2)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>地址</span>
          <input type="number" min="0" value="${data.address}" onblur="blurData(event, 'address')" >
        </div>
      </div>
    `.trim()
  }

  if (items.includes(3)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>位</span>
          <select onchange="changeModule_TCPData(event, 'bit', '${type}')">
            <option value="0" ${data.bit === '0' ? 'selected' : ''} >0</option>
            <option value="1" ${data.bit === '1' ? 'selected' : ''} >1</option>
            <option value="2" ${data.bit === '2' ? 'selected' : ''} >2</option>
            <option value="3" ${data.bit === '3' ? 'selected' : ''} >3</option>
            <option value="4" ${data.bit === '4' ? 'selected' : ''} >4</option>
            <option value="5" ${data.bit === '5' ? 'selected' : ''} >5</option>
            <option value="6" ${data.bit === '6' ? 'selected' : ''} >6</option>
            <option value="7" ${data.bit === '7' ? 'selected' : ''} >7</option>
            <option value="8" ${data.bit === '8' ? 'selected' : ''} >8</option>
            <option value="9" ${data.bit === '9' ? 'selected' : ''} >9</option>
            <option value="10" ${data.bit === '10' ? 'selected' : ''} >10</option>
            <option value="11" ${data.bit === '11' ? 'selected' : ''} >11</option>
            <option value="12" ${data.bit === '12' ? 'selected' : ''} >12</option>
            <option value="13" ${data.bit === '13' ? 'selected' : ''} >13</option>
            <option value="14" ${data.bit === '14' ? 'selected' : ''} >14</option>
            <option value="15" ${data.bit === '15' ? 'selected' : ''} >15</option>
          </select>
        </div>
      </div>
    `.trim()
  }

  if (items.includes(4)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>地址类型</span>
          <select onchange="changeModule_TCPData(event, 'addressType', '${type}')">
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

// 选择下拉内容 -- S7_TCP协议
function changeData (e, prop, type) {
  formData[prop] = e.target.value
  if (type === '二进制变量') {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (e.target.value === '位') {
        formData.letters = 'M'
        formData.showList = [1,2,5]
      } else if (e.target.value === 'DB') {
        formData.letters = 'DBX'
        formData.showList = [1,2,3,5]
      } else if (e.target.value === '输入') {
        formData.letters = 'I'
        formData.showList = [1,2,5]
      } else if (e.target.value === '输出') {
        formData.letters = 'Q'
        formData.showList = [1,2,5]
      }
    }
  } else if (type === '有符号8位整型' || type === '无符号8位整型') {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (e.target.value === '位') {
        formData.letters = 'MB'
        formData.showList = [1,2]
      } else if (e.target.value === 'DB') {
        formData.letters = 'DBB'
        formData.showList = [1,2,3]
      } else if (e.target.value === '输入') {
        formData.letters = 'IB'
        formData.showList = [1,2]
      } else if (e.target.value === '输出') {
        formData.letters = 'QB'
        formData.showList = [1,2]
      }
    }
  } else if (type === '有符号16位整型' || type === '无符号16位整型') {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (e.target.value === '位') {
        formData.letters = 'MW'
        formData.showList = [1,2]
      } else if (e.target.value === 'DB') {
        formData.letters = 'DBW'
        formData.showList = [1,2,3]
      } else if (e.target.value === '输入') {
        formData.letters = 'IW'
        formData.showList = [1,2]
      } else if (e.target.value === '输出') {
        formData.letters = 'QW'
        formData.showList = [1,2]
      }
    }
  } else if (type === '有符号32位整型' || type === '无符号32位整型' || type === 'F32位浮点数IEEE754' || type === '定时器') {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (e.target.value === '位') {
        formData.letters = 'MD'
        formData.showList = [1,2]
      } else if (e.target.value === 'DB') {
        formData.letters = 'DBD'
        formData.showList = [1,2,3]
      } else if (e.target.value === '输入') {
        formData.letters = 'ID'
        formData.showList = [1,2]
      } else if (e.target.value === '输出') {
        formData.letters = 'QD'
        formData.showList = [1,2]
      }
    }
  } else if (type === '有符号64位整型' || type === '无符号64位整型' || type === 'F64位浮点数IEEE754' || type === '日期'|| type === '时间'|| type === '日期时间') {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (e.target.value === '位') {
        formData.showList = [1,4,7]
      } else if (e.target.value === 'DB') {
        formData.showList = [1,3,4,7]
      } else if (e.target.value === '输入') {
        formData.showList = [1,4,7]
      } else if (e.target.value === '输出') {
        formData.showList = [1,4,7]
      }
    }
  } else if (type === '文本变量8位字符集' || type === '文本变量16位字符集') {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (e.target.value === '位') {
        formData.showList = [1,4,6]
      } else if (e.target.value === 'DB') {
        formData.showList = [1,3,4,6]
      } else if (e.target.value === '输入') {
        formData.showList = [1,4,6]
      } else if (e.target.value === '输出') {
        formData.showList = [1,4,6]
      }
    }
  } else if (type === '字符串' || type === '宽字符串') {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (e.target.value === '位') {
        formData.showList = [1,4,6,7]
      } else if (e.target.value === 'DB') {
        formData.showList = [1,3,4,6,7]
      } else if (e.target.value === '输入') {
        formData.showList = [1,4,6,7]
      } else if (e.target.value === '输出') {
        formData.showList = [1,4,6,7]
      }
    }
  }
  renderS7_TCPHTML(formData.showList, formData, type)
}

// 选择下拉内容 -- Modbus_TCP协议
function changeModule_TCPData (e, prop, type) {
  formData[prop] = e.target.value
  if (type === '二进制变量') {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (e.target.value === '线圈状态') {
        formData.showList = [1,2]
      } else if (e.target.value === '离散输入状态') {
        formData.showList = [1,2]
      } else if (e.target.value === '输入寄存器') {
        formData.showList = [1,2,3]
      } else if (e.target.value === '输出寄存器') {
        formData.showList = [1,2,3]
      }
    }
  }
  renderModbus_TCPHTML(formData.showList, formData, type)
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
  e.target.value = parseInt(e.target.value)
  formData[prop] = e.target.value
}
