import React, { PureComponent } from 'react';
import { Form, Modal, Table, Input, Button } from 'hzero-ui';
import { Bind } from 'lodash-decorators';
import intl from 'utils/intl';

/**
 * 用户信息查询
 * @extends {PureComponent} - React.PureComponent
 * @reactProps {string} title - Modal标题
 * @reactProps {boolean} visible - 可见性
 * @reactProps {Function} onOk - 确定操作
 * @reactProps {Function} onCancel - 取消操作
 * @reactProps {object[]} dataSource - 岗位信息
 * @return React.element
 */
@Form.create({ fieldNameProp: null })
export default class UserModal extends PureComponent {
  /**
   * 查询
   */
  @Bind()
  handleSearch(fields = {}) {
    const { onSearch, form } = this.props;
    const fieldValues = form.getFieldsValue();
    if (onSearch) {
      form.validateFields(err => {
        if (!err) {
          // 如果验证成功,则执行onSearch
          onSearch({ ...fieldValues, page: fields });
        }
      });
    }
  }

  /**
   * 重置
   */
  @Bind()
  handleFormReset() {
    this.props.form.resetFields();
  }

  /**
   * render
   * @returns React.element
   */
  render() {
    const {
      form: { getFieldDecorator },
      loading,
      visible,
      selectedRowKeys,
      dataSource,
      pagination,
      onCancel,
      onOk,
      onChange,
    } = this.props;
    const columns = [
      {
        title: intl.get('entity.user.code').d('用户编码'),
        dataIndex: 'loginName',
        width: 150,
      },
      {
        title: intl.get('entity.user.name').d('用户姓名'),
        dataIndex: 'realName',
      },
    ];
    return (
      <Modal
        title={intl.get('hpfm.employee.view.message.search.user').d('用户信息查询')}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText={intl.get('hzero.common.button.save').d('保存')}
        cancelText={intl.get('hzero.common.button.cancel').d('取消')}
        width={700}
      >
        <Form layout="inline">
          <Form.Item label={intl.get('entity.user.code').d('用户编码')}>
            {getFieldDecorator('loginName', {})(
              <Input trim typeCase="upper" inputChinese={false} />
            )}
          </Form.Item>
          <Form.Item label={intl.get('entity.user.name').d('用户姓名')}>
            {getFieldDecorator('realName', {})(<Input />)}
          </Form.Item>
          <Form.Item>
            <Button
              data-code="search"
              type="primary"
              htmlType="submit"
              onClick={() => this.handleSearch()}
            >
              {intl.get('hzero.common.status.search').d('查询')}
            </Button>
            <Button data-code="reset" style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              {intl.get('hzero.common.status.reset').d('重置')}
            </Button>
          </Form.Item>
        </Form>
        <Table
          bordered
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowSelection={{
            selectedRowKeys,
            onChange,
          }}
          onChange={page => this.handleSearch(page)}
        />
      </Modal>
    );
  }
}
