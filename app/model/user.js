
class User {
    constructor(id, username, email, password,bio,image,favourites,following) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.image = image;
        this.favourites = favourites;
        this.following = following;
    }
}
module.exports = User;