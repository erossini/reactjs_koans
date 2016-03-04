var React = require("react");

class ContactForm extends React.Component {
  getInitialState() {
    return { errors: [] }
  }

  render() {
    return (
      <div className="form-horizontal">
        <div>Contact form</div>
        {this.renderTextInput('first', 'First name')}
        {this.renderTextInput('last', 'Last name')}
        {this.renderTextArea('address', 'Address')}
      </div>
    )
  }
  
  renderTextArea(id, label) {
    return this.renderField(
        id, label,
        <textarea className="form-control" id={id} ref={id} />
      )
  }

  renderTextInput(id, label) {
    return this.renderField(
        id, label,
        <input type="text" className="form-control" id={id} ref={id} />
        )
  }

  renderSelect(id, label, values) {
    var options = values.map(function(value) {
      return <option value={value}>{value}</option>
    })
    return this.renderField(
      id, label,
      <select className="form-control" id={id} ref={ref}>
        {opt}
      </select>
    )
  }

  renderField(id, label, field) {
    return (
      <div className='form-group'>
        <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
        <div className="col-sm-6">
          {field}
        </div>
      </div>
    )
  }
}

export default ContactForm;
