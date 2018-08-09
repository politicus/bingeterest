import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      username: '',
      password: '',
      age: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actionType(this.state);
  }

  demoLogin(e) {
    e.preventDefault();
    this.props.demo(this.props.demoUser);
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, idx) => {
          return <li key={idx}>{error}</li>
        })}
      </ul>
    );
  }

  render() {
    const { errors, fields, fieldType, formText, linkTo} = this.props;
    const forms = fields.map((field, idx) => {
      return (
        <div className="field">
            <input
              key={idx}
              type={fieldType[field]}
              value={this.state[field]}
              onChange={this.handleInput(field)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)} />
        </div>
      )
    });

    return (
      <div className="session">
        <div className="session-box">
          <div className="logo">
            <img src={window.images.logo} />
          </div>

          <div className="title">
            <h3>{ formText[0] }</h3>
          </div>

          <div className="intro">
            <h3>Access Bingeterest's best ideas with a demo account</h3>
          </div>

          <div className="input-form">
            <form onSubmit={this.handleSubmit}>
              { forms }
              <div className="errors">{this.renderErrors()}</div>

              <input className="submit" type="submit" value={formText[1]} />
            </form>

            <p>OR</p>

            <div className="demo">
              <button onClick={this.demoLogin}>Demo Login</button>
            </div>

            <div className="footer">
              <h3>{formText[2]}</h3>
            </div>
          </div>

          <div className="line" />

          <div className="session-choice">
            <h3>{linkTo}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);