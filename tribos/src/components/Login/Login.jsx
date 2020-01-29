import React, {useContext, useCallback} from "react";
import './Login.css'
import { withRouter, Redirect } from "react-router";
import {firebaseImpl as app} from "../../utils/firebaseUtils";
import {AuthContext} from "../../services/Auth";
import {urls} from "../../utils/urlUtils";
import Form from "../Form/Form";
import Input from "../Input/Input";

const Login = ({ history }) => {

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to={urls.home.path} />;
    }

    return (

        <Form function={handleLogin} title={"Faça Login"}>

            <Input name="email" type="text"/>

            <Input name="password" type="password"/>

            <button type={"submit"}>
                <h3>Login</h3>
            </button>

        </Form>


        // <div className="main-form">
        //     <div id="login" className="form">
        //         <h2>Faça Login</h2>
        //         <form onSubmit={handleLogin} className="campos-form">
        //
        //             <label htmlFor="email">Email:</label>
        //             <input type="text" id="email" name="email"/>
        //
        //             <label htmlFor="senha">Senha:</label>
        //             <input type="password" id="senha" name="password"/>
        //
        //             <button type={"submit"}>
        //                 <h3>Login</h3>
        //             </button>

        //             <h5>
        //                 Cadastre-se
        //                 <Link to={urls.singup.path}>aqui</Link>
        //             </h5>
        //
        //         </form>
        //     </div>
        // </div>
    )
};
export default withRouter(Login);