import React from 'react';
import PropTypes from 'prop-types';
import { Duration, Icon } from 'components';
import classNames from 'classnames/bind';
import styles from './quick-summary.css';

const cx = classNames.bind(styles);

const QuickSummary = ({ stats }) => {
  const { duration, suites, testsRegistered, passes, failures, pending, skipped } = stats;
  return (
    <div className={ cx('cnt') }>
      <ul className={ cx('list') }>
        <li className={ cx('item', 'duration') } title='运行用时'>
          <Icon name='timer' className={ cx('icon') } />
          <Duration unitsClassName={ cx('duration-units') } timer={ duration } isSummary />
        </li>
        <li className={ cx('item', 'suites') } title='测试集数量'>
          <Icon name='library_books' className={ cx('icon') } />{ suites }
        </li>
        <li className={ cx('item', 'tests') } title='测试用例数'>
          <Icon name='assignment' className={ cx('icon') } />{ testsRegistered }
        </li>
      </ul>
      <ul className={ cx('list') }>
        <li className={ cx('item', 'passes') } title='通过'>
          <Icon name='check' className={ cx('icon', 'circle-icon') } />{ passes }
        </li>
        <li className={ cx('item', 'failures') } title='失败'>
          <Icon name='close' className={ cx('icon', 'circle-icon') } />{ failures }
        </li>
        { !!pending && (
          <li className={ cx('item', 'pending') } title='待评审'>
            <Icon name='pause' className={ cx('icon', 'circle-icon') } />{ pending }
          </li>)
        }
        { !!skipped && (
          <li className={ cx('item', 'skipped') } title='跳过'>
            <Icon name='stop' className={ cx('icon', 'circle-icon') } />{ skipped }
          </li>)
        }
      </ul>
    </div>
  );
};

QuickSummary.propTypes = {
  stats: PropTypes.object
};

QuickSummary.displayName = 'QuickSummary';

export default QuickSummary;
