// react is required
var React = require("react");

// define an array of counties
var states = [
  'United Kingdom', 'United States', 'Spain', 'Germany'
];

// create a react component
class ContactForm extends React.Component {
    // it is a generic constructor for this component
    constructor(props) {
        super(props);
        
        // add some variables to the state
        this.state = {
            email: true, 
            question: true,
            errors: []
        };
        
        // defnine a function to bind the form
        // if you don't define here a function you can't access to field in the form
        // in general when you want to fill the form, you must declare here your function
        this.isValid = this.isValid.bind(this);
    }

    // this function returns like a json data with all data from the form
    getFormData() {
        var data = {
                firstName: this.refs.firstName.getDOMNode().value,
                lastName: this.refs.lastName.getDOMNode().value,
                address: this.refs.address.getDOMNode().value,
                state: this.refs.state.getDOMNode().value,
                currentCustomer: this.refs.currentCustomerYes.getDOMNode().checked
        }
        // if you want to check email and question checkboxes, remove those comments
        //if (this.props.email) data.email = this.refs.email.getDOMNode().value
        //if (this.props.question) data.question = this.refs.question.getDOMNode().value
        return data
    }

    // create a function to validate my form
    isValid() {
        // array with list of field to check
        var fields = ['firstName', 'lastName', 'address']

        // if you want to check email and queston, remove following comments
        //if (this.props.email) fields.push('email')
        //if (this.props.question) fields.push('question')

        // define an empty array for errors
        // when I create the function to render a field (renderField) I'll check if it exists a message for 
        var errors = {}
        // check each field in the array to check if it empty or not (all fields are required)
        // at the end I'll bind 
        fields.forEach(function(field) {
            var value = this.refs[field].getDOMNode().value
            // if it is empty I add an error in the array
            if (!value) {
                errors[field] = 'This field is required'
            }
        }.bind(this))

        // save in the state the list of errors
        this.setState({errors: errors})

        // create a variable to check if the form is valid
        var isValid = true
        for (var error in errors) {
            isValid = false
            break
        }
        return isValid
    }

    // every class must have a render() {}
    // in return it must be a primary node. if you have more than one, you'll receive an error
    // {this.renderTextInput('firstName', 'First name')} calls the function defined in my class. this class has two parameters
    render() {
        return (
            <div id="contactform">
                <div className="form-horizontal">
                    <div>Contact form</div>
                    {this.renderTextInput('firstName', 'First name')}
                    {this.renderTextInput('lastName', 'Last name')}
                    {this.renderTextArea('address', 'Address')}
                    {this.renderSelect('state', 'Country', states)}
                    {this.renderRadioInlines('currentCustomer', 'Are you currently a ' + this.props.company + ' Customer?', { values: ['Yes', 'No'], defaultCheckedValue: 'No' })}
                </div>
            </div>
        )
    }
  
    // create a function to generate a radiobutton
    // the function wants three parameters
    // ref is important! you can access to an input or other component with his ref
    // there is a collection of ref called refs
    renderRadioInlines(id, label, kwargs) {
        var radios = kwargs.values.map(function(value) {
            var defaultChecker = (value == kwargs.defaultChecker)
            return (
                <label className="radio-inline">
                    <input type="radio" ref={id+value} name={id} value={value} defaultChecker={defaultChecker} />
                    {value}
                </label>
            )
        })

        // call the function to push in the page this field
        return this.renderField(id, label, radios)
    }

    // create a function to generate a textarea
    renderTextArea(id, label) {
        return this.renderField(
            id, label,
            <textarea className="form-control" id={id} ref={id} />
        )
    }

    // create a function to generate a textbox
    renderTextInput(id, label) {
        return this.renderField(
            id, label,
            <input type="text" className="form-control" id={id} ref={id} />
        )
    }

    // create a function to generate a select
    renderSelect(id, label, values) {
        var options = values.map(function(value) {
          return <option value={value}>{value}</option>
        })

        return this.renderField(
            id, label,
            <select className="form-control" id={id} ref={id}>
                {options}
            </select>
        )
    }

    // create a function to push a field in the form
    renderField(id, label, field) {
        // if the field is in the errors list, I'll add an error css class
        // I define a variable here because I can't do the same thing inline in the div below
        var css = 'form-group';
        if (this.state.errors[field.ref])
        {
            css += ' has-error';
        }

        return (
            <div className={css}>
                <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
                <div className="col-sm-6">
                    {field}
                </div>
            </div>
        )
    }
}

// createa a class to use a ContactForm
class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: true, 
            question: true,
            submitted: null
        };

        // what do you thing?
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // if an email or a question is required and the checkbox status is changed, I save the value in ste state
    handleChange(field, e) {
        var nextState = {}

        nextState[field] = e.target.checked
        this.setState(nextState)
    }
    
    // if the user click on the button in the form, I check the form using the function in the other class
    // If the form is valid, I save all data in json format in the submitted variable to show later
    handleSubmit() {
        if (this.refs.contactForm.isValid()) {
            this.setState({submitted: this.refs.contactForm.getFormData()})
        }
        else
        {
            alert('Form is not valid');
        }
    }

    // it must be in any classes
    render() {
        var submitted

        if (this.state.submitted !== null) {
            submitted = <div className="alert alert-success">
                            <p>ContactForm data:</p>
                            <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
                        </div>
        }

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading clearfix">
                        <h3 className="panel-title pull-left">Contact Form</h3>
                        <div className="pull-right">
                            <label className="checkbox-inline">
                                <input type="checkbox" checked={this.state.email} onChange={this.handleChange.bind(this, 'email')} /> Email
                            </label>
                            <label className="checkbox-inline">
                                <input type="checkbox" checked={this.state.question} onChange={this.handleChange.bind(this, 'question')} /> Question
                            </label>
                        </div>
                    </div>
                    <div className="panel-body">
                        <ContactForm ref="contactForm" email={this.state.email} question={this.state.question} company={this.props.company} />
                    </div>
                    <div className="panel-footer">
                        <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
                {submitted}
            </div>
        )
    }
}

// create a class to show the form
class My extends React.Component {
    render() {
        return <MyForm company="MyCompany"/>
    }
}

export default My;