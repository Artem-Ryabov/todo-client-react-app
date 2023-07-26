// import { useState } from 'react';

// interface SignFormProps {
//   action: string;
//   submit: (email: string, password: string) => void;
//   children: JSX.Element
// }

// function SignForm({ children }: SignFormProps): JSX.Element {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();

//   function changeInput(setter: (v: string) => void) {
//     return (e: any) => setter(e.data ?? '');
//   }

//   return (
//     <div>
//       <input type='text' onChange={changeInput(setEmail)}/>
//       <input type='text' onChange={changeInput(setPassword)}/>
//       <div>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default SignForm;