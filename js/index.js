
/* 定义变量 */
// 协议名称： S7_TCP   Modbus_TCP  OPC_DA  OPC_UA  MC3E_Binary_Etherent  MCA1E_Binary_Etherent  Fins_TCP
var popupData = {
  protocolName: 'MC3E_Binary_Etherent',
  dataType: '字符串'
}

// 定义一个提交的数据结构， 用来填写默认值与回显
var addressData = {
  dataArea: '', // 数据区域
  letters: 'M', // 寄存器字母块（M/DBX/I/Q/MB/DBB/IB/QB/MW/DBW/IW/QW/MD/DBD/ID/QD）
  lettleValue: 0, // 寄存器字母对应的值
  DBNum: 1, // DB号
  bit: 0,  //  位
  len: 1, // 长度
  addressOffset: 1, // 地址偏移量
  addressType: '字节', // 地址类型
  addressValue: '', // 最后组装出来的变量值
  showList: [], // 弹窗显示的form块
  address: 1, // S7_TCP 以外的协议 偏移地址
}
// 克隆一份数据用来做弹窗取消的回显
var formData = JSON.parse(JSON.stringify(addressData))





/* 方法 */
// 打开变量弹窗
function openPop() {
  let pop = document.getElementById('popup')
  pop.style.display = 'block'

  if (popupData.protocolName === 'S7_TCP') {    //  渲染 S7_TCP弹窗
    // 1: 数据区域  2. 寄存器字母块（M/DBX/I/Q/MB/DBB/IB/QB/MW/DBW/IW/QW/MD/DBD/ID/QD） 3.  DB号  4. 地址偏移量   5. 位   6. 长度   7.  地址类型 
    // 数据区域 需要赋予默认值或回显
    formData.dataArea = formData.dataArea ? formData.dataArea : '位'
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
    // 1. 数据区域  2. 偏移地址   3.位  4. 长度
    let types = ['有符号8位整型','有符号16位整型','有符号32位整型','有符号64位整型','无符号8位整型','无符号16位整型','无符号32位整型','无符号64位整型','F32位浮点数IEEE754','F64位浮点数IEEE754']
    formData.dataArea = formData.dataArea ? formData.dataArea : '线圈状态'
    if (popupData.dataType === '二进制变量') {
      formData.showList = formData.showList.length === 0 ?  [1,2] : formData.showList
    }  else if (types.includes(popupData.dataType)) {
      // 此处判断赋默认值还是回显值
      let areas = ['输入寄存器', '保持寄存器']
      formData.dataArea = areas.includes(formData.dataArea) ? formData.dataArea : '输入寄存器'
      formData.showList = formData.showList.length === 0 ?  [1,2] : formData.showList
    } else if (popupData.dataType === '字符串') {
      // 此处判断赋默认值还是回显值
      let areas = ['输入寄存器', '保持寄存器']
      formData.dataArea = areas.includes(formData.dataArea) ? formData.dataArea : '输入寄存器'
      formData.showList = formData.showList.length === 0 ?  [1,2,4] : formData.showList
    } 
    renderModbus_TCPHTML(formData.showList, formData, popupData.dataType)
  } else if (popupData.protocolName === 'MC3E_Binary_Etherent') {
    formData.dataArea = formData.dataArea ? formData.dataArea : '输入寄存器（X）'
    if (popupData.dataType === '二进制变量') {
      formData.showList = formData.showList.length === 0 ?  [1,2] : formData.showList
    } else if (popupData.dataType === '字符串') {
       // 此处判断赋默认值还是回显值
       let areas = ['数据寄存器（D）', '链接寄存器（W）', '定时器（当前值）（TN）', '计数器（当前值）（CN）']
       formData.dataArea = areas.includes(formData.dataArea) ? formData.dataArea : '数据寄存器（D）'
      formData.showList = formData.showList.length === 0 ?  [1,2,4] : formData.showList
    } else {
      // 此处判断赋默认值还是回显值
      let areas = ['数据寄存器（D）', '链接寄存器（W）', '定时器（当前值）（TN）', '计数器（当前值）（CN）']
      formData.dataArea = areas.includes(formData.dataArea) ? formData.dataArea : '数据寄存器（D）'
      formData.showList = formData.showList.length === 0 ?  [1,2] : formData.showList
    }
    renderMBEHTML(formData.showList, formData, popupData.dataType)
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
  addressData = JSON.parse(JSON.stringify(formData))
  console.log(addressData)
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
  // 1. 数据区域  2. 偏移地址   3.位  4. 长度
  let types = ['有符号8位整型','有符号16位整型','有符号32位整型','有符号64位整型','无符号8位整型','无符号16位整型','无符号32位整型','无符号64位整型','F32位浮点数IEEE754','F64位浮点数IEEE754', '字符串']
  /* 
    types 里面的内容数据区域部分只显示 输入寄存器 和 保持寄存器
  */
  let wrap = document.getElementById('popup-body-wrap')
  let html = ``
  if (items.includes(1)) {
    if (!types.includes(type)) {
      html +=`
      <div class="PBW-block" >
          <div class="PBW-block-item" >
            <span>数据区域</span>
            <select onchange="changeModule_TCPData(event, 'dataArea', '${type}')" >
              <option value="线圈状态" ${data.dataArea === '线圈状态' ? 'selected' : ''} >线圈状态</option>
              <option value="离散输入状态" ${data.dataArea === '离散输入状态' ? 'selected' : ''} >离散输入状态</option>
              <option value="输入寄存器" ${data.dataArea === '输入寄存器' ? 'selected' : ''} >输入寄存器</option>
              <option value="保持寄存器" ${data.dataArea === '保持寄存器' ? 'selected' : ''} >保持寄存器</option>
            </select>
          </div>
      </div>
      `.trim()
    } else {
      html +=`
        <div class="PBW-block" >
            <div class="PBW-block-item" >
              <span>数据区域</span>
              <select onchange="changeModule_TCPData(event, 'dataArea', '${type}')" >
                <option value="输入寄存器" ${data.dataArea === '输入寄存器' ? 'selected' : ''} >输入寄存器</option>
                <option value="保持寄存器" ${data.dataArea === '保持寄存器' ? 'selected' : ''} >保持寄存器</option>
              </select>
            </div>
        </div>
        `.trim()
    }
  }
  if (items.includes(2)) {
    html += `
      <div class="PBW-block" >
        <div class="PBW-block-item">
          <span>偏移地址</span>
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
          <span>长度</span>
          <input type="number" min="1" max="255" value="${data.len}" onblur="blurData(event, 'len')" >
        </div>
      </div>
    `.trim()
  }

  wrap.innerHTML = html
}

// MC3E_Binary_Etherent协议 弹窗渲染函数
function renderMBEHTML (items = [], data = {}, type) {
  // 1. 数据区域    2.  地址    3.  位    4. 长度
  let wrap = document.getElementById('popup-body-wrap')
  let html = ``
  if (items.includes(1)) {
      if (type === '二进制变量') {
        html +=`
        <div class="PBW-block" >
            <div class="PBW-block-item" >
              <span>数据区域</span>
              <select onchange="changeMBEData(event, 'dataArea', '${type}')" >
                <option value="输入寄存器（X）" ${data.dataArea === '输入寄存器（X）' ? 'selected' : ''} >输入寄存器（X）</option>
                <option value="输出寄存器（Y）" ${data.dataArea === '输出寄存器（Y）' ? 'selected' : ''} >输出寄存器（Y）</option>
                <option value="内部继电器（M）" ${data.dataArea === '内部继电器（M）' ? 'selected' : ''} >内部继电器（M）</option>
                <option value="定时器（触点）（TS）" ${data.dataArea === '定时器（触点）（TS）' ? 'selected' : ''} >定时器（触点）（TS）</option>
                <option value="定时器（线圈）（TC）" ${data.dataArea === '定时器（线圈）（TC）' ? 'selected' : ''} >定时器（线圈）（TC）</option>
                <option value="计数器（触点）（CS）" ${data.dataArea === '计数器（触点）（CS）' ? 'selected' : ''} >计数器（触点）（CS）</option>
                <option value="计数器（线圈）（CC）" ${data.dataArea === '计数器（线圈）（CC）' ? 'selected' : ''} >计数器（线圈）（CC）</option>
                <option value="数据寄存器（D）" ${data.dataArea === '数据寄存器（D）' ? 'selected' : ''} >数据寄存器（D）</option>
                <option value="链接寄存器（W）" ${data.dataArea === '链接寄存器（W）' ? 'selected' : ''} >链接寄存器（W）</option>
                <option value="定时器（当前值）（TN）" ${data.dataArea === '定时器（当前值）（TN）' ? 'selected' : ''} >定时器（当前值）（TN）</option>
                <option value="计数器（当前值）（CN）" ${data.dataArea === '计数器（当前值）（CN）' ? 'selected' : ''} >计数器（当前值）（CN）</option>
              </select>
            </div>
        </div>
        `.trim()
      } else {
        html +=`
        <div class="PBW-block" >
            <div class="PBW-block-item" >
              <span>数据区域</span>
              <select onchange="changeMBEData(event, 'dataArea', '${type}')" >
                <option value="数据寄存器（D）" ${data.dataArea === '数据寄存器（D）' ? 'selected' : ''} >数据寄存器（D）</option>
                <option value="链接寄存器（W）" ${data.dataArea === '链接寄存器（W）' ? 'selected' : ''} >链接寄存器（W）</option>
                <option value="定时器（当前值）（TN）" ${data.dataArea === '定时器（当前值）（TN）' ? 'selected' : ''} >定时器（当前值）（TN）</option>
                <option value="计数器（当前值）（CN）" ${data.dataArea === '计数器（当前值）（CN）' ? 'selected' : ''} >计数器（当前值）（CN）</option>
              </select>
            </div>
        </div>
        `.trim()
      }
  }

    if (items.includes(2)) {
      html += `
        <div class="PBW-block" >
          <div class="PBW-block-item">
            <span>偏移地址</span>
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
            <select onchange="changeMBEData(event, 'bit', '${type}')">
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
              <option value="A" ${data.bit === 'A' ? 'selected' : ''} >A</option>
              <option value="B" ${data.bit === 'B' ? 'selected' : ''} >B</option>
              <option value="C" ${data.bit === 'C' ? 'selected' : ''} >C</option>
              <option value="D" ${data.bit === 'D' ? 'selected' : ''} >D</option>
              <option value="E" ${data.bit === 'E' ? 'selected' : ''} >E</option>
              <option value="F" ${data.bit === 'F' ? 'selected' : ''} >F</option>
            </select>
          </div>
        </div>
      `.trim()
    }
  
    if (items.includes(4)) {
      html += `
        <div class="PBW-block" >
          <div class="PBW-block-item">
            <span>长度</span>
            <input type="number" min="1" max="255" value="${data.len}" onblur="blurData(event, 'len')" >
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
  let types = ['有符号8位整型','有符号16位整型','有符号32位整型','有符号64位整型','无符号8位整型','无符号16位整型','无符号32位整型','无符号64位整型','F32位浮点数IEEE754','F64位浮点数IEEE754']
  formData[prop] = e.target.value
  if (type === '二进制变量') {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (e.target.value === '线圈状态') {
        formData.showList = [1,2]
      } else if (e.target.value === '离散输入状态') {
        formData.showList = [1,2]
      } else if (e.target.value === '输入寄存器') {
        formData.showList = [1,2,3]
      } else if (e.target.value === '保持寄存器') {
        formData.showList = [1,2,3]
      }
    }
  } else if (types.includes(type)) {
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
       if (e.target.value === '输入寄存器') {
        formData.showList = [1,2]
      } else if (e.target.value === '保持寄存器') {
        formData.showList = [1,2]
      }
    }
  }
  renderModbus_TCPHTML(formData.showList, formData, type)
}

// 选择下拉内容 -- MC3E_Binary_Etherent协议
function changeMBEData (e, prop, type) {
  formData[prop] = e.target.value
  if (type === '二进制变量') {
    let types = ['输入寄存器（X）','输出寄存器（Y）','内部继电器（M）','定时器（触点）（TS）','定时器（线圈）（TC）','计数器（触点）（CS）','计数器（线圈）（CC）']
    if (prop === 'dataArea') {  // 数据区域部分需要重新渲染弹窗html元素
      if (types.includes(e.target.value)) {
        formData.showList = [1,2]
      } else {
        formData.showList = [1,2,3]
      }
    }
  }

  renderMBEHTML(formData.showList, formData, type)
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
