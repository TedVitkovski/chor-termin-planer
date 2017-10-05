import React from 'react';
import { Form, Container, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const View = ({
    visible, login, password, submittedName, submittedPassword, redirect, handleDismiss, errorMessage, authWithEmailPassword, handleChange
}) => {
    if (redirect) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {visible && <Message error onDismiss={handleDismiss} header='Fehler!' content={errorMessage} />}
        </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4em'}}>
            <Form className='segment' size={'large'} onSubmit={authWithEmailPassword}>
                <Form.Input label='Login: ' type='text' name='login' value={login} placeholder='Login...' onChange={handleChange} />
                <Form.Input label='Passwort: ' type='password' name='password' value={password} placeholder='Passwort...' onChange={handleChange} width='16' />
                <Form.Button content='Einloggen' />
            </Form>
        </div>
      </div>
    );
}

export default View;

