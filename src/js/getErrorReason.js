/**
 * Created by jasonxu on 2020/8/14.
 */
/**
 * Returns the reason of error
 * @param {String} message Info of error stack
 * @returns {String} reason of error
 */
function getReason(message) {
  if (message.includes('AssertionError') && message.includes('Found') && message.includes('expected')) {
    return '断言错误：期望的文本或数值与实际值不匹配';
  }
  if (message.includes('AssertionError') && message.includes('Expected to find element') && message.includes('but never found it')) {
    return '断言错误：未找到指定的元素';
  }
  if (message.includes('AssertionError') && message.includes('Expected to find content') && message.includes('but never did')) {
    return '断言错误：未找到指定的文本';
  }
  if (message.includes('AssertionError') && message.includes('expected') && message.includes('to equal')) {
    return '断言错误：期望的值与实际值不相等';
  }
  if (message.includes('AssertionError') && message.includes('error occurred during a `before each` hook')) {
    return '断言错误：钩子函数 before each报错';
  }
  if (message.includes('AssertionError') && message.includes('expected') && message.includes('to contain')) {
    return '断言错误：元素未包含指定文本';
  }
  if (message.includes('CypressError') && message.includes('detached from the DOM')) {
    return '运行错误：操作的元素状态已改变';
  }
  if (message.includes('CypressError') && message.includes('cannot execute commands outside a running test')) {
    return '运行错误：cypress命令报错';
  }
  if (message.includes('CypressError') && message.includes('Timed out') && message.includes('remote page to load')) {
    return '运行错误：页面加载超时';
  }
  if (message.includes('CypressError') && message.includes('`cy.request()` failed')) {
    return '运行错误：请求超时'
  }
  if (message.includes('CypressError') && message.includes('timed out waiting')) {
    return '运行错误：执行超时'
  }
  return message;
}

module.exports = getReason;
