import React from 'react'
import { Card, Form, Input, Icon, DatePicker, Select, Button } from 'antd'
import axios from 'axios'
// import MarkdownRenderer from 'react-markdown-renderer'
import SimpleMDE from 'react-simplemde-editor'
import 'react-simplemde-editor/dist/simplemde.min.css'

const FormItem = Form.Item
// export default () => <div>hot t</div>
class New extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false, // 提交按钮加载状态
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.enterLoading = this.enterLoading.bind(this)
  }
  componentDidMount() {
    // do something here
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.createArticle(values)
      }
    })
  }
  createArticle(data) {
    axios.post('/api/createArc', { data })
      .then((res) => {
        console.log(res)
        this.setState({ loading: false })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  enterLoading() {
    this.setState({ loading: true });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      title: {
        rules: [{ required: true, message: '请填写标题' }],
      },
      time: {
        rules: [{ type: 'object', required: true, message: '请选择时间' }],
      },
      text: {
        rules: [{ required: true, message: '请填写正文' }],
      },
      tags: {
        rules: [{ required: true, message: '请选择标签' }],
      },
    }
    const Option = Select.Option// eslint-disable-line
    const tags = ['react', 'js', 'vue', 'node', 'c/c++', '数据结构']
    const children = [];
    for (let i = 0; i < tags.length; i += 1) {
      children.push(<Option key={tags[i]}>{tags[i]}</Option>);
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    return (
      <Card style={{ marginBottom: 24 }} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="标题:" {...formItemLayout}>
            {getFieldDecorator('title', config.title)(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="标题" />,
            )}
          </FormItem>
          <FormItem label="标签:" {...formItemLayout}>
            {getFieldDecorator('tags')(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                // defaultValue={['js', 'react']}
              >
                {children}
              </Select>,
            )}
          </FormItem>
          <FormItem label="时间:" {...formItemLayout}>
            {getFieldDecorator('creatTime', config.time)(
              <DatePicker style={{ marginRight: '40px' }} showTime format="YYYY-MM-DD HH:mm:ss" placeholder="选择时间" />,
            )}
            <Button type="primary" loading={this.state.loading} onClick={this.enterLoading} htmlType="submit">
              提交
            </Button>
          </FormItem>
          <FormItem label="正文:" {...formItemLayout}>
            {getFieldDecorator('content', config.text)(
              <SimpleMDE />,
            )}
          </FormItem>
        </Form>
      </Card>
    )
  }
}
const NewArc = Form.create()(New)
export default NewArc

