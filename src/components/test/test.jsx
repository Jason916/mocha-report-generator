/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Duration, Icon } from 'components';
import { CodeSnippet, TestContext } from 'components/test';
import classNames from 'classnames/bind';
import styles from './test.css';
import getReason from '../../js/getErrorReason'

const cx = classNames.bind(styles);

class Test extends PureComponent {
  constructor() {
    super();
    this.toggleExpandedState = this.toggleExpandedState.bind(this);
    this.toggleScreenState = this.toggleScreenState.bind(this);
  }

  static propTypes = {
    test: PropTypes.object,
    enableCode: PropTypes.bool
  }

  static defaultProps = {
    enableCode: true
  }

  state = {
    expanded: false,
    displayScreen: false
  }

  toggleExpandedState() {
    const { test, enableCode } = this.props;
    if ((enableCode && test.pass) || !!test.context || test.fail || test.isHook) {
      this.setState({ expanded: !this.state.expanded });
    }
  }

  toggleScreenState() {
    const { test } = this.props;
    if (!!test.context || test.fail || test.isHook) {
      this.setState({ displayScreen: !this.state.displayScreen });
    }
  }

  render() {
    const { test, enableCode } = this.props;
    const { uuid, title, speed, duration, pass, fail, pending,
      skipped, isHook, err, code, context } = test;

    const testIcon = () => {
      let iconName;
      let iconClassName;
      if (pass) {
        iconName = 'check';
        iconClassName = 'pass';
      }
      if (fail) {
        iconName = 'close';
        iconClassName = 'fail';
      }
      if (pending) {
        iconName = 'pause';
        iconClassName = 'pending';
      }
      if (skipped) {
        iconName = 'stop';
        iconClassName = 'skipped';
      }
      if (isHook) {
        if (fail) {
          iconName = 'error_outline';
        } else {
          iconName = title.match(/^"before/) ? 'rotate_left' : 'rotate_right';
        }
        iconClassName = 'hook';
      }
      return <Icon name={ iconName } className={ cx('icon', iconClassName) } size={ isHook ? 24 : 18 } />;
    };

    const cxname = cx('component', {
      expanded: this.state.expanded,
      passed: pass,
      failed: fail,
      pending,
      skipped,
      hook: isHook,
      inactive: pending || skipped || (pass && !enableCode && !context),
      'with-context': !!context
    });

    return (
      <section id={ uuid } className={ cxname }>
        <header className={ cx('header')} >
          { testIcon() }
          <h4 className={ cx('title') } title={ title }>{ title }</h4>
          { enableCode && (<button
            type="button"
            onClick={this.toggleExpandedState}>
            详细信息
          </button>) }
          { !!context && (<button
            type="button"
            onClick={this.toggleScreenState}>
            错误截图
          </button>) }
          <div className={ cx('info') }>
            { !!context && <Icon name='chat_bubble_outline' className={ cx('context-icon') } size={ 18 } /> }
            { !isHook && <Duration className={ cx('duration') } timer={ duration } /> }
            { !isHook && <Icon name='timer' className={ cx('duration-icon', speed) } size={ 18 } /> }
          </div>
        </header>
        { !!err.message && <p className={ cx('error-message') }>{ getReason(err.estack) }</p> }
        { this.state.expanded &&
          <div className={ cx('body') }>
            { <CodeSnippet className={ cx('code-snippet') } code={ err.estack } highlight={ false } label='Stack Trace' /> }
            { <CodeSnippet className={ cx('code-snippet') } code={ err.diff } lang='diff' label='Diff' /> }
            { enableCode && <CodeSnippet className={ cx('code-snippet') } code={ code } label='Test Code' /> }
            { !!context && <TestContext context={ context } /> }
          </div>
        }
        { this.state.displayScreen &&
          <div className={ cx('body') }>
            { !!context && <TestContext context={ context } /> }
          </div>
        }
      </section>
    );
  }
}

export default Test;
