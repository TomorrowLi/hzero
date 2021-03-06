/**
 * hsgp 服务不能使用标准的 Lov(只有接口 没有 lov)
 */

import React, { PureComponent } from 'react';
import { Input, Icon, Button } from 'hzero-ui';

import LovModal from './LovModal';

export default class SourceLov extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: props.value, // 输入框显示值，初始化为textValue
    };
  }
  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { text } = this.state;
    if (text && text !== nextProps.value) {
      this.setState({ text: nextProps.value });
    }
    if (!text && nextProps.value) {
      this.setState({ text: nextProps.value });
    }
    // 当设置form.resetForm时，清空数据
    if (nextProps.value === null || nextProps.value === undefined) {
      this.setState({ text: null });
    }
  }

  render() {
    const {
      onClick = e => e,
      disabled = false,
      lovModalProps = {},
      isButton = false,
      ...otherProps
    } = this.props;
    const { text } = this.state;
    return (
      <React.Fragment>
        {isButton ? (
          <Button onClick={onClick} {...otherProps} />
        ) : (
          <Input
            readOnly
            disabled={disabled}
            value={text}
            onClick={onClick}
            addonAfter={
              disabled ? (
                <Icon type="search" />
              ) : (
                <Icon type="search" onClick={onClick} style={{ cursor: 'pointer' }} />
              )
            }
          />
        )}
        <LovModal {...lovModalProps} />
      </React.Fragment>
    );
  }
}
