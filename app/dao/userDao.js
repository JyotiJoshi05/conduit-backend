const User = require('../model/User');
const daoCommon = require('./shared/daoCommon');
class UserDao {

    constructor() {
        this.common = new daoCommon();
    }

    findById(username) {
        let sqlRequest = "SELECT id, username, email, password, bio,image,favourites,following FROM User WHERE username=$username";
        let sqlParams = {$username: username};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.id, row.username, row.email, row.bio,row.image));
    };

    update(User) {
        let sqlRequest = "UPDATE User SET " +
            "email=$email, " +
            "username=$username, " +
            "bio=$bio, " +
            "image=$image " +
            "WHERE id=$id";

        let sqlParams = {
            $email: User.email,
            $username: User.username,
            $bio: User.bio,
            $image: User.image,
            $id: User.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };
    create(User) {
        let sqlRequest = "INSERT into User (username, email, password) " +
            "VALUES ($username, $email, $password)";
        let sqlParams = {
            $username: User.username,
            $email: User.email,
            $password: User.password
        };
        return this.common.run(sqlRequest, sqlParams);
    };
    exists(usercred) {
        let email = usercred.email;
        let password = usercred.password;
        let sqlRequest = "SELECT (count(*) > 0) as found FROM User WHERE email=$email and password=$password";
        
        let sqlParams = {$email: email,$password:password};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}
module.exports = UserDao;