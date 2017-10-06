import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const View = ({
    visible,
    login,
    password,
    redirect,
    handleDismiss,
    errorMessage,
    authWithEmailPassword,
    handleChange
}) => {
    if (redirect) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <div className="flex-center">
          {visible && 
          <Message 
            error 
            onDismiss={handleDismiss} 
            header='Fehler!' 
            content={errorMessage} 
          />}
        </div>
          <div 
            className="flex-center" 
            style={{ marginTop: '4em'}}
          >
            <Form 
              className='segment' 
              size={'large'} 
              onSubmit={authWithEmailPassword}
            >
                <Form.Input 
                  label='Login: ' 
                  type='text' 
                  name='login' 
                  value={login} 
                  placeholder='Login...' 
                  onChange={handleChange} 
                />
                <Form.Input 
                  label='Passwort: ' 
                  type='password' 
                  name='password' 
                  value={password} 
                  placeholder='Passwort...' 
                  onChange={handleChange}
                  width='16' 
                />
                <Form.Button 
                  content='Einloggen' 
                />
            </Form>
        </div>
      </div>
    );
}

export default View;

