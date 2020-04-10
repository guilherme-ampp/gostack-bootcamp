/**
 * To create a user we need: name, email, password
 * 
 * To set the type of parameters is defining a default value with = <value>
 * or setting the type with : <type>
 */

 /**
  * Define the structure of data
  * 
  * We can use primitive types: string, number, boolean, object, Array
  */
interface TechObject {
    title: string;
    experience: number;
}
interface CreateUserData {
    name?: string; // optional
    email: string;
    password: string;
    techs: Array<string | TechObject>;  // define the format of data in the array - could be more than one!
}

export default function createUser({ name = '', email, password , techs}: CreateUserData) {
    const user = {
        name,
        email,
        password,
        techs
    };

    return user;
}