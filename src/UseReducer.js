import React, { useReducer } from 'react';
 
const initialState = {
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }


};
function validateName(name){
    if((/[!@#$%^&*(),.?":{}|<>]/g.test(name) || /\d+/g.test(name))){
    return (false)
    }
    return (true)
}
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
   
    return (false)
}

 
function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.payload
    };
}
 
export default () => {
    const [state, dispatch] = useReducer(reducer, initialState);
 
    function handleChange(e) {
        
        
        const { name, value } = e.target;
        if(e.target.name==='email'){
            if( ValidateEmail(e.target.value)){
                dispatch({
                    type: name,
                    payload: value
                });
                return ;
            }
           
            e.target.error="Please enter a valid email";
            initialState.error="Please enter a valid email";

        }
        else{
            if(validateName(e.target.value)){
                dispatch({
                    type: name,
                    payload: value
                });
            }
            initialState.error="Please enter a valid name";
            return; 
        }
        
        dispatch({
            type: name,
            payload: value
        });
    }
 
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <label>
                        
                    <span>First Name:</span>{' '}
                    <input
                        required
                        name="firstname"
                        value={state.error}
                        onChange={handleChange}
                    />
                </label>
            </div> 
            <div>
                <label>
                    <span>Last Name:</span>{' '}
                    <input
                        name="lastname"
                        value={state.name}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    <span>Email:</span>{' '}
                    <input
                        name="email"
                        value={state.name}
                        onChange={handleChange}
                    />
                </label>
            </div>
            {state.firstName.error !== null && (
        <p className="error">{state.firstName.error}</p>
    )}  
     {state.lastName.error !== null && (
        <p className="error">{state.lastName.error}</p>
    )}  
     {state.email.error !== null && (
        <p className="error">{state.email.error}</p>
    )}  
        </div>
    );
}